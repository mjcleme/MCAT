import type { ExamSection } from "@/lib/exam-types";

/**
 * Critical Analysis and Reasoning Skills — 30 questions in 51 minutes.
 * Five passages of six questions each. All prose is original, written to the
 * register and argumentative density of real CARS humanities/social science
 * passages: a thesis worth disputing, at least one concession, and a turn.
 */
export const examCars: ExamSection = {
  id: "cars",
  minutes: 51,
  blocks: [
    {
      kind: "passage",
      id: "cars-p1",
      title: "Passage I",
      text: `The folk song presents the collector with a problem that the collector is rarely willing to name. To record a song is to fix it, and fixity is precisely the property the song did not have. What the collector encounters in a Kentucky hollow in 1917 is not a text but an occasion — a particular singer, on a particular evening, making choices that another singer would not make, and that she herself would not make again the following week. The transcription preserves one of those evenings and discards the rest, and the discarding is invisible in the result.

Cecil Sharp, who did more than anyone to establish the discipline, understood this and was untroubled by it. He believed the variations were noise around a signal — that beneath the accidents of performance lay an ur-song, corrupted by transmission, which the trained ear could reconstruct. His method followed from the belief: hearing six versions of a ballad, he assembled a seventh that no one had ever sung, and published it as the song.

I want to resist the easy verdict here. It is tempting to say Sharp imposed a literary conception of the text onto an oral practice that had no use for it, and this is true, but it is not the interesting part. The interesting part is that his informants often agreed with him. Asked whether her version was the right one, a singer would frequently say no, that so-and-so up the ridge had it correct, and that her own was imperfectly remembered. The idea that there existed a correct version was not an importation of Sharp's; it was already there, in the community, doing work.

What was it doing? Not, I think, describing the practice. A tradition in which every singer believes herself to be approximating a version she has never heard is not thereby a tradition with a fixed text; it is a tradition in which the belief in a fixed text licenses continuous change. The singer who thinks she is remembering imperfectly is free to innovate, because innovation presents itself to her as failure rather than as invention, and failure requires no permission. Sharp's error was not in hearing his informants say there was a correct version. It was in believing them.`,
      questions: [
        {
          id: "cars-p1-q1",
          prompt: "The author's central claim about Cecil Sharp is that he:",
          options: [
            "fabricated versions of ballads that no singer had ever performed",
            "correctly identified an ur-song beneath the variations of performance",
            "took his informants' belief in a correct version as an accurate description of their practice",
            "imposed a literary conception of text onto an oral tradition with no use for it",
          ],
          answer: 2,
          explanation:
            "The final sentence states it: 'His error was not in hearing his informants say there was a correct version. It was in believing them.' Choice D is explicitly acknowledged as 'true, but it is not the interesting part' — the author raises it to move past it. Choice A is factually described in the passage but is a method, not the author's central criticism.",
        },
        {
          id: "cars-p1-q2",
          prompt:
            "According to the author, the belief in a correct version functioned within the singing community to:",
          options: [
            "preserve ballads accurately across generations",
            "enable continuous change by reframing innovation as imperfect memory",
            "establish the authority of certain singers over others",
            "resist the intrusion of outside collectors",
          ],
          answer: 1,
          explanation:
            "The fourth paragraph is explicit: the belief 'licenses continuous change,' because the singer 'is free to innovate, because innovation presents itself to her as failure rather than as invention, and failure requires no permission.' The belief does work — but not the work of preservation that its content would suggest.",
        },
        {
          id: "cars-p1-q3",
          prompt:
            "The author's statement that 'the discarding is invisible in the result' most directly emphasizes that a transcription:",
          options: [
            "contains errors that a trained ear could detect",
            "gives no indication of the variability it eliminated",
            "is less valuable than a live performance",
            "should include multiple versions side by side",
          ],
          answer: 1,
          explanation:
            "The point is about what the artifact conceals: it preserves one evening and discards the rest, and nothing in the finished transcription signals that anything was lost. Choice D is a plausible remedy but the author never proposes it — CARS rewards what is supported, not what would be sensible.",
        },
        {
          id: "cars-p1-q4",
          prompt:
            "The author's remark 'I want to resist the easy verdict here' functions to:",
          options: [
            "reverse the criticism of Sharp developed to that point",
            "signal that the obvious critique is correct but insufficiently interesting",
            "concede that Sharp's method was ultimately sound",
            "introduce evidence that Sharp's informants misled him",
          ],
          answer: 1,
          explanation:
            "The author immediately grants the easy verdict — 'this is true' — and then pivots to what he considers the interesting part. It's a setup for refinement, not reversal or concession. Recognizing that a concession can precede a sharpening rather than a retreat is a core CARS skill.",
        },
        {
          id: "cars-p1-q5",
          prompt:
            "Suppose a scholar demonstrated that singers who claimed to be remembering imperfectly in fact reproduced their own prior versions with near-perfect fidelity. This finding would:",
          options: [
            "support the author's argument by confirming that fixity was a belief rather than a practice",
            "weaken the author's argument, since it suggests the belief in a correct version did describe the practice",
            "have no bearing, since the author is concerned only with Sharp's method",
            "support Sharp's ur-song hypothesis",
          ],
          answer: 1,
          explanation:
            "The author's claim rests on a gap between what singers believed (a fixed correct version) and what they did (change continuously). If singers actually reproduced their versions faithfully, the belief would be accurate, the gap would close, and 'believing them' would no longer be an error. Choice A inverts this — near-perfect fidelity is the opposite of what the author's argument needs.",
        },
        {
          id: "cars-p1-q6",
          prompt:
            "The author would most likely agree that a collector who published all six recorded versions of a ballad, unmerged, would:",
          options: [
            "have solved the problem the passage identifies",
            "still have fixed six occasions while discarding the practice that generated them",
            "have violated the informants' own understanding of their tradition",
            "have produced a work of no scholarly value",
          ],
          answer: 1,
          explanation:
            "The passage's problem is not the number of versions but the act of fixing: 'To record a song is to fix it, and fixity is precisely the property the song did not have.' Six frozen occasions are still frozen occasions. The tradition is a process of continuous variation, and no finite set of transcriptions captures a process. Choices A and D overshoot in opposite directions.",
        },
      ],
    },
    {
      kind: "passage",
      id: "cars-p2",
      title: "Passage II",
      text: `Economists have long treated the reluctance of the poor to purchase insurance as a puzzle requiring explanation, and the explanations offered have tended to fall into two families. The first attributes the behavior to a deficit: the poor are said to lack the numeracy, the information, or the foresight that the purchase requires. The second attributes it to a distortion: present bias, or hyperbolic discounting, or some other departure from the rational agent whose preferences the models describe. Both families share the assumption that the behavior is a mistake, and that the task of analysis is to locate the faculty in which the mistake originates.

Fieldwork complicates this. When smallholding farmers in Andhra Pradesh were offered rainfall insurance at an actuarially generous rate, take-up remained under fifteen percent — but the farmers who declined could, when asked, reproduce the expected-value calculation with precision. They understood the product. They also observed, correctly, that the contract paid out on a rainfall index measured at a station some distance away, and that in the drought they most feared, the station might record rain that their own fields did not receive. The insurance did not insure them against the thing they were afraid of. It insured them against a correlate of that thing, and the correlation was imperfect in exactly the circumstances that mattered most.

This is basis risk, and it is well known to the literature. What is less often noticed is what its presence does to the two families of explanation. A farmer who declines a contract because its payout is imperfectly correlated with her loss is not exhibiting a deficit or a distortion. She is performing the analysis correctly and reaching a conclusion the analyst did not anticipate. The model that codes her refusal as an anomaly is not describing her error; it is displaying its own.

I do not want to romanticize this. Some refusals are mistakes, and the literature on present bias did not come from nowhere — people do procrastinate on decisions whose costs are immediate and whose benefits are distant, and the poor are no exception. The claim is narrower. It is that a discipline which begins by classifying an unexpected choice as a defect in the chooser has foreclosed, before any evidence is gathered, the possibility that the choice is responsive to a feature of the situation the analyst has not modeled. That foreclosure is not an empirical finding. It is a habit, and it is expensive.`,
      questions: [
        {
          id: "cars-p2-q1",
          prompt: "The author's primary purpose is to:",
          options: [
            "demonstrate that rainfall insurance is poorly designed for smallholding farmers",
            "argue that a common analytic habit forecloses explanations before evidence is gathered",
            "refute the literature on present bias and hyperbolic discounting",
            "show that poor farmers are more numerate than economists assume",
          ],
          answer: 1,
          explanation:
            "The final paragraph states the claim after narrowing it: a discipline that classifies unexpected choices as defects 'has foreclosed, before any evidence is gathered,' an alternative explanation — and 'that foreclosure is not an empirical finding. It is a habit.' Choice C is explicitly disowned: the author concedes present bias 'did not come from nowhere.' Choice A is the example, not the purpose.",
        },
        {
          id: "cars-p2-q2",
          prompt:
            "According to the passage, the Andhra Pradesh farmers declined the insurance because:",
          options: [
            "they could not reproduce the expected-value calculation",
            "the premiums were actuarially unfair",
            "the payout was tied to an index that might not reflect their actual losses",
            "they exhibited present bias regarding distant benefits",
          ],
          answer: 2,
          explanation:
            "The passage is precise: the contract paid on a rainfall index from a distant station, so 'in the drought they most feared, the station might record rain that their own fields did not receive.' Choice A is contradicted — they reproduced the calculation 'with precision.' Choice B is contradicted — the rate was 'actuarially generous.'",
        },
        {
          id: "cars-p2-q3",
          prompt:
            "The author states that the model coding the farmer's refusal as an anomaly 'is not describing her error; it is displaying its own.' This most nearly means that:",
          options: [
            "the model's mathematics contain a computational mistake",
            "the model's failure to represent basis risk is what makes the choice look irrational",
            "the farmer's reasoning is superior to the analyst's",
            "economists deliberately ignore inconvenient data",
          ],
          answer: 1,
          explanation:
            "The anomaly exists only relative to a model that omitted basis risk. Once that feature is represented, the refusal is what a correct analysis predicts — so the label 'anomaly' reveals an omission in the model, not a defect in the chooser. Choice A misreads 'error' as arithmetic, and choice D imputes bad faith the author never alleges.",
        },
        {
          id: "cars-p2-q4",
          prompt:
            "The fourth paragraph, beginning 'I do not want to romanticize this,' serves primarily to:",
          options: [
            "abandon the argument in the face of contrary evidence",
            "concede the partial validity of the opposing literature while narrowing the author's claim",
            "introduce a new line of evidence supporting the author's thesis",
            "attack the motives of behavioral economists",
          ],
          answer: 1,
          explanation:
            "The author grants that some refusals are genuine mistakes and that present bias is real, then says 'The claim is narrower' and specifies exactly what it is. This is the standard CARS move: concession followed by precision. The argument is sharpened, not abandoned.",
        },
        {
          id: "cars-p2-q5",
          prompt:
            "Which finding would most strengthen the author's argument?",
          options: [
            "Farmers offered index insurance with a weather station on their own land took it up at high rates",
            "Farmers who declined insurance also declined to save for retirement",
            "Rainfall insurance was profitable for the insurers who offered it",
            "Wealthier farmers purchased insurance at similar rates to poorer ones",
          ],
          answer: 0,
          explanation:
            "The author claims the refusal was responsive to basis risk, not to a deficit or distortion in the farmer. Removing the basis risk — a station on their own land — should remove the refusal. High take-up under that condition is precisely the prediction his account makes and the deficit account does not. Choice B would support the present-bias story he is arguing against.",
        },
        {
          id: "cars-p2-q6",
          prompt:
            "The author's argument is most analogous to which situation?",
          options: [
            "A physician concluding a patient is noncompliant for skipping a drug, without learning the drug causes her a side effect the trials did not measure",
            "A teacher discovering that a student's low score resulted from a mis-scored answer key",
            "An engineer finding that a bridge failed because of a manufacturing defect in the steel",
            "A historian showing that a widely cited document was a forgery",
          ],
          answer: 0,
          explanation:
            "The structure to match: an unexpected choice is labeled a defect in the chooser, when in fact it responds rationally to a feature the analyst's framework never represented. The physician codes the patient as noncompliant exactly as the model codes the farmer as anomalous, and in both cases the label conceals an omission in the observer's model. Analogy questions test structural correspondence, not subject matter.",
        },
      ],
    },
    {
      kind: "passage",
      id: "cars-p3",
      title: "Passage III",
      text: `The distinction between translation and adaptation is policed with a vigilance that ought to arouse suspicion. Reviewers who could not define either term will nonetheless report with confidence that a given version has crossed the line, and the charge carries a moral weight out of all proportion to the aesthetic question supposedly at issue. Something is being defended, and it is not accuracy.

Consider what the accusation actually alleges. A translator who renders a Japanese pun as an English pun has departed from the words; a translator who renders it as an English non-pun with a footnote has departed from the joke. Both have lost something and preserved something, and the choice between them is not a choice between fidelity and infidelity but between two objects of fidelity. Yet only the first is routinely described as taking liberties. The asymmetry is instructive: we treat the lexical layer as the site of the original's identity and the effect on the reader as an optional extra, and we do this without argument, as though it were obvious.

It is not obvious, and the history of the practice suggests it is not even traditional. Dryden, translating Virgil, was explicit that he aimed to write what Virgil would have written had he been an Englishman of the seventeenth century. Nobody accused him of adaptation; the category, in its current punitive sense, did not yet exist. It arrives with the nineteenth century, and it arrives alongside something else — the professionalization of philology, and with it a conception of the text as an object of scientific study rather than a thing to be made to work in a new language for new readers.

Here I should be careful. The philologists were not wrong to want an instrument that showed them what the original said, word by word, and a translation built for that purpose is a legitimate thing to want. My complaint is not that the scholarly translation exists. It is that its criteria escaped the study and became the criteria for translation as such, so that a version made for readers rather than scholars is now obliged to defend itself against a standard it never accepted, before an audience that has forgotten the standard has a history.`,
      questions: [
        {
          id: "cars-p3-q1",
          prompt: "The author's main argument is that:",
          options: [
            "translations should always preserve the effect on the reader rather than the words",
            "scholarly translations are less valuable than literary ones",
            "criteria developed for scholarly translation have been wrongly generalized to translation as a whole",
            "the distinction between translation and adaptation is meaningless",
          ],
          answer: 2,
          explanation:
            "The final paragraph states it exactly: 'My complaint is not that the scholarly translation exists. It is that its criteria escaped the study and became the criteria for translation as such.' Choice A overshoots — the author argues these are two objects of fidelity, not that one always wins. Choice B is disowned: the scholarly translation is 'a legitimate thing to want.'",
        },
        {
          id: "cars-p3-q2",
          prompt:
            "The author cites the example of the Japanese pun primarily to show that:",
          options: [
            "puns are untranslatable in principle",
            "footnotes are an inadequate solution to translation problems",
            "both available choices sacrifice something, so neither is simply unfaithful",
            "English lacks the resources to render Japanese wordplay",
          ],
          answer: 2,
          explanation:
            "The passage says both translators 'lost something and preserved something,' and the choice is 'not a choice between fidelity and infidelity but between two objects of fidelity.' The example exists to dismantle the idea that one option is faithful and the other isn't — which is the asymmetry the author finds instructive.",
        },
        {
          id: "cars-p3-q3",
          prompt:
            "The reference to Dryden functions to establish that:",
          options: [
            "Dryden was a more accomplished translator than his successors",
            "the punitive sense of 'adaptation' is a historical development rather than a permanent standard",
            "seventeenth-century readers were indifferent to accuracy",
            "Virgil's poetry is particularly resistant to literal translation",
          ],
          answer: 1,
          explanation:
            "The point is chronological: Dryden did openly what would now be condemned, and 'nobody accused him of adaptation; the category, in its current punitive sense, did not yet exist.' It arrives with the nineteenth century. Showing that a standard has a start date undermines its claim to be timeless — which is what the last sentence means by an audience that 'has forgotten the standard has a history.'",
        },
        {
          id: "cars-p3-q4",
          prompt:
            "The author's assertion that the vigilance 'ought to arouse suspicion' most nearly suggests that:",
          options: [
            "reviewers are deliberately dishonest about their criteria",
            "the intensity of the policing is disproportionate to the stated aesthetic issue, implying an unstated motive",
            "the distinction cannot be defined with precision",
            "translation is not a subject worth serious critical attention",
          ],
          answer: 1,
          explanation:
            "The author notes the charge 'carries a moral weight out of all proportion to the aesthetic question supposedly at issue' and concludes 'Something is being defended, and it is not accuracy.' Disproportionate heat implies an undisclosed stake. Choice A overstates — an unexamined habit is not deliberate dishonesty, and the author elsewhere treats the standard as inherited rather than cynical.",
        },
        {
          id: "cars-p3-q5",
          prompt:
            "Based on the passage, the author would most likely regard a literal, heavily annotated translation prepared for a graduate seminar as:",
          options: [
            "an illegitimate imposition of philological criteria",
            "an appropriate instrument for its purpose",
            "superior to a version made for general readers",
            "an example of the adaptation the author defends",
          ],
          answer: 1,
          explanation:
            "The author explicitly concedes: 'The philologists were not wrong to want an instrument that showed them what the original said, word by word, and a translation built for that purpose is a legitimate thing to want.' A seminar is exactly that purpose. His objection is to the criteria escaping that context — not to the context itself.",
        },
        {
          id: "cars-p3-q6",
          prompt:
            "The passage suggests that treating 'the lexical layer as the site of the original's identity' is:",
          options: [
            "a self-evident truth about texts",
            "an assumption adopted without argument that could have gone otherwise",
            "a nineteenth-century error now fully corrected",
            "the only defensible basis for evaluating a translation",
          ],
          answer: 1,
          explanation:
            "The author says we do this 'without argument, as though it were obvious,' then immediately: 'It is not obvious, and the history of the practice suggests it is not even traditional.' The move is to denaturalize the assumption — to show it is a contingent choice, not a discovered fact. Choice C is wrong on the timeline: the author's whole complaint is that it persists.",
        },
      ],
    },
    {
      kind: "passage",
      id: "cars-p4",
      title: "Passage IV",
      text: `Every account of the decline of the guilds must explain a fact that sits awkwardly with most of them: the guilds were dismantled, in country after country, by reformers who had been their beneficiaries and who knew precisely what they were destroying. The standard story, in which a rational state sweeps away an irrational relic, requires the reformers to have been mistaken about what the institution did. They were not. They understood the training system, the quality enforcement, the provision for widows, and they abolished it anyway, and the interesting question is why people who understood all this concluded it was worth losing.

The answer usually given is that they were captured by a doctrine — that political economy, having demonstrated the efficiency of free contract, supplied a justification for what commercial interests wanted in any case. There is something to this. But it does not explain the timing, and it does not explain the reformers who had no commercial interest to serve and dismantled the guilds anyway, sometimes at cost to themselves.

A better answer begins with what the guild secured and for whom. The training was real, the quality enforcement was real, and both were available to those admitted. Admission ran through kinship and through the capacity to endure years of unpaid apprenticeship, which is to say it ran through inherited advantage. The guild did not distribute its goods; it distributed them to its members, and it maintained the value of what it distributed by ensuring that most people could not have it. This is not an incidental defect. Scarcity was the mechanism. A guild that admitted everyone qualified would have secured nothing for anyone.

So the reformers were choosing, and they knew it. They were choosing to lose a real training system, real quality enforcement, and real provision for the dependent, in exchange for the abolition of a barrier that the goods themselves depended on. Whether the trade was worth making is a question I am not competent to settle, and I suspect it admits no general answer. What can be said is that the choice was not a mistake, and that describing it as one — as both the guilds' defenders and their triumphalist historians have done, for opposite reasons — is a way of avoiding the recognition that institutions can be simultaneously valuable and unjust, and that dismantling them costs something real.`,
      questions: [
        {
          id: "cars-p4-q1",
          prompt: "The author's central claim is that the guild reformers:",
          options: [
            "were mistaken about the value of what they destroyed",
            "made a knowing trade-off rather than an error",
            "were captured by the doctrine of political economy",
            "acted primarily to serve commercial interests",
          ],
          answer: 1,
          explanation:
            "The final paragraph: 'the reformers were choosing, and they knew it... What can be said is that the choice was not a mistake.' Choice A is the standard story the author rejects at the outset. Choices C and D describe 'the answer usually given,' which the author grants has 'something to this' but rejects as unable to explain the timing or the disinterested reformers.",
        },
        {
          id: "cars-p4-q2",
          prompt:
            "The author objects to the explanation based on capture by political economy because it:",
          options: [
            "attributes bad faith to the reformers without evidence",
            "fails to account for the timing and for reformers with no commercial stake",
            "relies on a discredited account of eighteenth-century economics",
            "assumes the guilds were efficient when they were not",
          ],
          answer: 1,
          explanation:
            "The second paragraph grants the explanation partial force — 'There is something to this' — then specifies two things it cannot handle: 'it does not explain the timing, and it does not explain the reformers who had no commercial interest to serve.' The objection is incompleteness, not falsity.",
        },
        {
          id: "cars-p4-q3",
          prompt:
            "The statement 'Scarcity was the mechanism' most directly supports the claim that:",
          options: [
            "the guilds deliberately kept their membership small to raise prices",
            "the guild's benefits could not have been extended universally without destroying them",
            "guild training was of lower quality than commonly believed",
            "kinship networks were the primary basis of guild admission",
          ],
          answer: 1,
          explanation:
            "The very next sentence spells it out: 'A guild that admitted everyone qualified would have secured nothing for anyone.' The exclusion was not a fixable flaw sitting beside the benefits — it was what generated them, which is why the author calls it 'not an incidental defect.' Choice D is a fact from the passage, but it is not what this particular sentence establishes.",
        },
        {
          id: "cars-p4-q4",
          prompt:
            "The author's admission that whether the trade was worth making 'is a question I am not competent to settle' most likely functions to:",
          options: [
            "undermine the author's own argument",
            "distinguish the historical claim being made from an evaluative one being declined",
            "concede that the reformers were probably wrong",
            "invite the reader to supply an answer the author already holds",
          ],
          answer: 1,
          explanation:
            "The author's claim is that the choice was knowing rather than mistaken — a claim about what the reformers understood. Whether they chose correctly is a separate, evaluative question, and he explicitly declines it while adding that 'it admits no general answer.' Marking the boundary of a claim strengthens it by making clear what it does not require.",
        },
        {
          id: "cars-p4-q5",
          prompt:
            "The author suggests that the guilds' defenders and their triumphalist historians share which trait?",
          options: [
            "Both underestimate the quality of guild training",
            "Both treat the abolition as an error, though for opposite reasons",
            "Both are captured by political economy",
            "Both deny that guild admission depended on inherited advantage",
          ],
          answer: 1,
          explanation:
            "The last sentence pairs them: describing the choice as a mistake is what 'both the guilds' defenders and their triumphalist historians have done, for opposite reasons.' Defenders call abolition a mistake because something valuable was lost; triumphalists call the guilds' persistence a mistake because they were unjust. Both evade the same recognition — that an institution can be valuable and unjust at once.",
        },
        {
          id: "cars-p4-q6",
          prompt:
            "Which finding would most weaken the author's argument?",
          options: [
            "Some guilds admitted members without kinship connections",
            "Guild-trained artisans produced goods of measurably higher quality than their successors",
            "Reformers' private correspondence shows they believed guild training was worthless and its welfare provision a myth",
            "The abolition of the guilds was followed by a decline in real wages",
          ],
          answer: 2,
          explanation:
            "The argument's load-bearing claim is that reformers 'understood precisely what they were destroying' and chose anyway. If their private correspondence shows they thought there was nothing of value there, then they were mistaken about the institution after all — and the standard story the author rejects is reinstated. Choices B and D confirm that something real was lost, which the author already asserts.",
        },
      ],
    },
    {
      kind: "passage",
      id: "cars-p5",
      title: "Passage V",
      text: `There is a particular kind of photograph that the twentieth century produced in enormous quantities and has never known how to look at. It shows a person, usually poor, usually unnamed, in a condition of difficulty, and it was made by someone who did not share that condition and who left afterward. The photographs are often extraordinary. They are also the occasion of a discomfort that criticism has spent decades trying to convert into a principle, without much success.

The obvious objection is that the photographer extracts: he takes an image from a person who receives nothing and gives it to an audience that pays him. This is true, and the truth of it has generated a literature. But the objection proves less than it seems to, because it applies with equal force to the reporter, the ethnographer, and the novelist who grew up on the street she writes about and left. If extraction is the charge, the dock is crowded, and we do not in fact convict most of its occupants. Something else is doing the work in the photographic case.

I suspect it is the face. Prose can describe a person's circumstances without producing the person; the photograph cannot describe circumstances at all except by producing a face, and the face makes a claim on the viewer that a sentence does not. This is precisely what makes the great photographs great — Lange's migrant mother is not an argument about agricultural labor, and its power is not the power of an argument. But the same mechanism that makes the image irrefutable makes it unanswerable. The woman cannot say what she thought she was doing, or object to the caption, or decline. She is present in a way no prose subject is present, and absent in a way no prose subject is absent, and the combination is what we feel and misdescribe as extraction.

I am not proposing that the pictures should not have been made. That conclusion follows only if the alternative were the woman speaking for herself, and the alternative was not that; the alternative was her absence from the record altogether, which is not obviously better and is what we chose in every case where no photographer arrived. What I am proposing is that the discomfort is not a sign that a rule was broken. It is a sign that the form does something no rule can make comfortable, and that our search for the rule is a way of not looking at the pictures.`,
      questions: [
        {
          id: "cars-p5-q1",
          prompt:
            "The author argues that the extraction objection 'proves less than it seems to' because:",
          options: [
            "photographers often compensate their subjects",
            "it applies equally to writers and ethnographers whom we do not condemn",
            "the photographs are aesthetically extraordinary",
            "the subjects consented to being photographed",
          ],
          answer: 1,
          explanation:
            "The second paragraph: the objection 'applies with equal force to the reporter, the ethnographer, and the novelist... If extraction is the charge, the dock is crowded, and we do not in fact convict most of its occupants.' An objection that would condemn far more than we're willing to condemn isn't doing the work we think it is.",
        },
        {
          id: "cars-p5-q2",
          prompt:
            "According to the author, what distinguishes the photograph from prose about the same subject?",
          options: [
            "The photograph is more accurate",
            "The photograph produces a face, which makes a claim on the viewer that prose does not",
            "The photograph reaches a wider audience",
            "The photograph requires the subject's physical presence",
          ],
          answer: 1,
          explanation:
            "The third paragraph: 'Prose can describe a person's circumstances without producing the person; the photograph cannot describe circumstances at all except by producing a face, and the face makes a claim on the viewer that a sentence does not.' Choice D is literally true but trivial, and it isn't the distinction the author develops.",
        },
        {
          id: "cars-p5-q3",
          prompt:
            "The author's point about Lange's migrant mother is that the photograph:",
          options: [
            "makes a more persuasive argument about agricultural labor than prose could",
            "derives its power from something other than argument, which is also why it cannot be answered",
            "should have included the subject's own account",
            "is the finest example of the genre",
          ],
          answer: 1,
          explanation:
            "The passage says the image 'is not an argument about agricultural labor, and its power is not the power of an argument,' then immediately: 'the same mechanism that makes the image irrefutable makes it unanswerable.' The greatness and the problem share a source — that pairing is the author's actual point, and choice A misses it by treating the image as an argument after all.",
        },
        {
          id: "cars-p5-q4",
          prompt:
            "The author characterizes the subject of such a photograph as both 'present' and 'absent.' This paradox refers to the fact that she:",
          options: [
            "appears in the image but has since died",
            "is vividly shown yet cannot speak, object, or decline",
            "is identifiable to viewers but anonymous in the caption",
            "was photographed without her knowledge",
          ],
          answer: 1,
          explanation:
            "The passage lists exactly what the absence consists of: 'The woman cannot say what she thought she was doing, or object to the caption, or decline.' She is present as a face and absent as an agent. Choices A, C, and D are contingent circumstances the passage never claims are general to the genre.",
        },
        {
          id: "cars-p5-q5",
          prompt:
            "The author responds to the suggestion that the pictures should not have been made by arguing that:",
          options: [
            "the photographs' aesthetic value outweighs the harm",
            "the realistic alternative was not the subject speaking for herself but her absence from the record",
            "the subjects would have consented had they been asked",
            "the objection rests on a misunderstanding of photographic technique",
          ],
          answer: 1,
          explanation:
            "The final paragraph: that conclusion 'follows only if the alternative were the woman speaking for herself, and the alternative was not that; the alternative was her absence from the record altogether.' The author attacks the implicit counterfactual rather than weighing harm against beauty — which is why choice A, the intuitive reading, is wrong.",
        },
        {
          id: "cars-p5-q6",
          prompt:
            "The passage's closing claim is best summarized as:",
          options: [
            "the discomfort indicates an ethical violation that criticism has failed to name",
            "the discomfort is intrinsic to the form, and seeking a rule to resolve it is a form of evasion",
            "critics should develop clearer rules governing documentary photography",
            "the photographs are morally neutral and should be judged only aesthetically",
          ],
          answer: 1,
          explanation:
            "The last sentences: 'the discomfort is not a sign that a rule was broken. It is a sign that the form does something no rule can make comfortable, and that our search for the rule is a way of not looking at the pictures.' Choice C is the opposite of the conclusion, and choice D ignores that the author takes the discomfort seriously rather than dissolving it.",
        },
      ],
    },
  ],
};
