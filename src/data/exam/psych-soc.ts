import type { ExamSection } from "@/lib/exam-types";

/**
 * Psychological, Social, and Biological Foundations — 30 questions in 48 min.
 * Three passage sets (5 questions each) plus 15 discretes. The passages lean on
 * study design and data interpretation, as the real section does.
 */
export const examPsychSoc: ExamSection = {
  id: "ps",
  minutes: 48,
  blocks: [
    {
      kind: "passage",
      id: "ps-p1",
      title: "Passage I — Neighborhood Effects and Adolescent Outcomes",
      text: `Observational studies consistently find that adolescents raised in high-poverty neighborhoods complete fewer years of schooling than those raised in low-poverty neighborhoods. Interpreting this correlation is difficult, because families do not sort into neighborhoods at random: the same unmeasured characteristics that lead a family to a particular neighborhood may independently affect a child's outcomes.

The Moving to Opportunity (MTO) program offered an unusual test. Families in high-poverty public housing were randomly assigned to one of three groups: a treatment group receiving vouchers usable only in low-poverty neighborhoods, a comparison group receiving unrestricted vouchers, and a control group receiving no voucher.

Initial analyses, conducted when the children were adolescents, found no significant effect of the treatment on educational attainment or earnings. Some commentators concluded that neighborhood effects were largely spurious — an artifact of selection.

A later reanalysis disaggregated the sample by the child's age at the time of the move. Among children who moved before age 13, treatment-group assignment was associated with a substantial increase in later college attendance and adult earnings. Among those who moved as adolescents, the estimated effect was near zero and, for some outcomes, slightly negative.`,
      questions: [
        {
          id: "ps-p1-q1",
          prompt:
            "Random assignment in the MTO program was intended primarily to address which threat to validity?",
          options: [
            "Measurement error in reported earnings",
            "Selection bias arising from nonrandom sorting into neighborhoods",
            "Experimenter expectancy effects",
            "Attrition from the study over time",
          ],
          answer: 1,
          explanation:
            "The passage names the problem in its first paragraph: families don't sort randomly, so unmeasured characteristics may drive both neighborhood choice and child outcomes. Randomization breaks that link by making assignment independent of family characteristics — this is the core logic of experimental design.",
        },
        {
          id: "ps-p1-q2",
          prompt:
            "The commentators who concluded that neighborhood effects were 'largely spurious' made which error, according to the passage's later evidence?",
          options: [
            "They treated a null average effect as evidence of no effect in any subgroup",
            "They ignored the comparison group entirely",
            "They confused correlation with causation",
            "They relied on a sample that was too small to detect any effect",
          ],
          answer: 0,
          explanation:
            "The reanalysis showed substantial positive effects for young movers and near-zero or slightly negative effects for adolescent movers. Averaged together, these offset into a null result. An average of zero is compatible with large effects in opposite directions across subgroups — treating the average as the whole story is what the commentators got wrong.",
        },
        {
          id: "ps-p1-q3",
          prompt:
            "The age-dependent pattern of results is most consistent with which concept?",
          options: [
            "A sensitive period during which environmental exposure has greater influence",
            "Regression toward the mean",
            "The Hawthorne effect",
            "Stereotype threat",
          ],
          answer: 0,
          explanation:
            "Effects that depend on when exposure occurs — large before 13, absent afterward — describe a developmental window in which environment matters more, which is the sensitive-period concept. Duration of exposure is a plausible alternative reading, but among the options only A captures the timing dependence the data show.",
        },
        {
          id: "ps-p1-q4",
          prompt:
            "The comparison group, which received unrestricted vouchers, is most useful for distinguishing:",
          options: [
            "the effect of moving itself from the effect of moving to a low-poverty neighborhood",
            "the effect of income from the effect of education",
            "short-term from long-term outcomes",
            "self-reported from administratively measured earnings",
          ],
          answer: 0,
          explanation:
            "The treatment group received vouchers restricted to low-poverty areas; the comparison group could move anywhere. Both moved. The difference between them therefore isolates the neighborhood-poverty component from the disruption of relocating at all — which is precisely why a two-arm design would be inadequate here.",
        },
        {
          id: "ps-p1-q5",
          prompt:
            "A researcher argues the slightly negative effect for adolescent movers reflects disrupted peer networks at a developmentally costly time. This explanation is:",
          options: [
            "supported by the passage's data",
            "contradicted by the passage's data",
            "consistent with the data, though the passage provides no evidence for this specific mechanism",
            "irrelevant, since the effect was not statistically significant",
          ],
          answer: 2,
          explanation:
            "The passage reports the pattern but proposes no mechanism. Peer disruption would produce that pattern, so it is consistent — but consistency is not support, and nothing in the text tests it against alternatives such as shorter exposure. Distinguishing 'compatible with the data' from 'demonstrated by the data' is exactly what these questions probe.",
        },
      ],
    },
    {
      kind: "passage",
      id: "ps-p2",
      title: "Passage II — Encoding Specificity and Retrieval Cues",
      text: `Participants learned a list of 40 words, each presented alongside a weakly associated cue word (e.g., "ground–COLD"). At test, participants were assigned to one of three conditions:

  Condition            Cue at test          Recall (%)
  Same cue             ground               68
  Strong associate     hot                  23
  No cue               —                    31

The "strong associate" cue (hot) is a far more common associate of COLD than "ground" is, as measured by free-association norms. Nonetheless it produced the worst recall — worse even than providing no cue at all.

A second experiment varied physical environment rather than semantic cues. Divers learned word lists either on land or 20 feet underwater, then recalled them in either the same or a different environment. Recall was approximately 40% higher when the learning and testing environments matched, regardless of which environment was used.

A third experiment found that participants who learned material while mildly intoxicated recalled it better when again intoxicated than when sober, though performance in both conditions was below that of participants who learned and recalled while sober.`,
      questions: [
        {
          id: "ps-p2-q1",
          prompt:
            "The finding that the strong associate 'hot' produced worse recall than no cue at all is best explained by:",
          options: [
            "the strong associate was not encoded with the target at study",
            "interference from stronger pre-existing associations",
            "participants forgot the strong associate",
            "the strong associate was semantically unrelated to the target",
          ],
          answer: 0,
          explanation:
            "Encoding specificity: a cue helps to the extent that it was part of the memory trace at encoding. 'Ground' was present at study and works; 'hot' was not, so despite being a better associate in the abstract it does not match what was stored. It's worse than no cue because it actively directs retrieval down an unhelpful path. Choice D is factually wrong — hot and cold are strongly related.",
        },
        {
          id: "ps-p2-q2",
          prompt:
            "The diver experiment demonstrates:",
          options: [
            "state-dependent memory",
            "context-dependent memory",
            "the serial position effect",
            "proactive interference",
          ],
          answer: 1,
          explanation:
            "External physical surroundings serving as retrieval cues is context-dependent memory. State-dependent memory concerns the learner's internal condition — which is what the third experiment, with intoxication, demonstrates. The distinction between external context and internal state is the point of contrasting the two studies.",
        },
        {
          id: "ps-p2-q3",
          prompt:
            "The intoxication experiment shows that performance was best for participants who learned and recalled while sober. This indicates that:",
          options: [
            "state-dependent effects do not exist for intoxication",
            "matching states aids retrieval, but intoxication independently impairs encoding",
            "intoxication improves memory when consistent",
            "sobriety is itself a retrieval cue",
          ],
          answer: 1,
          explanation:
            "Two effects operate at once. Matching states helped — intoxicated learners did better when intoxicated at test. But the overall level was depressed relative to the sober-sober group, showing intoxication impaired encoding regardless of match. Choice C reads only the first effect and ignores the ceiling.",
        },
        {
          id: "ps-p2-q4",
          prompt:
            "A student who always studies in the library is about to take an exam in an unfamiliar lecture hall. Based on the passage, the most defensible prediction is that she will:",
          options: [
            "perform better, due to heightened arousal in a novel setting",
            "perform somewhat worse than if tested in the library",
            "perform identically, since semantic knowledge is context-independent",
            "be unable to recall the material at all",
          ],
          answer: 1,
          explanation:
            "The diver study found roughly 40% better recall when environments matched, so a mismatch predicts some decrement. Choice D wildly overstates a modest effect, and choice C contradicts the passage. Note the correct answer is hedged — 'somewhat worse' — which is typical, since the data support a direction rather than a dramatic magnitude.",
        },
        {
          id: "ps-p2-q5",
          prompt:
            "Which additional finding would most strengthen the encoding specificity interpretation of the first experiment?",
          options: [
            "Recall with the cue 'ground' improves further when the cue is presented twice at test",
            "Participants told at study to ignore the cue words show no advantage for 'ground' at test",
            "Free-association norms confirm 'hot' is the most common associate of COLD",
            "Recall is higher for concrete than abstract words",
          ],
          answer: 1,
          explanation:
            "Encoding specificity claims the cue works because it was encoded WITH the target. If participants who never encoded the cue show no benefit from it, that is exactly the prediction — the advantage tracks encoding, not the cue's intrinsic properties. Choice C restates a premise the passage already grants and tests nothing.",
        },
      ],
    },
    {
      kind: "passage",
      id: "ps-p3",
      title: "Passage III — Measuring Discrimination in Hiring",
      text: `Audit studies of hiring send matched pairs of applications that differ only in a characteristic of interest. In a widely replicated design, researchers mailed résumés to job advertisements, randomly assigning names that signal race while holding qualifications constant. Callback rates were substantially lower for applications bearing names associated with Black applicants — a gap that persisted across industries, occupations, and employer size.

A striking secondary finding: for applications with white-associated names, adding stronger credentials (a higher GPA, an additional internship) increased callbacks meaningfully. For applications with Black-associated names, the same credential improvements produced little or no increase.

Some critics argue that name-based designs confound race with social class, since names signaling race may also signal socioeconomic background. Researchers responded by including names that vary class signals within racial categories; the racial gap persisted.

A separate literature documents that many hiring managers who show these gaps in behavior report egalitarian attitudes on explicit measures and express genuine surprise when shown their own callback data.`,
      questions: [
        {
          id: "ps-p3-q1",
          prompt:
            "The audit design's use of matched pairs differing only in the name serves primarily to:",
          options: [
            "increase the sample size",
            "isolate the causal effect of the signaled characteristic by holding qualifications constant",
            "measure employers' explicit attitudes",
            "ensure applicants are representative of the labor force",
          ],
          answer: 1,
          explanation:
            "Holding everything constant except the manipulated variable, and randomly assigning it, is what licenses a causal interpretation of any difference in callbacks. This is the logic of experimental control transplanted into a field setting — and it's why audit studies are more persuasive than observational wage-gap comparisons.",
        },
        {
          id: "ps-p3-q2",
          prompt:
            "The finding that stronger credentials raised callbacks for white-associated names but not Black-associated names is best described as:",
          options: [
            "a main effect of credentials",
            "an interaction between race signal and credentials",
            "a confound between race and class",
            "regression toward the mean",
          ],
          answer: 1,
          explanation:
            "The effect of credentials depends on the level of the other variable — that is precisely the definition of a statistical interaction. A main effect would mean credentials helped everyone equally. The substantive implication is severe: the usual advice to improve one's qualifications does not pay off equally.",
        },
        {
          id: "ps-p3-q3",
          prompt:
            "The researchers' response to the class-confound criticism was to:",
          options: [
            "abandon name-based designs",
            "vary class signals within racial categories and show the racial gap persisted",
            "control for applicant socioeconomic status statistically",
            "argue that class and race cannot be separated",
          ],
          answer: 1,
          explanation:
            "The passage states it directly: researchers 'included names that vary class signals within racial categories; the racial gap persisted.' This is a design solution, not a statistical adjustment — it builds the variation into the experiment rather than modeling it after the fact, which is why choice C misdescribes it.",
        },
        {
          id: "ps-p3-q4",
          prompt:
            "The gap between managers' explicit egalitarian attitudes and their callback behavior is best explained by:",
          options: [
            "managers deliberately concealing prejudiced beliefs",
            "implicit bias operating outside conscious awareness",
            "the fundamental attribution error",
            "social desirability bias in the callback data",
          ],
          answer: 1,
          explanation:
            "The managers 'express genuine surprise' at their own data, which is hard to square with deliberate concealment. Attitudes that are sincerely held yet unmatched by behavior point to automatic processes operating below awareness. Choice D misplaces the bias: social desirability affects self-report, whereas callbacks are behavioral records.",
        },
        {
          id: "ps-p3-q5",
          prompt:
            "A firm implements a training program that successfully improves managers' scores on explicit measures of racial attitudes. Based on the passage, the most defensible prediction about callback gaps is that they will:",
          options: [
            "close, since attitudes drive behavior",
            "not necessarily close, since the gap coexists with egalitarian explicit attitudes",
            "widen, due to reactance",
            "close only if the training is mandatory",
          ],
          answer: 1,
          explanation:
            "The passage's key observation is that the behavioral gap already coexists with egalitarian explicit attitudes — so moving explicit attitudes targets a variable that was never the one tracking behavior. Note the hedge in the correct answer: 'not necessarily.' The passage supports skepticism, not a confident prediction of failure.",
        },
      ],
    },
    {
      kind: "discrete",
      id: "ps-d1",
      questions: [
        {
          id: "ps-d-q1",
          prompt:
            "A researcher finds that ice cream sales and drowning deaths are positively correlated. The most likely explanation is:",
          options: [
            "Ice cream consumption impairs swimming ability",
            "A third variable, such as temperature, influences both",
            "Drowning deaths cause increased ice cream sales",
            "The correlation is a statistical artifact of small sample size",
          ],
          answer: 1,
          explanation:
            "Warm weather independently raises both ice cream purchases and time spent swimming. This is the textbook confounding variable — the correlation is real but neither variable causes the other.",
        },
        {
          id: "ps-d-q2",
          prompt:
            "Damage to the hippocampus would most impair:",
          options: [
            "recalling how to ride a bicycle",
            "forming new memories of events",
            "recognizing familiar faces",
            "maintaining balance while walking",
          ],
          answer: 1,
          explanation:
            "The hippocampus consolidates new explicit (declarative) memories, especially episodic ones. Procedural skills like cycling depend on the cerebellum and basal ganglia, which is why H.M. could learn new motor skills while unable to remember learning them.",
        },
        {
          id: "ps-d-q3",
          prompt:
            "A person argues that their poor exam performance was due to an unfair test, while attributing a peer's poor performance to laziness. This illustrates:",
          options: ["Self-serving bias", "Just-world hypothesis", "Groupthink", "Halo effect"],
          answer: 0,
          explanation:
            "Attributing your own failure externally while attributing another's failure internally is self-serving bias protecting self-esteem. It's closely related to the actor-observer bias, but the motivational asymmetry — favorable to the self — is what makes it specifically self-serving.",
        },
        {
          id: "ps-d-q4",
          prompt:
            "According to Piaget, a child who understands that a tall thin glass and a short wide glass can hold the same volume has achieved:",
          options: [
            "object permanence",
            "conservation",
            "theory of mind",
            "formal operational reasoning",
          ],
          answer: 1,
          explanation:
            "Conservation is the recognition that quantity persists despite changes in appearance — the hallmark of the concrete operational stage (roughly ages 7–11). Object permanence belongs to the sensorimotor stage; formal operations involve abstract hypothetical reasoning.",
        },
        {
          id: "ps-d-q5",
          prompt:
            "Which best exemplifies negative reinforcement?",
          options: [
            "A child receives a sticker for cleaning her room",
            "A driver buckles a seatbelt to stop an annoying alarm",
            "A student loses phone privileges for missing curfew",
            "An employee is reprimanded for arriving late",
          ],
          answer: 1,
          explanation:
            "Removing an aversive stimulus (the alarm) increases the behavior (buckling) — removal plus increase equals negative reinforcement. Choice A is positive reinforcement; C is negative punishment; D is positive punishment. 'Negative' means removal, not unpleasant.",
        },
        {
          id: "ps-d-q6",
          prompt:
            "The tendency for a group of like-minded people to adopt a more extreme position after discussion is called:",
          options: ["Groupthink", "Group polarization", "Social loafing", "Deindividuation"],
          answer: 1,
          explanation:
            "Group polarization amplifies a group's initial leaning. Groupthink is distinct: it's the suppression of dissent in a cohesive group to preserve harmony, producing a defective decision. Polarization requires no decision failure and no suppression.",
        },
        {
          id: "ps-d-q7",
          prompt:
            "Which sociological perspective would most likely analyze medicine by examining how physicians and patients negotiate the meaning of symptoms in a clinical encounter?",
          options: [
            "Functionalism",
            "Conflict theory",
            "Symbolic interactionism",
            "Social constructionism",
          ],
          answer: 2,
          explanation:
            "Symbolic interactionism operates at the micro level, studying meaning-making in face-to-face interaction — exactly a clinical encounter. Social constructionism is closely related but concerns how categories like 'illness' get built at a societal level rather than negotiated in a specific interaction.",
        },
        {
          id: "ps-d-q8",
          prompt:
            "A person's heart races before a public speech and they interpret the sensation as excitement rather than fear, and subsequently perform well. This is most consistent with:",
          options: [
            "James–Lange theory",
            "Cannon–Bard theory",
            "Schachter–Singer two-factor theory",
            "The Yerkes–Dodson law",
          ],
          answer: 2,
          explanation:
            "Identical arousal yields different emotions depending on cognitive labeling — the two-factor account. James–Lange cannot accommodate this, since it holds the physiological response determines the emotion; the same racing heart would have to produce the same feeling regardless of interpretation.",
        },
        {
          id: "ps-d-q9",
          prompt:
            "Which is an example of an ascribed status?",
          options: ["Physician", "Convicted felon", "Age", "College graduate"],
          answer: 2,
          explanation:
            "Ascribed statuses are assigned involuntarily rather than earned — age, sex assigned at birth, race. Physician, felon, and graduate are all achieved through actions taken. Note that an achieved status can still become a master status.",
        },
        {
          id: "ps-d-q10",
          prompt:
            "Broca's aphasia is characterized by:",
          options: [
            "fluent but meaningless speech with impaired comprehension",
            "halting, effortful speech with relatively preserved comprehension",
            "an inability to repeat phrases despite intact comprehension and production",
            "complete loss of language",
          ],
          answer: 1,
          explanation:
            "Broca's is expressive: production is laborious and telegraphic while comprehension is largely intact, and patients are typically painfully aware of the deficit. Choice A describes Wernicke's; choice C describes conduction aphasia from arcuate fasciculus damage.",
        },
        {
          id: "ps-d-q11",
          prompt:
            "Which stage of sleep is characterized by delta waves and is associated with growth hormone release?",
          options: ["Stage 1", "Stage 2", "Stage 3", "REM"],
          answer: 2,
          explanation:
            "Stage 3 is slow-wave sleep: high-amplitude, low-frequency delta waves, hardest to wake from, and when growth hormone is secreted. REM shows fast, wake-like activity with muscle atonia — hence 'paradoxical sleep.'",
        },
        {
          id: "ps-d-q12",
          prompt:
            "Merton's strain theory explains deviance as arising from:",
          options: [
            "labels applied by authorities",
            "a mismatch between culturally valued goals and legitimate means to reach them",
            "learning criminal behavior from intimate associates",
            "weakened bonds to conventional society",
          ],
          answer: 1,
          explanation:
            "Strain theory locates deviance in the gap between goals society valorizes (wealth, success) and the legitimate opportunities available to reach them. Choice A is labeling theory, C is differential association, D is social control theory — all rival accounts of the same phenomenon.",
        },
        {
          id: "ps-d-q13",
          prompt:
            "Weber's law predicts that the just-noticeable difference:",
          options: [
            "is a constant absolute amount regardless of stimulus intensity",
            "is a constant proportion of the stimulus intensity",
            "decreases as stimulus intensity increases",
            "is identical across sensory modalities",
          ],
          answer: 1,
          explanation:
            "The JND scales with the standard: a constant fraction, not a constant amount. So the absolute JND grows as intensity grows — which makes choice C exactly backward. The Weber fraction itself differs across modalities.",
        },
        {
          id: "ps-d-q14",
          prompt:
            "A drug that blocks dopamine D2 receptors would most likely reduce which symptoms?",
          options: [
            "Negative symptoms of schizophrenia",
            "Positive symptoms of schizophrenia",
            "The motor symptoms of Parkinson's disease",
            "Depressive symptoms",
          ],
          answer: 1,
          explanation:
            "The dopamine hypothesis attributes positive symptoms — hallucinations, delusions — to excess mesolimbic dopamine, and D2 antagonists target them. They tend not to help negative symptoms, and by blocking dopamine in the nigrostriatal pathway they can produce parkinsonian side effects, making choice C the opposite of the truth.",
        },
        {
          id: "ps-d-q15",
          prompt:
            "The looking-glass self refers to the idea that:",
          options: [
            "people imitate behaviors they observe in models",
            "self-concept develops from our perception of how others see us",
            "people conform to group norms under social pressure",
            "individuals lose self-awareness in crowds",
          ],
          answer: 1,
          explanation:
            "Cooley's concept: we imagine how we appear to others, imagine their judgment, and internalize it — so the self is fundamentally social in origin. Choice A is Bandura's observational learning; choice D is deindividuation.",
        },
      ],
    },
  ],
};
