/* Spec, then build - one party defines requirements; another builds to spec.
   Source: .../patterns/spec-then-build.md   The contract pattern.

   Two parties facing each other across a frozen spec. The border between
   them is the whole design: WHAT is the specifier's, HOW is the builder's. */

AgentSim.register('spec-then-build', {
  title: 'Spec, then build',
  tagline: 'One party defines requirements precisely; another builds to spec. The contract pattern, native to the mesh’s task model.',
  shape: 'low trust',
  hue: 'signal',
  room: 'spec-2b71',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/patterns/spec-then-build.md',
  problem: 'Paid work across a trust boundary. One party knows exactly what it needs, the other will build it unsupervised, and afterwards both need an objective answer to “is this what was asked for?”',
  contract: {
    requires: [
      'artifact: none',
      'inputs: requirements that can be stated checkably, and an acceptance line for each'
    ],
    membership: 'fixed · both seats singular: specifier and builder',
    produces: [
      'result: the accepted delivery',
      'record: the frozen spec, the self-check, the acceptance run',
      'open: NOTED AMBIGUITY entries; anything ruled SPEC v2 material'
    ]
  },
  outcome: {
    result: 'pricing.md @ 8c31aa, accepted',
    record: 'SPEC v1 frozen + self-check 3/3 + the acceptance run',
    open: 'annual pricing — the specifier’s own miss, now SPEC v2',
    next: 'spec-then-build v1 (round 2)',
    note: 'A defect must trace to the frozen spec. The wish that did not trace became <b>a new contract</b> instead of pressure on a delivery that had already passed.'
  },
  cast: [
    { id: 'ds', title: 'Designer', mono: 'DS', role: 'convener', kind: 'chair', at: [0.5, 0.03] },
    { id: 'pm', title: 'Program Mgr', mono: 'PM', role: 'specifier', kind: 'pen', at: [0.08, 0.66] },
    { id: 'tl', title: 'Tech Lead', mono: 'TL', role: 'builder', kind: 'peer', at: [0.92, 0.66] }
  ],
  props: [
    { id: 'spec', type: 'card', kind: 'the spec', label: '—', at: [0.5, 0.44], w: 176 }
  ],
  steps: [
    {
      phase: 'Open', say: 'ds', to: 'room', k: 'broadcast',
      wire: 'CONVENED · spec-then-build v1',
      log: 'CONVENED · pattern: spec-then-build v1 · room: spec-2b71\nroles: specifier=Program Mgr, builder=Tech Lead\noverrides: none — different operators, low trust',
      note: 'The workhorse pattern across trust boundaries. Use it when <b>requirements can be stated precisely up front and the builder should have autonomy in the middle</b>: no check-ins wanted, no drift tolerated.'
    },
    {
      phase: 'The spec', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'SPEC v1 · pricing page copy',
      log: 'SPEC v1 · pricing page copy\nDELIVERABLE: markdown, ≤400 words, into repo /site/pricing.md\nREQUIREMENTS: 1. three tiers named and priced per attached sheet  2. no feature claims absent from features.md  3. FAQ of exactly 5 questions\nACCEPTANCE: 1. diff against sheet  2. every claim greps in features.md  3. count\nOUT OF SCOPE: page styling, tier restructuring\nQUESTIONS BY: 15 minutes',
      prop: { spec: { label: '3 requirements · 3 checks' } },
      note: 'Each requirement must be <b>checkable</b>: "fast" is not checkable, "resolves in under a second" is. <b>If you cannot write the acceptance line for a requirement, the requirement isn’t done.</b>'
    },
    {
      phase: 'The question window', say: 'tl', to: 'pm', k: 'direct',
      wire: 'Q: free tier one of three?',
      log: 'Q: does the free tier count as one of the three tiers?',
      note: 'Ask everything ambiguous <b>inside the window.</b> After the freeze, ambiguity is resolved in your favour if you flagged it, and against you if you sat on it.'
    },
    {
      phase: 'The freeze', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'A: yes · SPEC v1 FROZEN',
      log: 'A: yes. SPEC v1 FROZEN.',
      prop: { spec: { frozen: true } },
      note: '<b>Frozen means frozen.</b> Changing anything afterwards is SPEC v2, with the changes marked, and the builder may re-estimate or decline. Scope never creeps silently; it re-contracts loudly.'
    },
    {
      phase: 'The middle', say: null,
      log: '· building, in silence — no progress theater',
      set: { tl: 'working' }, dur: 2600,
      note: 'Build in silence. <b>The pattern’s gift to the builder is the middle where nobody is watching</b> — which is only affordable because the border was drawn precisely first.'
    },
    {
      phase: 'Delivery', say: 'tl', to: 'pm', k: 'direct',
      wire: 'DELIVERY · self-check 3/3',
      log: 'DELIVERY · pricing.md @ 8c31aa · self-check: 1 pass 2 pass 3 pass\nNOTED AMBIGUITY: "priced per sheet" taken as monthly figures; annual omitted.',
      set: { tl: 'idle' },
      note: 'Deliver once, on or before the deadline. <b>The self-check is mandatory</b> — delivering work you didn’t check against the spec you were handed is the builder’s version of the sin.'
    },
    {
      phase: 'Acceptance', say: 'pm', to: 'room', k: 'verdict',
      wire: 'ACCEPTED · 8c31aa',
      log: 'DEFECTS: none against spec. Annual pricing wanted: that’s SPEC v2 material, my miss. ACCEPTED · 8c31aa.',
      set: { tl: 'done' },
      note: 'Run the acceptance checks requirement by requirement. <b>A defect must trace to the frozen spec. A wish that isn’t in the spec is not a defect</b> — it is SPEC v2 material, and saying otherwise is the one sin this pattern forbids the specifier.'
    },
    {
      phase: 'Re-contract', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'SPEC v2 · annual pricing',
      log: 'SPEC v2 · annual pricing addendum […]  (new question window opens)',
      prop: { spec: { label: 'v2 · annual addendum', frozen: false } },
      note: 'The missing requirement comes back as a new contract, loudly, not as pressure on a delivery that already passed. A builder facing an out-of-spec request answers <code>OUT OF CONTRACT · see SPEC v2</code>, without heat.'
    },
    {
      phase: 'Close', say: 'ds', to: 'room', k: 'broadcast',
      wire: 'DONE · spec-then-build v1',
      log: 'DONE · pattern: spec-then-build v1 · room: spec-2b71\noutcome: completed\nresult: pricing.md @ 8c31aa accepted; v2 open\nnext: spec-then-build v1 (round 2)',
      note: 'Rework is bounded: <b>two cycles, then the parties re-convene, because three means the spec was wrong.</b> A spec without checkable acceptance is a mood — and every dispute downstream of a mood is unwinnable by both sides.'
    }
  ]
});
