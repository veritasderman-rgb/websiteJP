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

const formTypeMap: Record<string, FormData['typPoptavky']> = {
  svatba: 'svatba',
  boudoir: 'boudoir',
  portret: 'portret',
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      typPoptavky: 'svatba',
    },
  })

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
    if (data.honeypot) return // spam bot
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full border-b ${hasError ? 'border-red-400' : 'border-gray-200'} bg-transparent py-3 text-sm font-sans text-primary placeholder:text-secondary focus:outline-none focus:border-primary transition-colors`

  const labelClass = 'block text-xs tracking-[0.12em] uppercase text-secondary font-sans mb-1'

  if (status === 'success') {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-2xl text-primary mb-3">Děkuji za zprávu!</p>
        <p className="text-secondary text-sm font-sans">Ozvu se vám co nejdříve.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* Honeypot */}
      <input type="text" {...register('honeypot')} className="sr-only" tabIndex={-1} aria-hidden />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="jmeno" className={labelClass}>Jméno *</label>
          <input id="jmeno" {...register('jmeno')} placeholder="Vaše jméno" className={inputClass(!!errors.jmeno)} />
          {errors.jmeno && <p className="mt-1 text-xs text-red-500">{errors.jmeno.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>E-mail *</label>
          <input id="email" type="email" {...register('email')} placeholder="vas@email.cz" className={inputClass(!!errors.email)} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="telefon" className={labelClass}>Telefon</label>
          <input id="telefon" {...register('telefon')} placeholder="+420 000 000 000" className={inputClass(false)} />
        </div>
        <div>
          <label htmlFor="typPoptavky" className={labelClass}>Typ focení *</label>
          <select id="typPoptavky" {...register('typPoptavky')} className={inputClass(!!errors.typPoptavky)}>
            <option value="svatba">Svatba</option>
            <option value="boudoir">Boudoir & Akt</option>
            <option value="portret">Portrét</option>
            <option value="jine">Jiné</option>
          </select>
          {errors.typPoptavky && <p className="mt-1 text-xs text-red-500">Vyberte prosím typ focení</p>}
        </div>
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
          rows={5}
          placeholder="Napište mi o svém plánovaném focení..."
          className={`${inputClass(!!errors.zprava)} resize-none`}
        />
        {errors.zprava && <p className="mt-1 text-xs text-red-500">{errors.zprava.message}</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('gdpr')} className="mt-0.5 accent-accent" />
          <span className="text-xs text-secondary font-sans leading-relaxed">
            Souhlasím se zpracováním osobních údajů za účelem zodpovězení mé zprávy. Více informací v{' '}
            <a href="/ochrana-udaju" className="underline hover:text-primary">podmínkách ochrany osobních údajů</a>.
          </span>
        </label>
        {errors.gdpr && <p className="mt-1 text-xs text-red-500">{errors.gdpr.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full md:w-auto border border-primary text-primary text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-primary hover:text-white transition-all duration-300 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Odesílám...' : 'Odeslat zprávu'}
      </button>

      {status === 'error' && (
        <p className="text-red-500 text-sm font-sans">Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.</p>
      )}
    </form>
  )
}
