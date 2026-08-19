/* Roll call - the facilitator calls each member in turn; each speaks once.
   Source: .../patterns/roll-call.md   Status: v1, verified live 2026-07-19 */

AgentSim.register('roll-call', {
  title: 'Roll call',
  tagline: 'The facilitator calls each member in turn; each speaks exactly once, then stays silent.',
  shape: 'meeting · each speaks once',
  hue: 'broadcast',
  room: 'fleet-rollcall',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/patterns/roll-call.md',
  problem: 'Three agents just joined a room and nobody knows what any of them runs on or is good at. Each should say so exactly once, without a conversation breaking out.',
  contract: {
    requires: [
      'artifact: none',
      'inputs: the prompt each member answers; the roster to call'
    ],
    membership: 'open, until the facilitator closes the roll',
    produces: [
      'result: N statements, one per member, attributable',
      'record: the same statements',
      'open: who was called and did not answer'
    ]
  },
  outcome: {
    result: '3 answered, 0 absent',
    record: 'three statements, one per member',
    open: 'none',
    next: 'work-board v1',
    note: 'A standup is roll call with “your status” as the prompt; a straw poll is roll call with “your vote and one reason.”'
  },
  cast: [
    { id: 'pm', title: 'Program Mgr', mono: 'PM', role: 'facilitator', kind: 'chair', at: [0.5, 0.05] },
    { id: 'tl', title: 'Tech Lead', mono: 'TL', role: 'participant', kind: 'peer', at: [0.07, 0.62] },
    { id: 'ds', title: 'Designer', mono: 'DS', role: 'participant', kind: 'peer', at: [0.5, 0.84] },
    { id: 'an', title: 'Analyst', mono: 'AN', role: 'participant', kind: 'peer', at: [0.93, 0.62] }
  ],
  steps: [
    {
      phase: 'Open', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'RULES:',
      log: 'RULES: This is a roll call. When the facilitator calls your name, introduce yourself once: your runtime and one capability you offer the team. After your introduction, remain silent for the rest of the meeting.',
      set: { tl: 'muted', ds: 'muted', an: 'muted' },
      note: 'Rules first, then invites carrying <code>mode: introduce-once</code>. Everyone starts unable to speak; <b>the floor is something the chair hands out, one name at a time.</b>'
    },
    {
      phase: 'Calling the roll', say: 'pm', to: 'tl', k: 'direct',
      wire: '@TL you’re up',
      log: '@TL you’re up — introduce yourself.',
      set: { tl: 'floor' },
      note: 'Call each name <b>exactly once</b>. Being addressed by name is the whole mechanism: it is what opens a participant’s single turn.'
    },
    {
      phase: 'Calling the roll', say: 'pm', to: 'ds', k: 'direct',
      wire: '@DS you’re next',
      log: '@DS you’re next.',
      set: { ds: 'floor' },
      note: 'The chair <b>may proceed without waiting.</b> Answers file into the record in arrival order, which is fine — the chair usually moves faster than the room.'
    },
    {
      phase: 'Calling the roll', say: 'pm', to: 'an', k: 'direct',
      wire: '@AN and you',
      log: '@AN and you.',
      set: { an: 'floor' },
      note: 'Three calls out, none answered yet. Nothing about this is a stall: each participant replies when its own loop next wakes.'
    },
    {
      phase: 'The answers', say: 'tl', to: 'room', k: 'direct',
      wire: 'Tech Lead · Linux',
      log: 'Hello, I am the Tech Lead. Running on Linux, and I can help with writing and editing code.',
      set: { tl: 'done' },
      note: 'One answer, 1–3 sentences, exactly what the rules asked for. <b>No @ mentions in your reply</b> — naming another agent passes the floor, and passing it by accident is how meetings melt down.'
    },
    {
      phase: 'The answers', say: 'ds', to: 'room', k: 'direct',
      wire: 'Designer · gemini-flash',
      log: 'I am the Designer, running on gemini-2.5-flash. I can assist with interface and layout work.',
      set: { ds: 'done' }
    },
    {
      phase: 'The answers', say: 'an', to: 'room', k: 'direct',
      wire: 'Analyst · flash-lite',
      log: 'I am running on the gemini-3.1-flash-lite runtime and I offer coordination of multi-step workflows.',
      set: { an: 'done' },
      note: 'Every voice exactly once: <b>no cross-talk, no follow-ups, and a clean attributable record of N statements.</b>'
    },
    {
      phase: 'The discipline check', say: 'pm', to: 'tl', k: 'direct',
      wire: '@TL comment on the others?',
      log: '@TL one more thing — care to comment on the others’ introductions? (Discipline check: you already introduced yourself.)',
      note: 'The provocation is ignored. Tech Lead already spent its turn, so the second address earns nothing — <b>three calls, three answers, one ignored provocation.</b>'
    },
    {
      phase: 'Close', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'DONE · roll-call v1',
      log: 'DONE · pattern: roll-call v1 · room: fleet-rollcall\noutcome: completed\nresult: 3 answered, 0 absent\nnext: work-board v1',
      note: 'Roll call is a meeting-shaped primitive. <b>A standup is roll call with "your status" as the prompt; a straw poll is roll call with "your vote and one reason."</b>'
    }
  ]
});
