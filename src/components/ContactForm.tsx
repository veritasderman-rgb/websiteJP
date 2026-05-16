'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'

const schema = z.object({
  jmeno: z.string().min(2, 'Zadejte prosím jméno'),
  email: z.string().email('Neplatná e-mailová adresa'),
  telefon: z.string().optional(),
  typPoptavky: z.enum(['svatba', 'boudoir', 'portret', 'jine']),
  datum: z.string().optional(),
  zprava: z.string().min(10, 'Zpráva musí mít alespoň 10 znaků'),
  gdpr: z.boolean().refine((v) => v === true, { message: 'Souhlas je povinný' }),
  honeypot: z.string().max(0).optional(),
})

type FormData = {
  jmeno: string
  email: string
  telefon?: string
  typPoptavky: 'svatba' | 'boudoir' | 'portret' | 'jine'
  datum?: string
  zprava: string
  gdpr: boolean
  honeypot?: string
}

interface ContactFormProps {
  contactEmail: string
}

const formTypeMap: Record<string, FormData['typPoptavky']> = {
  svatba: 'svatba',
  boudoir: 'boudoir',
  portret: 'portret',
}

const typeLabels: Record<FormData['typPoptavky'], string> = {
  svatba: 'Svatba',
  boudoir: 'Boudoir & Akt',
  portret: 'Portrét',
  jine: 'Jiné focení',
}

const typeHints: Record<FormData['typPoptavky'], string> = {
  svatba: 'Ideálně připište datum, místo obřadu a představu o rozsahu dne.',
  boudoir: 'Stačí napsat, zda preferujete ateliér, interiér nebo jinou lokaci.',
  portret: 'Pomůže účel portrétu, počet osob a zda chcete focení venku nebo uvnitř.',
  jine: 'Popište prosím typ focení a kde by mělo probíhat.',
}

export default function ContactForm({ contactEmail }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      typPoptavky: 'svatba',
      gdpr: false,
    },
  })

  const selectedType = watch('typPoptavky')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const typeFromQuery = new URLSearchParams(window.location.search).get('typ')
    if (!typeFromQuery) return

    const mappedType = formTypeMap[typeFromQuery]
    if (mappedType) {
      setValue('typPoptavky', mappedType)
    }
  }, [setValue])

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return
    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const payload = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(payload.error || 'Nepodařilo se odeslat zprávu.')
      }

      setStatus('success')
      reset({ typPoptavky: 'svatba', gdpr: false })
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Nepodařilo se odeslat zprávu.')
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full border ${hasError ? 'border-red-400' : 'border-gray-200'} bg-white px-4 py-3 text-sm font-sans text-primary placeholder:text-secondary/70 focus:outline-none focus:border-primary transition-colors`

  const labelClass = 'block text-xs tracking-[0.12em] uppercase text-secondary font-sans mb-2'

  if (status === 'success') {
    return (
      <div className="bg-surface px-6 py-10 md:px-10 md:py-12 text-center">
        <p className="font-display text-3xl text-primary font-light mb-3">Děkuji za zprávu</p>
        <p className="text-secondary text-sm font-sans max-w-md mx-auto leading-relaxed">
          Poptávka byla odeslána na {contactEmail}. Ozvu se vám co nejdříve.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 border border-primary text-primary text-xs tracking-[0.18em] uppercase px-8 py-3 hover:bg-primary hover:text-white transition-colors font-sans"
        >
          Poslat další zprávu
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-surface px-6 py-8 md:px-10 md:py-10" noValidate>
      <input type="text" {...register('honeypot')} className="sr-only" tabIndex={-1} aria-hidden />

      <div className="mb-8 border-b border-gray-200 pb-6">
        <p className="text-xs tracking-[0.15em] uppercase text-accent font-sans mb-2">Poptávkový formulář</p>
        <h2 className="font-display text-3xl text-primary font-light mb-3">Napište základní představu</h2>
        <p className="text-secondary text-sm font-sans leading-relaxed">
          Po odeslání přijde zpráva na {contactEmail}. Odpověď pošlu na e-mail uvedený ve formuláři.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="jmeno" className={labelClass}>Jméno *</label>
            <input id="jmeno" {...register('jmeno')} placeholder="Vaše jméno" className={inputClass(!!errors.jmeno)} />
            {errors.jmeno && <p className="mt-2 text-xs text-red-500">{errors.jmeno.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>E-mail *</label>
            <input id="email" type="email" {...register('email')} placeholder="vas@email.cz" className={inputClass(!!errors.email)} />
            {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="telefon" className={labelClass}>Telefon</label>
            <input id="telefon" {...register('telefon')} placeholder="+420 000 000 000" className={inputClass(false)} />
          </div>
          <div>
            <label htmlFor="typPoptavky" className={labelClass}>Typ focení *</label>
            <select id="typPoptavky" {...register('typPoptavky')} className={`${inputClass(!!errors.typPoptavky)} appearance-none`}>
              <option value="svatba">Svatba</option>
              <option value="boudoir">Boudoir & Akt</option>
              <option value="portret">Portrét</option>
              <option value="jine">Jiné</option>
            </select>
            {errors.typPoptavky && <p className="mt-2 text-xs text-red-500">Vyberte prosím typ focení</p>}
          </div>
        </div>

        <div className="bg-white border border-gray-200 px-4 py-3">
          <p className="text-xs tracking-[0.12em] uppercase text-primary font-sans mb-1">
            {typeLabels[selectedType]}
          </p>
          <p className="text-secondary text-xs font-sans leading-relaxed">
            {typeHints[selectedType]}
          </p>
        </div>

        <div>
          <label htmlFor="datum" className={labelClass}>Preferované datum</label>
          <input id="datum" type="date" {...register('datum')} className={inputClass(false)} />
        </div>

        <div>
          <label htmlFor="zprava" className={labelClass}>Zpráva *</label>
          <textarea
            id="zprava"
            {...register('zprava')}
            rows={6}
            placeholder="Napište mi, co plánujete, kde se bude fotit a jaký výsledek od fotografií čekáte."
            className={`${inputClass(!!errors.zprava)} resize-y min-h-36`}
          />
          {errors.zprava && <p className="mt-2 text-xs text-red-500">{errors.zprava.message}</p>}
        </div>

        <div>
          <label className="flex items-start gap-3 cursor-pointer bg-white border border-gray-200 px-4 py-3">
            <input type="checkbox" {...register('gdpr')} className="mt-1 accent-accent" />
            <span className="text-xs text-secondary font-sans leading-relaxed">
              Souhlasím se zpracováním osobních údajů za účelem zodpovězení mé zprávy. Více informací v{' '}
              <a href="/ochrana-udaju" className="underline hover:text-primary">podmínkách ochrany osobních údajů</a>.
            </span>
          </label>
          {errors.gdpr && <p className="mt-2 text-xs text-red-500">{errors.gdpr.message}</p>}
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full md:w-auto bg-primary text-white text-xs tracking-[0.18em] uppercase px-10 py-4 hover:bg-accent transition-colors font-sans disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Odesílám...' : 'Odeslat poptávku'}
          </button>
          <p className="text-xs text-secondary font-sans">
            Cíl odeslání: {contactEmail}
          </p>
        </div>

        {status === 'error' && (
          <div className="border border-red-200 bg-red-50 px-4 py-3" aria-live="polite">
            <p className="text-red-700 text-sm font-sans">
              {errorMessage} Můžete napsat přímo na{' '}
              <a href={`mailto:${contactEmail}`} className="underline">{contactEmail}</a>.
            </p>
          </div>
        )}
      </div>
    </form>
  )
}
