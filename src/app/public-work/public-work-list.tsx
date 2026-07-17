import Link from "next/link";

import type { PublicWorkItem } from "./public-work-content";

const linkClass =
  "font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

export function PublicWorkList({
  items,
}: Readonly<{ items: readonly PublicWorkItem[] }>) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-col border border-[#d8d3c7] bg-white/70 p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-2xl font-semibold text-[#172124]">{item.name}</h2>
          <p className="mt-4 flex-1 text-base leading-8 text-[#435156]">
            {item.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link href={item.detailPath} className={linkClass}>
              Explore this example
            </Link>
            <a
              href={item.repositoryUrl}
              aria-label={`View ${item.name} repository`}
              className={linkClass}
            >
              View repository
            </a>
            {item.supportingLinks?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-label={`${item.name}: ${link.label}`}
                className={linkClass}
              >
                {link.label}
              </a>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
