import {
  formatJournalDate,
  type JournalEntry,
} from "./journal-content";

const linkClass =
  "font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

export function JournalList({
  entries,
}: Readonly<{ entries: readonly JournalEntry[] }>) {
  return (
    <ol className="space-y-6">
      {entries.map((entry) => (
        <li key={entry.id}>
          <article
            aria-labelledby={`${entry.id}-title`}
            className="border border-[#d8d3c7] bg-white/70 p-6 shadow-sm sm:p-8"
          >
            <time
              dateTime={entry.date}
              className="text-sm font-semibold uppercase tracking-[0.12em] text-[#52715f]"
            >
              {formatJournalDate(entry.date)}
            </time>
            <h2
              id={`${entry.id}-title`}
              className="mt-3 text-2xl font-semibold text-[#172124] sm:text-3xl"
            >
              {entry.title}
            </h2>
            <dl className="mt-6 grid gap-5 text-base leading-8 text-[#435156] md:grid-cols-2 md:gap-8">
              <div>
                <dt className="font-semibold text-[#294653]">
                  Problem or opportunity
                </dt>
                <dd className="mt-1">{entry.problemOrOpportunity}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#294653]">What changed</dt>
                <dd className="mt-1">{entry.accomplished}</dd>
              </div>
            </dl>
            {entry.narrativeSections && (
              <div className="mt-8 space-y-6 text-base leading-8 text-[#435156]">
                {entry.narrativeSections.map((section) => (
                  <section key={section.heading}>
                    <h3 className="font-semibold text-[#294653]">
                      {section.heading}
                    </h3>
                    <div className="mt-1 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
            {entry.relatedLink && (
              <p className="mt-6 text-sm">
                <a href={entry.relatedLink.href} className={linkClass}>
                  {entry.relatedLink.label}
                </a>
              </p>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
