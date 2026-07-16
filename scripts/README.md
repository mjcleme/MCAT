# Verification scripts

Run with `npm run verify`. No test framework — these are plain scripts that
exit non-zero on failure, so they work in CI as-is.

They exist because content bugs are invisible in a type system and expensive in
a study tool. Two real defects that these caught:

- **Answer clustering.** The first draft of the exam put 63% of correct answers
  at B and exactly one at D. A student could have scored well above chance by
  guessing B without reading a word. `verify-exam.ts` fails if any letter falls
  outside 15–35%.
- **A regex that ate its separator.** `remapExplanation` matched option letters
  case-insensitively, so `[A-D]` matched the lowercase "a" in "and" and
  "Choices A, C, and D" lost its final letter. `verify-balance.ts` pins the
  list-remapping cases.

| Script | Covers |
| --- | --- |
| `verify-content.ts` | Flashcard/quiz integrity, SM-2 scheduling, queue building |
| `verify-exam.ts` | Exam structure, question integrity, answer distribution, scaled scoring |
| `verify-balance.ts` | Answer balancing preserves correct-answer *text*; explanation letters remap |
| `verify-progress.ts` | Section state machine, timers, localStorage persistence and resume |

## The invariant that matters most

`verify-balance.ts` asserts that permuting options never changes which option
*text* is correct:

```ts
raw.options[raw.answer] === balanced.options[balanced.answer]
```

If that ever fails, every stored exam attempt has been graded against the wrong
key. Nothing else in the suite is as load-bearing.

## When adding content

Run `npm run verify` before committing. It will tell you if you have clustered
answers, duplicated an id, written a question with three options, or recycled a
quiz prompt into the exam.
