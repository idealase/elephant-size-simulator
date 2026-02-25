/**
 * Failure Mode Definitions for Elephant Size Simulator
 *
 * Failure modes are first-class entities representing discrete physiological
 * breakdown events that occur when scaling constraints exceed viable limits.
 */

import type { FailureModeDefinition, Subsystem } from './types';
import {
  BONE_THRESHOLD,
  THERMO_THRESHOLD,
  CARDIOVASCULAR_THRESHOLD,
  METABOLIC_THRESHOLD,
} from './simDefaults';

export const FAILURE_MODES: Record<string, FailureModeDefinition> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // SKELETAL FAILURES
  // ═══════════════════════════════════════════════════════════════════════════

  BONE_COMPRESSION_FAILURE: {
    id: 'BONE_COMPRESSION_FAILURE',
    subsystem: 'skeletal',
    severity: 'catastrophic',
    title: 'Skeletal Compression Collapse',
    shortDescription:
      'Bones crushed under the elephant\'s own weight. The skeletal system cannot support the scaled mass.',
    longDescription: `
**The Physics of Failure**

An elephant's skeleton is already an engineering marvel at normal size. African elephants have the thickest, densest limb bones of any living land animal, with columnar legs positioned directly beneath the body to minimize bending stress. But even this remarkable adaptation has limits dictated by the **square-cube law**.

**How Bone Stress Scales**

- **Body mass** scales as L\u00b3 (volume)
- **Bone cross-sectional area** scales as L\u00b2
- **Compressive stress** = Force / Area, so stress scales as L\u00b3 / L\u00b2 = L

Real elephants partially compensate through **allometric thickening**: their bones are proportionally thicker than those of smaller animals. This is captured by the exponent 0.8 instead of 1.0 in the capacity formula. But allometric thickening cannot keep pace with cubic mass growth indefinitely.

**Cancellous vs Cortical Bone**

Elephant leg bones have two structural layers:
1. **Cortical bone** (outer shell): Dense, strong in compression (~170 MPa ultimate strength). Provides the primary load path.
2. **Cancellous bone** (inner spongy matrix): Lighter, acts as a shock absorber and distributes load. Much weaker in compression (~2-12 MPa).

At extreme scale, the cortical shell cannot thicken fast enough. The cancellous interior, which normally handles modest loads, experiences crushing pressures. Micro-fractures propagate through the trabecular network, leading to catastrophic structural collapse.

**The Result**

The elephant's legs buckle and fracture under its own static weight. Even lying down provides no relief\u2014the ribcage and pelvis experience the same scaling problem. The animal is crushed by gravity itself.

**Why Elephants Are Already Near the Limit**

At 6,000 kg, an African bush elephant is close to the maximum viable mass for a terrestrial mammal. The largest land animal ever, *Paraceratherium*, reached roughly 15,000-20,000 kg\u2014and its proportions suggest it was pushing the absolute limit of mammalian skeletal design. Beyond this, you need fundamentally different structural solutions (like sauropod pneumatic bones).
    `.trim(),
    proxyThreshold: BONE_THRESHOLD,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // THERMOREGULATION FAILURES
  // ═══════════════════════════════════════════════════════════════════════════

  THERMOREGULATION_CRISIS: {
    id: 'THERMOREGULATION_CRISIS',
    subsystem: 'thermoregulation',
    severity: 'hard',
    title: 'Thermoregulation Crisis',
    shortDescription:
      'The elephant cannot dissipate metabolic heat fast enough. Core body temperature rises to lethal levels.',
    longDescription: `
**The Physics of Failure**

Elephants already struggle with heat management. They are the largest living land animals, and they have evolved several remarkable adaptations to cope: huge, highly vascularized ears that act as radiators (dumping up to 100W each), wrinkled skin that increases surface area by up to 20%, and behavioral strategies like mud baths and seeking shade.

But all these adaptations are fighting the same fundamental physics.

**The Surface-Area-to-Volume Problem**

- **Heat production** scales with metabolic rate, which scales roughly with body volume (L\u00b3)
- **Heat dissipation** occurs through the body surface, which scales as L\u00b2
- The ratio of heat production to dissipation capacity scales as L\u00b3 / L\u00b2 = L

Every doubling of linear size means heat production increases 8x while dissipation capacity only increases 4x. The elephant becomes an increasingly efficient furnace trapped inside an increasingly inadequate radiator.

**The Ear Radiator Problem**

African elephant ears can be up to 2 m\u00b2 each. They are thin, richly supplied with blood vessels, and can be flapped to increase convective cooling. At baseline size, they dissipate a significant fraction of metabolic heat.

But if we scale the elephant up, the ears scale as L\u00b2 while heat production scales as L\u00b3. Even enormous ears cannot keep pace. The elephant would need ears of impractical proportions\u2014eventually larger than its own body\u2014to maintain thermal equilibrium.

**Temperature Dependence**

Higher ambient temperatures reduce the temperature gradient between the elephant's body (~36\u00b0C core) and the environment, dramatically reducing passive cooling efficiency. At 45\u00b0C ambient, even a normal-sized elephant is thermally stressed. A scaled-up elephant in hot conditions faces a double penalty.

**The Result**

Core body temperature rises uncontrollably. Proteins denature. Enzymes fail. Organ systems shut down in sequence. The elephant dies of hyperthermia\u2014cooked from the inside by its own metabolism.
    `.trim(),
    proxyThreshold: THERMO_THRESHOLD,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CARDIOVASCULAR FAILURES
  // ═══════════════════════════════════════════════════════════════════════════

  CARDIOVASCULAR_STRAIN: {
    id: 'CARDIOVASCULAR_STRAIN',
    subsystem: 'cardiovascular',
    severity: 'hard',
    title: 'Cardiovascular Strain Failure',
    shortDescription:
      'The heart cannot generate sufficient pressure to pump blood to the brain. Cerebral ischemia ensues.',
    longDescription: `
**The Physics of Failure**

An elephant's heart is already a remarkable pump. Weighing 12-21 kg (the largest of any land animal), it generates a systolic pressure of approximately 180 mmHg\u2014significantly higher than the human heart's ~120 mmHg. This elevated pressure is necessary because the elephant's brain sits atop a tall column of blood that must be kept perfused against gravity.

**Hydrostatic Pressure Scaling**

The pressure required to lift blood from the heart to the brain is governed by:

P = \u03c1 \u00b7 g \u00b7 h

Where \u03c1 is blood density (~1060 kg/m\u00b3), g is gravitational acceleration, and h is the vertical distance from heart to brain.

As the elephant scales up, this height increases linearly with the scale factor. The heart must generate proportionally more pressure\u2014but cardiac muscle has material limits. Blood vessel walls also have tensile strength limits; at extreme pressures, vessels rupture (hemorrhagic stroke).

**The Giraffe Comparison**

Giraffes face a similar problem and have evolved extraordinary cardiovascular adaptations: a systolic pressure of ~280 mmHg, thick-walled blood vessels, and a rete mirabile (network of fine vessels) at the base of the brain that acts as a pressure buffer. Even so, giraffes are limited to about 5.5-6 m in height.

An elephant scaled beyond its natural size lacks these adaptations entirely. Its cardiovascular system was not designed for extreme hydrostatic heads.

**Gravity Dependence**

Higher gravity directly increases the hydrostatic pressure requirement. At 2x Earth gravity, the heart must work twice as hard to perfuse the brain at the same height. Combined with size scaling, this creates a compounding failure.

**The Result**

The heart cannot maintain adequate cerebral perfusion. The brain becomes ischemic (oxygen-starved). Consciousness fades, followed by brain death. Alternatively, the heart attempts to compensate and ruptures from the strain, or blood vessels in the brain burst under the extreme pressure required.
    `.trim(),
    proxyThreshold: CARDIOVASCULAR_THRESHOLD,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // METABOLIC FAILURES
  // ═══════════════════════════════════════════════════════════════════════════

  METABOLIC_SUSTENANCE_DEFICIT: {
    id: 'METABOLIC_SUSTENANCE_DEFICIT',
    subsystem: 'metabolic',
    severity: 'hard',
    title: 'Metabolic Sustenance Deficit',
    shortDescription:
      'The elephant cannot eat fast enough to sustain its metabolism. Starvation is inevitable.',
    longDescription: `
**The Physics of Failure**

An African elephant already spends 16-18 hours per day eating, consuming 150-300 kg of vegetation daily. This is not laziness\u2014it is a consequence of being a massive hindgut fermenter eating relatively low-calorie food. The elephant's digestive system processes food with only about 40-50% efficiency, meaning it must consume enormous quantities.

**The Scaling Mismatch**

- **Metabolic rate** scales as M^0.75 (Kleiber's law), which for mass scaling as L\u00b3 means metabolic rate scales as L^2.25
- **Eating rate** is limited by gut throughput: mouth size (L\u00b2), chewing speed (decreases with jaw size), gut passage time, and gut volume (L\u00b3)
- **Net effect**: Food intake capacity cannot scale as fast as metabolic demand at extreme sizes

The eating hours formula captures this: hours = 16 \u00d7 s^0.25, where s is the scale factor. This is actually optimistic\u2014it assumes the elephant's digestive efficiency doesn't decrease with size, which is unlikely.

**The 24-Hour Wall**

There are only 24 hours in a day. When the required eating time exceeds this, the elephant enters a thermodynamic death spiral: it burns more calories than it can possibly consume, regardless of food availability. Fat reserves deplete. Muscle is catabolized. Organ function deteriorates.

**Why Elephants Are Already Pushing It**

At normal size, elephants spend 67-75% of their waking hours eating. They have essentially optimized every aspect of their feeding ecology:
- The trunk is the most dexterous appendage in the animal kingdom, capable of grabbing and processing food with extraordinary efficiency
- Their teeth are replaced six times during their lifetime because they wear out from constant grinding
- They have the longest gut of any land mammal (~35 m) to maximize extraction

There is very little room to optimize further. Scaling up simply overwhelms the system.

**The Result**

The elephant enters chronic energy deficit. It cannot eat enough hours in the day to fuel its metabolism. Weight loss accelerates. Eventually, organ systems fail from malnutrition. The world's largest herbivore starves in a land of plenty.
    `.trim(),
    proxyThreshold: METABOLIC_THRESHOLD,
  },
};

/**
 * Get failure mode definition by ID
 */
export const getFailureMode = (id: string): FailureModeDefinition | undefined => {
  return FAILURE_MODES[id];
};

/**
 * Get all failure modes for a specific subsystem
 */
export const getFailureModesForSubsystem = (subsystem: Subsystem): FailureModeDefinition[] => {
  return Object.values(FAILURE_MODES).filter((fm) => fm.subsystem === subsystem);
};

/**
 * Check if a specific proxy value has crossed the failure threshold
 */
export const isProxyInFailure = (proxyValue: number, threshold: number): boolean => {
  return proxyValue < threshold;
};

/**
 * Detect all active failures based on current capacity values
 */
export const detectFailures = (
  boneCapacity: number,
  thermoCapacity: number,
  cardiovascularCapacity: number,
  metabolicCapacity: number,
): string[] => {
  const activeFailureIds: string[] = [];

  if (isProxyInFailure(boneCapacity, FAILURE_MODES.BONE_COMPRESSION_FAILURE.proxyThreshold)) {
    activeFailureIds.push('BONE_COMPRESSION_FAILURE');
  }

  if (isProxyInFailure(thermoCapacity, FAILURE_MODES.THERMOREGULATION_CRISIS.proxyThreshold)) {
    activeFailureIds.push('THERMOREGULATION_CRISIS');
  }

  if (isProxyInFailure(cardiovascularCapacity, FAILURE_MODES.CARDIOVASCULAR_STRAIN.proxyThreshold)) {
    activeFailureIds.push('CARDIOVASCULAR_STRAIN');
  }

  if (isProxyInFailure(metabolicCapacity, FAILURE_MODES.METABOLIC_SUSTENANCE_DEFICIT.proxyThreshold)) {
    activeFailureIds.push('METABOLIC_SUSTENANCE_DEFICIT');
  }

  return activeFailureIds;
};
