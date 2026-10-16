import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '../../utils/format';

interface SectionProps {
  title: string;
  kicker?: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  children: ReactNode;
  className?: string;
  headingLevel?: 'h2' | 'h3';
}

export function Section({
  title,
  kicker,
  description,
  href,
  hrefLabel = 'See all',
  children,
  className,
  headingLevel: Heading = 'h2'
}: SectionProps) {
  return (
    <section className={cn('py-8 md:py-11', className)}>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 md:mb-6">
        <div className="max-w-2xl">
          {kicker && <p className="mb-1 text-sm font-semibold text-brand-red">{kicker}</p>}
          <Heading className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            {title}
          </Heading>
          {description && <p className="mt-2 text-sm leading-relaxed text-mist md:text-base">{description}</p>}
        </div>
        {href &&
        <Link
          to={href}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm font-medium text-mist-bright transition-colors duration-150 ease-premium hover:border-line-bright hover:text-white">
          
            {hrefLabel}
            <ArrowRightIcon
            className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-0.5"
            aria-hidden="true" />
          
          </Link>
        }
      </div>
      {children}
    </section>);

}

export function Shell({ children, className }: {children: ReactNode;className?: string;}) {
  return <div className={cn('mx-auto w-full max-w-shell px-4 sm:px-6 lg:px-10', className)}>{children}</div>;
}