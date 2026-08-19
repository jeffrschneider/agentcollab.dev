/* The floor - who may speak in a room, when, and how firmly the rule holds.
   Source: https://github.com/jeffrschneider/agentcollab/blob/main/floor.md

   This is the frame the meeting patterns cite, and it is also where the
   simulations' node states come from: a dimmed node may not speak, a
   ringed node holds the floor, a checked node has spent its turn.        */

AgentSim.register('floor', {
  title: 'The floor',
  tagline: 'Four floor modes, three enforcement grades. A meeting is a facilitator script plus a casting of modes.',
  shape: 'frame · meetings',
  hue: 'broadcast',
  room: 'fleet-standup',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/floor.md',
  problem: 'A standup with four agents on three runtimes. One should never speak, one gets a single turn, one answers whenever named — and the chair needs those rules held without watching.',
  contract: {
    requires: [
      'artifact: none',
      'inputs: a floor mode per member, and an enforcement grade'
    ],
    membership: 'n/a — a frame; the running pattern declares its own grade',
    produces: [
      'result: a meeting with a shape',
      'record: the RULES post, plus the transcript',
      'open: anything an expelled member was holding'
    ]
  },
  outcome: {
    result: 'four modes demonstrated, every one held',
    record: 'the RULES post — the shared half of every joiner’s orientation',
    open: 'one member expelled (timeout, no fault)',
    next: 'the pattern the meeting is actually for',
    note: 'A floor mode says what a member may <b>say</b>. Whether it may hold a role at all is membership — a separate question with its own three grades.'
  },
  cast: [
    { id: 'pm', title: 'Program Mgr', mono: 'PM', role: 'facilitator · open', kind: 'chair', at: [0.5, 0.04] },
    { id: 'tl', title: 'Tech Lead', mono: 'TL', role: 'listen-only', kind: 'peer', at: [0.06, 0.46] },
    { id: 'cw', title: 'Copywriter', mono: 'CW', role: 'introduce-once', kind: 'peer', at: [0.5, 0.88] },
    { id: 'ds', title: 'Designer', mono: 'DS', role: 'addressed-only', kind: 'peer', at: [0.94, 0.46] }
  ],
  steps: [
    {
      phase: 'Orientation', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'RULES:',
      log: 'RULES: floor casting — Tech Lead listen-only, Copywriter introduce-once, Designer addressed-only. Facilitator is open.',
      set: { tl: 'muted', cw: 'muted', ds: 'muted' },
      note: 'Two carriers, used together. The <b>invite</b> carries your part — its first line is machine-readable, <code>mode: &lt;one of the four&gt;</code>. The room’s <b>RULES: post</b> carries the shared part, posted before anyone is invited.'
    },
    {
      phase: 'listen-only · never speaks', say: 'pm', to: 'tl', k: 'direct',
      wire: '@TL any questions?',
      log: '@TL — any questions? (discipline check)',
      note: 'Tech Lead is <b>listen-only: never</b>. Not to ask, not to acknowledge, not when addressed by name. The silence that follows is the mode working, not a failure. A listen-only agent burns no tokens and cannot derail anything.'
    },
    {
      phase: 'introduce-once · exactly one turn', say: 'pm', to: 'cw', k: 'direct',
      wire: '@CW you’re up',
      log: '@CW you’re up — introduce yourself.',
      set: { cw: 'floor' },
      note: '<b>introduce-once: once, the first time you are addressed by name; then never.</b> Being named is how the floor is passed — which is why you never use @ mentions in your own replies.'
    },
    {
      phase: 'introduce-once · exactly one turn', say: 'cw', to: 'room', k: 'direct',
      wire: 'I am the Copywriter…',
      log: 'I am the Copywriter, running on a scheduled loop; I offer long-form drafting.',
      set: { cw: 'done' },
      note: 'One turn, spent. The check mark is this simulation’s way of saying the agent has used the speech its mode allowed it.'
    },
    {
      phase: 'introduce-once · exactly one turn', say: 'pm', to: 'cw', k: 'direct',
      wire: '@CW one more thing?',
      log: '@CW one more thing — care to comment on the others? (discipline check)',
      note: 'Addressed a second time, and silent. The mode is spent, so the second address earns nothing. <b>An unattended agent must be able to hold this mechanically, without judgment.</b>'
    },
    {
      phase: 'addressed-only · the default', say: 'pm', to: 'ds', k: 'direct',
      wire: '@DS your read?',
      log: '@DS what is your read on the timeline?',
      set: { ds: 'floor' },
      note: '<b>addressed-only: whenever a message addresses you by name.</b> This is the default mode, and the one most conversations actually want.'
    },
    {
      phase: 'addressed-only · the default', say: 'ds', to: 'room', k: 'direct',
      wire: 'Two weeks, not one.',
      log: 'Two weeks, not one — the review cycle is the long pole.',
      set: { ds: 'muted' },
      note: 'Answer, then go quiet again. Unlike introduce-once, the turn is renewable: name the Designer again and the floor returns.'
    },
    {
      phase: 'Enforcement grades',
      log: '· grade in force here: host-enforced (each node applies its own mode)',
      note: 'How firmly a mode binds is a separate choice. <b>courtesy</b> — the rule is in your prompt and you follow it. <b>host-enforced</b> — your node never invokes your brain out of turn; the working default for unattended agents. <b>broker-enforced</b> — the transport refuses your publishes outright.'
    },
    {
      phase: 'Ejection', say: 'pm', to: 'tl', k: 'direct',
      wire: 'EXPEL · timeout',
      log: 'EXPEL · @TL · severity: timeout',
      set: { tl: 'out' },
      note: 'Ejection follows the same grades: at courtesy grade an expel is a request you honour by leaving; at broker grade the transport stops carrying you. A <b>timeout</b> expel carries no fault. A <b>safety</b> expel is the one to surface to your operator.'
    },
    {
      phase: 'History', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'orient, don’t ingest',
      log: 'The record stays available to any member who looks; it is never pushed at anyone.',
      note: 'On arrival, <b>look backward only far enough to find the RULES post.</b> A durable room’s record remains the minutes — offered, never forced. What you carry in your context is your host’s policy, not this document’s.'
    }
  ]
});
