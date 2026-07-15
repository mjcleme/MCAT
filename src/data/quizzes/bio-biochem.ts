import type { Quiz } from "@/lib/types";

export const bioBiochemQuizzes: Quiz[] = [
  {
    id: "bb-q-aa",
    section: "bb",
    title: "Amino Acids & Protein Structure",
    description:
      "Side-chain chemistry, pI calculations, folding forces, and the levels of structure.",
    questions: [
      {
        id: "bb-q-aa-1",
        prompt:
          "A protein is placed in a buffer at pH 7.4. Which side chain is most likely to carry a positive charge?",
        options: ["Glutamate", "Lysine", "Serine", "Phenylalanine"],
        answer: 1,
        explanation:
          "Lysine's side-chain pKa is about 10.5. At pH 7.4 — well below that pKa — the amine remains protonated and positively charged. Glutamate (pKa ≈ 4.3) is deprotonated and negative; serine and phenylalanine are uncharged at any physiological pH.",
      },
      {
        id: "bb-q-aa-2",
        prompt:
          "The pI of glycine is approximately 6.0, given pKa values of 2.3 (COOH) and 9.6 (NH3+). At pH 9.6, glycine exists predominantly as which species?",
        options: [
          "A cation with net charge +1",
          "A zwitterion with net charge 0",
          "An equimolar mix of zwitterion and anion",
          "An anion with net charge −1",
        ],
        answer: 2,
        explanation:
          "At a pH equal to a pKa, that group is half-protonated by definition — so half the molecules retain the protonated amine (zwitterion, net 0) and half have lost it (anion, net −1). The carboxyl is fully deprotonated throughout. Choosing the pure anion (D) is the common error; that describes pH well above 9.6.",
      },
      {
        id: "bb-q-aa-3",
        prompt:
          "A mutation replaces a buried valine with aspartate in a globular protein's hydrophobic core. What is the most likely consequence?",
        options: [
          "Increased thermal stability from a new salt bridge",
          "Destabilization of the tertiary structure",
          "No effect, since primary structure alone determines function",
          "Loss of the peptide backbone's planarity",
        ],
        answer: 1,
        explanation:
          "Burying a charged carboxylate in a nonpolar core is energetically costly — the charge cannot be solvated. This destabilizes the fold. Choice C misstates Anfinsen: sequence determines structure, which is exactly why changing the sequence changes the structure.",
      },
      {
        id: "bb-q-aa-4",
        prompt:
          "Why does a protein rich in proline residues rarely form long alpha helices?",
        options: [
          "Proline's side chain is too bulky to fit the helical core",
          "Proline lacks a backbone amide hydrogen to donate to the helical hydrogen-bond network",
          "Proline is achiral and cannot adopt a handed conformation",
          "Proline's side chain is charged at physiological pH",
        ],
        answer: 1,
        explanation:
          "Proline's side chain cyclizes back onto its own backbone nitrogen, so there is no N–H available to hydrogen bond, and the ring rigidly constrains the phi angle. Glycine, not proline, is the achiral residue; proline's side chain is uncharged.",
      },
      {
        id: "bb-q-aa-5",
        prompt:
          "A researcher treats a protein with beta-mercaptoethanol and observes loss of quaternary structure. Which interaction was disrupted?",
        options: [
          "Hydrogen bonds between beta strands",
          "Disulfide bridges between cysteine residues",
          "Peptide bonds in the backbone",
          "Hydrophobic interactions in the core",
        ],
        answer: 1,
        explanation:
          "Beta-mercaptoethanol is a reducing agent that cleaves disulfide bonds between cysteines. Peptide bonds require hydrolysis, not reduction, and would represent loss of primary structure.",
      },
    ],
  },
  {
    id: "bb-q-enz",
    section: "bb",
    title: "Enzyme Kinetics & Regulation",
    description:
      "Michaelis–Menten behavior, the four inhibition patterns, and allosteric control.",
    questions: [
      {
        id: "bb-q-enz-1",
        prompt:
          "An inhibitor is added to an enzyme reaction. Lineweaver–Burk analysis shows an unchanged y-intercept but a steeper slope. What type of inhibition is this?",
        options: ["Competitive", "Noncompetitive", "Uncompetitive", "Mixed"],
        answer: 0,
        explanation:
          "The y-intercept is 1/Vmax; unchanged means Vmax is preserved. The steeper slope (Km/Vmax) means Km rose. Vmax unchanged with Km increased is the signature of competitive inhibition — saturating substrate outcompetes the inhibitor for the active site.",
      },
      {
        id: "bb-q-enz-2",
        prompt:
          "An enzyme has a Km of 2 mM. At a substrate concentration of 2 mM, the reaction velocity is what fraction of Vmax?",
        options: ["1/4", "1/2", "2/3", "Equal to Vmax"],
        answer: 1,
        explanation:
          "Km is defined as the substrate concentration at half-maximal velocity. Substituting [S] = Km into v = Vmax[S]/(Km + [S]) gives Vmax·Km/(2Km) = Vmax/2. No calculation is really needed — this is the definition of Km.",
      },
      {
        id: "bb-q-enz-3",
        prompt:
          "An inhibitor binds only to the enzyme–substrate complex. Compared to the uninhibited reaction, what happens to Km and Vmax?",
        options: [
          "Km increases, Vmax unchanged",
          "Km unchanged, Vmax decreases",
          "Km decreases, Vmax decreases",
          "Km increases, Vmax decreases",
        ],
        answer: 2,
        explanation:
          "This is uncompetitive inhibition. Binding ES and removing it from solution pulls the E + S ⇌ ES equilibrium forward by Le Châtelier, so apparent affinity rises and Km falls. Vmax falls because ES is being sequestered. Both drop, so the Lineweaver–Burk lines are parallel.",
      },
      {
        id: "bb-q-enz-4",
        prompt:
          "An enzyme shows a sigmoidal rather than hyperbolic velocity-versus-[S] curve. What does this most strongly suggest?",
        options: [
          "The enzyme is operating below its optimal pH",
          "The enzyme has multiple subunits with cooperative substrate binding",
          "A competitive inhibitor is present",
          "The enzyme has an unusually low Km",
        ],
        answer: 1,
        explanation:
          "Sigmoidal kinetics indicate cooperativity: binding at one site increases affinity at others, which requires multiple binding sites — hence multiple subunits. Such enzymes (PFK-1, hemoglobin as a transport analog) do not obey Michaelis–Menten kinetics, so Km is not strictly defined.",
      },
      {
        id: "bb-q-enz-5",
        prompt:
          "Adding a catalyst to a reaction at equilibrium will:",
        options: [
          "Shift the equilibrium toward products",
          "Increase the equilibrium constant",
          "Increase the rates of the forward and reverse reactions equally",
          "Decrease the reaction's ΔG",
        ],
        answer: 2,
        explanation:
          "A catalyst lowers the activation energy of a single transition state shared by both directions, so both rates rise by the same factor and equilibrium is reached faster but is not displaced. K, ΔG, and ΔG° are thermodynamic quantities and are untouched.",
      },
      {
        id: "bb-q-enz-6",
        prompt:
          "Which best describes why feedback inhibition typically targets the first committed step of a pathway?",
        options: [
          "The first enzyme is always the fastest",
          "It prevents wasteful accumulation of intermediates that have no other use",
          "Only the first enzyme has an allosteric site",
          "Later enzymes are irreversible and cannot be regulated",
        ],
        answer: 1,
        explanation:
          "Inhibiting after intermediates have already been made would waste the energy and carbon invested in them. Shutting down the committed step — the first one whose product is dedicated to this pathway — avoids that waste. The other options assert things that are simply not generally true.",
      },
    ],
  },
  {
    id: "bb-q-met",
    section: "bb",
    title: "Metabolism & Bioenergetics",
    description:
      "Glycolysis, the citric acid cycle, oxidative phosphorylation, and fed/fasting regulation.",
    questions: [
      {
        id: "bb-q-met-1",
        prompt:
          "A cell is treated with a compound that makes the inner mitochondrial membrane freely permeable to protons. What is the immediate effect?",
        options: [
          "Both oxygen consumption and ATP synthesis fall",
          "Oxygen consumption rises while ATP synthesis falls",
          "Both oxygen consumption and ATP synthesis rise",
          "Oxygen consumption falls while ATP synthesis rises",
        ],
        answer: 1,
        explanation:
          "This is an uncoupler. Collapsing the gradient removes the back-pressure on the electron transport chain, so electron flow and O2 consumption accelerate — but with no gradient, ATP synthase cannot make ATP, and the energy dissipates as heat. Students often pick A by assuming everything shuts down; the diagnostic feature of uncoupling is precisely that respiration speeds up.",
      },
      {
        id: "bb-q-met-2",
        prompt:
          "Which glycolytic enzyme catalyzes the rate-limiting, committed step and is activated by fructose-2,6-bisphosphate?",
        options: ["Hexokinase", "Phosphofructokinase-1", "Pyruvate kinase", "Aldolase"],
        answer: 1,
        explanation:
          "PFK-1 is the committed step of glycolysis and its main control point. F-2,6-BP, produced under insulin signaling in the fed state, allosterically activates it and overrides inhibition by ATP — which is how the liver keeps glycolysis running even when ATP is abundant.",
      },
      {
        id: "bb-q-met-3",
        prompt:
          "A patient has a mutation abolishing pyruvate carboxylase activity. Which process is most directly impaired?",
        options: [
          "Glycolysis",
          "Beta-oxidation of fatty acids",
          "Gluconeogenesis from lactate",
          "The pentose phosphate pathway",
        ],
        answer: 2,
        explanation:
          "Pyruvate carboxylase converts pyruvate to oxaloacetate, the first bypass step of gluconeogenesis. Without it, lactate and alanine cannot be routed back into glucose. Glycolysis runs in the opposite direction and does not use this enzyme.",
      },
      {
        id: "bb-q-met-4",
        prompt:
          "Why can't acetyl-CoA derived from even-chain fatty acids serve as a net source of glucose in humans?",
        options: [
          "Acetyl-CoA cannot cross the mitochondrial membrane",
          "The pyruvate dehydrogenase reaction is irreversible",
          "Humans lack the enzymes of gluconeogenesis",
          "Acetyl-CoA is consumed entirely by ketogenesis",
        ],
        answer: 1,
        explanation:
          "PDH irreversibly decarboxylates pyruvate to acetyl-CoA, so there is no route back. Acetyl-CoA entering the citric acid cycle contributes two carbons but two leave as CO2, giving no net oxaloacetate. Odd-chain fatty acids are the exception, since they yield glucogenic propionyl-CoA.",
      },
      {
        id: "bb-q-met-5",
        prompt:
          "During prolonged fasting, the brain's primary alternative fuel becomes:",
        options: ["Fatty acids", "Ketone bodies", "Lactate", "Amino acids"],
        answer: 1,
        explanation:
          "Long-chain fatty acids are albumin-bound and do not cross the blood-brain barrier well, so the brain switches to ketone bodies made by the liver. This shift spares muscle protein that would otherwise be catabolized for gluconeogenesis.",
      },
      {
        id: "bb-q-met-6",
        prompt:
          "NADH delivers electrons to Complex I while FADH2 enters at Complex II. This explains why:",
        options: [
          "FADH2 yields fewer ATP per molecule than NADH",
          "FADH2 is produced only in the cytosol",
          "NADH cannot be oxidized without oxygen",
          "Complex II pumps more protons than Complex I",
        ],
        answer: 0,
        explanation:
          "Entering downstream at Complex II bypasses Complex I's proton pumping, so FADH2 drives fewer protons across the membrane — roughly 1.5 ATP versus 2.5 for NADH. Complex II pumps no protons at all, making D exactly backward.",
      },
      {
        id: "bb-q-met-7",
        prompt:
          "Glucokinase in hepatocytes has a much higher Km for glucose than hexokinase in muscle. What is the physiological consequence?",
        options: [
          "The liver takes up glucose preferentially at low blood glucose",
          "The liver takes up glucose mainly when blood glucose is high, after a meal",
          "Muscle cannot phosphorylate glucose at all",
          "The liver cannot store glycogen",
        ],
        answer: 1,
        explanation:
          "A high Km means low affinity, so glucokinase only operates appreciably when glucose is plentiful — exactly the postprandial condition when the liver should be storing glucose rather than competing with the brain for it. Its insensitivity to G6P inhibition lets it keep working during that window.",
      },
    ],
  },
  {
    id: "bb-q-mol",
    section: "bb",
    title: "Molecular Biology & Genetics",
    description:
      "Replication, transcription, translation, operons, and laboratory techniques.",
    questions: [
      {
        id: "bb-q-mol-1",
        prompt:
          "A single nucleotide is deleted from the middle of a coding sequence. Compared with a single-base substitution at the same site, this deletion is more likely to:",
        options: [
          "Have no effect on the protein",
          "Change one amino acid only",
          "Alter every downstream codon and often introduce a premature stop",
          "Prevent transcription of the gene entirely",
        ],
        answer: 2,
        explanation:
          "A deletion of one base shifts the reading frame, so all downstream codons are misread and a premature stop usually appears — the protein is typically nonfunctional. A substitution changes at most one residue. Neither prevents transcription, which depends on the promoter.",
      },
      {
        id: "bb-q-mol-2",
        prompt:
          "In the lac operon, maximum transcription of the lac genes occurs when:",
        options: [
          "Lactose is present and glucose is present",
          "Lactose is present and glucose is absent",
          "Lactose is absent and glucose is absent",
          "Lactose is absent and glucose is present",
        ],
        answer: 1,
        explanation:
          "Two conditions must be met. Lactose (via allolactose) inactivates the repressor, removing the block. Absent glucose raises cAMP, so CAP–cAMP binds and strongly activates transcription. With glucose present, catabolite repression keeps expression low even if lactose is around — the cell prefers glucose.",
      },
      {
        id: "bb-q-mol-3",
        prompt:
          "Which enzyme activity allows DNA polymerase III to achieve its very low error rate?",
        options: [
          "5'→3' exonuclease",
          "3'→5' exonuclease",
          "Helicase",
          "Ligase",
        ],
        answer: 1,
        explanation:
          "The 3'→5' exonuclease is the proofreading activity: it excises a mismatched nucleotide just added, letting the polymerase retry. The 5'→3' exonuclease belongs to Pol I and removes RNA primers. Helicase and ligase are separate enzymes entirely.",
      },
      {
        id: "bb-q-mol-4",
        prompt:
          "A researcher wants to determine whether a specific protein is present in a tissue lysate. Which technique is appropriate?",
        options: ["Southern blot", "Northern blot", "Western blot", "PCR"],
        answer: 2,
        explanation:
          "Western blots detect protein using antibodies. Southern detects DNA, Northern detects RNA, and PCR amplifies DNA. Note that detecting the mRNA (Northern) would not answer the question, since transcript presence does not guarantee protein.",
      },
      {
        id: "bb-q-mol-5",
        prompt:
          "Histone acetylation generally increases transcription because it:",
        options: [
          "Adds negative charge to lysines, loosening histone–DNA binding",
          "Neutralizes the positive charge on lysines, loosening histone–DNA binding",
          "Directly recruits RNA polymerase II to the promoter",
          "Methylates CpG islands in the promoter",
        ],
        answer: 1,
        explanation:
          "Acetylation neutralizes lysine's positive charge, weakening its electrostatic grip on the negatively charged DNA backbone. Chromatin loosens toward euchromatin and becomes accessible. It does not add negative charge (A), and DNA methylation (D) is a distinct, generally silencing modification.",
      },
      {
        id: "bb-q-mol-6",
        prompt:
          "In a population at Hardy–Weinberg equilibrium, 16% of individuals express a recessive phenotype. What fraction of the population is heterozygous?",
        options: ["0.16", "0.24", "0.48", "0.60"],
        answer: 2,
        explanation:
          "q² = 0.16, so q = 0.4 and p = 0.6. Heterozygotes are 2pq = 2(0.6)(0.4) = 0.48. A frequent error is taking q² = 0.16 to mean q = 0.16 — remember the recessive phenotype frequency is the square of the allele frequency.",
      },
    ],
  },
  {
    id: "bb-q-phys",
    section: "bb",
    title: "Organ Systems Physiology",
    description:
      "Cardiovascular, respiratory, renal, endocrine, and immune integration.",
    questions: [
      {
        id: "bb-q-phys-1",
        prompt:
          "During exercise, actively contracting muscle produces CO2, heat, and H+. The effect on the oxygen–hemoglobin dissociation curve is:",
        options: [
          "A left shift, increasing O2 affinity",
          "A right shift, decreasing O2 affinity and promoting unloading",
          "No shift, since hemoglobin's affinity is fixed",
          "A right shift, increasing O2 affinity",
        ],
        answer: 1,
        explanation:
          "All three changes shift the curve right (the Bohr effect), lowering affinity so hemoglobin releases O2 precisely where metabolic demand is highest. Note D is internally contradictory: a right shift by definition means lower affinity.",
      },
      {
        id: "bb-q-phys-2",
        prompt:
          "Blood velocity is lowest in the capillaries even though they are the narrowest vessels. This is because:",
        options: [
          "Capillary walls exert the most frictional resistance",
          "Total cross-sectional area is greatest at the capillary bed",
          "Blood pressure is highest there",
          "Capillaries contain the most blood by volume",
        ],
        answer: 1,
        explanation:
          "By continuity (Q = A·v), velocity varies inversely with total cross-sectional area. Individual capillaries are tiny, but there are billions in parallel, so their summed area vastly exceeds the aorta's — and flow slows, which is functionally ideal for exchange.",
      },
      {
        id: "bb-q-phys-3",
        prompt:
          "A patient's blood osmolarity rises. Which hormone is released, and what does it do?",
        options: [
          "Aldosterone; increases Na+ reabsorption in the distal tubule",
          "ADH; inserts aquaporins in the collecting duct to reabsorb water",
          "Atrial natriuretic peptide; promotes Na+ excretion",
          "Renin; converts angiotensinogen to angiotensin I",
        ],
        answer: 1,
        explanation:
          "High osmolarity is a water problem, so the response must be water-specific: ADH from the posterior pituitary adds aquaporins to the collecting duct, reabsorbing free water and diluting the blood. Aldosterone reabsorbs Na+ with water following, which addresses volume rather than osmolarity.",
      },
      {
        id: "bb-q-phys-4",
        prompt:
          "Which best explains why the ascending limb of the loop of Henle is essential to producing concentrated urine?",
        options: [
          "It reabsorbs water, concentrating the filtrate directly",
          "It pumps solute into the medullary interstitium while remaining water-impermeable",
          "It is the primary site of aldosterone action",
          "It secretes urea into the filtrate",
        ],
        answer: 1,
        explanation:
          "The thick ascending limb actively pumps NaCl out but is impermeable to water, so it builds the hyperosmotic medullary gradient without losing water. That gradient is what later draws water out of the ADH-responsive collecting duct. The ascending limb itself never reabsorbs water.",
      },
      {
        id: "bb-q-phys-5",
        prompt:
          "A steroid hormone and a peptide hormone are compared. Which statement is accurate?",
        options: [
          "The steroid acts faster because it does not require a receptor",
          "The peptide binds an intracellular receptor and alters transcription",
          "The steroid crosses the membrane and typically acts as a transcription factor",
          "Both require second messengers to produce their effects",
        ],
        answer: 2,
        explanation:
          "Steroids are lipophilic, diffuse through the membrane, bind intracellular receptors, and act on gene transcription — slow onset, long duration. Peptides are hydrophilic, bind surface receptors, and act through second messengers. Steroids still require receptors; they are just intracellular.",
      },
      {
        id: "bb-q-phys-6",
        prompt:
          "A virus infects a hepatocyte. Which immune mechanism is best suited to eliminate the infected cell?",
        options: [
          "IgA antibodies in mucosal secretions",
          "CD8+ cytotoxic T cells recognizing viral peptide on MHC I",
          "CD4+ helper T cells recognizing viral peptide on MHC I",
          "Complement-mediated lysis of the free virus",
        ],
        answer: 1,
        explanation:
          "Once a virus is inside a cell, antibodies cannot reach it. All nucleated cells display endogenous peptides on MHC I, and CD8+ cytotoxic T cells recognize that complex and kill the cell. CD4+ cells pair with MHC II, not MHC I, so C mismatches the pairing.",
      },
    ],
  },
];
