import { useRef, useEffect } from 'react';
import { simulate } from '../sim';
import type { SimParams } from '../sim';
import { BONE_THRESHOLD, THERMO_THRESHOLD, CARDIOVASCULAR_THRESHOLD, METABOLIC_THRESHOLD } from '../sim/simDefaults';

interface Props {
  params: SimParams;
}

const COLORS = {
  bone: '#ef4444',
  thermo: '#f97316',
  cardiovascular: '#eab308',
  metabolic: '#6366f1',
};

export function StressChart({ params }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const pad = { top: 10, right: 10, bottom: 25, left: 35 };
    const pw = w - pad.left - pad.right;
    const ph = h - pad.top - pad.bottom;

    ctx.clearRect(0, 0, w, h);

    const sizeMin = 2;
    const sizeMax = 20;
    const n = 100;
    const points: { size: number; bone: number; thermo: number; cardio: number; meta: number }[] = [];

    for (let i = 0; i < n; i++) {
      const size = sizeMin + (sizeMax - sizeMin) * (i / (n - 1));
      const out = simulate({ ...params, shoulderHeight: size });
      points.push({ size, bone: out.boneCapacity, thermo: out.thermoCapacity, cardio: out.cardiovascularCapacity, meta: out.metabolicCapacity });
    }

    const xScale = (size: number) => pad.left + ((size - sizeMin) / (sizeMax - sizeMin)) * pw;
    const yScale = (v: number) => pad.top + ph - Math.min(1, Math.max(0, v)) * ph;

    // Threshold lines
    for (const [, t] of Object.entries({ bone: { val: BONE_THRESHOLD, color: COLORS.bone }, thermo: { val: THERMO_THRESHOLD, color: COLORS.thermo }, cardio: { val: CARDIOVASCULAR_THRESHOLD, color: COLORS.cardiovascular }, meta: { val: METABOLIC_THRESHOLD, color: COLORS.metabolic } })) {
      ctx.beginPath();
      ctx.moveTo(pad.left, yScale(t.val));
      ctx.lineTo(w - pad.right, yScale(t.val));
      ctx.strokeStyle = t.color;
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    const drawLine = (key: 'bone' | 'thermo' | 'cardio' | 'meta', color: string) => {
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const x = xScale(points[i].size);
        const y = yScale(points[i][key]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    drawLine('bone', COLORS.bone);
    drawLine('thermo', COLORS.thermo);
    drawLine('cardio', COLORS.cardiovascular);
    drawLine('meta', COLORS.metabolic);

    // Current size marker
    const cx = xScale(params.shoulderHeight);
    ctx.beginPath();
    ctx.moveTo(cx, pad.top);
    ctx.lineTo(cx, pad.top + ph);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Inter, system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('1.0', pad.left - 4, pad.top + 4);
    ctx.fillText('0', pad.left - 4, pad.top + ph + 4);
    ctx.textAlign = 'center';
    ctx.fillText('2m', xScale(sizeMin), h - 4);
    ctx.fillText('20m', xScale(sizeMax), h - 4);
  }, [params]);

  return (
    <div className="card">
      <h2>Capacity Proxies</h2>
      <canvas ref={canvasRef} width={300} height={180} style={{ width: '100%' }} />
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.7rem', marginTop: 4 }}>
        <span style={{ color: COLORS.bone }}>Bone</span>
        <span style={{ color: COLORS.thermo }}>Thermo</span>
        <span style={{ color: COLORS.cardiovascular }}>Cardiovascular</span>
        <span style={{ color: COLORS.metabolic }}>Metabolic</span>
      </div>
    </div>
  );
}
