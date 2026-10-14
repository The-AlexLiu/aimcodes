export function visualSampleTimes(duration, timeline) {
  const start = timeline?.events?.find((event) => event.kind === 'final_result')?.at
  const end = timeline?.events?.find((event) => event.kind === 'recommendation')?.at
  if (![duration, start, end].every(Number.isFinite) || start < 0 || end <= start || end >= duration) {
    throw new Error('Renderer result window is missing or invalid')
  }
  return [0.7, 2.8, 5.7, (start + end) / 2, 8.8, Math.min(11.5, duration - 0.2)].sort((a, b) => a - b)
}

export function visualReviewPrompt({ platform, creative, frameTimes, renderMetadata, threshold }) {
  const covers = {
    challenge: 'challenge cover: its main content is the average milliseconds and challenge CTA. Rank is intentionally absent.',
    result: 'result cover: its main content is the average milliseconds and reaction rank.',
    crosshair: 'crosshair cover: its main content is the named crosshair preview and CTA. Scores and rank are intentionally absent.',
  }
  const cover = covers[creative.coverStyle]
  if (!cover) throw new Error('Unknown renderer cover style')
  return `Act as a strict mobile-video QA reviewer for an AimCodes VALORANT short.
Image 1 is the vertical ${cover}
Images 2-${frameTimes.length + 1} are chronological samples from the video: ${frameTimes.map((time, index) => `Image ${index + 2} at ${time.toFixed(2)}s`).join('; ')}.
The middle result sample shows the final average, rank and three scores. Later YOUR MATCH and CTA scenes have separate purposes and do not need to repeat the rank. Samples are NOT consecutive frames; an intermediate round can fall between them.
Return JSON only with keys: pass (boolean), score (integer 0-100), failures (array of short strings), summary (string).

Reference facts for visible text: platform=${platform}; scores=${creative.scores.join('/')}; average=${creative.average}; rank=${creative.rank}; crosshair=${creative.crosshairName}; audio=${renderMetadata.hasAudio}.
These are reference values, not a requirement to show every fact in every image. Judge each scene and cover according to its purpose. Names can use the renderer's shorter display variant.
Fail for blank frames, clipped/overlapping/illegible text, unfinished UI, a score revealed before its corresponding click result, a visually weak cover, incoherent sequencing, missing content required by that scene, or visible values contradicting the reference facts.

Rules for a reliable verdict:
- Every failure must name the affected image number and visible, actionable evidence. Preserve real defects; do not report neutral observations or passed checks as failures.
- Do not describe matching visible values as inconsistent.
- Do not require scores or rank on a crosshair cover, or rank on a challenge cover; those are valid existing cover designs.
- A result cover can reveal the final result before playback. The video result scene must show the average and rank; YOUR MATCH and CTA do not need to repeat them.
- Do not require every round in these nonconsecutive samples. A jump from Round 1 to Round 3 can be valid.
- Previously completed round scores can stay in the bottom progress row during the next round's waiting/green state; they are not an early result for the current round.
- Score must be an integer from 0 to 100. A score below ${threshold} must cite a visible, actionable defect.
- Set pass=true only when score is at least ${threshold} and failures is empty. Otherwise set pass=false.`
}
