/* Critique circle - one creates, the group critiques in rounds, the creator revises.
   Source: .../patterns/critique-circle.md

   Watch which arrows reach the artifact. Only the creator's do. Critics fire
   at the creator, never at the document: that is the whole pattern, drawn.  */

AgentSim.register('critique-circle', {
  title: 'Critique circle',
  tagline: 'One agent creates; the group critiques in rounds; the creator revises. Critics never touch the artifact.',
  shape: 'distributed judgment',
  hue: 'verify',
  room: 'crit-7f3a',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/patterns/critique-circle.md',
  cast: [
    { id: 'pm', title: 'Program Mgr', mono: 'PM', role: 'convener', kind: 'chair', at: [0.5, 0.04] },
    { id: 'tl', title: 'Tech Lead', mono: 'TL', role: 'critic', kind: 'peer', at: [0.06, 0.5] },
    { id: 'ds', title: 'Designer', mono: 'DS', role: 'critic', kind: 'peer', at: [0.94, 0.5] },
    { id: 'cw', title: 'Copywriter', mono: 'CW', role: 'creator', kind: 'pen', at: [0.5, 0.87] }
  ],
  props: [
    { id: 'art', type: 'artifact', kind: 'artifact', label: 'launch-plan.md', version: 'a41f2c', at: [0.5, 0.42] }
  ],
  steps: [
    {
      phase: 'Open', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'CONVENED · critique-circle v1',
      log: 'CONVENED · pattern: critique-circle v1 · room: crit-7f3a\nroles: creator=Copywriter, critics=Tech Lead, Designer\nartifact: git repo launch-plan, branch main',
      note: 'One artifact that needs a single voice, and judgment that should be distributed. <b>Works at any trust level, because critics only ever comment</b> — the safest pattern for strangers’ agents.'
    },
    {
      phase: 'Round 1 · the draft', say: 'cw', to: 'art', k: 'pen',
      wire: 'DRAFT 1',
      log: 'DRAFT 1: launch-plan.md @ a41f2c (one page, five sections)',
      set: { cw: 'floor' },
      note: 'The creator owns the artifact <b>and the pen. Nobody else edits it.</b> Every arrow that reaches the document in this simulation comes from the amber node.'
    },
    {
      phase: 'Round 1 · the critiques', say: 'tl', to: 'cw', k: 'direct',
      wire: 'CRITIQUE · draft 1',
      log: 'CRITIQUE · draft 1 · Tech Lead\nMUST-FIX: No pricing section; the plan can’t be evaluated without one.\nSUGGEST: cut section 2 by half; lead with the demo date\nGOOD: the positioning paragraph. Keep it word for word.',
      note: 'One message per round, in exactly that shape. <b>One MUST-FIX per round — forcing yourself to rank is the job.</b> The GOOD line exists so the creator knows what not to break.'
    },
    {
      phase: 'Round 1 · the critiques', say: 'ds', to: 'cw', k: 'direct',
      wire: 'CRITIQUE · draft 1',
      log: 'CRITIQUE · draft 1 · Designer\nMUST-FIX: Launch date conflicts with the conference in section 4.\nSUGGEST: name an owner per workstream\nGOOD: scope honesty in section 5.',
      note: '<b>Critique the artifact, not the other critics.</b> Do not reply to critiques, and no rewrites — if you catch yourself drafting replacement text longer than a sentence, cut it back to the instruction that would produce it.'
    },
    {
      phase: 'Round 2 · the revision', say: 'cw', to: 'art', k: 'pen',
      wire: 'DRAFT 2',
      log: 'DRAFT 2: launch-plan.md @ b90e11\nTook: pricing section added; date moved past the conference; owners named.\nDeclined: cutting section 2 (it carries the pricing rationale now).',
      bump: { art: 'b90e11' },
      note: 'The creator is <b>not obliged to accept any critique</b> — only to answer each MUST-FIX with either the change or one sentence of why not. <b>Do not defend the work in chat: the revision is the reply.</b>'
    },
    {
      phase: 'Round 2 · the critiques', say: 'tl', to: 'cw', k: 'verdict',
      wire: 'CRITIQUE · draft 2 · PASS',
      log: 'CRITIQUE · draft 2 · Tech Lead · PASS',
      set: { tl: 'done' },
      note: '<b>Silence is assent</b>, so a critic with no MUST-FIX posts PASS explicitly — otherwise the round cannot close. Expect convergence, not perfection: MUST-FIXes should get smaller each round.'
    },
    {
      phase: 'Round 2 · the critiques', say: 'ds', to: 'cw', k: 'verdict',
      wire: 'CRITIQUE · draft 2 · PASS',
      log: 'CRITIQUE · draft 2 · Designer · PASS',
      set: { ds: 'done' },
      note: 'All critics pass on the current draft — that is one of four end conditions. The others: the creator calls <code>FINAL</code> after round 2+ and no critic objects; the operator says stop; or the round limit (default 5) runs out.'
    },
    {
      phase: 'Close', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'DONE · critique-circle v1',
      log: 'DONE · pattern: critique-circle v1 · room: crit-7f3a\noutcome: completed\nresult: draft 2 final\nnext: none',
      note: 'The last DRAFT is the deliverable. <b>The transcript is the audit</b>: who flagged what, what was declined, and why.'
    }
  ]
});
