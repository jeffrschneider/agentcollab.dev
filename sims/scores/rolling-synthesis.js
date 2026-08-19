/* Rolling synthesis - many submit raw material; one integrator merges it.
   Source: .../patterns/rolling-synthesis.md                                  */

AgentSim.register('rolling-synthesis', {
  title: 'Rolling synthesis',
  tagline: 'Many agents submit raw material; one integrator’s whole craft is the merge into a coherent artifact.',
  shape: 'centralized judgment',
  hue: 'signal',
  room: 'pilot-88',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/patterns/rolling-synthesis.md',
  problem: 'A pilot just ended and the findings are scattered across three agents’ heads — session logs, support notes, screenshots. A committee-written summary of all of it would read like a committee wrote it.',
  contract: {
    requires: [
      'artifact: none',
      'inputs: a topic, and the kinds of material wanted, as concrete questions'
    ],
    membership: 'open (sources — the more the better) · singular seat: integrator',
    produces: [
      'result: the final synthesis',
      'record: which claim rests on which source; every CORRECTION',
      'open: gaps declared as known-unknowns'
    ]
  },
  outcome: {
    result: 'synthesis 2 — one voice from three sources',
    record: 'attribution inside the artifact; 1 correction, fixed',
    open: 'none blocking — the gaps closed',
    next: 'none',
    note: 'A source arriving at synthesis 2 is pure gain. The integrator is the seat that cannot move: swapping it mid-run produces two half syntheses rather than one whole.'
  },
  cast: [
    { id: 'ed', title: 'Editor', mono: 'ED', role: 'integrator', kind: 'pen', at: [0.5, 0.04] },
    { id: 'an', title: 'Analyst', mono: 'AN', role: 'source', kind: 'peer', at: [0.05, 0.74] },
    { id: 'rs', title: 'Researcher', mono: 'RS', role: 'source', kind: 'peer', at: [0.5, 0.9] },
    { id: 'ds', title: 'Designer', mono: 'DS', role: 'source', kind: 'peer', at: [0.95, 0.74] }
  ],
  props: [
    { id: 'art', type: 'artifact', kind: 'the synthesis', label: 'pilot findings', version: '—', at: [0.5, 0.4], w: 148 }
  ],
  steps: [
    {
      phase: 'The call', say: 'ed', to: 'room', k: 'broadcast',
      wire: 'CALL · what did we learn?',
      log: 'CALL · what did we learn from the pilot?\nNEED: user quotes, failure incidents, feature requests, anything with a timestamp\nFORM: raw fragments fine, links fine — RAW IS FINE\nBY: synthesis cut in 2 hours',
      note: 'Use it when the inputs are scattered across many heads and <b>no single source has the picture</b>, but coherence must still come from one editorial hand.'
    },
    {
      phase: 'Material flows in', say: 'an', to: 'ed', k: 'direct',
      wire: 'MATERIAL · Analyst',
      log: 'MATERIAL · Analyst: 14 session logs, 3 rage-quits around the pairing step, quotes attached […]',
      note: 'Sources supply material; they do not shape the artifact. <b>Fragments, half-thoughts, links, and contradictions of other material are all legitimate</b> — polishing is the integrator’s job, not theirs.'
    },
    {
      phase: 'Material flows in', say: 'rs', to: 'ed', k: 'direct',
      wire: 'MATERIAL · Researcher',
      log: 'MATERIAL · Researcher: billing confusion twice; one "this is magic" moment at first reply […]'
    },
    {
      phase: 'Material flows in', say: 'ds', to: 'ed', k: 'direct',
      wire: 'MATERIAL · Designer',
      log: 'MATERIAL · Designer: pairing screen has no error state; screenshots attached […]',
      note: 'The failure smell to watch for: <b>sources writing essays.</b> When material arrives pre-synthesized the integrator becomes a stapler — restate RAW IS FINE.'
    },
    {
      phase: 'The first cut', say: 'ed', to: 'art', k: 'pen',
      wire: 'SYNTHESIS 1',
      log: 'SYNTHESIS 1: […] one narrative across all three sources, attributing the rage-quit data to Analyst.',
      bump: { art: 'synthesis 1' },
      note: 'The integrator may <b>weigh, cut, and reframe material freely — but may not silently contradict it.</b> Where sources conflict, the synthesis says so, or picks one and says why.'
    },
    {
      phase: 'Gaps are the next call', say: 'ed', to: 'room', k: 'broadcast',
      wire: 'GAPS:',
      log: 'GAPS: no data on time-to-first-success; the rage-quit cause is unconfirmed — UI or docs?',
      note: '<b>The gaps line is the next call, and sharp gaps pull better material than broad ones.</b> Healthy runs show gaps getting narrower and more factual each cut.'
    },
    {
      phase: 'Aimed material', say: 'an', to: 'ed', k: 'direct',
      wire: 'MATERIAL · Analyst',
      log: 'MATERIAL · Analyst: rage-quits correlate with the pairing code expiring; median time-to-first-success 11m.',
      note: 'Second-round material answers the gaps rather than restating the call. Gaps that repeat verbatim mean the sources are exhausted or the call is aimed at the wrong agents — and the integrator says which.'
    },
    {
      phase: 'Fidelity, not taste', say: 'rs', to: 'ed', k: 'direct',
      wire: 'CORRECTION · synthesis 1',
      log: 'CORRECTION · Researcher · synthesis 1 misstates my material: it says "billing broke" vs what I said, "users misread the billing copy".',
      note: '<b>Corrections are about fidelity, not editorial taste.</b> A source reads each synthesis for its own material only — and outstanding corrections block FINAL until fixed or justified.'
    },
    {
      phase: 'The second cut', say: 'ed', to: 'art', k: 'pen',
      wire: 'SYNTHESIS 2',
      log: 'SYNTHESIS 2: […] billing wording corrected; pairing-code expiry named as the rage-quit cause. GAPS: none blocking.',
      bump: { art: 'synthesis 2' },
      note: 'The other failure smell: <b>the integrator broadcasting drafts for approval.</b> That is a critique loop leaking in — authority over form is the entire reason this pattern produces one voice from many.'
    },
    {
      phase: 'Close', say: 'ed', to: 'room', k: 'verdict',
      wire: 'FINAL · synthesis 2',
      log: 'FINAL · synthesis 2\n\nDONE · pattern: rolling-synthesis v1 · room: pilot-88\noutcome: completed · result: synthesis 2, gaps declared · next: none',
      set: { an: 'done', rs: 'done', ds: 'done' },
      note: 'FINAL lands when gaps are closed, <b>or when the remaining gaps are named as known-unknowns inside the artifact.</b> If the sources should critique the evolving artifact instead of feeding it, that was critique-circle.'
    }
  ]
});
