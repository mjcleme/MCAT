import type { ExamSection } from "@/lib/exam-types";

/**
 * Biological and Biochemical Foundations — 30 questions in 48 minutes.
 * Three passage sets (5 questions each) plus 15 discretes.
 */
export const examBioBiochem: ExamSection = {
  id: "bb",
  minutes: 48,
  blocks: [
    {
      kind: "passage",
      id: "bb-p1",
      title: "Passage I — A Kinetic Study of Hexokinase Isoforms",
      text: `Mammals express four hexokinase isoforms. Hexokinases I–III are found in most tissues and are inhibited by their product, glucose-6-phosphate (G6P). Hexokinase IV, called glucokinase, is restricted to hepatocytes and pancreatic beta cells and is not inhibited by G6P.

Investigators measured initial velocities for purified hexokinase I and glucokinase across a range of glucose concentrations, at saturating ATP:

  [Glucose] (mM)   v (HK I, % Vmax)   v (GK, % Vmax)
  0.1              67                 1
  0.5              91                 6
  2.0              98                 20
  8.0              99                 50
  20.0            100                 71

Fasting blood glucose is approximately 5 mM; postprandial values reach 8–10 mM. Portal vein glucose, which perfuses the liver directly from the gut, can transiently exceed 15 mM after a carbohydrate-rich meal.

The investigators then repeated the glucokinase assay in the presence of purified glucokinase regulatory protein (GKRP) and fructose-6-phosphate. Under these conditions glucokinase activity fell sharply, and the enzyme was recovered in a nuclear fraction rather than the cytosol. Addition of fructose-1-phosphate reversed both effects.`,
      questions: [
        {
          id: "bb-p1-q1",
          prompt:
            "Based on the data, the approximate Km of glucokinase for glucose is:",
          options: ["0.1 mM", "2 mM", "8 mM", "20 mM"],
          answer: 2,
          explanation:
            "Km is by definition the substrate concentration at half-maximal velocity. The table shows glucokinase at 50% Vmax when glucose is 8.0 mM. No calculation is needed — read it off the table. Hexokinase I, by contrast, reaches 50% far below 0.1 mM, consistent with its much lower Km.",
        },
        {
          id: "bb-p1-q2",
          prompt:
            "The kinetic differences between the two isoforms best explain why:",
          options: [
            "the liver takes up glucose primarily when blood glucose is elevated",
            "the brain cannot metabolize glucose during fasting",
            "hexokinase I is the rate-limiting enzyme of glycolysis",
            "glucokinase has a higher Vmax than hexokinase I",
          ],
          answer: 0,
          explanation:
            "Glucokinase's high Km means it operates well below capacity at fasting glucose (5 mM) and only engages appreciably as glucose rises — exactly when the liver should store rather than compete with the brain. Hexokinase I is near-saturated even at 0.5 mM, so peripheral tissues stay supplied at low glucose. Choice C is false: PFK-1 is the rate-limiting glycolytic enzyme.",
        },
        {
          id: "bb-p1-q3",
          prompt:
            "Product inhibition of hexokinase I by G6P, but not of glucokinase, is physiologically important because it:",
          options: [
            "allows the liver to continue phosphorylating glucose when G6P accumulates",
            "prevents the liver from storing glycogen",
            "makes hexokinase I insensitive to blood glucose",
            "converts glucokinase into an allosteric enzyme",
          ],
          answer: 0,
          explanation:
            "If glucokinase were product-inhibited, the liver would stop trapping glucose exactly when it was successfully storing it. Escaping that inhibition lets hepatocytes keep pulling glucose from portal blood while G6P builds toward glycogen. Hexokinase I's inhibition is appropriate for tissues that phosphorylate glucose for their own immediate use.",
        },
        {
          id: "bb-p1-q4",
          prompt:
            "The GKRP experiment indicates that glucokinase is regulated by:",
          options: [
            "covalent modification via phosphorylation",
            "sequestration in the nucleus, reversed by fructose-1-phosphate",
            "irreversible proteolytic cleavage",
            "competitive inhibition by fructose-6-phosphate at the active site",
          ],
          answer: 1,
          explanation:
            "The passage reports that with GKRP and F6P, activity fell and the enzyme appeared in the nuclear fraction — physical relocation, not chemical modification. F1P reversed both. Choice D misreads the role of F6P: it promotes GKRP binding rather than competing at the glucose site, which is why the enzyme moves compartments.",
        },
        {
          id: "bb-p1-q5",
          prompt:
            "Fructose-1-phosphate is generated during fructose metabolism after a meal. Its effect on the GKRP system suggests that dietary fructose:",
          options: [
            "inhibits hepatic glucose phosphorylation",
            "releases glucokinase into the cytosol, increasing hepatic glucose uptake",
            "has no effect on glucose handling",
            "converts glucokinase to hexokinase I",
          ],
          answer: 1,
          explanation:
            "F1P reversed the sequestration, so its presence frees glucokinase back into the cytosol where its substrate is. Since F1P appears specifically after a meal containing fructose, this is a feed-forward signal coupling a dietary sugar to hepatic glucose trapping. The reasoning runs directly from the passage's last sentence.",
        },
      ],
    },
    {
      kind: "passage",
      id: "bb-p2",
      title: "Passage II — A Mutation in a Splice Acceptor Site",
      text: `A consanguineous family presented with a recessive metabolic disorder. Affected individuals produce a truncated form of enzyme Q, which lacks the C-terminal catalytic domain and has no measurable activity. Sequencing of the Q gene revealed no mutation in any exon.

Further analysis identified a single A→G substitution in the last nucleotide of intron 4, within the canonical 3' splice acceptor site. RT-PCR of patient mRNA showed a transcript 87 nucleotides shorter than wild type. Sequencing of the patient transcript revealed that exon 5 was absent; exon 4 was joined directly to exon 6.

Exon 5 is 87 nucleotides long. The wild-type protein is 412 amino acids; the patient protein terminates at residue 198.

A second, unrelated patient carried a different mutation in the same gene: a single nucleotide insertion in exon 3. That patient's protein terminated at residue 74.`,
      questions: [
        {
          id: "bb-p2-q1",
          prompt:
            "Why did exon sequencing initially fail to identify the causative mutation?",
          options: [
            "The mutation lies in an intron, which is not sequenced in an exon-only analysis",
            "The mutation is silent at the protein level",
            "The patient is heterozygous",
            "The mutation affects a regulatory promoter element",
          ],
          answer: 0,
          explanation:
            "The substitution sits in the last nucleotide of intron 4 — intronic sequence, invisible to an exon-only screen. This is a well-known limitation of exome sequencing: splice-site mutations at intron boundaries can be pathogenic while lying just outside the captured region.",
        },
        {
          id: "bb-p2-q2",
          prompt:
            "Skipping exon 5 removes 87 nucleotides. What is the consequence for the reading frame of exon 6?",
          options: [
            "The frame shifts, because 87 is not divisible by 3",
            "The frame is preserved, because 87 is divisible by 3",
            "The frame shifts, because splicing always disrupts the frame",
            "The frame cannot be determined without knowing the intron length",
          ],
          answer: 1,
          explanation:
            "87 ÷ 3 = 29, so exactly 29 codons are removed and downstream codons are read in the original frame. The introns themselves are spliced out and never contribute to the reading frame, which makes choice D a distractor. This is why the resulting protein is an internally deleted product rather than a frameshifted one.",
        },
        {
          id: "bb-p2-q3",
          prompt:
            "Given that the frame is preserved, the truncation at residue 198 is best explained by:",
          options: [
            "a frameshift introduced by exon skipping",
            "a stop codon created at the new exon 4–exon 6 junction",
            "premature termination of transcription",
            "proteolytic cleavage of the mature protein",
          ],
          answer: 1,
          explanation:
            "With the frame intact, a frameshift cannot be the cause (eliminating A). The remaining in-frame explanation is that joining exon 4 directly to exon 6 brings together codon fragments that form a stop codon at the novel junction — a junction that does not exist in the wild-type transcript. Termination at residue 198, well short of 412, is a translational event, not a transcriptional one.",
        },
        {
          id: "bb-p2-q4",
          prompt:
            "The second patient's single-nucleotide insertion in exon 3 caused termination at residue 74. This mutation is best classified as:",
          options: ["Silent", "Missense", "Frameshift", "In-frame deletion"],
          answer: 2,
          explanation:
            "Inserting one nucleotide shifts the reading frame, so every downstream codon is misread and a premature stop typically appears quickly — here at residue 74. A frameshift requires an insertion or deletion not divisible by three, which is exactly the contrast with the first patient's in-frame exon skip.",
        },
        {
          id: "bb-p2-q5",
          prompt:
            "The family is consanguineous and the disorder is recessive. An unaffected sibling of an affected individual has what probability of being a carrier?",
          options: ["1/4", "1/3", "1/2", "2/3"],
          answer: 3,
          explanation:
            "A cross of two carriers gives 1 AA : 2 Aa : 1 aa. The sibling is known to be unaffected, which removes the aa outcome from the sample space, leaving 1 AA : 2 Aa. So the probability of being a carrier is 2/3. Answering 1/2 means forgetting to condition on the information that the sibling is unaffected.",
        },
      ],
    },
    {
      kind: "passage",
      id: "bb-p3",
      title: "Passage III — Cardiac Output During Hemorrhage",
      text: `A normotensive volunteer donated 450 mL of blood. Investigators measured cardiac parameters before and 10 minutes after donation:

                        Before    After
  Heart rate (bpm)      68        82
  Stroke volume (mL)    75        66
  Cardiac output (L/min) 5.1      5.4
  Mean arterial pressure 92       90
  Total peripheral resistance (relative) 1.00  1.05

In a separate protocol, a patient with an implanted pacemaker set to a fixed rate of 70 bpm underwent the same donation. Her stroke volume fell from 74 to 63 mL, and her mean arterial pressure fell from 94 to 79 mmHg.

Baroreceptors in the carotid sinus and aortic arch fire in proportion to arterial stretch. Their afferents project to the medullary cardiovascular centers.`,
      questions: [
        {
          id: "bb-p3-q1",
          prompt:
            "The fall in stroke volume immediately after donation is best explained by:",
          options: [
            "decreased contractility of the ventricle",
            "reduced venous return and therefore reduced end-diastolic volume",
            "increased afterload from peripheral vasoconstriction",
            "impaired valve function",
          ],
          answer: 1,
          explanation:
            "Removing 450 mL lowers venous return, which lowers ventricular filling (preload). By the Frank–Starling relationship, less stretch means a weaker contraction and a smaller stroke volume. Contractility is unchanged — indeed the sympathetic response increases it. The small rise in TPR is a compensation, not the cause.",
        },
        {
          id: "bb-p3-q2",
          prompt:
            "Why did the volunteer's mean arterial pressure fall only slightly despite the loss of blood volume?",
          options: [
            "Baroreceptor-mediated increases in heart rate and resistance compensated",
            "Blood volume was immediately restored from the interstitium",
            "Stroke volume increased to offset the loss",
            "The kidneys secreted renin within 10 minutes, restoring volume",
          ],
          answer: 0,
          explanation:
            "Reduced stretch lowers baroreceptor firing, which the medulla reads as falling pressure and answers with sympathetic outflow: heart rate rose from 68 to 82 and TPR rose 5%. Since MAP ≈ CO × TPR, and CO actually rose, pressure was nearly defended. Choice D confuses timescales — RAAS acts over hours, not ten minutes.",
        },
        {
          id: "bb-p3-q3",
          prompt:
            "The pacemaker patient's larger fall in MAP is most directly attributable to:",
          options: [
            "greater blood loss in her protocol",
            "her inability to increase heart rate in response to baroreceptor signaling",
            "a defect in her baroreceptors",
            "reduced contractility caused by the pacemaker",
          ],
          answer: 1,
          explanation:
            "Her fixed-rate pacemaker eliminated the chronotropic limb of the baroreflex. With stroke volume down and heart rate pinned at 70, cardiac output necessarily fell, and MAP fell 15 mmHg rather than 2. This is a natural experiment isolating the contribution of the heart rate response. Her baroreceptors likely fired normally — the effector was blocked, not the sensor.",
        },
        {
          id: "bb-p3-q4",
          prompt:
            "Baroreceptor firing rate immediately after donation, compared with before, would be:",
          options: [
            "increased, because sympathetic tone increased",
            "decreased, because arterial stretch decreased",
            "unchanged, because MAP was nearly unchanged",
            "decreased, because the receptors adapt within seconds",
          ],
          answer: 1,
          explanation:
            "Baroreceptors are stretch sensors, and reduced volume means reduced stretch — firing falls. That reduction is the signal that triggers the compensation. Choice C inverts the causality: MAP is nearly unchanged BECAUSE the reflex was activated, which required firing to fall first.",
        },
        {
          id: "bb-p3-q5",
          prompt:
            "Cardiac output rose slightly in the volunteer despite the fall in stroke volume. This is because:",
          options: [
            "CO = HR × SV, and the proportional rise in heart rate exceeded the fall in stroke volume",
            "cardiac output is independent of stroke volume",
            "the measurement is within experimental error",
            "peripheral resistance increased",
          ],
          answer: 0,
          explanation:
            "CO = HR × SV. Before: 68 × 75 = 5100 mL/min. After: 82 × 66 ≈ 5400 mL/min. Heart rate rose about 21% while stroke volume fell about 12%, so the product rose. The arithmetic is worth doing — the qualitative intuition that 'less blood means less output' fails here.",
        },
      ],
    },
    {
      kind: "discrete",
      id: "bb-d1",
      questions: [
        {
          id: "bb-d-q1",
          prompt:
            "Which amino acid substitution is most likely to be tolerated in a protein's hydrophobic core?",
          options: [
            "Leucine → aspartate",
            "Leucine → isoleucine",
            "Valine → lysine",
            "Phenylalanine → glutamate",
          ],
          answer: 1,
          explanation:
            "Leucine and isoleucine are both nonpolar, aliphatic, and nearly isosteric — swapping them barely perturbs the core. Every other option buries a charged side chain in a nonpolar environment, which is energetically very costly and typically destabilizing.",
        },
        {
          id: "bb-d-q2",
          prompt:
            "During which phase of meiosis do homologous chromosomes separate?",
          options: ["Anaphase I", "Anaphase II", "Metaphase I", "Telophase II"],
          answer: 0,
          explanation:
            "Anaphase I separates homologs — the reductional division that takes the cell from diploid to haploid. Anaphase II separates sister chromatids, exactly as mitotic anaphase does. Nondisjunction at anaphase I versus II produces different aneuploidy patterns.",
        },
        {
          id: "bb-d-q3",
          prompt:
            "A drug blocks the ATP-binding site of the Na+/K+ ATPase. The immediate consequence for a neuron is:",
          options: [
            "hyperpolarization of the resting membrane potential",
            "gradual dissipation of the Na+ and K+ gradients",
            "immediate loss of the action potential upstroke",
            "increased intracellular K+",
          ],
          answer: 1,
          explanation:
            "The pump maintains the gradients rather than generating the resting potential moment to moment, so effects appear gradually as gradients run down — not instantly. Action potentials continue briefly using the existing gradients, which is why C is wrong. Intracellular K+ falls, not rises.",
        },
        {
          id: "bb-d-q4",
          prompt:
            "Which best explains why the liver cannot use ketone bodies as fuel?",
          options: [
            "The liver lacks the enzyme that activates acetoacetate for oxidation",
            "The liver cannot transport ketone bodies across its membrane",
            "The liver's mitochondria lack the citric acid cycle",
            "Ketone bodies are too large to enter hepatocytes",
          ],
          answer: 0,
          explanation:
            "Hepatocytes lack succinyl-CoA:3-ketoacid CoA transferase (thiophorase), the enzyme required to reactivate acetoacetate to acetoacetyl-CoA. The liver manufactures ketone bodies for export and cannot consume its own product — an elegant division of labor that guarantees the brain gets them.",
        },
        {
          id: "bb-d-q5",
          prompt:
            "An enzyme's activity is measured at pH 2, 7, and 10. Activity is high at pH 2 and negligible at 7 and 10. This enzyme most likely functions in the:",
          options: ["Small intestine", "Stomach", "Cytosol", "Blood plasma"],
          answer: 1,
          explanation:
            "Optimal activity at pH 2 points to the gastric lumen, where pepsin works. The small intestine is near neutral-to-slightly-basic after pancreatic bicarbonate, and the cytosol and plasma are near 7.2 and 7.4 respectively.",
        },
        {
          id: "bb-d-q6",
          prompt:
            "Which structure is derived from mesoderm?",
          options: ["Epidermis", "Kidney", "Pancreas", "Neural tube"],
          answer: 1,
          explanation:
            "Kidneys arise from intermediate mesoderm. Epidermis and neural tube come from ectoderm; the pancreas is an endodermal outgrowth of the gut tube. Mesoderm supplies muscle, bone, blood, connective tissue, gonads, and kidneys.",
        },
        {
          id: "bb-d-q7",
          prompt:
            "In an operon under negative control, the repressor:",
          options: [
            "binds the promoter to recruit RNA polymerase",
            "binds the operator to block transcription",
            "binds the ribosome to prevent translation",
            "degrades the mRNA transcript",
          ],
          answer: 1,
          explanation:
            "Negative control means a repressor protein binds the operator, physically obstructing RNA polymerase's progress. Positive control is the CAP-style arrangement where an activator recruits polymerase. The lac operon uses both simultaneously.",
        },
        {
          id: "bb-d-q8",
          prompt:
            "A patient's urine osmolarity is 1100 mOsm/L while plasma osmolarity is 295 mOsm/L. This is most consistent with:",
          options: [
            "high circulating ADH",
            "diabetes insipidus",
            "excessive water intake",
            "aldosterone deficiency",
          ],
          answer: 0,
          explanation:
            "Concentrating urine far above plasma requires aquaporins in the collecting duct, which ADH inserts. Diabetes insipidus is the failure of exactly this system and produces dilute urine. Excessive water intake suppresses ADH, also giving dilute urine.",
        },
        {
          id: "bb-d-q9",
          prompt:
            "Which cell presents antigen on MHC class II?",
          options: ["Erythrocyte", "Dendritic cell", "Hepatocyte", "Skeletal muscle cell"],
          answer: 1,
          explanation:
            "MHC II is restricted to professional antigen-presenting cells — dendritic cells, macrophages, and B cells — which display exogenous peptide to CD4+ helper T cells. Hepatocytes and muscle cells carry MHC I only. Erythrocytes are anucleate and display neither, which is why transfusion matching turns on ABO rather than HLA.",
        },
        {
          id: "bb-d-q10",
          prompt:
            "The Cori cycle transfers which molecule from muscle to liver?",
          options: ["Glucose", "Lactate", "Pyruvate", "Alanine"],
          answer: 1,
          explanation:
            "Working muscle reduces pyruvate to lactate to regenerate NAD+, exports lactate, and the liver reconverts it to glucose via gluconeogenesis. The glucose–alanine cycle is the parallel pathway that moves alanine instead, carrying amino nitrogen along with the carbon skeleton.",
        },
        {
          id: "bb-d-q11",
          prompt:
            "Telomerase activity is normally high in which cells?",
          options: [
            "Mature hepatocytes",
            "Germ cells",
            "Cardiac myocytes",
            "Peripheral neurons",
          ],
          answer: 1,
          explanation:
            "Germ cells, stem cells, and most cancers express telomerase to offset the end-replication problem. Somatic cells largely silence it, which produces replicative senescence after a limited number of divisions. Neurons and cardiac myocytes are largely post-mitotic and don't face the problem.",
        },
        {
          id: "bb-d-q12",
          prompt:
            "Which event occurs during the S phase of the cell cycle?",
          options: [
            "Chromosome condensation",
            "DNA replication",
            "Separation of sister chromatids",
            "Nuclear envelope breakdown",
          ],
          answer: 1,
          explanation:
            "S phase is synthesis: DNA replicates, producing sister chromatids joined at the centromere. Condensation, envelope breakdown, and chromatid separation all belong to M phase.",
        },
        {
          id: "bb-d-q13",
          prompt:
            "An inhibitor of the F0 subunit of ATP synthase would cause:",
          options: [
            "collapse of the proton gradient",
            "accumulation of protons in the intermembrane space and eventual slowing of electron transport",
            "increased ATP synthesis",
            "increased oxygen consumption",
          ],
          answer: 1,
          explanation:
            "F0 is the proton channel. Blocking it stops the return path, so protons accumulate and the gradient steepens until the back-pressure makes further pumping thermodynamically unfavorable — electron transport and O2 consumption then slow. This is the mirror image of an uncoupler, which collapses the gradient and speeds respiration up.",
        },
        {
          id: "bb-d-q14",
          prompt:
            "Which hormone is released by the duodenum in response to acidic chyme?",
          options: ["Gastrin", "Secretin", "Insulin", "Cholecystokinin"],
          answer: 1,
          explanation:
            "Secretin responds to acid and triggers pancreatic bicarbonate secretion, neutralizing the chyme so intestinal enzymes can work. CCK also comes from the duodenum but responds to fats and proteins. Gastrin stimulates acid production — the opposite direction.",
        },
        {
          id: "bb-d-q15",
          prompt:
            "During skeletal muscle contraction, calcium binds directly to:",
          options: ["Myosin", "Actin", "Troponin C", "Tropomyosin"],
          answer: 2,
          explanation:
            "Ca2+ binds troponin C, which shifts the troponin complex and drags tropomyosin off actin's myosin-binding sites. Note that smooth muscle solves the same problem differently: Ca2+ binds calmodulin, which activates myosin light chain kinase, since smooth muscle has no troponin.",
        },
      ],
    },
  ],
};
