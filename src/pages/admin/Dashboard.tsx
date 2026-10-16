import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { dramas, latestDramas, mostViewed } from '../../data/dramas';
import { shorts } from '../../data/shorts';
import { articles } from '../../data/articles';
import { countries, genres } from '../../data/taxonomy';
import { AdminPageHeader, Panel, StatCard, StatePill, Table } from '../../components/admin/AdminUI';
import { ButtonLink } from '../../components/ui/Button';
import { compactNumber, formatDate } from '../../utils/format';

const traffic = [
{ day: 'Mon', value: 62 },
{ day: 'Tue', value: 71 },
{ day: 'Wed', value: 58 },
{ day: 'Thu', value: 83 },
{ day: 'Fri', value: 96 },
{ day: 'Sat', value: 100 },
{ day: 'Sun', value: 88 }];


export function Dashboard() {
  const totalViews =
  dramas.reduce((s, d) => s + d.views, 0) +
  shorts.reduce((s, d) => s + d.views, 0) +
  articles.reduce((s, a) => s + a.views, 0);

  const countryShare = countries.map((c) => ({
    ...c,
    views: dramas.filter((d) => d.country === c.id).reduce((s, d) => s + d.views, 0)
  }));
  const maxCountry = Math.max(...countryShare.map((c) => c.views));

  const topGenres = genres.
  map((g) => ({
    ...g,
    views: dramas.
    filter((d) => d.genres.some((dg) => dg.toLowerCase() === g.name.toLowerCase())).
    reduce((s, d) => s + d.views, 0)
  })).
  sort((a, b) => b.views - a.views).
  slice(0, 5);

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Everything published, everything performing — at a glance."
        actions={
        <>
            <ButtonLink to="/admin/dramas/new" size="sm">
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
              Add drama
            </ButtonLink>
            <ButtonLink to="/admin/shorts" size="sm" variant="secondary">
              Add short
            </ButtonLink>
          </>
        } />
      

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total views (30d)" value={compactNumber(totalViews)} delta="+18.4% vs last month" emphasis />
        <StatCard label="Dramas & movies" value={String(dramas.length)} delta={`${dramas.filter((d) => d.state === 'published').length} published`} />
        <StatCard label="Shorts" value={String(shorts.length)} delta="4 added this week" />
        <StatCard label="Articles" value={String(articles.length)} delta="1 scheduled" />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Traffic overview" description="Sessions per day, last 7 days">
          <div className="flex h-48 items-end gap-3" role="img" aria-label="Sessions per day for the last seven days">
            {traffic.map((d) =>
            <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div
                className="w-full rounded-t bg-brand-blue/70"
                style={{ height: `${d.value}%` }}
                aria-hidden="true" />
              
                <span className="text-xs text-mist-dim">{d.day}</span>
              </div>
            )}
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title="Popular countries">
            <ul className="space-y-3">
              {countryShare.map((c) =>
              <li key={c.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-white">{c.label}</span>
                    <span className="text-mist-dim">{compactNumber(c.views)}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-800">
                    <div
                    className="h-full rounded-full bg-brand-red"
                    style={{ width: `${c.views / maxCountry * 100}%` }} />
                  
                  </div>
                </li>
              )}
            </ul>
          </Panel>

          <Panel title="Popular genres">
            <ul className="space-y-2">
              {topGenres.map((g) =>
              <li key={g.id} className="flex items-center justify-between text-sm">
                  <Link to={`/genres/${g.slug}`} className="text-mist-bright hover:text-white">
                    {g.name}
                  </Link>
                  <span className="text-mist-dim">{compactNumber(g.views)}</span>
                </li>
              )}
            </ul>
          </Panel>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <Panel title="Top content" description="Most viewed pages this month">
          <Table head={['Title', 'Type', 'Views']}>
            {mostViewed.slice(0, 6).map((d) =>
            <tr key={d.id}>
                <td className="px-4 py-3 text-sm text-white">
                  <Link to={`/drama/${d.slug}`} className="hover:text-brand-blush">
                    {d.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm capitalize text-mist">{d.type}</td>
                <td className="px-4 py-3 text-sm text-mist">{compactNumber(d.views)}</td>
              </tr>
            )}
          </Table>
        </Panel>

        <Panel title="Recent content" description="Latest edits across the library">
          <Table head={['Title', 'State', 'Updated']}>
            {latestDramas.slice(0, 6).map((d) =>
            <tr key={d.id}>
                <td className="px-4 py-3 text-sm text-white">
                  <Link to={`/admin/dramas/${d.id}`} className="hover:text-brand-blush">
                    {d.title}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <StatePill state={d.state} />
                </td>
                <td className="px-4 py-3 text-sm text-mist">{formatDate(d.updatedAt)}</td>
              </tr>
            )}
          </Table>
        </Panel>
      </div>
    </>);

}