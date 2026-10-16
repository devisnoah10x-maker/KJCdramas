import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { dramas } from '../../data/dramas';
import { countries, countryById } from '../../data/taxonomy';
import {
  AdminPageHeader,
  StatePill,
  Table,
  Toolbar,
  inputClass } from
'../../components/admin/AdminUI';
import { Button, ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { compactNumber, formatDate } from '../../utils/format';

export function DramasAdmin() {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('all');
  const [state, setState] = useState('all');
  const [selected, setSelected] = useState<string[]>([]);
  const [confirming, setConfirming] = useState<string | null>(null);

  const rows = useMemo(
    () =>
    dramas.filter(
      (d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) && (
      country === 'all' || d.country === country) && (
      state === 'all' || d.state === state)
    ),
    [query, country, state]
  );

  const allSelected = rows.length > 0 && selected.length === rows.length;

  return (
    <>
      <AdminPageHeader
        title="Dramas & Movies"
        description="Create, edit and schedule every title in the library."
        actions={
        <ButtonLink to="/admin/dramas/new" size="sm">
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            Add drama
          </ButtonLink>
        } />
      

      <Toolbar>
        <div className="min-w-[14rem] flex-1">
          <label htmlFor="drama-search" className="sr-only">
            Search dramas
          </label>
          <input
            id="drama-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title…"
            className={inputClass} />
          
        </div>
        <label htmlFor="filter-country" className="sr-only">
          Filter by country
        </label>
        <select
          id="filter-country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="h-10 rounded-lg border border-line bg-ink-950 px-3 text-sm text-white focus:border-brand-blue focus:outline-none">
          
          <option value="all">All countries</option>
          {countries.map((c) =>
          <option key={c.id} value={c.id}>
              {c.label}
            </option>
          )}
        </select>
        <label htmlFor="filter-state" className="sr-only">
          Filter by state
        </label>
        <select
          id="filter-state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="h-10 rounded-lg border border-line bg-ink-950 px-3 text-sm text-white focus:border-brand-blue focus:outline-none">
          
          <option value="all">All states</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>

        {selected.length > 0 &&
        <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-mist">{selected.length} selected</span>
            <Button size="sm" variant="secondary">
              Publish
            </Button>
            <Button size="sm" variant="secondary">
              Unpublish
            </Button>
          </div>
        }
      </Toolbar>

      {rows.length === 0 ?
      <EmptyState title="No titles match." description="Clear a filter or try a different search term." /> :

      <Table head={['', 'Title', 'Country', 'Year', 'State', 'Views', 'Updated', 'Actions']}>
          <tr className="bg-ink-900/60">
            <td className="px-4 py-2">
              <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => setSelected(e.target.checked ? rows.map((r) => r.id) : [])}
              aria-label="Select all rows"
              className="h-4 w-4 rounded border-line bg-ink-950" />
            
            </td>
            <td colSpan={7} className="px-4 py-2 text-xs text-mist-dim">
              Select all {rows.length} results
            </td>
          </tr>
          {rows.map((d) =>
        <tr key={d.id} className="align-middle">
              <td className="px-4 py-3">
                <input
              type="checkbox"
              checked={selected.includes(d.id)}
              onChange={(e) =>
              setSelected((prev) =>
              e.target.checked ? [...prev, d.id] : prev.filter((x) => x !== d.id)
              )
              }
              aria-label={`Select ${d.title}`}
              className="h-4 w-4 rounded border-line bg-ink-950" />
            
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                src={d.poster}
                alt=""
                aria-hidden="true"
                width={40}
                height={60}
                loading="lazy"
                className="h-12 w-8 rounded object-cover" />
              
                  <div className="min-w-0">
                    <Link
                  to={`/admin/dramas/${d.id}`}
                  className="block truncate text-sm font-medium text-white hover:text-brand-blush">
                  
                      {d.title}
                    </Link>
                    <span className="text-xs text-mist-dim">/drama/{d.slug}</span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-mist">{countryById(d.country)?.label}</td>
              <td className="px-4 py-3 text-sm text-mist">{d.year}</td>
              <td className="px-4 py-3">
                <StatePill state={d.state} />
              </td>
              <td className="px-4 py-3 text-sm text-mist">{compactNumber(d.views)}</td>
              <td className="px-4 py-3 text-sm text-mist">{formatDate(d.updatedAt)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <Link
                to={`/admin/dramas/${d.id}`}
                aria-label={`Edit ${d.title}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-bright hover:bg-ink-850 hover:text-white">
                
                    <PencilIcon className="h-4 w-4" />
                  </Link>
                  <button
                type="button"
                onClick={() => setConfirming(d.id)}
                aria-label={`Delete ${d.title}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-mist-bright hover:bg-ink-850 hover:text-brand-red">
                
                    <Trash2Icon className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
        )}
        </Table>
      }

      {confirming &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
          type="button"
          aria-label="Cancel"
          onClick={() => setConfirming(null)}
          className="absolute inset-0 bg-ink-950/80" />
        
          <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
          className="relative w-full max-w-md rounded-card border border-line bg-ink-900 p-6">
          
            <h2 id="delete-title" className="font-display text-lg font-bold text-white">
              Delete this title?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              “{dramas.find((d) => d.id === confirming)?.title}” and its page will be removed. Existing links
              will return a 404 unless you add a redirect in Settings.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setConfirming(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setConfirming(null)}>
                Delete permanently
              </Button>
            </div>
          </div>
        </div>
      }
    </>);

}