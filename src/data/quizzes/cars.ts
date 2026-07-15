import type { Quiz } from "@/lib/types";

/**
 * CARS quizzes are passage-based. Each passage is original prose written to
 * mirror the register and argumentative density of real MCAT humanities and
 * social science passages.
 */
export const carsQuizzes: Quiz[] = [
  {
    id: "cars-q-1",
    section: "cars",
    title: "CARS Passage I — The Restoration Debate",
    description:
      "An art-historical argument about cleaning old master paintings. Tests main idea, author voice, and application.",
    passage: `When the Sistine Chapel frescoes emerged from their decade-long cleaning, the reaction was not gratitude but something closer to grief. Critics who had spent careers describing Michelangelo's sombre, smoky palette found themselves confronted with oranges and acid greens, and they responded by accusing the restorers of having scrubbed away the master's finishing glazes. The restorers replied, with documentation, that the layers removed were animal glue and candle soot applied centuries after Michelangelo's death. The dispute was never really settled; it merely exhausted itself.

What interests me is not who was right about the glue. It is that both parties shared an assumption so completely that neither thought to defend it: that there exists, somewhere beneath the accretions, a single authentic object which the restorer either reveals or destroys. This is a comforting picture, and it is incoherent. Which authentic object? The frescoes as they left Michelangelo's hand in 1512, seen by almost no one? As they appeared in 1600, when the soot had begun its work and the paintings had acquired the tonal unity that four centuries of viewers took to be the artist's intention? As they appeared in 1980, to the critics whose entire visual education had been formed by that accumulated grime?

The restorer cannot recover the past; she can only choose which past to make present, and every such choice forecloses others. To strip the soot is to privilege the moment of creation over the four centuries of reception that followed — to declare, in effect, that what Michelangelo's contemporaries saw matters and what everyone since has seen does not. I do not say this choice is wrong. I say it is a choice, made on aesthetic and ideological grounds, and that dressing it in the language of scientific recovery is a way of avoiding responsibility for having made it.

Admittedly, the alternative position collapses under its own weight if pressed too far. If every state of the object is equally authentic, then so is the state it will reach after another century of neglect, and the conservator has no grounds to intervene at all — a conclusion no one, including me, is prepared to accept. The point is not that preservation is arbitrary. It is that its justifications are historical and contested rather than technical and settled, and that the profession's persistent appeal to scientific neutrality is less an argument than a way of ending one.`,
    questions: [
      {
        id: "cars-q-1-1",
        prompt: "The author's primary purpose in the passage is to:",
        options: [
          "argue that the Sistine Chapel restorers removed Michelangelo's original glazes",
          "challenge an assumption shared by both sides of the restoration debate",
          "demonstrate that all states of an artwork are equally authentic",
          "advocate for a moratorium on the cleaning of old master paintings",
        ],
        answer: 1,
        explanation:
          "The author states the pivot explicitly: 'What interests me is not who was right about the glue' but rather the assumption 'both parties shared.' Choice A takes a side the author explicitly declines to take. Choice C is the position the author raises and then rejects in the final paragraph as collapsing 'under its own weight.' Choice D is never advocated — the author says restoration involves a choice, not that it should stop.",
      },
      {
        id: "cars-q-1-2",
        prompt:
          "The author's attitude toward the restorers' appeal to scientific recovery is best described as:",
        options: [
          "outraged condemnation of deliberate deception",
          "skeptical of its framing while conceding the underlying work may be defensible",
          "wholly supportive, given the documentation they produced",
          "indifferent, since the dispute exhausted itself",
        ],
        answer: 1,
        explanation:
          "The author calls the scientific framing 'a way of avoiding responsibility' — skeptical. But he also writes 'I do not say this choice is wrong,' conceding the work itself may be defensible. Choice A overstates: 'avoiding responsibility' is not an accusation of deliberate deception, and the tone is analytical rather than outraged. Extreme-tone answers are usually wrong in CARS.",
      },
      {
        id: "cars-q-1-3",
        prompt:
          "The fourth paragraph, beginning 'Admittedly,' functions primarily to:",
        options: [
          "reverse the argument the author has developed",
          "concede a limitation of the opposing view before restating the author's actual claim",
          "introduce evidence that the restorers were correct after all",
          "concede a genuine problem for a position the author might be taken to hold, then narrow his claim",
        ],
        answer: 3,
        explanation:
          "The author anticipates being read as saying every state is equally authentic — a position that would make conservation impossible — and disowns it: 'a conclusion no one, including me, is prepared to accept.' He then narrows to what he actually claims: not that preservation is arbitrary, but that its justifications are contested rather than technical. Choice B has the right shape but the wrong target — the concession addresses HIS potential overreach, not the opposition's.",
      },
      {
        id: "cars-q-1-4",
        prompt:
          "The author would most likely agree that a conservator who repaints a damaged section of a fresco in the original artist's style has:",
        options: [
          "committed a straightforward act of forgery",
          "recovered the work's authentic state",
          "made an interpretive choice that should be defended as such rather than described as neutral recovery",
          "acted improperly, since no state of an object is more authentic than another",
        ],
        answer: 2,
        explanation:
          "This applies the author's core thesis: interventions are choices requiring justification, and the error is dressing them in the language of neutral recovery. Choice B contradicts his central claim that there is no single authentic state to recover. Choice D attributes to him the very position he disowns in the last paragraph. Choice A is far more extreme than anything he says.",
      },
      {
        id: "cars-q-1-5",
        prompt:
          "Suppose evidence emerged that Michelangelo himself applied a thin glaze to unify the fresco's tones shortly after completion, and that the restorers removed it. This finding would:",
        options: [
          "undermine the author's argument, since it would establish an authentic original state",
          "strengthen the author's argument by proving the critics correct",
          "leave the author's central argument largely intact, since he denies that the factual question settles the conceptual one",
          "be irrelevant to the passage, which does not concern Michelangelo",
        ],
        answer: 2,
        explanation:
          "The author sets aside the factual dispute at the outset ('not who was right about the glue') and argues the deeper problem is the shared assumption of a single recoverable authentic object. Settling the glaze question would resolve the empirical dispute while leaving his conceptual argument standing — the 1512 state still competes with four centuries of reception. Choice A is the trap: it assumes his argument depends on the empirical question he explicitly brackets.",
      },
    ],
  },
  {
    id: "cars-q-2",
    section: "cars",
    title: "CARS Passage II — Cities and Their Critics",
    description:
      "A social-theory passage on urban planning. Tests argument structure, attribution, and scope.",
    passage: `The mid-century assault on the American city was conducted almost entirely in the name of the city's own residents. Planners of the period did not think of themselves as destroying neighborhoods; they thought of themselves as clearing slums, and the distinction mattered enormously to them. A slum, in the technical vocabulary of the time, was a district exhibiting measurable deficiencies — overcrowding, aging stock, inadequate light and air. That these criteria could be satisfied by a functioning neighborhood whose residents had no wish to leave was not a possibility the vocabulary permitted anyone to express.

It is tempting to read this as hypocrisy, and some of it was. But the more troubling explanation is that the planners were sincere, and that their sincerity was underwritten by a method. They surveyed from above. The instruments of the profession — the aerial photograph, the land-use map, the density statistic — were all designed to make a district legible at a glance, and all of them systematically registered what a neighborhood lacked while remaining blind to what it possessed. A map records that a block has no park. It cannot record that the block's children are watched, informally and continuously, by two dozen adults who have known them since birth. The first is a deficiency; the second is not a datum at all.

Jane Jacobs is usually credited with having exposed this blindness, and the credit is deserved, though it is worth being precise about what her achievement was. She did not discover that residents disliked being displaced; that was never a secret, and the planning literature acknowledged it as an unfortunate cost. Her contribution was to argue that the things the surveys could not see were not sentimental residue but the actual mechanism by which the neighborhood worked — that the sidewalk life the planners regarded as evidence of overcrowding was in fact the infrastructure of safety, and that replacing it with towers set in landscaped grounds would not improve the neighborhood but abolish the thing that had made it one.

Her critics have long complained that she generalized from a few blocks of Greenwich Village to the whole of urban life, and the complaint is fair as far as it goes. What it misses is that her argument does not require her prescriptions to be universally applicable. It requires only that the planners' instruments were incapable of registering the value they destroyed — and about that, the record is not seriously in dispute.`,
    questions: [
      {
        id: "cars-q-2-1",
        prompt:
          "According to the passage, the planners' method was troubling primarily because:",
        options: [
          "the planners knowingly misrepresented conditions to justify demolition",
          "their instruments could measure absences but not the informal assets a neighborhood possessed",
          "aerial photographs were technically inaccurate at the scale required",
          "they failed to consult the planning literature on displacement",
        ],
        answer: 1,
        explanation:
          "The second paragraph makes this the central point: the tools 'systematically registered what a neighborhood lacked while remaining blind to what it possessed' — a map shows no park but cannot show two dozen watching adults. Choice A is what the author explicitly sets aside: 'the more troubling explanation is that the planners were sincere.' Choice D is contradicted — the literature did acknowledge displacement.",
      },
      {
        id: "cars-q-2-2",
        prompt:
          "The author suggests that Jacobs's central achievement was to demonstrate that:",
        options: [
          "residents objected to being displaced from their homes",
          "the features planners read as deficiencies were the mechanism by which neighborhoods functioned",
          "Greenwich Village should serve as the model for all urban development",
          "towers set in landscaped grounds are aesthetically inferior to older housing stock",
        ],
        answer: 1,
        explanation:
          "The author is unusually explicit about what Jacobs's contribution was NOT — 'She did not discover that residents disliked being displaced; that was never a secret' — before stating what it was: that the unseen features 'were not sentimental residue but the actual mechanism.' Choice A is the distractor the author preemptively rules out. Choice C is the critics' caricature, which the author says her argument does not require.",
      },
      {
        id: "cars-q-2-3",
        prompt:
          "The author's response to critics who say Jacobs overgeneralized is best characterized as:",
        options: [
          "flat rejection of the criticism as motivated by professional resentment",
          "partial agreement, coupled with the argument that the criticism does not touch her central claim",
          "full agreement, conceding that her argument therefore fails",
          "avoidance, since the author does not address the criticism",
        ],
        answer: 1,
        explanation:
          "The author grants the criticism — 'the complaint is fair as far as it goes' — then argues it misses the point, because her argument 'does not require her prescriptions to be universally applicable.' That is partial agreement plus a limitation on its force. The phrase 'as far as it goes' is the tell that a concession is about to be bounded.",
      },
      {
        id: "cars-q-2-4",
        prompt:
          "The author's claim about what a map 'cannot record' most directly supports the broader point that:",
        options: [
          "cartography should be replaced by ethnographic methods in all policy work",
          "a method of observation can determine which facts are available to be considered at all",
          "planners of the period were less competent than their contemporary counterparts",
          "statistical measures of density are usually inaccurate",
        ],
        answer: 1,
        explanation:
          "The passage's argument is that the instruments shaped what could even be noticed — the informal watching of children 'is not a datum at all.' That is a claim about method constraining the available evidence. Choice A vastly exceeds the passage's scope, which never prescribes a replacement methodology. Choice D misreads: the author never says the density statistics were inaccurate, only that they were incomplete.",
      },
      {
        id: "cars-q-2-5",
        prompt:
          "Which finding, if true, would most weaken the author's argument?",
        options: [
          "Some mid-century planners privately expressed doubts about slum clearance",
          "Planning agencies of the period routinely commissioned detailed resident interviews whose findings shaped their decisions",
          "Jane Jacobs's prescriptions proved unworkable in cities unlike New York",
          "Some cleared districts did in fact suffer from severe overcrowding",
        ],
        answer: 1,
        explanation:
          "The argument rests on the claim that the planners' instruments were incapable of registering neighborhood assets. If agencies routinely gathered resident testimony that informed decisions, they had access to precisely the information the author says their methods excluded — the load-bearing claim fails. Choice C is the criticism the author already concedes and neutralizes. Choice D is compatible: he never denies deficiencies existed, only that they were the whole picture. Weakening an argument means attacking its warrant, not adding an unfavorable fact.",
      },
    ],
  },
  {
    id: "cars-q-3",
    section: "cars",
    title: "CARS Passage III — The Uses of Forgetting",
    description:
      "A philosophical passage on memory and moral repair. Tests inference, tone, and analogy.",
    passage: `We have made a virtue of memory so complete that its opposite has become nearly unspeakable. To forget is to betray; to remember is to honor. The formula is repeated at every commemoration, and it has the considerable merit of being true often enough that questioning it feels like an act of bad faith. I want to question it anyway, because the societies that have most thoroughly institutionalized remembrance are not obviously the ones that have most successfully repaired themselves, and this ought to trouble us more than it does.

Consider the amnesties. After the Greek civil war, after Franco, after any number of transitions whose participants had every reason to want an accounting, the settlement that held was frequently the one that agreed not to look too closely. The historian's instinct is to call these arrangements what they were: bargains struck by elites to protect themselves, purchased with the silence of the injured. That description is accurate. It is also incomplete, because it cannot explain why the injured so often ratified the bargain, and ratified it not once but across generations, in societies where they had the numbers and eventually the votes to undo it.

The conventional answer is that they were coerced, or deceived, or exhausted. Sometimes. But there is a possibility the conventional answer is constructed to avoid, which is that a certain kind of forgetting is not the absence of moral seriousness but one of its forms — that the decision to live alongside people who did unforgivable things, without forgiving them and without pursuing them, can be a considered judgment about what a shared future costs rather than a failure to have made a judgment at all.

I am aware of how this argument can be used, and by whom. Every regime that has ever wanted its crimes buried has reached for the language of reconciliation and moving forward, and the reaching has usually been cynical. So let me be exact about the claim. I am not saying that societies should forget, nor that victims owe anyone their silence — the demand for an accounting is theirs to make or waive, and no one else's to waive on their behalf. I am saying that our vocabulary has only one word for what the perpetrator wants and what the injured may sometimes choose, and that using the same word for both makes the second thing impossible to describe, let alone to respect.`,
    questions: [
      {
        id: "cars-q-3-1",
        prompt: "The author's central claim is that:",
        options: [
          "societies recovering from atrocity should forget rather than pursue accountability",
          "our moral vocabulary conflates a perpetrator's self-interest with a choice the injured may legitimately make",
          "amnesties are always elite bargains purchased with the silence of victims",
          "institutionalized remembrance has no value in post-conflict societies",
        ],
        answer: 1,
        explanation:
          "The final paragraph states the thesis with unusual precision: our vocabulary 'has only one word for what the perpetrator wants and what the injured may sometimes choose,' which makes the second impossible to describe. Choice A is explicitly disowned — 'I am not saying that societies should forget.' Choice C is a description the author calls 'accurate' but 'incomplete.' Choice D overstates: he says remembrance-heavy societies are 'not obviously' better repaired, not that remembrance is worthless.",
      },
      {
        id: "cars-q-3-2",
        prompt:
          "The author raises the fact that the injured 'ratified the bargain... across generations' primarily in order to:",
        options: [
          "prove that amnesties are morally justified",
          "show that the elite-bargain explanation cannot account for all the evidence",
          "argue that victims were coerced more thoroughly than historians recognize",
          "demonstrate that memory of atrocity fades naturally over time",
        ],
        answer: 1,
        explanation:
          "The ratification is introduced precisely because the elite-bargain description 'cannot explain why the injured so often ratified the bargain' when they had the numbers and votes to undo it. It is a gap in the conventional account, not a proof of justification — the author never claims amnesties are justified, only that a certain forgetting can be a considered judgment. Choice C inverts his point: coercion is the conventional answer he finds insufficient.",
      },
      {
        id: "cars-q-3-3",
        prompt:
          "The author's acknowledgment that 'every regime that has ever wanted its crimes buried has reached for the language of reconciliation' serves to:",
        options: [
          "abandon the argument in light of its potential misuse",
          "concede the danger of his position before delimiting his claim precisely",
          "accuse his opponents of cynicism",
          "introduce new evidence supporting institutionalized remembrance",
        ],
        answer: 1,
        explanation:
          "This is a concession that precedes a narrowing: he acknowledges 'how this argument can be used, and by whom,' then writes 'So let me be exact about the claim' and specifies what he is and is not saying. Recognizing this move — concession as setup for precision, not retreat — is a core CARS skill. He does not abandon the argument (A); he sharpens it.",
      },
      {
        id: "cars-q-3-4",
        prompt:
          "Based on the passage, the author would most likely object to which of the following?",
        options: [
          "A truth commission that documents atrocities at victims' request",
          "A government declaring on victims' behalf that the nation has moved on",
          "A historian describing an amnesty as an elite bargain",
          "A victim who chooses to pursue prosecution decades later",
        ],
        answer: 1,
        explanation:
          "The author insists the demand for an accounting is the victims' 'to make or waive, and no one else's to waive on their behalf.' A government waiving it for them violates exactly that principle. Choice C is a description he calls accurate. Choices A and D both have victims exercising the choice he says is theirs — precisely what he defends.",
      },
      {
        id: "cars-q-3-5",
        prompt:
          "Which situation is most analogous to the conflation the author describes in the final paragraph?",
        options: [
          "A language having many words for snow, allowing fine distinctions among its forms",
          "A single term 'compromise' covering both a negotiator's surrender under duress and a principled concession, so the latter cannot be praised without seeming to excuse the former",
          "A historian discovering that a widely cited document was forged",
          "A jury reaching a verdict that contradicts the physical evidence",
        ],
        answer: 1,
        explanation:
          "The author's structure is: one word covers two morally opposite things, so the legitimate one cannot be described or respected without appearing to endorse the illegitimate one. Choice B reproduces that structure exactly in a different domain. Choice A is the inverse (abundant distinctions rather than a collapsed one). Analogy questions test structural correspondence, not subject-matter similarity — which is why the unrelated domain is a feature here, not a flaw.",
      },
    ],
  },
];
