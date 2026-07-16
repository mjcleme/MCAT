import type { SectionId } from "./types";

/**
 * Raw-percentage → scaled-score conversion.
 *
 * IMPORTANT: this is an approximation, not an AAMC-calibrated curve. The real
 * conversion is equated per administration and never published, and it is
 * derived from a 59-question section rather than our 30. The anchors below are
 * fitted so that ~65% correct lands near 125 — the historical median, where a
 * total of ~500 sits at roughly the 47th percentile.
 *
 * Treat the output as a ballpark for spotting weak sections, not a prediction.
 */
const SCALE_ANCHORS: [pct: number, scaled: number][] = [
  [0.3, 118],
  [0.4, 120],
  [0.5, 122],
  [0.6, 124],
  [0.65, 125],
  [0.7, 126],
  [0.75, 127],
  [0.8, 128],
  [0.85, 129],
  [0.9, 130],
  [0.95, 131],
  [1.0, 132],
];

export const MIN_SECTION_SCORE = 118;
export const MAX_SECTION_SCORE = 132;
export const MIN_TOTAL_SCORE = 472;
export const MAX_TOTAL_SCORE = 528;

export function scaledScore(raw: number, total: number): number {
  if (total <= 0) return MIN_SECTION_SCORE;
  const pct = raw / total;

  if (pct <= SCALE_ANCHORS[0][0]) return MIN_SECTION_SCORE;

  for (let i = 1; i < SCALE_ANCHORS.length; i++) {
    const [prevPct, prevScore] = SCALE_ANCHORS[i - 1];
    const [currPct, currScore] = SCALE_ANCHORS[i];
    if (pct <= currPct) {
      const t = (pct - prevPct) / (currPct - prevPct);
      return Math.round(prevScore + t * (currScore - prevScore));
    }
  }
  return MAX_SECTION_SCORE;
}

/**
 * Approximate total-score percentiles, interpolated from recently published
 * AAMC percentile ranks. Percentiles shift year to year; these are indicative.
 */
const PERCENTILE_ANCHORS: [score: number, percentile: number][] = [
  [472, 0],
  [480, 2],
  [485, 8],
  [490, 17],
  [493, 25],
  [496, 35],
  [500, 47],
  [502, 53],
  [505, 62],
  [508, 71],
  [510, 77],
  [512, 82],
  [515, 88],
  [517, 92],
  [520, 95],
  [522, 97],
  [524, 98],
  [526, 99],
  [528, 100],
];

export function approximatePercentile(total: number): number {
  if (total <= PERCENTILE_ANCHORS[0][0]) return 0;
  for (let i = 1; i < PERCENTILE_ANCHORS.length; i++) {
    const [prevScore, prevPct] = PERCENTILE_ANCHORS[i - 1];
    const [currScore, currPct] = PERCENTILE_ANCHORS[i];
    if (total <= currScore) {
      const t = (total - prevScore) / (currScore - prevScore);
      return Math.round(prevPct + t * (currPct - prevPct));
    }
  }
  return 100;
}

export type SectionScore = {
  section: SectionId;
  raw: number;
  total: number;
  scaled: number;
};

export type ExamScore = {
  sections: SectionScore[];
  totalScaled: number;
  totalRaw: number;
  totalQuestions: number;
  percentile: number;
};

export function scoreExam(sections: SectionScore[]): ExamScore {
  const totalScaled = sections.reduce((sum, s) => sum + s.scaled, 0);
  return {
    sections,
    totalScaled,
    totalRaw: sections.reduce((sum, s) => sum + s.raw, 0),
    totalQuestions: sections.reduce((sum, s) => sum + s.total, 0),
    percentile: approximatePercentile(totalScaled),
  };
}

/** Plain-language read on a section score, for the report page. */
export function scoreBand(scaled: number): {
  label: string;
  tone: "strong" | "solid" | "developing" | "weak";
} {
  if (scaled >= 129) return { label: "Strong", tone: "strong" };
  if (scaled >= 126) return { label: "Above median", tone: "solid" };
  if (scaled >= 124) return { label: "Near median", tone: "developing" };
  return { label: "Needs work", tone: "weak" };
}
