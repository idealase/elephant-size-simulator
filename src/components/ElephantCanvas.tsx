import { useRef, useEffect } from 'react';
import type { SimOutputs } from '../sim';

interface Props {
  outputs: SimOutputs;
}

export function ElephantCanvas({ outputs }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const health = outputs.viabilityIndex;
    const hue = Math.max(0, Math.min(120, (health / 100) * 120));
    const bodyColor = `hsl(${hue}, 40%, 35%)`;
    const legColor = `hsl(${hue}, 35%, 28%)`;
    const droop = Math.max(0, (100 - health) / 100) * 20;

    // Body
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(w / 2, 130, 80, 55, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.ellipse(w / 2 - 85, 110 + droop * 0.3, 35, 30, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Trunk
    ctx.strokeStyle = bodyColor;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(w / 2 - 110, 120 + droop * 0.3);
    ctx.quadraticCurveTo(w / 2 - 130, 160 + droop, w / 2 - 115, 200 + droop);
    ctx.stroke();

    // Ear
    ctx.fillStyle = `hsl(${hue}, 35%, 30%)`;
    ctx.beginPath();
    ctx.ellipse(w / 2 - 65, 100 + droop * 0.2, 25, 35, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Eye
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(w / 2 - 75, 102 + droop * 0.3, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(w / 2 - 75, 102 + droop * 0.3, 2, 0, Math.PI * 2);
    ctx.fill();

    // Tusk
    ctx.strokeStyle = '#d4d4d8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 95, 125 + droop * 0.3);
    ctx.quadraticCurveTo(w / 2 - 110, 140, w / 2 - 100, 155 + droop * 0.5);
    ctx.stroke();

    // Tail
    ctx.strokeStyle = bodyColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w / 2 + 78, 115);
    ctx.quadraticCurveTo(w / 2 + 100, 105, w / 2 + 105, 120);
    ctx.stroke();

    // Legs (4)
    ctx.fillStyle = legColor;
    const legW = 18;
    const legH = 60 + droop;
    const legs = [w / 2 - 55, w / 2 - 25, w / 2 + 20, w / 2 + 50];
    for (const lx of legs) {
      ctx.fillRect(lx, 160, legW, legH);
    }

    // Heat overlay (thermoregulation)
    if (outputs.thermoHealth < 60) {
      const intensity = Math.max(0, (60 - outputs.thermoHealth) / 60) * 0.4;
      ctx.fillStyle = `rgba(239, 68, 68, ${intensity})`;
      ctx.beginPath();
      ctx.ellipse(w / 2, 130, 80, 55, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Scale text
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${outputs.scaleFactor.toFixed(1)}× scale  |  ${Math.round(outputs.mass).toLocaleString()} kg`, w / 2, h - 10);
  }, [outputs]);

  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'center' }}>
      <canvas ref={canvasRef} width={350} height={260} />
    </div>
  );
}
