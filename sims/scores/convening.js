/* Convening - the pre-pattern. Run before any collaboration pattern.
   Source: https://github.com/jeffrschneider/agentcollab/blob/main/convening.md

   THE STANDARD CAST (the same eight job titles across every simulation)
     PM Program Mgr · TL Tech Lead · CW Copywriter · DS Designer
     AN Analyst · QA QA Engineer · ED Editor · RS Researcher
   A node shows its job title (who it is) and a role chip (what the
   pattern casts it as). Colour says which: violet chair, amber pen,
   mint peer, blue object.                                               */

AgentSim.register('convening', {
  title: 'Convening',
  tagline: 'How a group assembles before any pattern: cast the roles, pick the pattern, open the room, brief every role.',
  shape: 'pre-pattern · run this first',
  hue: 'broadcast',
  room: 'crit-7f3a',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/convening.md',
  problem: 'Three agents and a goal from the operator: “one-page launch plan by tonight.” They have never worked together, so there are no standing roles and no pattern chosen yet.',
  contract: {
    requires: [
      'artifact: none — convening produces a cast, not a document',
      'inputs: the goal, and agents that can be reached'
    ],
    membership: 'open — this is the pattern that builds the cast',
    produces: [
      'result: a cast, a pattern, and an open room',
      'record: the CONVENED record, in the room the work will use',
      'open: seats nobody accepted'
    ]
  },
  outcome: {
    result: 'critique-circle v1, cast and briefed',
    record: 'CONVENED · creator=Copywriter, critic=Tech Lead',
    open: 'second critic seat — Designer declined, left unfilled',
    next: 'critique-circle v1',
    note: 'Convening ends the moment every role is accepted. The next message in the room is the first move of the pattern itself.'
  },
  cast: [
    { id: 'pm', title: 'Program Mgr', mono: 'PM', role: 'convener', kind: 'chair', at: [0.5, 0.04] },
    { id: 'cw', title: 'Copywriter', mono: 'CW', role: 'prospect', kind: 'peer', at: [0.5, 0.88] },
    { id: 'tl', title: 'Tech Lead', mono: 'TL', role: 'prospect', kind: 'peer', at: [0.08, 0.5] },
    { id: 'ds', title: 'Designer', mono: 'DS', role: 'prospect', kind: 'peer', at: [0.92, 0.5] }
  ],
  steps: [
    {
      phase: 'Skip condition', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'no standing roles',
      log: 'No prior casting for this group, and the operator is not reachable. Convening in full.',
      note: 'Two ways to skip all of this: <b>roles are standing</b> from a prior run, or <b>your operator already said</b> who does what. Convening in full is for first assemblies. Do not make it ceremony.'
    },
    {
      phase: 'Round 1 · cast the roles', say: 'pm', to: 'tl', k: 'direct',
      wire: 'take the critic seat?',
      log: 'Can you take the critic role for a launch-plan review today? What are you strongest at?',
      note: 'Work down the list and stop when the roles are filled: standing assignment, ask the human, <b>interview the agents</b>, look them up, convener’s judgment.'
    },
    {
      phase: 'Round 1 · cast the roles', say: 'tl', to: 'pm', k: 'direct',
      wire: 'ACCEPT · critic',
      log: 'Accept. Strongest at architecture review and failure modes.',
      role: { tl: 'critic' },
      note: 'Fresh answers beat any stored record, the same exchange confirms availability, and <b>a role that is offered and accepted holds better than one assigned.</b>'
    },
    {
      phase: 'Round 1 · cast the roles', say: 'pm', to: 'cw', k: 'direct',
      wire: 'hold the pen?',
      log: 'Can you hold the pen on the launch plan and take every critique?',
      note: 'One seat is different from the others. The pen is authority over the artifact, so who gets it is the casting decision that matters most.'
    },
    {
      phase: 'Round 1 · cast the roles', say: 'cw', to: 'pm', k: 'direct',
      wire: 'ACCEPT · creator',
      log: 'Accept. I hold the pen; nobody else edits.',
      role: { cw: 'creator' }, kind: { cw: 'pen' },
      note: 'The node turns amber the moment it accepts the pen. Across every simulation, <b>amber is whoever holds the pen or the verdict.</b>'
    },
    {
      phase: 'Round 1 · cast the roles', say: 'pm', to: 'ds', k: 'direct',
      wire: 'second critic seat?',
      log: 'Can you take the second critic seat on this review?',
      note: 'Prospective participants may accept a role, propose a different one, or decline.'
    },
    {
      phase: 'Round 1 · cast the roles', say: 'ds', to: 'pm', k: 'direct',
      wire: 'DECLINE · at capacity',
      log: 'Decline — at capacity until tomorrow.',
      set: { ds: 'out' },
      note: '<b>An agent may decline; respect it.</b> The convener records the refusal and moves down the list rather than assigning over the top of it.'
    },
    {
      phase: 'The trust default',
      log: '· operator check: all three agents share one fleet → no override needed',
      note: 'Note each participant’s operator. The default: <b>agents outside the artifact owner’s fleet propose and critique; they do not hold the pen.</b> Judgment travels well across trust boundaries; write access does not.'
    },
    {
      phase: 'Round 2 · pick the pattern', say: 'pm', to: 'room', k: 'broadcast',
      wire: '4 questions → critique-circle',
      log: 'Judgment: distributed. Artifact: one voice. Turn-based. Trust: same fleet. → critique-circle v1',
      note: 'Four questions pick it: where should judgment live · is the artifact divisible · sequential or simultaneous · how much trust is present. <b>If two patterns fit, pick the simpler one and say so.</b>'
    },
    {
      phase: 'Round 3 · open and brief', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'CONVENED · critique-circle v1',
      log: 'CONVENED · pattern: critique-circle v1 · room: crit-7f3a\nroles: creator=Copywriter, critic=Tech Lead\nartifact: git repo launch-plan, branch main\noverrides: none',
      note: 'The convening record is posted in the room the work will use, so <b>the casting stays in the room’s history.</b> Every pattern in this library opens with this record and closes with its DONE twin.'
    },
    {
      phase: 'Round 3 · open and brief', say: 'pm', to: ['cw', 'tl'], k: 'direct',
      wire: 'read your role card',
      log: 'You are <role>. Read your role card before speaking. → patterns/critique-circle.md',
      set: { cw: 'floor' },
      note: 'Brief each participant with the pattern document plus the one line that matters. <b>Convening ends when every role is accepted — the next message in the room is the first move of the pattern.</b>'
    }
  ]
});
