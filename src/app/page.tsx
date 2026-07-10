const services = [
  {
    title: "AI Opportunity Assessment",
    description:
      "We examine an existing business process, identify where AI may be useful, and separate realistic opportunities from unnecessary complexity.",
  },
  {
    title: "Workflow Prototype",
    description:
      "We build a small, working prototype that demonstrates how an AI-assisted or agentic workflow could operate in your organization.",
  },
  {
    title: "Technical Guidance",
    description:
      "I help software and business teams understand architecture, integration, security, human oversight, and the operational considerations involved in adopting AI tools.",
  },
];

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Demos", href: "#demos" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const contactHref =
  "mailto:tbrunia+ai-consulting@gmail.com?subject=AI%20workflow%20inquiry";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#1f2a2e]">
      <header className="border-b border-[#d8d3c7] bg-[#f7f5ef]/95">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8"
        >
          <a
            href="#top"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-[#294653] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]"
          >
            Todd Brunia
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-[#516166] sm:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-[#1f2a2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="border-b border-[#d8d3c7]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
                Des Moines-based AI workflow consulting
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-[#172124] sm:text-5xl lg:text-6xl">
                Practical AI Workflows for Real Business Problems
              </h1>
              <div className="mt-7 space-y-5 text-lg leading-8 text-[#435156]">
                <p>
                  I help organizations explore where agentic AI and workflow
                  automation can reduce repetitive work, support employees, and
                  improve how work moves through the business.
                </p>
                <p>
                  My approach combines enterprise software engineering
                  experience with practical experimentation. The goal is not to
                  add AI everywhere. It is to identify useful opportunities,
                  build focused solutions, and keep people involved where
                  judgment matters.
                </p>
                <p>
                  I am based in Des Moines, Iowa, and prefer working with
                  Midwestern SMBs in insurance, financial services,
                  manufacturing, agriculture, and technology.
                </p>
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={contactHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#254c5f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d3d4c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]"
                >
                  Contact Me
                </a>
                <a
                  href="#services"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#b8b2a5] px-6 py-3 text-sm font-semibold text-[#294653] transition hover:border-[#294653] hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]"
                >
                  How I Can Help
                </a>
              </div>
            </div>

            <aside
              aria-label="Engagement principles"
              className="self-start border-l-4 border-[#52715f] bg-white/70 p-6 shadow-sm"
            >
              <h2 className="text-base font-semibold text-[#172124]">
                Start with the work, not the tool.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#516166]">
                Useful AI adoption begins with a real process, a clear
                constraint, and a small experiment that can be reviewed by the
                people responsible for the outcome.
              </p>
              <dl className="mt-6 grid gap-4 border-t border-[#ddd8cc] pt-5 text-sm">
                <div>
                  <dt className="font-semibold text-[#172124]">Scope</dt>
                  <dd className="mt-1 text-[#516166]">
                    Focused proofs of concept and defined outcomes.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#172124]">Fit</dt>
                  <dd className="mt-1 text-[#516166]">
                    Midwestern SMBs with repetitive, document-heavy, or
                    coordination-heavy work.
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section id="services" className="bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
                How I Can Help
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl">
                Small steps toward useful automation.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="border border-[#d8d3c7] bg-[#fbfaf7] p-6"
                >
                  <h3 className="text-lg font-semibold text-[#172124]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#516166]">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="demos" className="border-y border-[#d8d3c7] py-20 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
                See the Approach in Action
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl">
                This website is also a working project.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-[#435156]">
              <p>
                I am using modern AI development tools to design, build, and
                document the site itself. As the project grows, it will include
                interactive demonstrations of practical AI workflows, including
                a workflow assessment experience.
              </p>
              <p>
                The goal is to show not only what AI can produce, but how an
                experienced engineer can guide, review, and integrate
                AI-generated work responsibly.
              </p>
              <div className="mt-8 border border-[#c9c3b7] bg-[#fdfcf8] p-5">
                <p className="text-sm font-semibold text-[#172124]">
                  Planned demonstration
                </p>
                <p className="mt-2 text-sm leading-7 text-[#516166]">
                  A workflow assessment experience that helps identify where AI
                  assistance may be practical, where human judgment remains
                  essential, and what a safe first experiment could look like.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-20 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
                About Me
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl">
                Todd Brunia applies software engineering judgment to new AI
                capabilities.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-[#435156]">
              <p>
                I am a staff-level software engineer with extensive experience
                building and supporting enterprise applications, APIs, cloud
                services, and software delivery practices.
              </p>
              <p>
                I am currently exploring how agentic AI can help organizations
                improve knowledge work and software development without losing
                the controls, maintainability, and human judgment that
                enterprise systems require.
              </p>
              <p>
                You can find more background on{" "}
                <a
                  href="https://linkedin.com/in/tbrunia"
                  className="font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]"
                >
                  LinkedIn
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#1f2a2e] py-18 text-white lg:py-20">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b8c7b5]">
              Have a Workflow Worth Exploring?
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Let&apos;s start with the problem.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#d7ded9]">
              If your organization has a repetitive, document-heavy, or
              coordination-heavy process, I would be glad to hear about it.
              Let&apos;s start with a conversation about the problem, not a
              sales pitch about AI.
            </p>
            <a
              href={contactHref}
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#1f2a2e] transition hover:bg-[#edf1ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Contact Todd
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#172124] px-6 py-8 text-sm text-[#c9d2ce] lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>Todd Brunia · Des Moines, Iowa</p>
          <a
            href="https://linkedin.com/in/tbrunia"
            className="transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
