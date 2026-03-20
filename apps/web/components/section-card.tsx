import { PropsWithChildren } from "react";
import clsx from "clsx";

interface SectionCardProps extends PropsWithChildren {
  title: string;
  description?: string;
  className?: string;
}

export function SectionCard({ title, description, className, children }: SectionCardProps) {
  return (
    <section className={clsx("panel p-5", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          {description ? <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">{description}</p> : null}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
