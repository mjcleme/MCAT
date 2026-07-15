import type { Quiz } from "@/lib/types";

export const psychSocQuizzes: Quiz[] = [
  {
    id: "ps-q-sp",
    section: "ps",
    title: "Sensation, Perception & Consciousness",
    description:
      "Thresholds, signal detection, sensory pathways, Gestalt organization, and sleep.",
    questions: [
      {
        id: "ps-q-sp-1",
        prompt:
          "A radiologist reading scans is told that a rare tumor has been appearing more often lately. She subsequently reports more suspected tumors, including several false alarms. In signal detection terms, what changed?",
        options: [
          "Her sensitivity (d') increased",
          "Her response criterion became more liberal",
          "Her absolute threshold decreased",
          "Her difference threshold decreased",
        ],
        answer: 1,
        explanation:
          "Nothing improved her actual ability to distinguish tumors from artifacts — the images are unchanged. Expectation shifted her willingness to say 'yes,' which raises both hits and false alarms together. That is a criterion shift, and separating it from true sensitivity is precisely what signal detection theory exists to do.",
      },
      {
        id: "ps-q-sp-2",
        prompt:
          "A person can just barely detect the difference between a 100 g and a 102 g weight. According to Weber's law, the smallest detectable difference from a 500 g weight would be about:",
        options: ["2 g", "4 g", "10 g", "102 g"],
        answer: 2,
        explanation:
          "Weber's law says the JND is a constant proportion: 2/100 = 2%. For 500 g, that is 0.02 × 500 = 10 g. The key insight is that the JND scales with the stimulus rather than staying fixed at 2 g — which is why choice A is the intuitive trap.",
      },
      {
        id: "ps-q-sp-3",
        prompt:
          "After staring at a red image and looking away, a person sees a green afterimage. This is best explained by:",
        options: [
          "Trichromatic theory",
          "Opponent-process theory",
          "Place theory",
          "Signal detection theory",
        ],
        answer: 1,
        explanation:
          "Opponent-process theory holds that cells encode color in antagonistic pairs (red/green, blue/yellow). Fatiguing the red response leaves the green side unopposed, producing the afterimage. Trichromatic theory describes the three cone types at the retina and cannot explain afterimages — both theories are correct at different stages of processing.",
      },
      {
        id: "ps-q-sp-4",
        prompt:
          "Which EEG feature is characteristic of stage 2 non-REM sleep?",
        options: [
          "Beta waves",
          "Sleep spindles and K-complexes",
          "Delta waves",
          "Alpha waves",
        ],
        answer: 1,
        explanation:
          "Sleep spindles and K-complexes define stage 2. Delta waves mark stage 3 (slow-wave sleep); beta waves indicate alert wakefulness — and notably REM, which is why REM is called paradoxical sleep; alpha appears during relaxed wakefulness with eyes closed.",
      },
      {
        id: "ps-q-sp-5",
        prompt:
          "Seeing a dotted outline of a circle as a complete circle demonstrates which Gestalt principle?",
        options: ["Proximity", "Similarity", "Closure", "Common fate"],
        answer: 2,
        explanation:
          "Closure is the tendency to fill in gaps to perceive a complete, whole figure. Proximity groups by nearness, similarity by shared features, and common fate by shared motion.",
      },
    ],
  },
  {
    id: "ps-q-lm",
    section: "ps",
    title: "Learning & Memory",
    description:
      "Conditioning paradigms, reinforcement schedules, memory systems, and interference.",
    questions: [
      {
        id: "ps-q-lm-1",
        prompt:
          "A child's tantrum stops when a parent buys candy. In terms of the PARENT's behavior, buying the candy was:",
        options: [
          "Positively reinforced",
          "Negatively reinforced",
          "Positively punished",
          "Negatively punished",
        ],
        answer: 1,
        explanation:
          "The parent's buying behavior removed an aversive stimulus (the tantrum) and will therefore increase in future — removal plus increase equals negative reinforcement. The question hinges on whose behavior you analyze: the child's tantrum was positively reinforced by the candy. Reading the wrong actor is the intended trap.",
      },
      {
        id: "ps-q-lm-2",
        prompt:
          "Which reinforcement schedule produces behavior most resistant to extinction?",
        options: ["Fixed ratio", "Variable ratio", "Fixed interval", "Continuous"],
        answer: 1,
        explanation:
          "Variable ratio delivers reinforcement after an unpredictable number of responses, so a run without reward is indistinguishable from normal variation — the learner keeps going. Continuous reinforcement extinguishes fastest, because the very first missed reward is a clear signal that contingencies changed.",
      },
      {
        id: "ps-q-lm-3",
        prompt:
          "A patient with bilateral hippocampal damage can learn to trace a figure in a mirror with improving skill across sessions, yet denies ever having done the task. This dissociation shows that:",
        options: [
          "Procedural memory is independent of the hippocampus",
          "The patient is confabulating",
          "Short-term memory is intact but long-term memory is destroyed",
          "Implicit memory requires conscious rehearsal",
        ],
        answer: 0,
        explanation:
          "Improving performance proves procedural (implicit) memory is forming, while the absent recollection shows explicit memory is not. Since the hippocampus is damaged, procedural learning must depend on other structures — the cerebellum and basal ganglia. This is the classic H.M. finding. Choice C is wrong because his procedural long-term memory is demonstrably intact.",
      },
      {
        id: "ps-q-lm-4",
        prompt:
          "A student studies for a French exam, then studies Spanish, and later performs poorly on the French exam. This is an example of:",
        options: [
          "Proactive interference",
          "Retroactive interference",
          "Source amnesia",
          "The misinformation effect",
        ],
        answer: 1,
        explanation:
          "New learning (Spanish) disrupted retrieval of older material (French), which is retroactive interference — the disruption acts backward in time. Proactive would be the reverse: old French knowledge intruding on new Spanish learning.",
      },
      {
        id: "ps-q-lm-5",
        prompt:
          "In a free-recall task, participants remember the first and last items of a list better than the middle. If a 30-second distractor task is inserted before recall, what happens?",
        options: [
          "Both primacy and recency effects disappear",
          "The recency effect disappears but primacy remains",
          "The primacy effect disappears but recency remains",
          "Neither effect changes",
        ],
        answer: 1,
        explanation:
          "Recency depends on the last items still sitting in short-term memory, which a distractor task flushes. Primacy reflects items already rehearsed into long-term memory, which the delay leaves intact. This dissociation is a key piece of evidence for separate memory stores.",
      },
    ],
  },
  {
    id: "ps-q-social",
    section: "ps",
    title: "Social Psychology",
    description:
      "Attribution, dissonance, conformity and obedience, group dynamics, and persuasion.",
    questions: [
      {
        id: "ps-q-social-1",
        prompt:
          "Participants who were paid $1 to tell someone a boring task was interesting later rated the task as more enjoyable than those paid $20. This is best explained by:",
        options: [
          "Operant conditioning — the $1 group was reinforced more effectively",
          "Cognitive dissonance — the $1 group lacked sufficient external justification",
          "The overjustification effect — payment undermined intrinsic motivation",
          "Self-serving bias — the $1 group protected their self-esteem",
        ],
        answer: 1,
        explanation:
          "The $20 group could explain the lie externally ('I did it for the money'), so no dissonance arose. The $1 group had no adequate external justification, leaving the inconsistency between belief and action — which they resolved by changing the belief. Counterintuitively, the smaller incentive produced more attitude change.",
      },
      {
        id: "ps-q-social-2",
        prompt:
          "A driver cuts you off and you conclude he is a reckless jerk. Later you cut someone off and attribute it to being late for an emergency. This pattern illustrates:",
        options: [
          "The just-world hypothesis",
          "The actor-observer bias",
          "Groupthink",
          "The halo effect",
        ],
        answer: 1,
        explanation:
          "Attributing others' behavior to disposition while attributing your own to situation is the actor-observer bias. The first half alone would be the fundamental attribution error; the contrast with your own self-attribution is what makes this specifically actor-observer.",
      },
      {
        id: "ps-q-social-3",
        prompt:
          "In Asch's line-judgment studies, conformity was highest under which condition?",
        options: [
          "When the group was unanimous",
          "When one confederate also gave the correct answer",
          "When responses were given privately in writing",
          "When the group size exceeded twenty",
        ],
        answer: 0,
        explanation:
          "Unanimity was critical — a single dissenting ally cut conformity dramatically, even when that ally gave a different wrong answer. Private responding also reduced it sharply, showing much of the effect was normative rather than informational. Conformity plateaus around 3–5 group members rather than rising with size.",
      },
      {
        id: "ps-q-social-4",
        prompt:
          "A person collapses on a crowded street and no one helps. The best explanation combines:",
        options: [
          "Social loafing and groupthink",
          "Diffusion of responsibility and pluralistic ignorance",
          "Deindividuation and group polarization",
          "Stereotype threat and prejudice",
        ],
        answer: 1,
        explanation:
          "Diffusion of responsibility means each bystander feels less personally obligated as the group grows. Pluralistic ignorance means each reads the others' inaction as evidence that no emergency exists. Together they produce the bystander effect. Social loafing concerns reduced effort on pooled group tasks, not emergency intervention.",
      },
      {
        id: "ps-q-social-5",
        prompt:
          "A well-practiced pianist performs better in front of an audience, while a beginner performs worse. This illustrates:",
        options: [
          "Social loafing",
          "Social facilitation",
          "Group polarization",
          "Deindividuation",
        ],
        answer: 1,
        explanation:
          "Social facilitation: the presence of others raises arousal, which improves performance on simple or well-learned tasks and impairs it on complex or novel ones. The task-difficulty dependence is the whole point — and it connects to Yerkes–Dodson, since the optimal arousal level is lower for hard tasks.",
      },
      {
        id: "ps-q-social-6",
        prompt:
          "A group of moderately pro-environment students discusses climate policy among themselves and emerges with markedly stronger views. This is:",
        options: ["Groupthink", "Group polarization", "Conformity", "Compliance"],
        answer: 1,
        explanation:
          "Group polarization: discussion among like-minded people amplifies their initial leaning rather than moderating it. Groupthink is related but specifically concerns a cohesive group suppressing dissent to preserve harmony, producing a flawed decision — there is no decision failure described here.",
      },
    ],
  },
  {
    id: "ps-q-soc",
    section: "ps",
    title: "Sociology & Health Disparities",
    description:
      "Theoretical frameworks, status and roles, deviance, stratification, and social determinants.",
    questions: [
      {
        id: "ps-q-soc-1",
        prompt:
          "A researcher argues that the healthcare system persists because it fulfills the necessary function of maintaining a productive workforce. This reflects which theoretical perspective?",
        options: [
          "Conflict theory",
          "Functionalism",
          "Symbolic interactionism",
          "Social constructionism",
        ],
        answer: 1,
        explanation:
          "Explaining an institution's persistence by the function it serves for society's stability is functionalism. Conflict theory would instead emphasize how the system distributes care unequally along lines of power and class. Symbolic interactionism operates at the micro level of meaning-making between individuals.",
      },
      {
        id: "ps-q-soc-2",
        prompt:
          "A physician struggles to be both efficient enough to see all her patients and attentive enough to each one. This tension is best described as:",
        options: ["Role conflict", "Role strain", "Role exit", "Master status"],
        answer: 1,
        explanation:
          "Both competing demands come from the single role of physician, which makes it role strain. Role conflict requires tension between two DIFFERENT roles — physician versus parent, for instance. One role or two is the entire distinction.",
      },
      {
        id: "ps-q-soc-3",
        prompt:
          "A teenager is arrested once for shoplifting, is thereafter treated as 'a delinquent' by teachers and neighbors, and gradually adopts that identity and commits further crimes. This progression is best explained by:",
        options: [
          "Differential association theory",
          "Labeling theory",
          "Strain theory",
          "Social disorganization theory",
        ],
        answer: 1,
        explanation:
          "The causal work is done by the label and its internalization — primary deviance (the single act) becomes secondary deviance (an identity) through others' reactions. Differential association would require learning deviance from intimate associates, and strain theory would emphasize blocked legitimate means to cultural goals; neither is described.",
      },
      {
        id: "ps-q-soc-4",
        prompt:
          "Studies find that people who hear about a job through casual acquaintances rather than close friends have better employment outcomes. This is explained by:",
        options: [
          "Bonding social capital",
          "The strength of weak ties",
          "Cultural capital",
          "Meritocracy",
        ],
        answer: 1,
        explanation:
          "Granovetter's finding: close friends occupy the same social circle and know the same openings you do, whereas acquaintances bridge into different networks and carry novel information. Weak, bridging ties outperform strong, bonding ties for information diffusion.",
      },
      {
        id: "ps-q-soc-5",
        prompt:
          "A country's death rate has fallen sharply due to improved sanitation while its birth rate remains high, producing rapid population growth. This describes which stage of the demographic transition?",
        options: ["Stage 1", "Stage 2", "Stage 3", "Stage 4"],
        answer: 1,
        explanation:
          "Stage 2 is defined by falling mortality with birth rates still high — the population boom phase. Stage 1 has both high and roughly balanced; stage 3 sees birth rates finally falling; stage 4 has both low and stable.",
      },
      {
        id: "ps-q-soc-6",
        prompt:
          "Two patients receive identical clinical care, but one has unstable housing, no reliable transportation, and works two hourly jobs. Her outcomes are worse. This is best framed as:",
        options: [
          "A failure of the sick role",
          "The influence of social determinants of health",
          "Evidence of biological difference",
          "An instance of the just-world hypothesis",
        ],
        answer: 1,
        explanation:
          "Conditions in which people live and work — housing, transportation, employment — shape health outcomes independent of clinical care, and typically explain more outcome variance than medical treatment does. That is the definition of social determinants of health.",
      },
      {
        id: "ps-q-soc-7",
        prompt:
          "A first-generation college student knows the material but is unfamiliar with office hours, academic jargon, and how to approach professors. What is she lacking?",
        options: [
          "Social capital",
          "Cultural capital",
          "Human capital",
          "Fluid intelligence",
        ],
        answer: 1,
        explanation:
          "Cultural capital is the non-financial fluency — tastes, norms, know-how, credentials — that confers advantage in an institution. She has the knowledge (human capital) but not the tacit competence in how the institution works. Social capital would be about network resources rather than know-how.",
      },
    ],
  },
  {
    id: "ps-q-bio",
    section: "ps",
    title: "Biological Bases of Behavior",
    description:
      "Neuroanatomy, neurotransmitters, the autonomic nervous system, and emotion theories.",
    questions: [
      {
        id: "ps-q-bio-1",
        prompt:
          "A patient speaks fluently but produces meaningless sentences and cannot understand what he is told. He seems unaware anything is wrong. The lesion most likely involves:",
        options: [
          "Broca's area in the left frontal lobe",
          "Wernicke's area in the left temporal lobe",
          "The arcuate fasciculus",
          "The right parietal lobe",
        ],
        answer: 1,
        explanation:
          "Fluent but empty speech with impaired comprehension, and characteristically no awareness of the deficit, defines Wernicke's aphasia. Broca's aphasia is the opposite profile: halting, effortful speech with intact comprehension and painful awareness. Arcuate fasciculus damage gives conduction aphasia, where repetition specifically fails.",
      },
      {
        id: "ps-q-bio-2",
        prompt:
          "Which change would you expect during sympathetic nervous system activation?",
        options: [
          "Pupil constriction and increased digestion",
          "Pupil dilation and inhibited digestion",
          "Decreased heart rate and bronchodilation",
          "Increased salivation and decreased blood pressure",
        ],
        answer: 1,
        explanation:
          "Fight-or-flight dilates pupils to admit light, dilates bronchi, raises heart rate, and shunts blood from the gut to skeletal muscle — digestion is suspended. Every other choice mixes sympathetic and parasympathetic effects.",
      },
      {
        id: "ps-q-bio-3",
        prompt:
          "A person crossing a rickety bridge meets an attractive stranger and reports strong attraction, whereas people crossing a stable bridge do not. Which theory of emotion best accounts for this?",
        options: [
          "James–Lange theory",
          "Cannon–Bard theory",
          "Schachter–Singer two-factor theory",
          "The Yerkes–Dodson law",
        ],
        answer: 2,
        explanation:
          "The physiological arousal came from the bridge, but it was cognitively labeled as attraction because the stranger was the salient explanation available. Arousal plus context-dependent labeling is exactly Schachter–Singer. James–Lange cannot explain it, since identical arousal would have to produce identical emotion regardless of context.",
      },
      {
        id: "ps-q-bio-4",
        prompt:
          "Degeneration of dopaminergic neurons in the substantia nigra most directly produces:",
        options: [
          "The positive symptoms of schizophrenia",
          "The motor symptoms of Parkinson's disease",
          "The memory loss of Alzheimer's disease",
          "The flat affect of major depression",
        ],
        answer: 1,
        explanation:
          "The substantia nigra projects to the basal ganglia's striatum, and losing that dopamine causes Parkinson's tremor, rigidity, and bradykinesia. Schizophrenia's positive symptoms involve excess dopamine in the mesolimbic pathway — same neurotransmitter, opposite direction, different circuit. Alzheimer's is associated with acetylcholine loss.",
      },
      {
        id: "ps-q-bio-5",
        prompt:
          "Which neurotransmitter is the primary inhibitory transmitter in the central nervous system?",
        options: ["Glutamate", "GABA", "Dopamine", "Acetylcholine"],
        answer: 1,
        explanation:
          "GABA is the main inhibitory transmitter — benzodiazepines and alcohol potentiate it, which is why they are sedating. Glutamate is its excitatory counterpart and the most abundant transmitter overall.",
      },
    ],
  },
];
