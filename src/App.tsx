import { useState, useMemo, useCallback } from 'react';
import { simulate, DEFAULT_PARAMS } from './sim';
import type { SimParams } from './sim';
import { Controls } from './components/Controls';
import { ElephantCanvas } from './components/ElephantCanvas';
import { ViabilityGauge } from './components/ViabilityGauge';
import { StressChart } from './components/StressChart';
import { FailureReport } from './components/FailureReport';
import { EatingIndicator } from './components/EatingIndicator';
import { HeartPressureGauge } from './components/HeartPressureGauge';
import { FunFactsPanel } from './components/FunFactsPanel';
import './App.css';

export default function App() {
  const [params, setParams] = useState<SimParams>({ ...DEFAULT_PARAMS });
  const outputs = useMemo(() => simulate(params), [params]);

  const handleReset = useCallback(() => {
    setParams({ ...DEFAULT_PARAMS });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Elephant Size Simulator</h1>
        <button onClick={handleReset} style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 4, padding: '0.4rem 1rem', cursor: 'pointer', fontSize: '0.85rem' }}>
          Reset
        </button>
      </header>

      <div className="main-layout">
        <aside className="panel-left">
          <Controls params={params} onChange={setParams} />
        </aside>

        <section className="panel-centre">
          <ElephantCanvas outputs={outputs} />
          <ViabilityGauge value={outputs.viabilityIndex} />
        </section>

        <aside className="panel-right">
          <StressChart params={params} />
          <FailureReport outputs={outputs} />
        </aside>
      </div>

      <div className="panel-bottom">
        <EatingIndicator hours={outputs.eatingHoursPerDay} />
        <HeartPressureGauge pressure={outputs.heartPressureMmHg} />
        <FunFactsPanel scaleFactor={outputs.scaleFactor} />
      </div>

      <footer className="app-footer">
        <p>
          Elephant Size Simulator &middot; Explore the square-cube law &middot;{' '}
          <a href="https://github.com/idealase/elephant-size-simulator" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
