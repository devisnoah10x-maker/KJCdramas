import { useState } from 'react';
import { InfoIcon } from 'lucide-react';
import { adSlots, type AdSlotConfig } from '../../data/site';
import { AdminPageHeader, Field, Panel, Table, inputClass } from '../../components/admin/AdminUI';
import { Button } from '../../components/ui/Button';
import { cn } from '../../utils/format';

function Toggle({
  checked,
  onChange,
  label




}: {checked: boolean;onChange: (v: boolean) => void;label: string;}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-6 w-11 rounded-full transition-colors duration-150 ease-premium',
        checked ? 'bg-brand-blue' : 'bg-ink-700'
      )}>
      
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-premium',
          checked ? 'translate-x-[1.375rem]' : 'translate-x-0.5'
        )} />
      
    </button>);

}

export function AdsAdmin() {
  const [slots, setSlots] = useState<AdSlotConfig[]>(adSlots);

  const update = (id: string, patch: Partial<AdSlotConfig>) =>
  setSlots((prev) => prev.map((s) => s.id === id ? { ...s, ...patch } : s));

  const activeCount = slots.filter((s) => s.active).length;

  return (
    <>
      <AdminPageHeader
        title="Advertisements"
        description="One place to turn placements on and off. Nothing here touches page templates."
        actions={<Button size="sm">Save changes</Button>} />
      

      <div className="mb-6 flex gap-3 rounded-card border border-brand-blue/30 bg-brand-blue/10 p-4">
        <InfoIcon className="h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-mist-bright">
          Ad network code is stored once in Settings and injected by the ad provider at runtime. Slots below
          only control <em>where</em> and <em>whether</em> a creative appears. Every slot reserves its height
          in advance, so enabling one never shifts the layout.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_20rem]">
        <Panel title="Placements" description={`${activeCount} of ${slots.length} placements active`}>
          <Table head={['Placement', 'Format', 'Desktop', 'Mobile', 'Reserved height', 'Active']}>
            {slots.map((slot) =>
            <tr key={slot.id}>
                <td className="px-4 py-3">
                  <span className="block text-sm font-medium text-white">{slot.label}</span>
                  <span className="text-xs text-mist-dim">{slot.id}</span>
                </td>
                <td className="px-4 py-3 text-sm capitalize text-mist">{slot.format}</td>
                <td className="px-4 py-3">
                  <Toggle
                  checked={slot.desktop}
                  onChange={(v) => update(slot.id, { desktop: v })}
                  label={`${slot.label} on desktop`} />
                
                </td>
                <td className="px-4 py-3">
                  <Toggle
                  checked={slot.mobile}
                  onChange={(v) => update(slot.id, { mobile: v })}
                  label={`${slot.label} on mobile`} />
                
                </td>
                <td className="px-4 py-3 text-sm text-mist">
                  {slot.height.mobile}px / {slot.height.desktop}px
                </td>
                <td className="px-4 py-3">
                  <Toggle
                  checked={slot.active}
                  onChange={(v) => update(slot.id, { active: v })}
                  label={`${slot.label} active`} />
                
                </td>
              </tr>
            )}
          </Table>
        </Panel>

        <aside className="space-y-5">
          <Panel title="Network configuration">
            <div className="space-y-4">
              <Field label="Ad network" htmlFor="network">
                <select id="network" className={inputClass}>
                  <option>Adsterra</option>
                  <option>None (ads disabled)</option>
                </select>
              </Field>
              <Field
                label="Publisher ID"
                htmlFor="pub-id"
                hint="Stored as a server-side environment variable, never exposed in page source.">
                
                <input id="pub-id" className={inputClass} placeholder="pub_••••••••" />
              </Field>
              <Field label="Frequency cap" htmlFor="cap" hint="Maximum ad units rendered per page view.">
                <select id="cap" className={inputClass} defaultValue="3">
                  <option value="2">2 (recommended on mobile)</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </Field>
            </div>
          </Panel>

          <Panel title="House rules">
            <ul className="space-y-2 text-sm leading-relaxed text-mist">
              <li>Never inside navigation or over a button.</li>
              <li>Always labelled “Advertisement”.</li>
              <li>Fewer units on mobile than desktop.</li>
              <li>No fake download or play buttons.</li>
            </ul>
          </Panel>
        </aside>
      </div>
    </>);

}