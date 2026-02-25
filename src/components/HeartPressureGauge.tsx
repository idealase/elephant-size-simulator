interface Props {
  pressure: number;
}

export function HeartPressureGauge({ pressure }: Props) {
  const maxDisplay = 1000;
  const pct = Math.min(pressure / maxDisplay, 1) * 100;
  const color = pressure < 250 ? 'var(--success)' : pressure < 400 ? 'var(--warning)' : 'var(--danger)';

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2>Heart Pressure</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: 120, marginBottom: 8 }}>
        <div style={{ width: 40, height: 120, background: 'rgba(255,255,255,0.05)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', bottom: 0, width: '100%',
            height: `${pct}%`,
            background: color,
            borderRadius: '0 0 4px 4px',
            transition: 'height 0.3s ease',
          }} />
          {/* Zone markers */}
          <div style={{ position: 'absolute', bottom: `${(250 / maxDisplay) * 100}%`, width: '100%', borderTop: '1px dashed rgba(255,255,255,0.3)' }} />
          <div style={{ position: 'absolute', bottom: `${(400 / maxDisplay) * 100}%`, width: '100%', borderTop: '1px dashed rgba(255,255,255,0.3)' }} />
        </div>
        <div style={{ marginLeft: 8, fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 120 }}>
          <span>{maxDisplay}</span>
          <span>400</span>
          <span>250</span>
          <span>0</span>
        </div>
      </div>
      <div style={{ fontSize: '1.5rem', fontWeight: 700, color }}>
        {Math.round(pressure)} mmHg
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
        Normal: 180 mmHg
      </div>
    </div>
  );
}
