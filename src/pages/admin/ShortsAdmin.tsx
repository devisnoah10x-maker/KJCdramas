import { useState } from 'react';
import { PlusIcon, UploadIcon } from 'lucide-react';
import { shorts } from '../../data/shorts';
import { dramas } from '../../data/dramas';
import { countries, countryById, genres } from '../../data/taxonomy';
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

export function ShortsAdmin() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <AdminPageHeader
        title="Shorts"
        description="Four steps: upload media, pick the drama, add a title, publish."
        actions={
        <Button size="sm" onClick={() => setShowForm((v) => !v)}>
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            Add short
          </Button>
        } />
      

      {showForm &&
      <Panel title="Add a short" description="Everything else is optional." className="mb-6">
          <div className="grid gap-5 lg:grid-cols-[16rem_1fr]">
            <div>
              <div className="flex aspect-[9/16] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line bg-ink-950 p-4 text-center">
                <UploadIcon className="h-6 w-6 text-mist" aria-hidden="true" />
                <p className="text-sm text-white">Upload GIF or MP4</p>
                <p className="text-xs text-mist-dim">
                  Vertical 9:16 preferred. GIFs over 2 MB are auto-converted to muted MP4.
                </p>
                <Button variant="secondary" size="sm" className="mt-1">
                  Choose file
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Clip title" htmlFor="short-title" className="sm:col-span-2">
                <input id="short-title" className={inputClass} placeholder="e.g. The umbrella scene" />
              </Field>
              <Field label="Related drama" htmlFor="short-drama" hint="Links the clip back to the full page.">
                <select id="short-drama" className={inputClass}>
                  {dramas.map((d) =>
                <option key={d.id} value={d.slug}>
                      {d.title}
                    </option>
                )}
                </select>
              </Field>
              <Field label="Country" htmlFor="short-country">
                <select id="short-country" className={inputClass}>
                  {countries.map((c) =>
                <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                )}
                </select>
              </Field>
              <Field label="Genre" htmlFor="short-genre">
                <select id="short-genre" className={inputClass}>
                  {genres.map((g) =>
                <option key={g.id}>{g.name}</option>
                )}
                </select>
              </Field>
              <Field label="Schedule" htmlFor="short-schedule" hint="Leave empty to publish immediately.">
                <input id="short-schedule" type="datetime-local" className={inputClass} />
              </Field>
              <Field label="Description" htmlFor="short-desc" className="sm:col-span-2">
                <textarea id="short-desc" rows={3} className={textareaClass} />
              </Field>
              <div className="flex gap-2 sm:col-span-2">
                <Button size="sm">Publish short</Button>
                <Button size="sm" variant="secondary">
                  Save draft
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Panel>
      }

      <Table head={['Clip', 'Related drama', 'Country', 'Duration', 'State', 'Views', 'Added']}>
        {shorts.map((s) =>
        <tr key={s.id}>
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <img
                src={s.thumbnail}
                alt=""
                aria-hidden="true"
                width={40}
                height={64}
                loading="lazy"
                className="h-12 w-8 rounded object-cover" />
              
                <span className="text-sm font-medium text-white">{s.title}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-sm text-mist">
              {dramas.find((d) => d.slug === s.relatedDrama)?.title ?? '—'}
            </td>
            <td className="px-4 py-3 text-sm text-mist">{countryById(s.country)?.label}</td>
            <td className="px-4 py-3 text-sm text-mist">{s.duration}</td>
            <td className="px-4 py-3">
              <StatePill state={s.state} />
            </td>
            <td className="px-4 py-3 text-sm text-mist">{compactNumber(s.views)}</td>
            <td className="px-4 py-3 text-sm text-mist">{formatDate(s.createdAt)}</td>
          </tr>
        )}
      </Table>
    </>);

}