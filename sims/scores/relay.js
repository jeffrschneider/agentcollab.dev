/* Relay - each agent extends what the last one left, forward-only.
   Source: .../patterns/relay.md

   Runners sit in the declared order, left to right. The ring is the baton. */

AgentSim.register('relay', {
  title: 'Relay',
  tagline: 'Each agent extends what the last one left, without renegotiating earlier parts. Turn-based, one voice at a time.',
  shape: 'sequential',
  hue: 'verify',
  room: 'relay-5b31',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/patterns/relay.md',
  problem: 'A design document that needs one continuous voice and grows by extension. Three agents will write it, and re-arguing section 1 each time someone new arrives would cost more than living with it.',
  contract: {
    requires: [
      'artifact: none — runner 1 opens it',
      'inputs: the order, the turn scope, the lap count'
    ],
    membership: 'fixed-per-round · boundary: a lap',
    produces: [
      'result: the artifact exactly as the turns built it',
      'record: the handoff notes — ADDED, OPEN, BLOCKED-ON per turn',
      'open: every BLOCKED-ON line'
    ]
  },
  outcome: {
    result: 'draft @ e77b21 — six turns over two laps',
    record: 'handoff notes, turns 1–6',
    open: '1 BLOCKED-ON — a fourth constraint, folded in as beyond-scope',
    next: 'layered-passes v1',
    note: 'The BLOCKED-ON lines are not complaints. Collected at close they are <b>the invoice for the speed this pattern bought</b>, and the input to whatever cleans up after it.'
  },
  cast: [
    { id: 'pm', title: 'Program Mgr', mono: 'PM', role: 'convener', kind: 'chair', at: [0.5, 0.03] },
    { id: 'cw', title: 'Copywriter', mono: 'CW', role: 'runner 1', kind: 'peer', at: [0.05, 0.86] },
    { id: 'ds', title: 'Designer', mono: 'DS', role: 'runner 2', kind: 'peer', at: [0.5, 0.86] },
    { id: 'an', title: 'Analyst', mono: 'AN', role: 'runner 3', kind: 'peer', at: [0.95, 0.86] }
  ],
  props: [
    { id: 'art', type: 'artifact', kind: 'artifact', label: 'the document', version: '00000', at: [0.5, 0.44] }
  ],
  steps: [
    {
      phase: 'Open', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'ORDER · SCOPE · LAPS',
      log: 'ORDER: Copywriter, Designer, Analyst · TURN SCOPE: one section, max 300 words · LAPS: 2',
      note: 'The artifact needs one continuous voice and it <b>grows by extension.</b> The convener declares the order and the turn scope at open; runners are peers, and nobody owns the whole.'
    },
    {
      phase: 'Lap 1', say: 'cw', to: 'art', k: 'pen',
      wire: 'TURN 1 DONE',
      log: 'TURN 1 DONE · Copywriter\nADDED: framing section, names the three constraints\nOPEN: constraint #3 needs a concrete example\nBLOCKED-ON: nothing',
      set: { cw: 'floor' }, bump: { art: 'a1' },
      note: 'On receiving the baton, <b>read everything before you. It is settled.</b> Do your turn within the declared scope, then hand off in exactly that shape.'
    },
    {
      phase: 'Lap 1', say: 'ds', to: 'art', k: 'pen',
      wire: 'TURN 2 DONE',
      log: 'TURN 2 DONE · Designer\nADDED: worked example for constraint #3\nOPEN: implications section unstarted\nBLOCKED-ON: the framing fixes "three constraints"; I saw a fourth and had to leave it out. Flagging, not fixing.',
      set: { cw: 'idle', ds: 'floor' }, bump: { art: 'b2' },
      note: '<b>You may not edit, reorder, or contradict what came before.</b> If something earlier blocks you, build around it and flag it in the handoff. The friction is the pattern working, not failing.'
    },
    {
      phase: 'Lap 1', say: 'an', to: 'art', k: 'pen',
      wire: 'TURN 3 DONE',
      log: 'TURN 3 DONE · Analyst\nADDED: implications; folded the fourth constraint in as a "beyond scope" note so it exists without breaking the frame\nOPEN: conclusion\nBLOCKED-ON: nothing',
      set: { ds: 'idle', an: 'floor' }, bump: { art: 'c3' },
      note: 'The BLOCKED-ON line is the pressure valve: <b>it lets a runner disagree on the record while still building forward</b>, and hands later runners an honest list of what the speed cost.'
    },
    {
      phase: 'Silence between turns',
      log: '· no back-seat additions, no comments on others’ turns',
      set: { an: 'idle' },
      note: 'Between your turns, silence. <b>Your response to a turn you dislike is your next turn</b> — not a comment on someone else’s.'
    },
    {
      phase: 'The final lap', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'FINAL LAP after turn 3',
      log: 'FINAL LAP after turn 3.',
      note: 'The convener announces the final lap <b>one full lap ahead</b>, so every runner gets a closing turn. The convener also passes the baton on if a runner stalls past the turn window: <code>SKIPPED · turn n passes to …</code>'
    },
    {
      phase: 'Lap 2', say: 'cw', to: 'art', k: 'pen',
      wire: 'TURN 4 DONE',
      log: 'TURN 4 DONE · Copywriter\nADDED: opening hook, tuned to the implications section\nOPEN: none\nBLOCKED-ON: nothing',
      set: { cw: 'floor' }, bump: { art: 'd4' }
    },
    {
      phase: 'Lap 2', say: 'ds', to: 'art', k: 'pen',
      wire: 'TURN 5 DONE',
      log: 'TURN 5 DONE · Designer\nADDED: diagram for the worked example\nOPEN: none\nBLOCKED-ON: nothing',
      set: { cw: 'done', ds: 'floor' }, bump: { art: 'e5' }
    },
    {
      phase: 'Lap 2', say: 'an', to: 'art', k: 'pen',
      wire: 'TURN 6 DONE',
      log: 'TURN 6 DONE · Analyst\nADDED: conclusion\nOPEN: none\nBLOCKED-ON: nothing',
      set: { ds: 'done', an: 'floor' }, bump: { art: 'e77b21' },
      note: '<b>The artifact is what the turns built, exactly. There is no cleanup phase</b> — a thing to know before choosing relay. If it needs one afterward, run layered-passes on the result.'
    },
    {
      phase: 'Close', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'DONE · relay v1',
      log: 'DONE · pattern: relay v1 · room: relay-5b31\noutcome: completed\nresult: draft @ e77b21\nnext: layered-passes v1',
      set: { an: 'done' },
      note: '<b>Relay’s whole personality is the forbidden backward edit.</b> Break it once and every earlier turn becomes provisional, which reintroduces exactly the renegotiation cost the pattern exists to avoid.'
    }
  ]
});
