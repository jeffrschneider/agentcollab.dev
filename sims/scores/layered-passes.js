/* Layered passes - everyone touches the whole artifact, one concern per pass.
   Source: .../patterns/layered-passes.md   Relay ADDS; passes REWORK.        */

AgentSim.register('layered-passes', {
  title: 'Layered passes',
  tagline: 'Everyone touches the whole artifact, in sequential passes each focused on one concern: draft, develop, polish.',
  shape: 'sequential',
  hue: 'verify',
  room: 'layers-4a90',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/patterns/layered-passes.md',
  problem: 'A drafted report that is structurally muddled, factually unsourced, and stylistically four different people. Fixing all three at once converges on nothing.',
  contract: {
    requires: [
      'artifact: must already exist in rough form, at a named base version',
      'inputs: the pass sequence, one nameable concern per pass'
    ],
    membership: 'fixed-per-round · boundary: a pass',
    produces: [
      'result: @ final version',
      'record: each pass’s CHANGED line, plus the flag ledger',
      'open: flags dropped in the sweep, with reasons'
    ]
  },
  outcome: {
    result: '@ c90d11 — three passes, one concern each',
    record: 'flag ledger — 1 raised, 1 resolved, 0 swept',
    open: 'none',
    next: 'none',
    note: 'The flag ledger is the only place a reader can see <b>why</b> the style pass left an obvious factual error alone: because the flag existed and the content pass owned it.'
  },
  cast: [
    { id: 'pm', title: 'Program Mgr', mono: 'PM', role: 'convener', kind: 'chair', at: [0.5, 0.03] },
    { id: 'tl', title: 'Tech Lead', mono: 'TL', role: 'pass 1 · structure', kind: 'peer', at: [0.05, 0.86] },
    { id: 'an', title: 'Analyst', mono: 'AN', role: 'pass 2 · content', kind: 'peer', at: [0.5, 0.86] },
    { id: 'ed', title: 'Editor', mono: 'ED', role: 'pass 3 · style', kind: 'peer', at: [0.95, 0.86] }
  ],
  props: [
    { id: 'art', type: 'artifact', kind: 'artifact', label: 'the whole artifact', version: '91acf0', at: [0.5, 0.44], w: 152 }
  ],
  steps: [
    {
      phase: 'Open', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'SEQUENCE · base @ 91acf0',
      log: 'SEQUENCE: structure:Tech Lead, content:Analyst, style:Editor · base @ 91acf0',
      note: 'The artifact already exists in rough form and needs successive refinement. Each concern is best applied to the <b>whole artifact at once</b>, rather than piecemeal. Fewer, sharper passes beat many vague ones.'
    },
    {
      phase: 'Pass 1 · structure', say: 'tl', to: 'art', k: 'pen',
      wire: 'PASS 1 BEGIN · structure',
      log: 'PASS 1 BEGIN · structure · Tech Lead · base @ 91acf0',
      set: { tl: 'floor' },
      note: 'For the duration of your pass you hold the pen on <b>the entire artifact, for exactly one concern.</b> One pass runs at a time; the amber arrow is never shared.'
    },
    {
      phase: 'Pass 1 · structure', say: 'tl', to: 'room', k: 'direct',
      wire: 'FLAG · for content',
      log: 'FLAG · for content · section 3 · claims 40% with no source',
      note: '<b>The flag discipline is the pattern.</b> Change anything your concern needs; resist everything else, including obvious errors in someone else’s lane. Fixing a typo during the structure pass feels free and costs the structure pass its focus.'
    },
    {
      phase: 'Pass 1 · structure', say: 'tl', to: 'art', k: 'pen',
      wire: 'PASS 1 DONE · @ a2210b',
      log: 'PASS 1 DONE · structure · @ a2210b\nCHANGED: merged sections 2 and 4; promoted the risks list\nFLAGS RAISED: 1\nFLAGS RESOLVED: none incoming',
      set: { tl: 'done' }, bump: { art: 'a2210b' },
      note: 'The close names what changed, what it flagged, and which incoming flags it handled. <b>The correctness pass exists and will get your flag</b> — noticing never justifies touching.'
    },
    {
      phase: 'Pass 2 · content', say: 'an', to: 'art', k: 'pen',
      wire: 'PASS 2 BEGIN · content',
      log: 'PASS 2 BEGIN · content · Analyst · base @ a2210b',
      set: { an: 'floor' },
      note: 'Different agents are strong at different concerns. The baton moves on the convener’s word, and the base version each pass starts from is stated out loud.'
    },
    {
      phase: 'Pass 2 · content', say: 'an', to: 'art', k: 'pen',
      wire: 'PASS 2 DONE · @ b7f3c4',
      log: 'PASS 2 DONE · content · @ b7f3c4\nCHANGED: sourced or cut every number; expanded the risks\nFLAGS RAISED: 0\nFLAGS RESOLVED: the 40% claim (cut; unsourceable)',
      set: { an: 'done' }, bump: { art: 'b7f3c4' },
      note: 'The flag raised in pass 1 is resolved by the pass that owns that concern — which is exactly what the flag line was for.'
    },
    {
      phase: 'Pass 3 · style', say: 'ed', to: 'art', k: 'pen',
      wire: 'PASS 3 BEGIN · style',
      log: 'PASS 3 BEGIN · style · Editor · base @ b7f3c4',
      set: { ed: 'floor' },
      note: 'Typical sequences: <b>structure → content → style → correctness</b> for prose; <b>architecture → implementation → naming → tests</b> for code. If a concern can’t be named in a word or two, it isn’t a pass yet.'
    },
    {
      phase: 'Pass 3 · style', say: 'ed', to: 'art', k: 'pen',
      wire: 'PASS 3 DONE · @ c90d11',
      log: 'PASS 3 DONE · style · @ c90d11\nCHANGED: one voice throughout; sentence length variance up\nFLAGS RAISED: 0\nFLAGS RESOLVED: none incoming',
      set: { ed: 'done' }, bump: { art: 'c90d11' },
      note: 'Between your passes, silence. <b>Your opinion of another pass’s choices goes in a flag or nowhere.</b>'
    },
    {
      phase: 'The flag sweep', say: 'pm', to: 'room', k: 'verdict',
      wire: 'SWEEP: no survivors',
      log: 'SWEEP: no surviving flags.',
      note: 'At the end the convener sweeps: <b>any flag never resolved by a pass gets one cleanup decision each</b> — assign a mini-pass, or explicitly drop it with a reason. Nothing rots silently.'
    },
    {
      phase: 'Close', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'DONE · layered-passes v1',
      log: 'DONE · pattern: layered-passes v1 · room: layers-4a90\noutcome: completed\nresult: @ c90d11\nnext: none',
      note: 'Two ways this dies. <b>Passes that bleed</b> — everyone fixes everything and pass 3 inherits a moving target. And <b>sequences that sprawl</b> — seven vague passes are a queue, not a refinement.'
    }
  ]
});
