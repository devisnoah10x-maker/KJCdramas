import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, EyeIcon, SaveIcon } from 'lucide-react';
import { dramas } from '../../data/dramas';
import { countries, genres } from '../../data/taxonomy';
import { site } from '../../data/site';
import {
  AdminPageHeader,
  Field,
  Panel,
  inputClass,
  textareaClass } from
'../../components/admin/AdminUI';
import { Button } from '../../components/ui/Button';
import { cn } from '../../utils/format';

const tabs = ['Content', 'Media', 'Relations', 'SEO'] as const;
type Tab = (typeof tabs)[number];

export function DramaEditor() {
  const { id } = useParams();
  const existing = dramas.find((d) => d.id === id);
  const [tab, setTab] = useState<Tab>('Content');
  const [form, setForm] = useState({
    title: existing?.title ?? '',
    slug: existing?.slug ?? '',
    alternativeTitle: existing?.alternativeTitle ?? '',
    country: existing?.country ?? 'kr',
    year: existing?.year ?? new Date().getFullYear(),
    status: existing?.status ?? 'Ongoing',
    type: existing?.type ?? 'drama',
    genres: existing?.genres ?? [],
    synopsis: existing?.synopsis ?? '',
    rating: existing?.rating ?? 0,
    director: existing?.director ?? '',
    trailer: existing?.trailer ?? '',
    featured: existing?.featured ?? false,
    trending: existing?.trending ?? false,
    seoTitle: existing?.seoTitle ?? '',
    seoDescription: existing?.seoDescription ?? '',
    canonicalUrl: existing?.canonicalUrl ?? '',
    publishAt: ''
  });

  const set = <K extends keyof typeof form,>(key: K, value: (typeof form)[K]) =>
  setForm((f) => ({ ...f, [key]: value }));

  return (
    <>
      <Link
        to="/admin/dramas"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-mist transition-colors duration-150 ease-premium hover:text-white">
        
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        Back to all dramas
      </Link>

      <AdminPageHeader
        title={existing ? `Edit: ${existing.title}` : 'Add a new drama'}
        description="Fill in what you have. You can save a draft at any point and finish later."
        actions={
        <>
            <Button variant="ghost" size="sm">
              <EyeIcon className="h-4 w-4" aria-hidden="true" />
              Preview
            </Button>
            <Button variant="secondary" size="sm">
              <SaveIcon className="h-4 w-4" aria-hidden="true" />
              Save draft
            </Button>
            <Button size="sm">Publish</Button>
          </>
        } />
      

      <div className="mb-5 flex gap-1 border-b border-line-soft" role="tablist" aria-label="Editor sections">
        {tabs.map((t) =>
        <button
          key={t}
          role="tab"
          aria-selected={tab === t}
          type="button"
          onClick={() => setTab(t)}
          className={cn(
            '-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors duration-150 ease-premium',
            tab === t ?
            'border-brand-red text-white' :
            'border-transparent text-mist hover:text-white'
          )}>
          
            {t}
          </button>
        )}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          {tab === 'Content' &&
          <Panel title="Basic information">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Title" htmlFor="title" className="sm:col-span-2">
                  <input
                  id="title"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Snowfall on Yeonnam Street" />
                
                </Field>
                <Field
                label="Slug"
                htmlFor="slug"
                hint={`URL: ${site.url}/drama/${form.slug || 'your-slug'}/`}
                className="sm:col-span-2">
                
                  <input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  className={inputClass} />
                
                </Field>
                <Field label="Alternative title" htmlFor="alt" hint="Original-language title.">
                  <input
                  id="alt"
                  value={form.alternativeTitle}
                  onChange={(e) => set('alternativeTitle', e.target.value)}
                  className={inputClass} />
                
                </Field>
                <Field label="Director" htmlFor="director">
                  <input
                  id="director"
                  value={form.director}
                  onChange={(e) => set('director', e.target.value)}
                  className={inputClass} />
                
                </Field>
                <Field label="Country" htmlFor="country">
                  <select
                  id="country"
                  value={form.country}
                  onChange={(e) => set('country', e.target.value as typeof form.country)}
                  className={inputClass}>
                  
                    {countries.map((c) =>
                  <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                  )}
                  </select>
                </Field>
                <Field label="Year" htmlFor="year">
                  <input
                  id="year"
                  type="number"
                  value={form.year}
                  onChange={(e) => set('year', Number(e.target.value))}
                  className={inputClass} />
                
                </Field>
                <Field label="Type" htmlFor="type">
                  <select
                  id="type"
                  value={form.type}
                  onChange={(e) => set('type', e.target.value as typeof form.type)}
                  className={inputClass}>
                  
                    <option value="drama">Drama series</option>
                    <option value="movie">Movie</option>
                  </select>
                </Field>
                <Field label="Status" htmlFor="status">
                  <select
                  id="status"
                  value={form.status}
                  onChange={(e) => set('status', e.target.value as typeof form.status)}
                  className={inputClass}>
                  
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Upcoming</option>
                  </select>
                </Field>
                <Field label="Rating (0–10)" htmlFor="rating" hint="Leave at 0 if unrated.">
                  <input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={form.rating}
                  onChange={(e) => set('rating', Number(e.target.value))}
                  className={inputClass} />
                
                </Field>
                <Field label="Trailer URL" htmlFor="trailer" hint="Official trailer only.">
                  <input
                  id="trailer"
                  type="url"
                  value={form.trailer}
                  onChange={(e) => set('trailer', e.target.value)}
                  className={inputClass} />
                
                </Field>
                <Field label="Synopsis" htmlFor="synopsis" className="sm:col-span-2">
                  <textarea
                  id="synopsis"
                  rows={5}
                  value={form.synopsis}
                  onChange={(e) => set('synopsis', e.target.value)}
                  className={textareaClass} />
                
                </Field>
              </div>
            </Panel>
          }

          {tab === 'Media' &&
          <Panel title="Images" description="Poster 2:3, backdrop 16:9. Keep files under 300 KB.">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
              ['Poster', '2:3', existing?.poster],
              ['Backdrop', '16:9', existing?.backdrop],
              ['Thumbnail', '16:9', existing?.thumbnail]].
              map(([label, ratio, src]) =>
              <div key={label as string}>
                    <p className="mb-2 text-sm font-medium text-white">
                      {label} <span className="text-xs text-mist-dim">({ratio})</span>
                    </p>
                    <div className="flex aspect-[2/3] items-center justify-center overflow-hidden rounded-lg border border-dashed border-line bg-ink-950">
                      {src ?
                  <img src={src as string} alt="" className="h-full w-full object-cover" /> :

                  <span className="text-xs text-mist-dim">No image</span>
                  }
                    </div>
                    <Button variant="secondary" size="sm" className="mt-2 w-full">
                      Choose from library
                    </Button>
                  </div>
              )}
              </div>
            </Panel>
          }

          {tab === 'Relations' &&
          <>
              <Panel title="Genres" description="Pick up to four. These drive genre pages and recommendations.">
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => {
                  const active = form.genres.includes(g.name);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                      set(
                        'genres',
                        active ? form.genres.filter((x) => x !== g.name) : [...form.genres, g.name]
                      )
                      }
                      className={cn(
                        'inline-flex h-9 items-center rounded-full border px-3.5 text-sm transition-colors duration-150 ease-premium',
                        active ?
                        'border-brand-red bg-brand-red text-white' :
                        'border-line text-mist-bright hover:text-white'
                      )}>
                      
                        {g.name}
                      </button>);

                })}
                </div>
              </Panel>
              <Panel title="Cast" description="Actor and character, in billing order.">
                <ul className="space-y-2">
                  {(existing?.cast ?? []).map((c) =>
                <li
                  key={c.name}
                  className="flex items-center justify-between rounded-lg border border-line-soft bg-ink-950 px-4 py-2.5">
                  
                      <span className="text-sm text-white">{c.name}</span>
                      <span className="text-sm text-mist">{c.character}</span>
                    </li>
                )}
                </ul>
                <Button variant="secondary" size="sm" className="mt-3">
                  Add cast member
                </Button>
              </Panel>
              <Panel title="Related dramas" description="Shown in the “You may also like” rail.">
                <p className="text-sm text-mist">
                  Auto-matched on shared genre and country. Add manual overrides below.
                </p>
                <Button variant="secondary" size="sm" className="mt-3">
                  Add related drama
                </Button>
              </Panel>
            </>
          }

          {tab === 'SEO' &&
          <Panel title="Search & social" description="Leave blank to fall back to the title and synopsis.">
              <div className="space-y-4">
                <Field
                label="SEO title"
                htmlFor="seo-title"
                hint={`${form.seoTitle.length}/60 characters recommended.`}>
                
                  <input
                  id="seo-title"
                  value={form.seoTitle}
                  onChange={(e) => set('seoTitle', e.target.value)}
                  className={inputClass} />
                
                </Field>
                <Field
                label="Meta description"
                htmlFor="seo-desc"
                hint={`${form.seoDescription.length}/155 characters recommended.`}>
                
                  <textarea
                  id="seo-desc"
                  rows={3}
                  value={form.seoDescription}
                  onChange={(e) => set('seoDescription', e.target.value)}
                  className={textareaClass} />
                
                </Field>
                <Field label="Canonical URL" htmlFor="canonical" hint="Only change this for duplicates.">
                  <input
                  id="canonical"
                  value={form.canonicalUrl}
                  onChange={(e) => set('canonicalUrl', e.target.value)}
                  className={inputClass} />
                
                </Field>
                <div className="rounded-lg border border-line-soft bg-ink-950 p-4">
                  <p className="text-xs uppercase tracking-wider text-mist-dim">Google preview</p>
                  <p className="mt-2 truncate text-sm text-brand-blue">
                    {form.canonicalUrl || `${site.url}/drama/${form.slug || 'your-slug'}/`}
                  </p>
                  <p className="truncate text-base text-white">
                    {form.seoTitle || form.title || 'Drama title'}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-mist">
                    {form.seoDescription || form.synopsis || 'Add a meta description.'}
                  </p>
                </div>
              </div>
            </Panel>
          }
        </div>

        <aside className="space-y-5">
          <Panel title="Publishing">
            <div className="space-y-4">
              <Field label="Schedule publication" htmlFor="publish-at" hint="Leave empty to publish now.">
                <input
                  id="publish-at"
                  type="datetime-local"
                  value={form.publishAt}
                  onChange={(e) => set('publishAt', e.target.value)}
                  className={inputClass} />
                
              </Field>
              {(
              [
              ['featured', 'Featured', 'Appears in the homepage hero spotlight.'],
              ['trending', 'Trending', 'Adds the Trending badge and the Trending rail.']] as
              const).
              map(([key, label, hint]) =>
              <label key={key} className="flex items-start gap-3">
                  <input
                  type="checkbox"
                  checked={form[key] as boolean}
                  onChange={(e) => set(key, e.target.checked as never)}
                  className="mt-0.5 h-4 w-4 rounded border-line bg-ink-950" />
                
                  <span>
                    <span className="block text-sm font-medium text-white">{label}</span>
                    <span className="block text-xs text-mist-dim">{hint}</span>
                  </span>
                </label>
              )}
              <Button className="w-full">Publish drama</Button>
              <Button variant="secondary" className="w-full">
                Save as draft
              </Button>
            </div>
          </Panel>

          <Panel title="Checklist">
            <ul className="space-y-2 text-sm">
              {[
              ['Title and slug', Boolean(form.title && form.slug)],
              ['Synopsis', form.synopsis.length > 60],
              ['At least one genre', form.genres.length > 0],
              ['Poster image', Boolean(existing?.poster)],
              ['Meta description', form.seoDescription.length > 40]].
              map(([label, done]) =>
              <li key={label as string} className="flex items-center gap-2">
                  <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    done ? 'bg-emerald-400' : 'bg-ink-700 ring-1 ring-line'
                  )}
                  aria-hidden="true" />
                
                  <span className={done ? 'text-mist' : 'text-white'}>{label}</span>
                </li>
              )}
            </ul>
          </Panel>
        </aside>
      </div>
    </>);

}