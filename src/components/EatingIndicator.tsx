import { useRef, useEffect } from 'react';

interface Props {
  hours: number;
}

export function EatingIndicator({ hours }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const impossible = hours > 24;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = 50;

    ctx.clearRect(0, 0, w, h);

    // 24-hour clock background
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Eating hours filled
    const fraction = Math.min(hours / 24, 1);
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + fraction * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r - 2, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = impossible ? 'rgba(239, 68, 68, 0.4)' : 'rgba(234, 179, 8, 0.3)';
    ctx.fill();

    // Hour markers
    for (let i = 0; i < 24; i++) {
      const angle = -Math.PI / 2 + (i / 24) * Math.PI * 2;
      const inner = i % 6 === 0 ? r - 8 : r - 4;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = i % 6 === 0 ? 2 : 1;
      ctx.stroke();
    }
  }, [hours, impossible]);

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2>Eating Hours / Day</h2>
      <canvas ref={canvasRef} width={120} height={120} style={{ margin: '0 auto', display: 'block' }} />
      <div style={{ marginTop: 8, fontSize: '1.5rem', fontWeight: 700, color: impossible ? 'var(--danger)' : 'var(--warning)' }}>
        {impossible ? 'IMPOSSIBLE' : `${hours.toFixed(1)}h`}
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
        Normal: 16h/day | Your elephant: {hours.toFixed(1)}h/day
      </div>
    </div>
  );
}
