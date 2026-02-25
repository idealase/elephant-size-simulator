/**
 * simDefaults.ts — All named constants and default parameter values for the
 * Elephant Size Simulator.
 *
 * Design rationale:
 * - A real African bush elephant stands ~3.3 m at the shoulder and weighs
 *   ~6000 kg. We start with these defaults so the sim begins in a stable
 *   state (all capacities well above failure thresholds) and the user can
 *   scale the elephant until something breaks.
 * - Every constant is named, typed, and documented here. No magic numbers.
 */

import type { SimParams, SpeciesPreset } from './types';

// ─── Species presets ─────────────────────────────────────────────────────────

export const SPECIES_PRESETS: SpeciesPreset[] = [
  { name: 'African Bush Elephant', baselineHeight: 3.3, baseMass: 6000 },
  { name: 'Asian Elephant', baselineHeight: 2.8, baseMass: 4000 },
  { name: 'Forest Elephant', baselineHeight: 2.4, baseMass: 2700 },
];

// ─── Failure thresholds ─────────────────────────────────────────────────────

/** Bone compression capacity threshold — below this is catastrophic */
export const BONE_THRESHOLD = 0.30;

/** Thermoregulation capacity threshold — below this is hard failure */
export const THERMO_THRESHOLD = 0.35;

/** Cardiovascular capacity threshold — below this is hard failure */
export const CARDIOVASCULAR_THRESHOLD = 0.35;

/** Metabolic sustenance capacity threshold — below this is hard failure */
export const METABOLIC_THRESHOLD = 0.35;

// ─── Baseline elephant physiology ───────────────────────────────────────────

/** Baseline eating hours per day for a normal elephant */
export const BASELINE_EATING_HOURS = 16;

/** Baseline systolic blood pressure in mmHg */
export const BASELINE_HEART_PRESSURE = 180;

// ─── Health conversion constants ────────────────────────────────────────────

/** Proxy value at which health = 0 */
export const HEALTH_PROXY_MIN = 0.1;

/** Proxy value at which health = 100 */
export const HEALTH_PROXY_MAX = 1.0;

// ─── Viability weights (must sum to 1.0) ────────────────────────────────────

export const VIABILITY_WEIGHTS = {
  bone: 0.30,
  thermo: 0.20,
  cardiovascular: 0.25,
  metabolic: 0.25,
} as const;

// ─── Default simulation parameters ─────────────────────────────────────────

export const DEFAULT_PARAMS: SimParams = {
  shoulderHeight: 3.3,
  baselineHeight: 3.3,
  baseMass: 6000,
  temperature: 25,
  gravity: 1.0,
};
