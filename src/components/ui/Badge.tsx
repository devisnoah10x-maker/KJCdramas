import type { ReactNode } from 'react';
import { cn } from '../../utils/format';

type Tone = 'red' | 'blue' | 'neutral' | 'blush' | 'outline';

const tones: Record<Tone, string> = {
  red: 'bg-brand-red text-white',
  blue: 'bg-brand-blue text-white',
  blush: 'bg-brand-blush text-ink-950',
  neutral: 'bg-ink-800/90 text-mist-bright',
  outline: 'border border-line text-mist-bright'
};

export function Badge({
  children,
  tone = 'neutral',
  className




}: {children: ReactNode;tone?: Tone;className?: string;}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
        tones[tone],
        className
      )}>
      
      {children}
    </span>);

}