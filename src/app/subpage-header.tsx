import Link from "next/link";

const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

type SubpageHeaderProps = {
  showContactAction?: boolean;
};

export function SubpageHeader({
  showContactAction = true,
}: SubpageHeaderProps) {
  return (
    <header className="border-b border-[#d8d3c7] bg-[#f7f5ef]/95 px-6 py-4 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <Link
          href="/"
          aria-label="Todd Brunia AI Workflow Consulting home"
          className={`flex min-h-12 flex-col justify-center text-[#294653] ${focusClass}`}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.14em]">
            Todd Brunia
          </span>
          <span className="mt-1 text-xs font-medium tracking-[0.04em] text-[#667276]">
            AI Workflow Consulting
          </span>
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href="/"
            className={`inline-flex min-h-11 items-center text-sm font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] ${focusClass}`}
          >
            Back to consulting site
          </Link>
          {showContactAction ? (
            <Link
              href="/contact"
              className={`inline-flex min-h-11 items-center justify-center rounded-md bg-[#254c5f] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#1d3d4c] ${focusClass}`}
            >
              Discuss Your Workflow
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
