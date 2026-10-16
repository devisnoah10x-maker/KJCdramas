import { ShieldCheckIcon } from 'lucide-react';
import { site, socials } from '../../data/site';
import { AdminPageHeader, Field, Panel, inputClass, textareaClass } from '../../components/admin/AdminUI';
import { Button } from '../../components/ui/Button';

export function SettingsAdmin() {
  return (
    <>
      <AdminPageHeader
        title="Settings"
        description="Brand details, social accounts and access control."
        actions={<Button size="sm">Save changes</Button>} />
      

      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          <Panel title="Brand">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Site name" htmlFor="s-name">
                <input id="s-name" className={inputClass} defaultValue={site.name} />
              </Field>
              <Field label="Tagline" htmlFor="s-tagline">
                <input id="s-tagline" className={inputClass} defaultValue={site.tagline} />
              </Field>
              <Field label="Short description" htmlFor="s-desc" className="sm:col-span-2">
                <textarea id="s-desc" rows={2} className={textareaClass} defaultValue={site.description} />
              </Field>
              <Field label="Logo" htmlFor="s-logo" className="sm:col-span-2">
                <div className="flex items-center gap-4 rounded-lg border border-line-soft bg-ink-950 p-4">
                  <img
                    src="/09673b76-0c44-436f-acaa-556b295bf667.jpg"
                    alt="Current KJCDramas logo"
                    className="h-8 w-auto" />
                  
                  <Button variant="secondary" size="sm">
                    Replace logo
                  </Button>
                </div>
              </Field>
            </div>
          </Panel>

          <Panel title="Social accounts" description="Used in the footer and in social sharing metadata.">
            <div className="grid gap-4 sm:grid-cols-2">
              {socials.map((s) =>
              <Field key={s.label} label={s.label} htmlFor={`s-${s.label}`}>
                  <input id={`s-${s.label}`} className={inputClass} defaultValue={s.href} />
                </Field>
              )}
            </div>
          </Panel>

          <Panel title="Growth">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Newsletter provider" htmlFor="s-news">
                <select id="s-news" className={inputClass}>
                  <option>Not connected</option>
                  <option>Mailchimp</option>
                  <option>Buttondown</option>
                </select>
              </Field>
              <Field label="Browser notifications" htmlFor="s-push" hint="Opt-in only, never on page load.">
                <select id="s-push" className={inputClass}>
                  <option>Disabled</option>
                  <option>Enabled (prompt after 2 page views)</option>
                </select>
              </Field>
            </div>
          </Panel>
        </div>

        <aside className="space-y-5">
          <Panel title="Access & security">
            <div className="flex gap-3 rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-3">
              <ShieldCheckIcon className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-emerald-100">
                Admin routes require an authenticated session and are blocked from search engines. Keys and
                provider secrets live in server-side environment variables only.
              </p>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
              ['Authentication', 'Supabase Auth (email + magic link)'],
              ['Two-factor', 'Recommended — not yet enabled'],
              ['Session length', '7 days'],
              ['Admin users', '1 owner']].
              map(([k, v]) =>
              <li key={k} className="flex justify-between gap-3">
                  <span className="text-mist">{k}</span>
                  <span className="text-right text-white">{v}</span>
                </li>
              )}
            </ul>
            <Button variant="secondary" size="sm" className="mt-4 w-full">
              Manage admin users
            </Button>
          </Panel>

          <Panel title="Danger zone">
            <p className="text-sm leading-relaxed text-mist">
              Rebuilding the site regenerates every static page, sitemap and feed. Traffic is unaffected while
              it runs.
            </p>
            <Button variant="secondary" size="sm" className="mt-3 w-full">
              Rebuild site
            </Button>
          </Panel>
        </aside>
      </div>
    </>);

}