'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'jp.fineArtAdult.v1'

export default function AgeGate({
  children,
  galleryTitle,
}: {
  children: ReactNode
  galleryTitle: string
}) {
  const [accepted, setAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      setAccepted(window.localStorage.getItem(STORAGE_KEY) === 'true')
    } catch {
      setAccepted(false)
    }
  }, [])

  if (accepted === null) {
    return <div className="min-h-[40vh]" aria-hidden />
  }

  if (accepted) return <>{children}</>

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center bg-surface border border-primary/10 px-8 py-12">
        <p className="text-accent text-xs tracking-[0.25em] uppercase font-sans mb-4">
          Obsah pro dospělé
        </p>
        <h2 className="font-display text-2xl md:text-3xl text-primary font-light leading-snug mb-5">
          {galleryTitle}
        </h2>
        <p className="text-secondary font-sans text-sm leading-relaxed mb-8">
          Tato galerie obsahuje fine art a aktové fotografie. Vstupem potvrzujete, že je vám 18 let
          nebo více a souhlasíte se zobrazením uměleckých aktů.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => {
              try {
                window.localStorage.setItem(STORAGE_KEY, 'true')
              } catch {}
              setAccepted(true)
            }}
            className="inline-block bg-primary text-white text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-accent transition-colors font-sans"
          >
            Je mi 18+, vstoupit
          </button>
          <Link
            href="/portfolio"
            className="inline-block border border-primary text-primary text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-primary hover:text-white transition-colors font-sans"
          >
            Vrátit se
          </Link>
        </div>
      </div>
    </div>
  )
}
