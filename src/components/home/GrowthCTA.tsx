import { useState } from 'react';
import { BellIcon, CheckIcon } from 'lucide-react';
import { socials } from '../../data/site';
import { Button } from '../ui/Button';
import { sanitizeText } from '../../utils/format';

export function SocialCTA() {
  return (
    <section
      aria-labelledby="social-cta"
      className="overflow-hidden rounded-card border border-line-soft bg-ink-900 p-6 md:p-8">
      
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-lg">
          <h2 id="social-cta" className="font-display text-2xl font-bold text-white">
            Find your next obsession first
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            We post clips, first looks and weekly picks daily. Follow wherever you already scroll.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {socials.map((s) =>
          <li key={s.label}>
              <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-lg border border-line px-4 text-sm font-medium text-mist-bright transition-colors duration-150 ease-premium hover:border-brand-blue hover:text-white">
              
                {s.label}
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>);

}

export function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'done'>('idle');

  return (
    <section
      aria-labelledby="newsletter-cta"
      className="rounded-card border border-line-soft bg-ink-900 p-6 md:p-8">
      
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-lg">
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-blue">
            <BellIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Weekly digest
          </p>
          <h2 id="newsletter-cta" className="font-display text-2xl font-bold text-white">
            One email. Five dramas worth your week.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            New releases, editor’s picks and the clips everyone is talking about. No spam, unsubscribe in one
            click.
          </p>
        </div>

        {status === 'done' ?
        <p className="inline-flex items-center gap-2 rounded-lg border border-line bg-ink-850 px-4 py-3 text-sm text-white">
            <CheckIcon className="h-4 w-4 text-brand-blue" aria-hidden="true" />
            You’re on the list. Check your inbox to confirm.
          </p> :

        <form
          className="w-full max-w-sm"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const clean = sanitizeText(email.trim(), 120);
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean);
            setStatus(valid ? 'done' : 'error');
          }}>
          
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="you@example.com"
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                className="h-11 w-full rounded-lg border border-line bg-ink-950 px-3.5 text-sm text-white placeholder:text-mist-dim focus:border-brand-blue focus:outline-none" />
              
              </div>
              <Button type="submit" size="md" className="shrink-0">
                Subscribe
              </Button>
            </div>
            {status === 'error' &&
          <p id="newsletter-error" role="alert" className="mt-2 text-xs text-brand-red">
                Please enter a valid email address.
              </p>
          }
          </form>
        }
      </div>
    </section>);

}