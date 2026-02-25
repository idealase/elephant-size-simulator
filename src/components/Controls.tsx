import { SPECIES_PRESETS } from '../sim';
import type { SimParams } from '../sim';

interface Props {
  params: SimParams;
  onChange: (p: SimParams) => void;
}

export function Controls({ params, onChange }: Props) {
  const set = (patch: Partial<SimParams>) => onChange({ ...params, ...patch });

  return (
    <div className="card">
      <h2>Controls</h2>

      <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Species Preset
        <select
          value={params.baselineHeight}
          onChange={e => {
            const bh = Number(e.target.value);
            const preset = SPECIES_PRESETS.find(p => p.baselineHeight === bh);
            if (preset) set({ baselineHeight: bh, shoulderHeight: bh, baseMass: preset.baseMass });
          }}
          style={{ display: 'block', width: '100%', marginTop: 4, padding: '0.4rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4 }}
        >
          {SPECIES_PRESETS.map(p => (
            <option key={p.name} value={p.baselineHeight}>{p.name} ({p.baseMass}kg)</option>
          ))}
        </select>
      </label>

      <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Shoulder Height: {params.shoulderHeight.toFixed(1)}m
        <input type="range" min={2} max={20} step={0.1} value={params.shoulderHeight}
          onChange={e => set({ shoulderHeight: Number(e.target.value) })}
          style={{ display: 'block', width: '100%', marginTop: 4 }} />
      </label>

      <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Temperature: {params.temperature.toFixed(0)}°C
        <input type="range" min={10} max={45} step={1} value={params.temperature}
          onChange={e => set({ temperature: Number(e.target.value) })}
          style={{ display: 'block', width: '100%', marginTop: 4 }} />
      </label>

      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Gravity: {params.gravity.toFixed(2)}g
        <input type="range" min={0.1} max={2.0} step={0.01} value={params.gravity}
          onChange={e => set({ gravity: Number(e.target.value) })}
          style={{ display: 'block', width: '100%', marginTop: 4 }} />
      </label>
    </div>
  );
}
