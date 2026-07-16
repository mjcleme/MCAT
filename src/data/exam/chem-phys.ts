import type { ExamSection } from "@/lib/exam-types";

/**
 * Chemical and Physical Foundations — 30 questions in 48 minutes.
 * Three passage sets (5 questions each) plus 15 discretes, mirroring the real
 * section's roughly even split between passage-based and standalone items.
 */
export const examChemPhys: ExamSection = {
  id: "cp",
  minutes: 48,
  blocks: [
    {
      kind: "passage",
      id: "cp-p1",
      title: "Passage I — Buffering in the Blood",
      text: `Arterial blood is held near pH 7.40 by several buffer systems, of which the bicarbonate system is quantitatively the most important. The relevant equilibria are:

CO2(g) ⇌ CO2(aq) + H2O ⇌ H2CO3 ⇌ H+ + HCO3−

Carbonic anhydrase, a zinc metalloenzyme abundant in erythrocytes, accelerates the hydration of CO2 by a factor of roughly 10^6. The apparent pKa of the system under physiological conditions is 6.1.

At first glance the bicarbonate system appears poorly designed. A buffer is most effective within about one pH unit of its pKa, yet 6.1 lies more than a full unit below the pH being defended. Its effectiveness comes instead from being an open system: the lungs continuously adjust the partial pressure of CO2, and the kidneys adjust [HCO3−] over hours to days. Because the acid member of the conjugate pair can be exhaled, the system is not limited by the fixed stoichiometry that constrains a closed buffer.

Researchers measured arterial values in three subjects:

  Subject   pH     pCO2 (mmHg)   [HCO3−] (mM)
  A         7.40   40            24
  B         7.25   60            25
  C         7.52   26            21`,
      questions: [
        {
          id: "cp-p1-q1",
          prompt:
            "Subject B's values are most consistent with which disturbance?",
          options: [
            "Respiratory acidosis",
            "Respiratory alkalosis",
            "Metabolic acidosis",
            "Metabolic alkalosis",
          ],
          answer: 0,
          explanation:
            "Subject B has a low pH (acidosis) with an elevated pCO2. Since CO2 is the acid member of the pair, retaining it drives the equilibrium toward H+ and lowers pH — the disturbance originates in the respiratory system. A metabolic acidosis would instead show a LOW bicarbonate as the primary change, with pCO2 falling in compensation.",
        },
        {
          id: "cp-p1-q2",
          prompt:
            "According to the passage, the bicarbonate system buffers effectively at pH 7.4 despite its pKa of 6.1 primarily because:",
          options: [
            "carbonic anhydrase shifts the equilibrium toward bicarbonate",
            "the concentration of bicarbonate greatly exceeds that of carbonic acid",
            "CO2 can be eliminated by the lungs, so the system is open",
            "hemoglobin provides most of the buffering capacity instead",
          ],
          answer: 2,
          explanation:
            "The passage states this directly: effectiveness 'comes instead from being an open system,' because the acid member can be exhaled and is therefore not bound by the fixed stoichiometry of a closed buffer. Choice B is true as a fact — the ratio is about 20:1 — but the passage attributes the effectiveness to openness, not to the ratio. Choice A misstates enzyme function: carbonic anhydrase accelerates the reaction without shifting its equilibrium.",
        },
        {
          id: "cp-p1-q3",
          prompt:
            "Using the Henderson–Hasselbalch equation and the passage's pKa, the ratio [HCO3−]/[CO2(aq)] in Subject A is closest to:",
          options: ["1:1", "2:1", "20:1", "200:1"],
          answer: 2,
          explanation:
            "pH = pKa + log([base]/[acid]), so 7.4 = 6.1 + log(ratio), giving log(ratio) = 1.3 and ratio ≈ 20. The useful check is that a ratio far from 1 is exactly what you would expect when pH sits well above pKa — the base form dominates.",
        },
        {
          id: "cp-p1-q4",
          prompt:
            "Carbonic anhydrase increases the rate of CO2 hydration roughly a million-fold. Which quantity does the enzyme leave unchanged?",
          options: [
            "The activation energy of the reaction",
            "The rate constant of the forward reaction",
            "The equilibrium constant of the reaction",
            "The time required to reach equilibrium",
          ],
          answer: 2,
          explanation:
            "Enzymes lower activation energy and thereby raise both forward and reverse rate constants by the same factor, so equilibrium arrives sooner — but the equilibrium constant, fixed by ΔG°, is untouched. A catalyst that shifted K would let you build a perpetual motion machine.",
        },
        {
          id: "cp-p1-q5",
          prompt:
            "Subject C is hyperventilating. Assuming the kidneys have not yet compensated, the observed [HCO3−] of 21 mM compared with Subject A's 24 mM is best explained by:",
          options: [
            "renal excretion of bicarbonate over the preceding hours",
            "the mass-action shift as CO2 is blown off, consuming bicarbonate and H+",
            "an increase in carbonic anhydrase activity",
            "dilution of the blood by increased plasma volume",
          ],
          answer: 1,
          explanation:
            "The question stipulates that renal compensation has not occurred, which eliminates A even though it would be the eventual response. Removing CO2 pulls the equilibrium leftward by Le Châtelier, consuming H+ and HCO3− to replace the lost CO2 — so bicarbonate falls immediately through mass action alone, no kidney required.",
        },
      ],
    },
    {
      kind: "passage",
      id: "cp-p2",
      title: "Passage II — Terminal Velocity in Viscous Media",
      text: `A sphere falling through a viscous fluid experiences three forces: gravity, buoyancy, and drag. For small spheres at low Reynolds number, drag is described by Stokes' law:

F_drag = 6πηrv

where η is the fluid's dynamic viscosity, r the sphere's radius, and v its velocity. Setting the net force to zero yields the terminal velocity:

v_t = 2r²(ρ_s − ρ_f)g / 9η

A laboratory measured terminal velocities of steel spheres (ρ_s = 7800 kg/m³) in glycerol (ρ_f = 1260 kg/m³) at 20 °C:

  Radius (mm)   v_t (mm/s)
  0.5           3.7
  1.0           14.8
  1.5           33.3

The experiment was repeated at 40 °C, where glycerol's viscosity falls by roughly a factor of four while its density changes by less than 1%. All terminal velocities increased substantially.`,
      questions: [
        {
          id: "cp-p2-q1",
          prompt:
            "Based on the data, terminal velocity varies with sphere radius approximately as:",
          options: ["v_t ∝ r", "v_t ∝ r²", "v_t ∝ r³", "v_t ∝ √r"],
          answer: 1,
          explanation:
            "Doubling the radius from 0.5 to 1.0 mm raises v_t from 3.7 to 14.8 mm/s — a factor of 4, or 2². Tripling it to 1.5 mm gives 33.3 mm/s, which is 9 × 3.7, or 3². The data confirm the r² dependence the equation predicts. Reading the relationship off the data is faster than manipulating the formula.",
        },
        {
          id: "cp-p2-q2",
          prompt:
            "At 40 °C, the terminal velocity of the 1.0 mm sphere would be closest to:",
          options: ["3.7 mm/s", "14.8 mm/s", "59 mm/s", "237 mm/s"],
          answer: 2,
          explanation:
            "Terminal velocity is inversely proportional to viscosity, and the passage says η falls by a factor of four while density is essentially unchanged. So v_t rises by a factor of four: 14.8 × 4 ≈ 59 mm/s. Choice D incorrectly applies the factor twice.",
        },
        {
          id: "cp-p2-q3",
          prompt:
            "A sphere of the same radius but made of aluminum (ρ = 2700 kg/m³) is dropped in the same glycerol at 20 °C. Its terminal velocity will be:",
          options: [
            "greater, because it is less dense",
            "smaller, because the driving force (ρ_s − ρ_f) is reduced",
            "unchanged, because terminal velocity is independent of mass",
            "zero, because aluminum floats in glycerol",
          ],
          answer: 1,
          explanation:
            "The numerator contains (ρ_s − ρ_f). For steel that difference is 7800 − 1260 = 6540; for aluminum it is 2700 − 1260 = 1440, roughly 4.5× smaller, so v_t drops proportionally. Aluminum is still denser than glycerol, so it sinks — just more slowly. Choice C confuses this with free fall in vacuum, where mass genuinely cancels.",
        },
        {
          id: "cp-p2-q4",
          prompt:
            "At terminal velocity, which statement about the sphere is correct?",
          options: [
            "Its kinetic energy is increasing at a constant rate",
            "The net work done on it by all forces is zero",
            "The buoyant force equals its weight",
            "Its acceleration equals g",
          ],
          answer: 1,
          explanation:
            "Terminal velocity means zero net force, hence zero acceleration and constant kinetic energy — so net work is zero (gravity's positive work is exactly cancelled by drag and buoyancy). Choice C is the classic trap: it is drag PLUS buoyancy that balances weight, not buoyancy alone; otherwise the sphere would be neutrally buoyant and never fall.",
        },
        {
          id: "cp-p2-q5",
          prompt:
            "Stokes' law applies only at low Reynolds number. Which change would most threaten the validity of the analysis?",
          options: [
            "Using a smaller sphere",
            "Increasing the fluid's viscosity",
            "Replacing glycerol with water",
            "Lowering the temperature to 10 °C",
          ],
          answer: 2,
          explanation:
            "Reynolds number scales as ρvr/η, so it rises when viscosity drops. Water's viscosity is roughly a thousand times lower than glycerol's, which would drive the flow toward the turbulent regime where Stokes' law fails. Every other option lowers Re — smaller spheres, higher viscosity, and cooler (thus more viscous) glycerol all keep the flow safely laminar.",
        },
      ],
    },
    {
      kind: "passage",
      id: "cp-p3",
      title: "Passage III — Resolving a Racemic Amine",
      text: `A pharmaceutical process group needed to separate the enantiomers of a chiral amine, compound 1, whose (R) enantiomer is therapeutically active and whose (S) enantiomer is inert. Direct crystallization failed: the enantiomers have identical solubility in all achiral solvents.

The group instead treated racemic 1 with one equivalent of enantiomerically pure (S)-mandelic acid, forming a pair of ammonium mandelate salts. These salts were separated by fractional crystallization, and the free amines were regenerated by treatment with aqueous NaOH followed by extraction into diethyl ether.

A second group attempted a chromatographic resolution, passing racemic 1 over a column packed with silica bonded to an achiral C18 stationary phase. The two enantiomers co-eluted in a single peak.`,
      questions: [
        {
          id: "cp-p3-q1",
          prompt:
            "The salts formed between racemic 1 and (S)-mandelic acid have what relationship to each other?",
          options: [
            "Enantiomers",
            "Diastereomers",
            "Constitutional isomers",
            "Identical compounds",
          ],
          answer: 1,
          explanation:
            "The salts are (R)-amine·(S)-acid and (S)-amine·(S)-acid. They differ at one stereocenter but share the other, which makes them diastereomers — and that is the entire point of the method, since diastereomers have different physical properties and therefore different solubilities.",
        },
        {
          id: "cp-p3-q2",
          prompt:
            "Why did direct crystallization of racemic 1 fail to separate the enantiomers?",
          options: [
            "The enantiomers interconvert too rapidly at room temperature",
            "Enantiomers have identical physical properties in an achiral environment",
            "The amine is too basic to crystallize",
            "The racemate has no net optical rotation",
          ],
          answer: 1,
          explanation:
            "Enantiomers differ only in their interaction with other chiral things — they have identical melting points, boiling points, and solubilities in achiral solvents. Introducing a chiral resolving agent creates diastereomers, which is what breaks the tie. Choice D is a true statement about racemates but explains nothing about separability.",
        },
        {
          id: "cp-p3-q3",
          prompt:
            "The second group's chromatographic attempt failed because:",
          options: [
            "C18 is too nonpolar to retain an amine",
            "the stationary phase was achiral, so it interacted with both enantiomers identically",
            "the amine decomposed on silica",
            "the enantiomers have different molecular weights",
          ],
          answer: 1,
          explanation:
            "The same principle as the crystallization failure: an achiral stationary phase cannot distinguish enantiomers, so they co-elute. A chiral stationary phase would form transient diastereomeric interactions and resolve them. Choice D is simply false — enantiomers are identical in composition.",
        },
        {
          id: "cp-p3-q4",
          prompt:
            "In the final step, treatment with aqueous NaOH before ether extraction serves to:",
          options: [
            "hydrolyze the mandelic acid",
            "deprotonate the ammonium salt, making the free amine soluble in ether",
            "protonate the amine so it enters the aqueous layer",
            "racemize any remaining (S) enantiomer",
          ],
          answer: 1,
          explanation:
            "The resolved amine exists as a water-soluble ammonium salt. NaOH deprotonates it to the neutral free amine, which is nonpolar enough to partition into ether while the mandelate anion stays in the aqueous layer. Choice C reverses the chemistry — protonation is what put it in water to begin with.",
        },
        {
          id: "cp-p3-q5",
          prompt:
            "If the process group had used racemic mandelic acid instead of (S)-mandelic acid, the resolution would have:",
          options: [
            "succeeded, but with half the yield",
            "succeeded, but required twice the solvent",
            "failed, because the salt mixture would contain two pairs of enantiomers",
            "failed, because no salt would form",
          ],
          answer: 2,
          explanation:
            "Racemic acid plus racemic amine gives four salts: (R)(R), (S)(S), (R)(S), and (S)(R). The first two are enantiomers of each other, as are the last two — so you have two enantiomeric pairs with no solubility difference within either pair. The resolving agent must be enantiopure for the method to work at all.",
        },
      ],
    },
    {
      kind: "discrete",
      id: "cp-d1",
      questions: [
        {
          id: "cp-d-q1",
          prompt:
            "A 2.0 kg block slides down a frictionless incline of height 1.8 m, starting from rest. Its speed at the bottom is closest to: (g = 10 m/s²)",
          options: ["3.0 m/s", "6.0 m/s", "9.0 m/s", "18 m/s"],
          answer: 1,
          explanation:
            "Energy conservation: mgh = ½mv², so v = √(2gh) = √(2 × 10 × 1.8) = √36 = 6.0 m/s. Mass cancels, and the incline's angle is irrelevant on a frictionless surface — only the height drop matters.",
        },
        {
          id: "cp-d-q2",
          prompt:
            "Which aqueous solution has the lowest freezing point?",
          options: [
            "0.10 M glucose",
            "0.10 M NaCl",
            "0.10 M CaCl2",
            "0.10 M sucrose",
          ],
          answer: 2,
          explanation:
            "Freezing point depression is colligative — it depends on particle count. Glucose and sucrose don't dissociate (i = 1, 0.10 m particles). NaCl gives i = 2 (0.20 m). CaCl2 gives i = 3 (0.30 m), the most particles and therefore the greatest depression.",
        },
        {
          id: "cp-d-q3",
          prompt:
            "The reaction 2NO(g) + O2(g) → 2NO2(g) has the experimental rate law: rate = k[NO]²[O2]. What is the overall reaction order?",
          options: ["1", "2", "3", "4"],
          answer: 2,
          explanation:
            "Overall order is the sum of the exponents: 2 + 1 = 3. Note that the exponents here happen to match the stoichiometric coefficients, but that's coincidence — rate laws are determined experimentally, never read off a balanced equation.",
        },
        {
          id: "cp-d-q4",
          prompt:
            "A converging lens has a focal length of 10 cm. An object placed 30 cm away produces an image that is:",
          options: [
            "virtual, upright, and magnified",
            "real, inverted, and reduced",
            "real, inverted, and magnified",
            "virtual, inverted, and reduced",
          ],
          answer: 1,
          explanation:
            "1/f = 1/do + 1/di gives 1/di = 1/10 − 1/30 = 2/30, so di = +15 cm — positive means real. Magnification m = −di/do = −15/30 = −0.5: negative means inverted, and |m| < 1 means reduced. Note that a virtual image can never be inverted for a single lens, which rules out D on inspection.",
        },
        {
          id: "cp-d-q5",
          prompt:
            "Which species is the strongest Lewis acid?",
          options: ["NH3", "H2O", "BF3", "CH4"],
          answer: 2,
          explanation:
            "A Lewis acid accepts an electron pair. Boron in BF3 has only six valence electrons and an empty p orbital, making it an excellent acceptor. NH3 and H2O have lone pairs and act as Lewis bases; CH4 is fully saturated and neither.",
        },
        {
          id: "cp-d-q6",
          prompt:
            "An ideal gas is compressed isothermally to half its volume. Its pressure:",
          options: [
            "halves",
            "doubles",
            "quadruples",
            "remains unchanged",
          ],
          answer: 1,
          explanation:
            "Boyle's law: at constant temperature, P1V1 = P2V2. Halving V doubles P. Note that ΔU = 0 for an isothermal ideal gas process, so all the work done on the gas leaves as heat.",
        },
        {
          id: "cp-d-q7",
          prompt:
            "Which alcohol yields a ketone upon oxidation with PCC?",
          options: ["1-propanol", "2-propanol", "2-methyl-2-propanol", "Methanol"],
          answer: 1,
          explanation:
            "2-propanol is secondary — its carbinol carbon bears one H and two alkyl groups — so oxidation gives acetone, a ketone. Primary alcohols (1-propanol, methanol) give aldehydes with PCC. 2-methyl-2-propanol is tertiary, with no H on the carbinol carbon, so it does not oxidize.",
        },
        {
          id: "cp-d-q8",
          prompt:
            "A wave travels from air into water, where its speed increases. Which property remains constant?",
          options: ["Wavelength", "Speed", "Frequency", "Amplitude"],
          answer: 2,
          explanation:
            "Frequency is fixed by the source and cannot change at a boundary — otherwise wave crests would pile up or vanish at the interface. Since v = fλ and v changes, λ must change to compensate.",
        },
        {
          id: "cp-d-q9",
          prompt:
            "For the half-reaction Cu²⁺ + 2e⁻ → Cu, E° = +0.34 V. For Zn²⁺ + 2e⁻ → Zn, E° = −0.76 V. The standard cell potential of a galvanic cell built from these is:",
          options: ["+0.42 V", "+1.10 V", "−1.10 V", "+2.20 V"],
          answer: 1,
          explanation:
            "E°cell = E°cathode − E°anode. For a spontaneous galvanic cell, the more positive potential is reduced (Cu is the cathode) and zinc is oxidized: 0.34 − (−0.76) = +1.10 V. Do not double the zinc potential to balance electrons — E° is intensive.",
        },
        {
          id: "cp-d-q10",
          prompt:
            "Which compound would show a strong, broad IR absorption between 2500 and 3300 cm⁻¹ overlapping the C–H region?",
          options: ["Acetone", "Ethanol", "Acetic acid", "Diethyl ether"],
          answer: 2,
          explanation:
            "The very broad band spanning 2500–3300 cm⁻¹ is diagnostic of a carboxylic acid O–H, broadened by strong hydrogen-bonded dimerization. Ethanol's O–H is broad but narrower and centered around 3300; acetone and ether have no O–H at all.",
        },
        {
          id: "cp-d-q11",
          prompt:
            "Two resistors, 4 Ω and 12 Ω, are connected in parallel. The equivalent resistance is:",
          options: ["3 Ω", "8 Ω", "16 Ω", "48 Ω"],
          answer: 0,
          explanation:
            "1/Req = 1/4 + 1/12 = 3/12 + 1/12 = 4/12, so Req = 3 Ω. A useful sanity check: parallel resistance is always smaller than the smallest individual resistor, which immediately eliminates B, C, and D.",
        },
        {
          id: "cp-d-q12",
          prompt:
            "The reaction A → B has ΔH = −40 kJ/mol and ΔS = −120 J/(mol·K). At 400 K, the reaction is:",
          options: [
            "spontaneous, ΔG = −8 kJ/mol",
            "nonspontaneous, ΔG = +8 kJ/mol",
            "spontaneous, ΔG = −88 kJ/mol",
            "at equilibrium, ΔG = 0",
          ],
          answer: 1,
          explanation:
            "ΔG = ΔH − TΔS = −40 − (400)(−0.120) = −40 + 48 = +8 kJ/mol, so it is nonspontaneous at this temperature. Converting ΔS from J to kJ is essential; skipping that step gives a wildly wrong answer. With both ΔH and ΔS negative, the reaction is spontaneous only at low temperature.",
        },
        {
          id: "cp-d-q13",
          prompt:
            "Which quantum number set is impossible?",
          options: [
            "n=2, l=1, ml=−1, ms=+1/2",
            "n=3, l=2, ml=0, ms=−1/2",
            "n=2, l=2, ml=1, ms=+1/2",
            "n=4, l=0, ml=0, ms=−1/2",
          ],
          answer: 2,
          explanation:
            "The azimuthal quantum number l must satisfy 0 ≤ l ≤ n−1. For n = 2, l can only be 0 or 1 — an l of 2 would be a 2d orbital, which does not exist. All other sets obey the constraints, including ml ranging from −l to +l.",
        },
        {
          id: "cp-d-q14",
          prompt:
            "A 3.0 kg object moving at 4.0 m/s collides with and sticks to a stationary 1.0 kg object. Their common final speed is:",
          options: ["1.0 m/s", "3.0 m/s", "4.0 m/s", "12 m/s"],
          answer: 1,
          explanation:
            "Momentum is conserved in all collisions: (3.0)(4.0) + 0 = (4.0)v, so v = 3.0 m/s. This is perfectly inelastic — the objects stick together, so kinetic energy is NOT conserved, but momentum still is.",
        },
        {
          id: "cp-d-q15",
          prompt:
            "Which statement about an SN2 reaction is correct?",
          options: [
            "It proceeds through a planar carbocation intermediate",
            "Its rate depends only on substrate concentration",
            "It inverts the configuration at the electrophilic carbon",
            "It is fastest with tertiary substrates",
          ],
          answer: 2,
          explanation:
            "SN2 is a concerted backside attack, producing Walden inversion. It has no intermediate at all (that's SN1), its rate is second-order and depends on both substrate and nucleophile, and it is fastest with methyl and primary substrates because tertiary centers are sterically shielded from backside approach.",
        },
      ],
    },
  ],
};
