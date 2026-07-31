import type { Metadata } from 'next'
import HubPage, { SectionLabel } from '@/components/uvod/HubPage'
import { verejnaSluzba as vs } from '@/lib/hub-content'

export const metadata: Metadata = {
  title: 'Veřejná služba',
  description:
    'Náměstek ministra zdravotnictví 2022–2024, Správní rada VZP, resortní tým Pirátů, zastupitel Mariánských Lázní. U každé funkce to, co se v ní odehrálo.',
  alternates: { canonical: '/verejna-sluzba' },
}

export const revalidate = false

const RULE = '#E4E1DA'
const MUTED = '#6B6E76'
const ACCENT = '#14606B'

export default function VerejnaSluzbaPage() {
  return (
    <HubPage title={vs.title} perex={vs.perex} activeHref="/verejna-sluzba">
      <section className="mt-14">
        {vs.roles.map((role) => (
          <article key={role.title} className="py-7" style={{ borderTop: `1px solid ${RULE}` }}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-[family-name:var(--font-source-serif)] m-0 text-[20px] font-semibold leading-[1.25]">
                {role.title}
              </h2>
              {role.period && (
                <span className="text-[12px] uppercase tracking-[0.1em]" style={{ color: MUTED }}>
                  {role.period}
                </span>
              )}
            </div>

            {role.intro && (
              <p
                className="mt-2.5 mb-0 max-w-[40em] text-[15.5px] leading-[1.65]"
                style={{ color: MUTED }}
              >
                {role.intro}
              </p>
            )}

            <ul className="mt-4 mb-0 list-none p-0">
              {role.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="relative max-w-[40em] py-1.5 pl-6 text-[15.5px] leading-[1.65]"
                >
                  <span className="absolute left-0" style={{ color: ACCENT }}>
                    →
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          </article>
        ))}

        <details className="py-5" style={{ borderTop: `1px solid ${RULE}` }}>
          <summary className="cursor-pointer text-[15px] font-medium">
            {vs.dalsiAgendyLabel}
          </summary>
          <p className="mt-3 mb-0 max-w-[40em] text-[15.5px] leading-[1.7]" style={{ color: MUTED }}>
            {vs.dalsiAgendy}
          </p>
        </details>
      </section>

      <section className="mt-16">
        <SectionLabel>{vs.zdrojeLabel}</SectionLabel>
        <p className="m-0 mb-6 max-w-[40em] text-[14px]" style={{ color: MUTED }}>
          {vs.zdrojeNote}
        </p>
        {vs.zdrojeSkupiny.map((skupina) => (
          <div key={skupina.tema} className="mt-6 max-w-[42em]">
            <h3 className="m-0 mb-1 text-[13px] font-semibold uppercase tracking-[0.08em]">
              {skupina.tema}
            </h3>
            <ul className="m-0 list-none p-0">
              {skupina.polozky.map((p) => (
                <li key={p.url} className="py-2" style={{ borderTop: `1px solid ${RULE}` }}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[15.5px] leading-[1.5] hover:underline"
                    style={{ color: ACCENT }}
                  >
                    {p.titulek}
                  </a>
                  <p className="m-0 mt-0.5 text-[13px]" style={{ color: MUTED }}>
                    {p.zdroj}
                    {'datum' in p && p.datum ? ` · ${p.datum}` : ''}
                    {'poznamka' in p && p.poznamka ? ` — ${p.poznamka}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <SectionLabel>{vs.temataLabel}</SectionLabel>
        {vs.temata.map((tema) => (
          <div key={tema.title} className="mt-6 max-w-[40em]">
            <h3 className="font-[family-name:var(--font-source-serif)] m-0 text-[18px] font-semibold">
              {tema.title}
            </h3>
            <p className="mt-2 mb-0 text-[15.5px] leading-[1.7]" style={{ color: '#2A2D33' }}>
              {tema.text}
            </p>
          </div>
        ))}
      </section>

      <aside
        className="mt-14 max-w-[40em] px-6 py-6"
        style={{ background: '#E8F1F2', borderLeft: `2px solid ${ACCENT}` }}
      >
        <h3 className="font-[family-name:var(--font-source-serif)] m-0 text-[18px] font-semibold">
          {vs.ocenani.title}
        </h3>
        <p className="mt-2 mb-0 text-[15.5px] leading-[1.7]" style={{ color: '#2A2D33' }}>
          {vs.ocenani.text}
        </p>
        <p className="mt-3 mb-0 text-[14px]">
          <a
            href={vs.ocenani.odkaz.url}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            style={{ color: ACCENT }}
          >
            {vs.ocenani.odkaz.label}
          </a>
        </p>
      </aside>

      <section className="mt-16">
        <h2 className="font-[family-name:var(--font-source-serif)] m-0 text-[26px] font-semibold leading-[1.2]">
          {vs.mesto.title}
        </h2>

        <div className="mt-6">
          <SectionLabel>{vs.mesto.mojeRukaLabel}</SectionLabel>
          <p className="m-0 mb-3 max-w-[40em] text-[14px]" style={{ color: MUTED }}>
            {vs.mesto.mojeRukaNote}
          </p>
          <ul className="m-0 list-none p-0">
            {vs.mesto.mojeRuka.map((item) => (
              <li
                key={item}
                className="relative max-w-[40em] py-1.5 pl-6 text-[15.5px] leading-[1.65]"
              >
                <span className="absolute left-0" style={{ color: ACCENT }}>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <details className="mt-7 py-5" style={{ borderTop: `1px solid ${RULE}` }}>
          <summary className="max-w-[40em] cursor-pointer text-[15px] font-medium">
            {vs.mesto.koaliceLabel}
          </summary>
          <p className="mt-3 mb-0 max-w-[40em] text-[15.5px] leading-[1.7]" style={{ color: MUTED }}>
            {vs.mesto.koalice}
          </p>
        </details>

        <p className="mt-7 mb-0 text-[17px] font-medium">{vs.mesto.opozice}</p>

        <p className="mt-10 mb-0 max-w-[40em] text-[17px] leading-[1.7]" style={{ color: '#2A2D33' }}>
          {vs.mesto.zaver}
        </p>
      </section>
    </HubPage>
  )
}
