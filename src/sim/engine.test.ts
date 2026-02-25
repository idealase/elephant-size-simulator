/**
 * engine.test.ts — Unit tests for the elephant simulation core.
 */

import { describe, it, expect } from 'vitest';
import { simulate } from './engine';
import { DEFAULT_PARAMS, BONE_THRESHOLD, THERMO_THRESHOLD, CARDIOVASCULAR_THRESHOLD, METABOLIC_THRESHOLD } from './simDefaults';
import type { SimParams } from './types';

/** Helper: clone defaults with overrides */
function params(overrides: Partial<SimParams> = {}): SimParams {
  return { ...DEFAULT_PARAMS, ...overrides };
}

describe('simulate — capacities decrease as size increases', () => {
  const sizes = [3.3, 5, 8, 12, 16, 20];

  it('boneCapacity decreases with shoulder height', () => {
    const caps = sizes.map(h => simulate(params({ shoulderHeight: h })).boneCapacity);
    for (let i = 1; i < caps.length; i++) {
      expect(caps[i]).toBeLessThan(caps[i - 1]);
    }
  });

  it('thermoCapacity decreases with shoulder height', () => {
    const caps = sizes.map(h => simulate(params({ shoulderHeight: h })).thermoCapacity);
    for (let i = 1; i < caps.length; i++) {
      expect(caps[i]).toBeLessThan(caps[i - 1]);
    }
  });

  it('cardiovascularCapacity decreases with shoulder height', () => {
    const caps = sizes.map(h => simulate(params({ shoulderHeight: h })).cardiovascularCapacity);
    for (let i = 1; i < caps.length; i++) {
      expect(caps[i]).toBeLessThan(caps[i - 1]);
    }
  });

  it('metabolicCapacity decreases with shoulder height', () => {
    const caps = sizes.map(h => simulate(params({ shoulderHeight: h })).metabolicCapacity);
    for (let i = 1; i < caps.length; i++) {
      expect(caps[i]).toBeLessThan(caps[i - 1]);
    }
  });
});

describe('simulate — viability bounded [0, 100]', () => {
  it('viability is within [0, 100] for various sizes', () => {
    for (const h of [2, 3.3, 5, 8, 12, 20]) {
      const out = simulate(params({ shoulderHeight: h }));
      expect(out.viabilityIndex).toBeGreaterThanOrEqual(0);
      expect(out.viabilityIndex).toBeLessThanOrEqual(100);
    }
  });
});

describe('simulate — default params produce stable elephant', () => {
  it('all capacities exceed failure thresholds', () => {
    const out = simulate(DEFAULT_PARAMS);
    expect(out.boneCapacity).toBeGreaterThan(BONE_THRESHOLD);
    expect(out.thermoCapacity).toBeGreaterThan(THERMO_THRESHOLD);
    expect(out.cardiovascularCapacity).toBeGreaterThan(CARDIOVASCULAR_THRESHOLD);
    expect(out.metabolicCapacity).toBeGreaterThan(METABOLIC_THRESHOLD);
  });

  it('no active failures', () => {
    const out = simulate(DEFAULT_PARAMS);
    expect(out.activeFailures).toHaveLength(0);
    expect(out.failureMode).toBeNull();
  });
});

describe('simulate — very large elephant (20m) triggers failures', () => {
  it('triggers at least one failure', () => {
    const out = simulate(params({ shoulderHeight: 20 }));
    expect(out.activeFailures.length).toBeGreaterThan(0);
    expect(out.failureMode).not.toBeNull();
  });

  it('viability is very low', () => {
    const out = simulate(params({ shoulderHeight: 20 }));
    expect(out.viabilityIndex).toBeLessThan(25);
  });
});

describe('simulate — temperature effects', () => {
  it('higher temperature worsens thermoregulation', () => {
    const cool = simulate(params({ temperature: 15 }));
    const hot = simulate(params({ temperature: 40 }));
    expect(hot.thermoCapacity).toBeLessThan(cool.thermoCapacity);
  });
});

describe('simulate — gravity effects', () => {
  it('lower gravity improves bone and cardiovascular capacity', () => {
    const earth = simulate(params({ gravity: 1.0 }));
    const moon = simulate(params({ gravity: 0.16 }));
    expect(moon.boneCapacity).toBeGreaterThan(earth.boneCapacity);
    expect(moon.cardiovascularCapacity).toBeGreaterThan(earth.cardiovascularCapacity);
  });
});

describe('simulate — eating hours increase with size', () => {
  it('eating hours increase', () => {
    const hours = [3.3, 5, 8, 12].map(
      h => simulate(params({ shoulderHeight: h })).eatingHoursPerDay,
    );
    for (let i = 1; i < hours.length; i++) {
      expect(hours[i]).toBeGreaterThan(hours[i - 1]);
    }
  });
});

describe('simulate — heart pressure increases with size', () => {
  it('heart pressure increases', () => {
    const pressures = [3.3, 5, 8, 12].map(
      h => simulate(params({ shoulderHeight: h })).heartPressureMmHg,
    );
    for (let i = 1; i < pressures.length; i++) {
      expect(pressures[i]).toBeGreaterThan(pressures[i - 1]);
    }
  });
});

describe('simulate — golden-case snapshot for default params', () => {
  it('default params produce known outputs', () => {
    const out = simulate(DEFAULT_PARAMS);

    expect(out.scaleFactor).toBeCloseTo(1.0, 6);
    expect(out.mass).toBeCloseTo(6000, 1);
    expect(out.boneCapacity).toBeCloseTo(1.0, 6);
    expect(out.cardiovascularCapacity).toBeCloseTo(1.0, 6);
    expect(out.metabolicCapacity).toBeCloseTo(1.0, 6);
    expect(out.eatingHoursPerDay).toBeCloseTo(16, 1);
    expect(out.heartPressureMmHg).toBeCloseTo(180, 1);
    expect(out.activeFailures).toHaveLength(0);
    expect(out.failureMode).toBeNull();
  });
});
