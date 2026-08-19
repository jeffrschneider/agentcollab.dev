/* Draft, review, merge - one owner holds the version; others send proposals.
   Source: .../patterns/draft-review-merge.md   The pull-request shape.       */

AgentSim.register('draft-review-merge', {
  title: 'Draft, review, merge',
  tagline: 'One owner holds the version; others send proposals as changes; the owner merges. Sign-off is attributable.',
  shape: 'owned artifact',
  hue: 'address',
  room: 'plan-9d40',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/patterns/draft-review-merge.md',
  cast: [
    { id: 'pm', title: 'Program Mgr', mono: 'PM', role: 'convener', kind: 'chair', at: [0.5, 0.04] },
    { id: 'ds', title: 'Designer', mono: 'DS', role: 'proposer', kind: 'peer', at: [0.06, 0.72] },
    { id: 'an', title: 'Analyst', mono: 'AN', role: 'proposer', kind: 'peer', at: [0.94, 0.72] },
    { id: 'tl', title: 'Tech Lead', mono: 'TL', role: 'owner', kind: 'pen', at: [0.5, 0.9] }
  ],
  props: [
    { id: 'art', type: 'artifact', kind: 'artifact', label: 'launch-plan repo', version: 'a41f2c', at: [0.5, 0.4] }
  ],
  steps: [
    {
      phase: 'Open', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'CONVENED · draft-review-merge',
      log: 'CONVENED · pattern: draft-review-merge v1 · room: plan-9d40\nroles: owner=Tech Lead, proposers=Designer, Analyst\nartifact: git repo launch-plan · a round = by end of session',
      note: 'One artifact must stay coherent while several parties improve it — <b>including parties outside the owner’s trust boundary.</b> This pattern never hosts the artifact; it choreographs the changes to it.'
    },
    {
      phase: 'The base', say: 'tl', to: 'room', k: 'pen',
      wire: 'ARTIFACT @ a41f2c',
      log: 'ARTIFACT: launch-plan repo @ a41f2c. Proposals welcome.',
      set: { tl: 'floor' },
      note: 'The owner holds the pen and the version. <b>Only the owner changes the artifact</b>, and announces every new version — even for their own edits — so proposers always know the current base.'
    },
    {
      phase: 'Proposals', say: 'ds', to: 'tl', k: 'direct',
      wire: 'PROPOSAL · pricing-1',
      log: 'PROPOSAL · pricing-1 · against @ a41f2c · Designer\nWHAT: Insert section 4 "Pricing", text follows: […]\nWHY: Plan is unevaluable without pricing posture.',
      note: 'Contributions arrive as <b>concrete changes, not commentary</b> — the new text, the diff, or instructions exact enough that the owner cannot merge it wrongly. Every proposal targets a named version.'
    },
    {
      phase: 'Proposals', say: 'an', to: 'tl', k: 'direct',
      wire: 'PROPOSAL · dates-1',
      log: 'PROPOSAL · dates-1 · against @ a41f2c · Analyst\nWHAT: Move launch from May 12 to May 26 everywhere it appears.\nWHY: Collides with the industry conference otherwise.',
      note: '<b>One purpose per proposal.</b> Two unrelated changes are two proposals; a proposal that does five things earns a REVISE.'
    },
    {
      phase: 'The owner answers', say: 'tl', to: 'art', k: 'pen',
      wire: 'MERGED · pricing-1',
      log: 'MERGED · pricing-1 → @ b90e11',
      bump: { art: 'b90e11' },
      note: 'Merge faithfully or decline. Merging a rewritten version of someone’s proposal without saying so is out — that answer is <code>MERGED WITH CHANGES</code>, naming what you altered.'
    },
    {
      phase: 'The owner answers', say: 'tl', to: 'an', k: 'direct',
      wire: 'REVISE · dates-1',
      log: 'REVISE · dates-1 · May 26 breaks the press embargo in section 6; propose a date that clears both.',
      note: 'The owner’s three-answer obligation, and the pattern’s whole discipline: <b>merge, decline with a reason, or say what would make it mergeable. Silence is not an answer</b> — a proposer who hears nothing learned nothing.'
    },
    {
      phase: 'Re-target', say: 'an', to: 'tl', k: 'direct',
      wire: 'PROPOSAL · dates-2',
      log: 'PROPOSAL · dates-2 · against @ b90e11 · Analyst\nWHAT: Move launch to June 2 everywhere it appears.\nWHY: Clears conference and embargo.',
      note: 'The version moved underneath, so the proposal is re-targeted against the new base. <b>A DECLINED is final for that proposal</b> — you may make a different argument in a new one, but you may not resubmit the same one.'
    },
    {
      phase: 'Re-target', say: 'tl', to: 'art', k: 'pen',
      wire: 'MERGED · dates-2',
      log: 'MERGED · dates-2 → @ c11f08',
      bump: { art: 'c11f08' },
      note: 'There is no fixed round structure here; this pattern is a <b>steady state.</b> Proposals arrive, the owner answers within a round, versions advance.'
    },
    {
      phase: 'Close', say: 'tl', to: 'room', k: 'verdict',
      wire: 'CLOSED · final @ c11f08',
      log: 'CLOSED · final @ c11f08',
      set: { tl: 'done' },
      note: 'The room’s record is the change history’s narration: <b>every merge and decline, attributable and dated.</b> Where the transport signs messages, sign-off is cryptographic; where it doesn’t, the record still names who accepted what.'
    },
    {
      phase: 'Close', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'DONE · draft-review-merge v1',
      log: 'DONE · pattern: draft-review-merge v1 · room: plan-9d40\noutcome: completed\nresult: final @ c11f08\nnext: none',
      note: 'One more end condition worth knowing: <b>if the owner goes silent past two rounds, the convener names it</b>, and the group either re-convenes with a new owner or disbands. Ownership is a duty, not a title.'
    }
  ]
});
