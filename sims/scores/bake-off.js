/* Bake-off - several agents independently produce full solutions; a judge picks.
   Source: .../patterns/bake-off.md

   The long dashed beat in the middle is the pattern's real content: entries
   that saw each other are a critique circle that wasted the extra agents.   */

AgentSim.register('bake-off', {
  title: 'Bake-off',
  tagline: 'Several agents independently produce full solutions to one brief; a judge picks one or synthesizes the winner.',
  shape: 'centralized judgment',
  hue: 'signal',
  room: 'bake-3c12',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/patterns/bake-off.md',
  cast: [
    { id: 'pm', title: 'Program Mgr', mono: 'PM', role: 'judge', kind: 'pen', at: [0.5, 0.04] },
    { id: 'cw', title: 'Copywriter', mono: 'CW', role: 'contestant', kind: 'peer', at: [0.06, 0.82] },
    { id: 'ds', title: 'Designer', mono: 'DS', role: 'contestant', kind: 'peer', at: [0.5, 0.9] },
    { id: 'tl', title: 'Tech Lead', mono: 'TL', role: 'contestant', kind: 'peer', at: [0.94, 0.82] }
  ],
  props: [
    { id: 'brief', type: 'card', kind: 'the brief', label: '—', at: [0.5, 0.4], w: 168 }
  ],
  steps: [
    {
      phase: 'Open', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'CONVENED · bake-off v1',
      log: 'CONVENED · pattern: bake-off v1 · room: bake-3c12\nroles: judge=Program Mgr, contestants=Copywriter, Designer, Tech Lead',
      note: 'Use it when the solution space is wide and you genuinely don’t know which approach wins. <b>Independent attempts are worth more than one attempt iterated, because diversity of approach is the value being bought.</b>'
    },
    {
      phase: 'The brief', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'BRIEF · launch tagline',
      log: 'BRIEF · tagline for the launch\nGOAL: One line a developer repeats to a colleague.\nCRITERIA: memorability, accuracy, brevity\nDELIVERABLE: up to 3 candidate lines per contestant\nDEADLINE: 30 minutes',
      prop: { brief: { label: 'tagline · 3 criteria' } },
      note: 'The judge owns the brief and the verdict, and <b>does not compete.</b> Criteria are named in priority order, up front — a verdict that cannot be traced to published criteria is a coin flip wearing a robe.'
    },
    {
      phase: 'Clarifications', say: 'cw', to: 'pm', k: 'direct',
      wire: 'Q: is "handle" assumed?',
      log: 'Clarify: is "handle" assumed vocabulary for this audience?',
      note: 'Clarifying questions are allowed, and they <b>go in the room</b> — so every contestant sees every answer.'
    },
    {
      phase: 'Clarifications', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'A: yes · questions close',
      log: 'A: yes. Questions close in 5 minutes.',
      prop: { brief: { frozen: true } },
      note: '<b>The brief is frozen once posted.</b> If the judge must change it: say BRIEF WITHDRAWN, post a new one, and restart the clock for everyone.'
    },
    {
      phase: 'Silence while they work',
      log: '· contestants work privately — no drafts, no progress, no approach posted',
      set: { cw: 'working', ds: 'working', tl: 'working' },
      dur: 2600,
      note: 'The dashed nodes are the pattern. <b>Work privately: do not post drafts, progress, or approach to the room before the deadline</b> — the value of a bake-off is that entries do not contaminate each other.'
    },
    {
      phase: 'Submissions', say: 'cw', to: 'pm', k: 'direct',
      wire: 'SUBMISSION · Copywriter',
      log: 'SUBMISSION · Copywriter: "A name for every agent." (+2 alternates)',
      set: { cw: 'done' },
      note: '<b>Submit once, by the deadline.</b> Late entries are out; partial entries are allowed but must say so.'
    },
    {
      phase: 'Submissions', say: 'ds', to: 'pm', k: 'direct',
      wire: 'SUBMISSION · Designer',
      log: 'SUBMISSION · Designer: "Agents you can call by name." (+2 alternates)',
      set: { ds: 'done' }
    },
    {
      phase: 'Submissions', say: 'tl', to: 'pm', k: 'direct',
      wire: 'SUBMISSION · Tech Lead',
      log: 'SUBMISSION · Tech Lead: "Addressable agents, finally." (+1 alternate)',
      set: { tl: 'done' },
      note: 'The judge <b>does not comment on any entry until all are in</b> or the deadline passes. Early praise leaks the criteria’s weighting to whoever is still writing.'
    },
    {
      phase: 'The verdict', say: 'pm', to: 'room', k: 'verdict',
      wire: 'VERDICT · SYNTHESIS',
      log: 'VERDICT · SYNTHESIS\nBY CRITERION: memorability: Designer; accuracy: Copywriter; brevity: Copywriter\nTAKING: Designer’s verb "call" inside Copywriter’s frame.',
      note: 'Score against <b>the criteria you published</b>, not preferences you discovered along the way. Discover a criterion you forgot to publish? Name it as a footnote and weight it lightly — that error is the judge’s, not theirs.'
    },
    {
      phase: 'The merge', say: 'pm', to: 'room', k: 'verdict',
      wire: 'SYNTHESIZED · final',
      log: 'SYNTHESIZED · final: "Every agent, called by name."',
      note: 'A verdict may pick a winner or synthesize one. After it lands, a contestant may ask for its per-criterion reading — <b>but does not get to relitigate it.</b>'
    },
    {
      phase: 'Close', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'DONE · bake-off v1',
      log: 'DONE · pattern: bake-off v1 · room: bake-3c12\noutcome: completed\nresult: synthesis of Copywriter + Designer\nnext: none',
      note: 'If the group should improve one artifact rather than compare rivals, you wanted <b>critique-circle</b>. If the parts are separable and nobody needs to compete, divide the work instead.'
    }
  ]
});
