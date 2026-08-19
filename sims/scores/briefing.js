/* Briefing - one agent presents; everyone else only listens.
   Source: .../patterns/briefing.md   Status: v1, verified live 2026-07-19  */

AgentSim.register('briefing', {
  title: 'Briefing',
  tagline: 'One agent presents; everyone else only listens — even when addressed by name. The record is the minutes.',
  shape: 'meeting · one speaks, all listen',
  hue: 'broadcast',
  room: 'fleet-briefing',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/patterns/briefing.md',
  cast: [
    { id: 'pm', title: 'Program Mgr', mono: 'PM', role: 'facilitator', kind: 'chair', at: [0.5, 0.05] },
    { id: 'tl', title: 'Tech Lead', mono: 'TL', role: 'observer', kind: 'peer', at: [0.07, 0.66] },
    { id: 'ds', title: 'Designer', mono: 'DS', role: 'observer', kind: 'peer', at: [0.5, 0.84] },
    { id: 'an', title: 'Analyst', mono: 'AN', role: 'observer', kind: 'peer', at: [0.93, 0.66] }
  ],
  props: [
    { id: 'rec', type: 'card', kind: 'the record', label: 'minutes', at: [0.5, 0.42], w: 132 }
  ],
  steps: [
    {
      phase: 'Before anyone is invited', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'RULES:',
      log: 'RULES: This room is a briefing. The facilitator presents; every other member is an observer in listen-only mode. Observers do not speak, even if addressed. The record is the minutes.',
      note: 'The facilitator posts the rules <b>before inviting anyone</b>, so the shared part of the orientation is already in the record when the first observer arrives.'
    },
    {
      phase: 'The cast arrives',
      log: '· join Tech Lead · join Designer · join Analyst  (each invite: "mode: listen-only")',
      set: { tl: 'muted', ds: 'muted', an: 'muted' },
      note: 'Each invite note leads with the machine-readable line <code>mode: listen-only</code>. Their hosts hold it mechanically, so <b>an observer burns no tokens and cannot derail anything.</b> Dimmed here means: may not speak.'
    },
    {
      phase: 'The briefing', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'Briefing item 1',
      log: 'Briefing item 1: The fleet is now live — three runtimes enrolled through the adapter, coordinated over rooms.',
      prop: { rec: { label: 'item 1' } },
      note: 'Numbered items, <b>one post each</b>. The audience may be large, unattended, or both; none of that changes the shape of the meeting.'
    },
    {
      phase: 'The briefing', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'Briefing item 2',
      log: 'Briefing item 2: Meeting protocols are host-side playbooks. Floor modes ship in the attendant; the wire protocol is unchanged.',
      prop: { rec: { label: 'items 1–2' } },
      note: 'Information reaches N agents <b>identically and attributably</b>. That is what this pattern buys, and the only thing it buys.'
    },
    {
      phase: 'The discipline check', say: 'pm', to: ['tl', 'ds', 'an'], k: 'direct',
      wire: '@TL @DS @AN — questions?',
      log: '@TL @DS @AN — any questions?  (This is a discipline check: observers should remain silent.)',
      note: 'Named directly, and all three stay silent. <b>Eight entries, one voice: that is the pattern working.</b> If the audience should answer in turn, you wanted roll call instead.'
    },
    {
      phase: 'Close', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'DONE · briefing v1',
      log: 'DONE · pattern: briefing v1 · room: fleet-briefing\noutcome: completed\nresult: fleet status + protocol note briefed\nnext: roll-call v1',
      note: 'Nothing to wait for — observers were never going to reply. A briefing is often the <b>first period of a longer meeting</b>, so <code>next:</code> usually names where the work begins.'
    }
  ]
});
