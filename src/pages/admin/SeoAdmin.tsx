import { CheckCircle2Icon, RefreshCwIcon } from 'lucide-react';
import { site } from '../../data/site';
import { dramas } from '../../data/dramas';
import { articles } from '../../data/articles';
import {
  AdminPageHeader,
  Field,
  Panel,
  Table,
  inputClass,
  textareaClass } from
'../../components/admin/AdminUI';
import { Button } from '../../components/ui/Button';

export function SeoAdmin() {
  const missingMeta = [...dramas, ...articles].filter(
    (item) => !('seoDescription' in item) || !item.seoDescription
  );

  return (
    <>
      <AdminPageHeader
        title="SEO"
        description="Site-wide defaults, generated files and per-page overrides."
        actions={<Button size="sm">Save changes</Button>} />
      

      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          <Panel title="Site defaults" description="Used whenever a page has no override.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Site title" htmlFor="site-title" className="sm:col-span-2">
                <input id="site-title" className={inputClass} defaultValue={`${site.name} — ${site.tagline}`} />
              </Field>
              <Field
                label="Default meta description"
                htmlFor="site-desc"
                className="sm:col-span-2"
                hint="Aim for 150–155 characters.">
                
                <textarea id="site-desc" rows={3} className={textareaClass} defaultValue={site.description} />
              </Field>
              <Field label="Canonical domain" htmlFor="canonical-domain">
                <input id="canonical-domain" className={inputClass} defaultValue={site.url} />
              </Field>
              <Field label="Social handle" htmlFor="social-handle">
                <input id="social-handle" className={inputClass} defaultValue={site.twitter} />
              </Field>
              <Field
                label="Default OG image"
                htmlFor="og-image"
                className="sm:col-span-2"
                hint="1200×630. Used on Facebook, Instagram link previews and X.">
                
                <div className="flex items-center gap-3">
                  <img
                    src={site.defaultOgImage}
                    alt="Current default social sharing image"
                    className="h-20 w-36 rounded-lg border border-line-soft object-cover" />
                  
                  <Button variant="secondary" size="sm">
                    Choose from library
                  </Button>
                </div>
              </Field>
            </div>
          </Panel>

          <Panel title="Generated files" description="Rebuilt automatically on every publish.">
            <Table head={['File', 'Entries', 'Last generated', 'Status']}>
              {[
              ['/sitemap.xml', `${dramas.length + articles.length + 24}`, '20 Aug 2026, 04:12'],
              ['/robots.txt', '—', '20 Aug 2026, 04:12'],
              ['/sitemap-dramas.xml', String(dramas.length), '20 Aug 2026, 04:12'],
              ['/sitemap-articles.xml', String(articles.length), '20 Aug 2026, 04:12']].
              map(([file, entries, when]) =>
              <tr key={file}>
                  <td className="px-4 py-3 text-sm text-white">{file}</td>
                  <td className="px-4 py-3 text-sm text-mist">{entries}</td>
                  <td className="px-4 py-3 text-sm text-mist">{when}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300">
                      <CheckCircle2Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      Up to date
                    </span>
                  </td>
                </tr>
              )}
            </Table>
            <Button variant="secondary" size="sm" className="mt-4">
              <RefreshCwIcon className="h-4 w-4" aria-hidden="true" />
              Regenerate now
            </Button>
          </Panel>

          <Panel
            title="Structured data"
            description="Only emitted where it is genuinely accurate — never fabricated.">
            
            <ul className="divide-y divide-line-soft">
              {[
              ['Organization', 'Homepage', true],
              ['WebSite + SearchAction', 'Homepage', true],
              ['BreadcrumbList', 'All content pages', true],
              ['TVSeries / Movie', 'Drama and movie pages', true],
              ['Article', 'Blog articles', true],
              ['AggregateRating', 'Only where an editorial score exists', true],
              ['VideoObject', 'Disabled — we do not host full videos yet', false]].
              map(([type, scope, on]) =>
              <li key={type as string} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm text-white">{type}</p>
                    <p className="text-xs text-mist-dim">{scope}</p>
                  </div>
                  <span className={on ? 'text-xs text-emerald-300' : 'text-xs text-mist-dim'}>
                    {on ? 'Enabled' : 'Off'}
                  </span>
                </li>
              )}
            </ul>
          </Panel>
        </div>

        <aside className="space-y-5">
          <Panel title="Indexing">
            <div className="space-y-4">
              <Field label="Robots policy" htmlFor="robots">
                <select id="robots" className={inputClass}>
                  <option>index, follow (recommended)</option>
                  <option>noindex, nofollow (staging only)</option>
                </select>
              </Field>
              <p className="text-xs leading-relaxed text-mist-dim">
                Search and all /admin routes are always excluded from indexing and the sitemap,
                regardless of this setting.
              </p>
            </div>
          </Panel>

          <Panel title="Content health">
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-mist">Pages missing meta description</span>
                <span className="font-semibold text-white">{missingMeta.length}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-mist">Titles over 60 characters</span>
                <span className="font-semibold text-white">
                  {dramas.filter((d) => d.seoTitle.length > 60).length}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-mist">Images missing alt text</span>
                <span className="font-semibold text-white">0</span>
              </li>
            </ul>
          </Panel>
        </aside>
      </div>
    </>);

}