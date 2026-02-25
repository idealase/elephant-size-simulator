/**
 * engine.ts — Pure simulation engine.
 *
 * Given a SimParams object, compute all derived outputs including mass,
 * capacity proxies, health scores, viability index, eating hours, heart
 * pressure, and failure determination.
 *
 * This module has ZERO runtime dependencies on React, DOM, or any UI library.
 * It is fully deterministic: same inputs -> same outputs.
 */

import type { SimOutputs, SimParams } from './types';
import {
  BASELINE_EATING_HOURS,
  BASELINE_HEART_PRESSURE,
  HEALTH_PROXY_MIN,
  HEALTH_PROXY_MAX,
  VIABILITY_WEIGHTS,
} from './simDefaults';
import { detectFailures } from './failureModes';

/** Clamp a value between min and max */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Convert a capacity proxy to a 0-100 health score */
function proxyToHealth(proxy: number): number {
  return 100 * clamp((proxy - HEALTH_PROXY_MIN) / (HEALTH_PROXY_MAX - HEALTH_PROXY_MIN), 0, 1);
}

/**
 * Run one tick of the simulation.
 *
 * @param p - All simulation parameters.
 * @returns Fully computed outputs including capacities, health, and failures.
 */
export function simulate(p: SimParams): SimOutputs {
  const { pow, max } = Math;

  // ── 1. Scale factor and mass ──────────────────────────────────────────────
  const s = p.shoulderHeight / p.baselineHeight;
  const mass = p.baseMass * pow(s, 3);

  // ── 2. Capacity proxies ───────────────────────────────────────────────────

  // Bone compression: allometric thickening helps (exponent 0.8 < 1.0)
  // but gravity makes it worse
  const boneCapacity = 1 / (pow(s, 0.8) * p.gravity);

  // Thermoregulation: surface-to-volume ratio degrades with size,
  // higher ambient temperature makes heat dumping harder
  const tempFactor = 1 + 0.03 * (p.temperature - 25);
  const thermoCapacity = 1 / (pow(s, 0.3) * tempFactor);

  // Cardiovascular: hydrostatic head to brain scales linearly with height
  const cardiovascularCapacity = 1 / (s * p.gravity);

  // Metabolic sustenance: can't eat fast enough (mild scaling)
  const metabolicCapacity = 1 / pow(s, 0.25);

  // ── 3. Health scores (0-100) ──────────────────────────────────────────────
  const boneHealth = proxyToHealth(boneCapacity);
  const thermoHealth = proxyToHealth(thermoCapacity);
  const cardiovascularHealth = proxyToHealth(cardiovascularCapacity);
  const metabolicHealth = proxyToHealth(metabolicCapacity);

  // ── 4. Viability index — weighted geometric mean ──────────────────────────
  // Avoid log(0) by clamping health values to a tiny positive floor
  const floor = 0.001;
  const bH = max(boneHealth, floor);
  const tH = max(thermoHealth, floor);
  const cH = max(cardiovascularHealth, floor);
  const mH = max(metabolicHealth, floor);

  const viabilityIndex = clamp(
    pow(bH, VIABILITY_WEIGHTS.bone) *
      pow(tH, VIABILITY_WEIGHTS.thermo) *
      pow(cH, VIABILITY_WEIGHTS.cardiovascular) *
      pow(mH, VIABILITY_WEIGHTS.metabolic),
    0,
    100,
  );

  // ── 5. Elephant-specific outputs ──────────────────────────────────────────
  const eatingHoursPerDay = BASELINE_EATING_HOURS * pow(s, 0.25);
  const heartPressureMmHg = BASELINE_HEART_PRESSURE * s * p.gravity;

  // ── 6. Failure detection ──────────────────────────────────────────────────
  const activeFailures = detectFailures(
    boneCapacity,
    thermoCapacity,
    cardiovascularCapacity,
    metabolicCapacity,
  );

  const failureMode = activeFailures.length > 0 ? activeFailures[0] : null;

  return {
    scaleFactor: s,
    mass,
    boneCapacity,
    thermoCapacity,
    cardiovascularCapacity,
    metabolicCapacity,
    boneHealth,
    thermoHealth,
    cardiovascularHealth,
    metabolicHealth,
    viabilityIndex,
    eatingHoursPerDay,
    heartPressureMmHg,
    activeFailures,
    failureMode,
  };
}
