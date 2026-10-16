import { useState } from 'react';
import { EyeIcon, PlusIcon, SaveIcon } from 'lucide-react';
import { articles } from '../../data/articles';
import { site } from '../../data/site';
import {
  AdminPageHeader,
  Field,
  Panel,
  StatePill,
  Table,
  inputClass,
  textareaClass } from
'../../components/admin/AdminUI';
import { Button } from '../../components/ui/Button';
import { compactNumber, formatDate } from '../../utils/format';

export function ArticlesAdmin() {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <AdminPageHeader
        title="Articles"
        description="Guides, lists and essays. Drafts are never publicly reachable."
        actions={
        <Button size="sm" onClick={() => setEditing((v) => !v)}>
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            New article
          </Button>
        } />
      

      {editing &&
      <div className="mb-6 grid gap-5 xl:grid-cols-[1fr_20rem]">
          <Panel title="Write">
            <div className="space-y-4">
              <Field label="Title" htmlFor="a-title">
                <input id="a-title" className={inputClass} placeholder="e.g. 10 Best Korean Romance Dramas" />
              </Field>
              <Field label="Slug" htmlFor="a-slug" hint={`${site.url}/blog/your-slug/`}>
                <input id="a-slug" className={inputClass} />
              </Field>
              <Field label="Excerpt" htmlFor="a-excerpt" hint="Shown on cards and in search results.">
                <textarea id="a-excerpt" rows={2} className={textareaClass} />
              </Field>
              <Field label="Content" htmlFor="a-content" hint="Markdown supported.">
                <textarea id="a-content" rows={14} className={textareaClass} />
              </Field>
            </div>
          </Panel>

          <aside className="space-y-5">
            <Panel title="Publishing">
              <div className="space-y-4">
                <Field label="Category" htmlFor="a-cat">
                  <select id="a-cat" className={inputClass}>
                    {['Lists', 'Guides', 'Essays', 'News'].map((c) =>
                  <option key={c}>{c}</option>
                  )}
                  </select>
                </Field>
                <Field label="Tags" htmlFor="a-tags" hint="Comma separated.">
                  <input id="a-tags" className={inputClass} placeholder="K-Drama, Romance" />
                </Field>
                <Field label="Author" htmlFor="a-author">
                  <input id="a-author" className={inputClass} defaultValue="Mina Park" />
                </Field>
                <Field label="Schedule" htmlFor="a-schedule">
                  <input id="a-schedule" type="datetime-local" className={inputClass} />
                </Field>
                <div className="flex flex-col gap-2">
                  <Button size="sm">Publish</Button>
                  <Button size="sm" variant="secondary">
                    <SaveIcon className="h-4 w-4" aria-hidden="true" />
                    Save draft
                  </Button>
                  <Button size="sm" variant="ghost">
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                    Preview
                  </Button>
                </div>
              </div>
            </Panel>
            <Panel title="SEO & social">
              <div className="space-y-4">
                <Field label="SEO title" htmlFor="a-seo-title">
                  <input id="a-seo-title" className={inputClass} />
                </Field>
                <Field label="Meta description" htmlFor="a-seo-desc">
                  <textarea id="a-seo-desc" rows={3} className={textareaClass} />
                </Field>
                <Field label="Canonical URL" htmlFor="a-canonical">
                  <input id="a-canonical" className={inputClass} />
                </Field>
                <Field label="Social image" htmlFor="a-social" hint="1200×630. Falls back to featured image.">
                  <Button variant="secondary" size="sm" className="w-full">
                    Choose from library
                  </Button>
                </Field>
              </div>
            </Panel>
          </aside>
        </div>
      }

      <Table head={['Article', 'Category', 'Author', 'State', 'Views', 'Published', 'Updated']}>
        {articles.map((a) =>
        <tr key={a.id}>
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <img
                src={a.featuredImage}
                alt=""
                aria-hidden="true"
                width={64}
                height={36}
                loading="lazy"
                className="h-10 w-16 rounded object-cover" />
              
                <div className="min-w-0">
                  <span className="block truncate text-sm font-medium text-white">{a.title}</span>
                  <span className="text-xs text-mist-dim">/blog/{a.slug}</span>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm text-mist">{a.category}</td>
            <td className="px-4 py-3 text-sm text-mist">{a.author}</td>
            <td className="px-4 py-3">
              <StatePill state={a.state} />
            </td>
            <td className="px-4 py-3 text-sm text-mist">{compactNumber(a.views)}</td>
            <td className="px-4 py-3 text-sm text-mist">{formatDate(a.publishedAt)}</td>
            <td className="px-4 py-3 text-sm text-mist">{formatDate(a.updatedAt)}</td>
          </tr>
        )}
      </Table>
    </>);

}