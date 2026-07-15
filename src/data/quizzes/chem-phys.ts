import type { Quiz } from "@/lib/types";

export const chemPhysQuizzes: Quiz[] = [
  {
    id: "cp-q-gc",
    section: "cp",
    title: "General Chemistry Foundations",
    description:
      "Periodic trends, bonding, VSEPR geometry, and intermolecular forces.",
    questions: [
      {
        id: "cp-q-gc-1",
        prompt:
          "Which molecule has polar bonds but no net dipole moment?",
        options: ["H2O", "NH3", "CO2", "HCl"],
        answer: 2,
        explanation:
          "CO2 is linear, so its two C=O bond dipoles point in exactly opposite directions and cancel. Water and ammonia are bent and trigonal pyramidal respectively — their lone pairs break the symmetry, so the dipoles add. Polarity requires polar bonds AND asymmetric geometry.",
      },
      {
        id: "cp-q-gc-2",
        prompt:
          "Which element has the highest first ionization energy?",
        options: ["Sodium", "Chlorine", "Fluorine", "Iodine"],
        answer: 2,
        explanation:
          "Ionization energy increases up and to the right. Fluorine is farthest up and right among these (excluding noble gases), so its valence electrons are held most tightly. Note that fluorine is also the most electronegative element — the trends run in parallel.",
      },
      {
        id: "cp-q-gc-3",
        prompt:
          "SF4 has four bonding pairs and one lone pair on the central atom. What is its molecular geometry?",
        options: ["Tetrahedral", "Trigonal bipyramidal", "Seesaw", "Square planar"],
        answer: 2,
        explanation:
          "Five electron domains give trigonal bipyramidal electron geometry, but the lone pair occupies an equatorial position (minimizing repulsion) and is invisible in the molecular shape's name. The remaining four atoms form a seesaw. This is the classic distinction between electron geometry and molecular geometry.",
      },
      {
        id: "cp-q-gc-4",
        prompt:
          "Why does HF have a much higher boiling point than HCl, despite HCl having a larger molar mass?",
        options: [
          "HF has stronger London dispersion forces",
          "HF molecules hydrogen bond with one another",
          "HF is ionic while HCl is covalent",
          "HF has a lower molecular polarizability",
        ],
        answer: 1,
        explanation:
          "Fluorine is small and highly electronegative, so HF hydrogen bonds — a much stronger intermolecular force than the dipole–dipole and dispersion forces available to HCl. Chlorine is too large and insufficiently electronegative to support true hydrogen bonding. Dispersion actually favors HCl (D is true but irrelevant, and A is backward).",
      },
      {
        id: "cp-q-gc-5",
        prompt:
          "A carbon atom is double-bonded to one oxygen and single-bonded to two other atoms. What is its hybridization?",
        options: ["sp", "sp2", "sp3", "sp3d"],
        answer: 1,
        explanation:
          "Count sigma bonds and lone pairs, not total bonds: three sigma bonds and no lone pairs means three electron domains, so sp2 and trigonal planar. The pi bond of the double bond uses the unhybridized p orbital and does not count as a domain.",
      },
    ],
  },
  {
    id: "cp-q-thermo",
    section: "cp",
    title: "Thermodynamics & Equilibrium",
    description:
      "Gibbs free energy, spontaneity, Le Châtelier, and the Q-versus-K comparison.",
    questions: [
      {
        id: "cp-q-thermo-1",
        prompt:
          "A reaction has ΔH = +50 kJ/mol and ΔS = +150 J/(mol·K). At what temperatures is it spontaneous?",
        options: [
          "All temperatures",
          "No temperatures",
          "Only above about 333 K",
          "Only below about 333 K",
        ],
        answer: 2,
        explanation:
          "ΔG = ΔH − TΔS. With both positive, ΔG < 0 requires TΔS > ΔH, so T > ΔH/ΔS = 50,000 J / 150 J·K⁻¹ ≈ 333 K. Watch the units — ΔH is in kJ and ΔS in J, and failing to convert is the single most common error here.",
      },
      {
        id: "cp-q-thermo-2",
        prompt:
          "For the equilibrium N2(g) + 3H2(g) ⇌ 2NH3(g), which change shifts the equilibrium toward products?",
        options: [
          "Decreasing the container volume",
          "Adding an inert gas at constant volume",
          "Adding a catalyst",
          "Removing N2",
        ],
        answer: 0,
        explanation:
          "Decreasing volume raises pressure, and the system relieves it by shifting toward fewer moles of gas — 4 moles of reactants to 2 of product, so it shifts right. An inert gas at constant volume changes no partial pressures. A catalyst speeds both directions equally. Removing a reactant shifts left.",
      },
      {
        id: "cp-q-thermo-3",
        prompt:
          "A reaction has ΔG° = −20 kJ/mol at 298 K. What can you conclude?",
        options: [
          "The reaction proceeds rapidly",
          "K > 1, so products are favored at standard conditions",
          "The reaction is endothermic",
          "The reaction has a low activation energy",
        ],
        answer: 1,
        explanation:
          "ΔG° = −RT ln K, so a negative ΔG° means ln K > 0 and K > 1. Thermodynamics says nothing about rate — that is kinetics, governed by activation energy. Diamond converting to graphite is spontaneous and immeasurably slow. Nor can you infer ΔH without knowing ΔS.",
      },
      {
        id: "cp-q-thermo-4",
        prompt:
          "At a given moment, a reaction mixture has Q = 0.5 while K = 10. The system will:",
        options: [
          "Shift left, consuming products",
          "Shift right, consuming reactants",
          "Remain unchanged, as it is at equilibrium",
          "Shift right, and K will increase to match Q",
        ],
        answer: 1,
        explanation:
          "Q < K means there are too many reactants relative to equilibrium, so the reaction proceeds forward until Q rises to K. K is a constant at a fixed temperature and never adjusts toward Q — only temperature changes K.",
      },
      {
        id: "cp-q-thermo-5",
        prompt:
          "Which is NOT a state function?",
        options: ["Enthalpy", "Entropy", "Work", "Gibbs free energy"],
        answer: 2,
        explanation:
          "Work depends on the path taken between two states, as does heat — an isothermal expansion and an adiabatic one between the same endpoints do different amounts of work. Enthalpy, entropy, and Gibbs free energy depend only on the current state, which is what makes Hess's law valid.",
      },
    ],
  },
  {
    id: "cp-q-acid",
    section: "cp",
    title: "Acids, Bases & Titration",
    description:
      "pH calculations, buffers, Henderson–Hasselbalch, and titration curve interpretation.",
    questions: [
      {
        id: "cp-q-acid-1",
        prompt:
          "A buffer contains equal concentrations of a weak acid (pKa = 4.75) and its conjugate base. What is the pH?",
        options: ["4.75", "7.00", "9.25", "Cannot be determined without concentrations"],
        answer: 0,
        explanation:
          "By Henderson–Hasselbalch, pH = pKa + log([A−]/[HA]). Equal concentrations make the ratio 1 and log(1) = 0, so pH = pKa = 4.75. The actual concentrations set buffer capacity, not pH — which is why D is tempting but wrong.",
      },
      {
        id: "cp-q-acid-2",
        prompt:
          "A weak acid is titrated with NaOH. At the equivalence point, the pH is:",
        options: [
          "Exactly 7",
          "Greater than 7",
          "Less than 7",
          "Equal to the pKa",
        ],
        answer: 1,
        explanation:
          "At equivalence, all the weak acid has been converted to its conjugate base, which hydrolyzes water and generates OH−, so pH > 7. pH = 7 at equivalence only for a strong acid–strong base titration. pH = pKa at the HALF-equivalence point, not equivalence.",
      },
      {
        id: "cp-q-acid-3",
        prompt:
          "A solution has [H+] = 1.0 × 10⁻⁹ M. What are its pH and pOH?",
        options: [
          "pH 9, pOH 5",
          "pH 5, pOH 9",
          "pH 9, pOH 14",
          "pH 3, pOH 11",
        ],
        answer: 0,
        explanation:
          "pH = −log(1.0 × 10⁻⁹) = 9. Since pH + pOH = 14 at 25 °C, pOH = 5. The solution is basic, consistent with a low [H+].",
      },
      {
        id: "cp-q-acid-4",
        prompt:
          "Which pair would make the most effective buffer at pH 7.4?",
        options: [
          "Acetic acid / acetate (pKa 4.75)",
          "H2PO4− / HPO4²⁻ (pKa 7.2)",
          "NH4+ / NH3 (pKa 9.25)",
          "HCl / Cl−",
        ],
        answer: 1,
        explanation:
          "A buffer works best within about one pH unit of its pKa, and 7.2 is closest to 7.4 — this is exactly why phosphate is the major intracellular buffer. HCl is a strong acid and its conjugate base is not basic enough to buffer at all.",
      },
      {
        id: "cp-q-acid-5",
        prompt:
          "Which is the strongest Brønsted–Lowry acid?",
        options: ["pKa = 2.1", "pKa = 4.8", "pKa = 9.2", "pKa = 15.7"],
        answer: 0,
        explanation:
          "Lower pKa means stronger acid — the scale is logarithmic and inverse. A pKa of 2.1 corresponds to a Ka roughly 500 times larger than one at 4.8. The strongest acid has the most stable conjugate base.",
      },
    ],
  },
  {
    id: "cp-q-oc",
    section: "cp",
    title: "Organic Chemistry & Separations",
    description:
      "Stereochemistry, substitution and elimination mechanisms, spectroscopy, and lab techniques.",
    questions: [
      {
        id: "cp-q-oc-1",
        prompt:
          "A tertiary alkyl halide is treated with a weak nucleophile in a polar protic solvent. Which mechanism dominates, and what is the stereochemical outcome?",
        options: [
          "SN2, with inversion of configuration",
          "SN1, with racemization",
          "E2, with anti-periplanar geometry required",
          "SN2, with retention of configuration",
        ],
        answer: 1,
        explanation:
          "Every condition points to SN1: tertiary substrates form stable carbocations and are too hindered for backside attack, weak nucleophiles cannot force a concerted step, and polar protic solvents stabilize the carbocation. The planar intermediate can be attacked from either face, giving racemization.",
      },
      {
        id: "cp-q-oc-2",
        prompt:
          "Two compounds have identical connectivity and differ at exactly two of their three stereocenters. They are:",
        options: ["Enantiomers", "Diastereomers", "Identical", "Constitutional isomers"],
        answer: 1,
        explanation:
          "Enantiomers must differ at ALL stereocenters. Differing at some but not all makes them diastereomers, which — unlike enantiomers — have different physical properties and can be separated by ordinary means like distillation or chromatography.",
      },
      {
        id: "cp-q-oc-3",
        prompt:
          "An IR spectrum shows a strong sharp absorption at 1715 cm⁻¹ and no broad band near 3000–3500 cm⁻¹. Which compound is most consistent?",
        options: ["1-butanol", "Butanoic acid", "2-butanone", "Butylamine"],
        answer: 2,
        explanation:
          "The ~1715 cm⁻¹ peak is a carbonyl, and the absence of a broad O–H rules out both the alcohol and the carboxylic acid (which would also show a very broad 2500–3300 band). Butylamine has N–H but no C=O. A ketone fits: carbonyl present, no O–H or N–H.",
      },
      {
        id: "cp-q-oc-4",
        prompt:
          "A mixture contains a neutral organic compound and an organic amine, both dissolved in ether. Adding dilute aqueous HCl and shaking will:",
        options: [
          "Move the neutral compound into the aqueous layer",
          "Move the protonated amine into the aqueous layer",
          "Move both compounds into the aqueous layer",
          "Cause no separation, since both are organic",
        ],
        answer: 1,
        explanation:
          "HCl protonates the amine to an ammonium salt, which is ionic and therefore water-soluble, so it partitions into the aqueous layer while the neutral compound stays in the ether. Basifying the aqueous layer afterward regenerates the free amine for recovery — the standard acid-base extraction.",
      },
      {
        id: "cp-q-oc-5",
        prompt:
          "In a 1H NMR spectrum, a signal is split into a triplet. This indicates the proton has how many equivalent neighboring protons?",
        options: ["One", "Two", "Three", "Four"],
        answer: 1,
        explanation:
          "The n+1 rule: n neighbors produce n+1 peaks. A triplet has 3 peaks, so n = 2. Splitting reveals connectivity — which protons sit adjacent to which.",
      },
      {
        id: "cp-q-oc-6",
        prompt:
          "Oxidation of a secondary alcohol with chromic acid yields:",
        options: ["An aldehyde", "A ketone", "A carboxylic acid", "No reaction"],
        answer: 1,
        explanation:
          "Secondary alcohols oxidize to ketones and stop there — further oxidation would require breaking a C–C bond. Primary alcohols go to aldehydes with a mild oxidant like PCC, or all the way to carboxylic acids with chromic acid. Tertiary alcohols do not oxidize, lacking a hydrogen on the carbinol carbon.",
      },
    ],
  },
  {
    id: "cp-q-phys",
    section: "cp",
    title: "Physics: Mechanics, Fluids & Circuits",
    description:
      "Newtonian mechanics, energy conservation, fluid dynamics, and electrical circuits.",
    questions: [
      {
        id: "cp-q-phys-1",
        prompt:
          "A ball is thrown horizontally from a cliff at the same moment an identical ball is dropped. Which lands first?",
        options: [
          "The thrown ball, because it has greater speed",
          "The dropped ball, because it travels a shorter path",
          "They land at the same time",
          "It depends on the horizontal velocity",
        ],
        answer: 2,
        explanation:
          "Horizontal and vertical motion are independent. Both balls start with zero vertical velocity and experience the same downward acceleration g over the same height, so their times of flight are identical. The thrown ball simply lands farther away.",
      },
      {
        id: "cp-q-phys-2",
        prompt:
          "A car moves in a circle at constant speed. Which statement is true?",
        options: [
          "Its acceleration is zero because speed is constant",
          "The centripetal force does work on the car",
          "It accelerates because its velocity direction changes",
          "The net force on the car is zero",
        ],
        answer: 2,
        explanation:
          "Velocity is a vector, so a changing direction means acceleration even at constant speed — directed toward the center. The centripetal force does zero work because it is always perpendicular to displacement, which is exactly why kinetic energy stays constant.",
      },
      {
        id: "cp-q-phys-3",
        prompt:
          "Fluid flows through a pipe that narrows from cross-sectional area A to A/2. In the narrow section, the fluid's speed and pressure respectively:",
        options: [
          "Double; decrease",
          "Double; increase",
          "Halve; decrease",
          "Halve; increase",
        ],
        answer: 0,
        explanation:
          "Continuity (A1v1 = A2v2) requires the speed to double when area halves. Bernoulli's equation then requires pressure to fall, since the sum P + ½ρv² + ρgh is conserved and the kinetic term rose. Faster flow means lower pressure — counterintuitive but consistent.",
      },
      {
        id: "cp-q-phys-4",
        prompt:
          "A block floats with 75% of its volume submerged in water (ρ = 1000 kg/m³). What is the block's density?",
        options: ["250 kg/m³", "750 kg/m³", "1000 kg/m³", "1333 kg/m³"],
        answer: 1,
        explanation:
          "For a floating object, the fraction submerged equals the ratio of densities: ρ_object/ρ_fluid = 0.75, so ρ_object = 750 kg/m³. This follows from setting buoyant force equal to weight — the displaced fluid's weight must equal the object's.",
      },
      {
        id: "cp-q-phys-5",
        prompt:
          "Two identical resistors are connected in parallel across a battery. Compared to a single resistor connected alone, the total current drawn from the battery is:",
        options: ["Halved", "Unchanged", "Doubled", "Quadrupled"],
        answer: 2,
        explanation:
          "Two identical resistors in parallel give an equivalent resistance of R/2. With the same voltage, I = V/(R/2) = 2V/R — double the current. Adding parallel paths always lowers total resistance, because you are adding routes for current to flow.",
      },
      {
        id: "cp-q-phys-6",
        prompt:
          "A sound's intensity increases by a factor of 100. The sound intensity level increases by:",
        options: ["2 dB", "10 dB", "20 dB", "100 dB"],
        answer: 2,
        explanation:
          "β = 10·log(I/I0), so a hundredfold intensity increase adds 10·log(100) = 10 × 2 = 20 dB. Each factor of 10 in intensity contributes 10 dB — the scale is logarithmic, which is why the answer is not 100.",
      },
      {
        id: "cp-q-phys-7",
        prompt:
          "An object is placed 10 cm in front of a converging lens with a focal length of 20 cm. The image is:",
        options: [
          "Real, inverted, and magnified",
          "Real, upright, and reduced",
          "Virtual, upright, and magnified",
          "Virtual, inverted, and reduced",
        ],
        answer: 2,
        explanation:
          "The object sits inside the focal point (do < f). Applying 1/f = 1/do + 1/di gives 1/di = 1/20 − 1/10 = −1/20, so di = −20 cm — negative, meaning virtual. Magnification m = −di/do = +2, so upright and twice the size. This is the magnifying glass configuration.",
      },
    ],
  },
];
