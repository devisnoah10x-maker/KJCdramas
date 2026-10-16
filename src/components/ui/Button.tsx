import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/format';

type Variant = 'primary' | 'secondary' | 'ghost' | 'blue';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-red text-white hover:bg-[#c81b32]',
  blue: 'bg-brand-blue text-white hover:bg-[#245ae0]',
  secondary: 'border border-line-bright bg-ink-850/80 text-white hover:border-mist-dim hover:bg-ink-800',
  ghost: 'text-mist-bright hover:bg-ink-850 hover:text-white'
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base'
};

const base =
'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 ease-premium disabled:cursor-not-allowed disabled:opacity-50';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>);

}

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children
}: CommonProps & {to: string;}) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>);

}