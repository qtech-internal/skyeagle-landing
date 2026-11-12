import type { ReactNode } from 'react'

export interface DocSection {
  id: string
  title: string
  body: ReactNode
}

interface DocPageProps {
  title: string
  summary: ReactNode
  meta: string[]
  sections: DocSection[]
  /** Shown above the numbered sections, outside the table of contents. */
  lead?: ReactNode
}

/** Layout shared by the policy and deletion pages: contents on the left, text on the right. */
export function DocPage({ title, summary, meta, sections, lead }: DocPageProps) {
  return (
    <>
      <div className="doc-hero">
        <div className="wrap">
          <h1>{title}</h1>
          <p>{summary}</p>
          <div className="doc-meta">
            {meta.map((m) => (
              <span className="tag" key={m}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap doc-layout">
        <nav className="toc" aria-label="On this page">
          <h2>On this page</h2>
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose">
          {lead}
          {sections.map((s, i) => (
            <section id={s.id} key={s.id}>
              <h2>
                {i + 1}. {s.title}
              </h2>
              {s.body}
            </section>
          ))}
        </article>
      </div>
    </>
  )
}
