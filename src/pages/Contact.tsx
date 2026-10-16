import { useState, type FormEvent } from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { site } from '../data/site';
import { Button } from '../components/ui/Button';
import { Shell } from '../components/ui/Section';
import { PageHeader } from '../components/ui/PageHeader';
import { breadcrumbSchema } from '../components/ui/Breadcrumbs';
import { Seo } from '../components/seo/Seo';
import { sanitizeText } from '../utils/format';

const topics = ['General question', 'Content correction', 'Copyright / DMCA', 'Advertising', 'Partnership'];

export function Contact() {
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Contact' }];
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', email: '', topic: topics[0], message: '' });

  const update = (key: keyof typeof form) => (value: string) =>
  setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = 'Enter a valid email address.';
    if (form.message.trim().length < 20) next.message = 'Please give us at least a couple of sentences.';
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  const field =
  'h-11 w-full rounded-lg border border-line bg-ink-900 px-3.5 text-sm text-white placeholder:text-mist-dim focus:border-brand-blue focus:outline-none';

  return (
    <Shell>
      <Seo
        title="Contact KJCDramas"
        description="Contact the KJCDramas team about content corrections, copyright, advertising or partnerships."
        canonical={`${site.url}/contact/`}
        schema={breadcrumbSchema(crumbs)} />
      
      <PageHeader
        title="Contact"
        crumbs={crumbs}
        intro="Corrections, takedowns, advertising or just a recommendation you think we missed — send it over. We reply to everything within two working days." />
      

      <div className="grid gap-10 py-10 pb-16 lg:grid-cols-[minmax(0,36rem)_1fr]">
        {sent ?
        <div className="rounded-card border border-line-soft bg-ink-900 p-8">
            <CheckCircle2Icon className="h-8 w-8 text-brand-blue" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-bold text-white">Message sent</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              Thanks {sanitizeText(form.name, 40)} — we’ve got it. You’ll hear from us at{' '}
              {sanitizeText(form.email, 60)} within two working days.
            </p>
          </div> :

        <form onSubmit={submit} noValidate className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white">
                Your name
              </label>
              <input
              id="name"
              value={form.name}
              onChange={(e) => update('name')(e.target.value)}
              maxLength={80}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={field} />
            
              {errors.name &&
            <p id="name-error" role="alert" className="mt-1.5 text-xs text-brand-red">
                  {errors.name}
                </p>
            }
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white">
                Email address
              </label>
              <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update('email')(e.target.value)}
              maxLength={120}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={field} />
            
              {errors.email &&
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-brand-red">
                  {errors.email}
                </p>
            }
            </div>

            <div>
              <label htmlFor="topic" className="mb-1.5 block text-sm font-medium text-white">
                Topic
              </label>
              <select
              id="topic"
              value={form.topic}
              onChange={(e) => update('topic')(e.target.value)}
              className={field}>
              
                {topics.map((t) =>
              <option key={t}>{t}</option>
              )}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white">
                Message
              </label>
              <textarea
              id="message"
              rows={6}
              value={form.message}
              onChange={(e) => update('message')(e.target.value)}
              maxLength={2000}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className="w-full rounded-lg border border-line bg-ink-900 p-3.5 text-sm leading-relaxed text-white placeholder:text-mist-dim focus:border-brand-blue focus:outline-none" />
            
              {errors.message &&
            <p id="message-error" role="alert" className="mt-1.5 text-xs text-brand-red">
                  {errors.message}
                </p>
            }
            </div>

            <Button type="submit" size="lg">
              Send message
            </Button>
          </form>
        }

        <aside className="space-y-4">
          {[
          ['Copyright & takedowns', 'Use the DMCA form for the fastest route — we act on valid notices within 48 hours.'],
          ['Corrections', 'Wrong cast member, wrong episode count, wrong year? Tell us and we’ll fix the page.'],
          ['Advertising', 'Direct placements are available on high-traffic country and genre pages.']].
          map(([title, body]) =>
          <div key={title} className="rounded-card border border-line-soft bg-ink-900 p-5">
              <h2 className="font-display text-base font-bold text-white">{title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-mist">{body}</p>
            </div>
          )}
        </aside>
      </div>
    </Shell>);

}