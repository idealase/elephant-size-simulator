/**
 * types.ts — Shared types for the elephant size simulation core.
 *
 * These types are intentionally free of React / DOM concerns so the sim
 * module stays portable and testable.
 */

// ─── Input parameters ───────────────────────────────────────────────────────

export interface SimParams {
  /** Current shoulder height in meters */
  shoulderHeight: number;
  /** Baseline shoulder height for selected species (m) */
  baselineHeight: number;
  /** Baseline mass for selected species (kg) */
  baseMass: number;
  /** Ambient temperature in °C (10-45) */
  temperature: number;
  /** Gravity multiplier (0.1-2.0) */
  gravity: number;
}

// ─── Output results ─────────────────────────────────────────────────────────

export interface SimOutputs {
  /** shoulderHeight / baselineHeight */
  scaleFactor: number;
  /** Estimated mass in kg */
  mass: number;

  // Capacity proxies (1.0 = baseline, lower = worse)
  /** Bone compression capacity */
  boneCapacity: number;
  /** Thermoregulation capacity */
  thermoCapacity: number;
  /** Cardiovascular capacity */
  cardiovascularCapacity: number;
  /** Metabolic sustenance capacity */
  metabolicCapacity: number;

  // Health scores (0-100)
  /** Bone health score */
  boneHealth: number;
  /** Thermoregulation health score */
  thermoHealth: number;
  /** Cardiovascular health score */
  cardiovascularHealth: number;
  /** Metabolic health score */
  metabolicHealth: number;

  // Overall
  /** Overall viability index 0-100 */
  viabilityIndex: number;

  // Elephant-specific
  /** Hours needed to eat enough per day */
  eatingHoursPerDay: number;
  /** Estimated blood pressure in mmHg */
  heartPressureMmHg: number;

  // Active failures
  /** List of active failure IDs */
  activeFailures: string[];
  /** Primary failure mode (worst) or null */
  failureMode: string | null;
}

// ─── Failure mode types ─────────────────────────────────────────────────────

export type FailureSeverity = 'hard' | 'catastrophic';
export type Subsystem = 'skeletal' | 'thermoregulation' | 'cardiovascular' | 'metabolic';

export interface FailureModeDefinition {
  id: string;
  subsystem: Subsystem;
  severity: FailureSeverity;
  title: string;
  shortDescription: string;
  longDescription: string;
  proxyThreshold: number;
}

// ─── Species preset ─────────────────────────────────────────────────────────

export interface SpeciesPreset {
  name: string;
  baselineHeight: number;
  baseMass: number;
}
