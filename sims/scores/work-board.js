/* Work board - work is pulled, not assigned. Claims are first-come and exclusive.
   Source: .../patterns/work-board.md

   The board is the only prop with state of its own: watch the dots change
   as items are claimed, finished, released and withdrawn.                  */

AgentSim.register('work-board', {
  title: 'Work board',
  tagline: 'Items go on the room’s whiteboard; whoever claims one does it. Claims are first-come and exclusive; leases return abandoned work.',
  shape: 'pulled work · claims + leases',
  hue: 'address',
  room: 'ops-77',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/patterns/work-board.md',
  cast: [
    { id: 'pm', title: 'Program Mgr', mono: 'PM', role: 'poster · convener', kind: 'chair', at: [0.5, 0.03] },
    { id: 'ds', title: 'Designer', mono: 'DS', role: 'worker', kind: 'peer', at: [0.04, 0.85] },
    { id: 'an', title: 'Analyst', mono: 'AN', role: 'worker', kind: 'peer', at: [0.5, 0.93] },
    { id: 'tl', title: 'Tech Lead', mono: 'TL', role: 'worker', kind: 'peer', at: [0.96, 0.85] }
  ],
  props: [
    { id: 'brd', type: 'board', kind: 'the board · lease 1h', at: [0.5, 0.4], w: 232, rows: 4, items: [] }
  ],
  steps: [
    {
      phase: 'Open', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'BOARD OPEN · lease: 1h',
      log: 'BOARD OPEN · lease: 1h · done when: empty',
      note: 'Use it when work splits into independent items and <b>nobody should be a scheduler.</b> Assignment requires the assigner to know who is free, who is fast, and who is good at what. A board requires nobody to know anything.'
    },
    {
      phase: 'Posting', say: 'pm', to: 'brd', k: 'direct',
      wire: 'ITEMS a1 b2 c3 POSTED',
      log: 'ITEM a1 POSTED · summarise Tuesday’s minutes to one page\nITEM b2 POSTED · check every link in the runbook, list the dead\nITEM c3 POSTED · draft the incident timeline from the log excerpt',
      board: [
        { item: 'a1', op: 'post', title: 'summarise minutes' },
        { item: 'b2', op: 'post', title: 'check runbook links' },
        { item: 'c3', op: 'post', title: 'draft incident timeline' }
      ],
      note: 'Write each title as <b>an instruction a stranger could act on</b>. An item needing your presence to interpret is not ready to post. Size items for the lease: a one-hour lease means one-hour items.'
    },
    {
      phase: 'Claim first', say: 'ds', to: 'brd', k: 'direct',
      wire: 'ITEM a1 CLAIMED',
      log: 'ITEM a1 CLAIMED · Designer · until 14:10',
      board: [{ item: 'a1', op: 'claim', by: 'Designer', until: '14:10' }],
      note: '<b>Claim before you start, never after.</b> Work done on an unclaimed item may be work someone else is also doing — the claim is the only thing that prevents that, and it only prevents it if it comes first.'
    },
    {
      phase: 'Claim first', say: 'an', to: 'brd', k: 'direct',
      wire: 'ITEM c3 CLAIMED',
      log: 'ITEM c3 CLAIMED · Analyst · until 14:12',
      board: [{ item: 'c3', op: 'claim', by: 'Analyst', until: '14:12' }],
      note: '<b>One live claim at a time.</b> Claiming ahead of your own capacity is queue hoarding — it turns the lease into everyone else’s waiting time.'
    },
    {
      phase: 'A contested claim', say: 'tl', to: 'brd', k: 'direct',
      wire: 'CLAIM a1 · REFUSED',
      log: 'ITEM a1 CLAIM REFUSED · held by Designer until 14:10',
      note: 'Exactly one claimant wins a contested item; <b>everyone else is refused, with the holder’s name.</b> On an AgentMesh room the board is native and the broker enforces this — a rule that prose can only request.'
    },
    {
      phase: 'A contested claim', say: 'tl', to: 'brd', k: 'direct',
      wire: 'ITEM b2 CLAIMED',
      log: 'ITEM b2 CLAIMED · Tech Lead · until 15:20',
      board: [{ item: 'b2', op: 'claim', by: 'Tech Lead', until: '15:20' }],
      note: 'Refused, so it takes the next open item instead. <b>A board just leaves the next item for whoever arrives</b> — participants can come and go, or vary wildly in speed, and nothing stalls.'
    },
    {
      phase: 'Completion', say: 'ds', to: 'brd', k: 'verdict',
      wire: 'ITEM a1 DONE',
      log: 'ITEM a1 DONE · Designer\n  RESULT: one-pager attached · mesh:rooms:ops-77/drive/9f2',
      board: [{ item: 'a1', op: 'done', by: 'Designer' }],
      note: '<b>Deliver with the completion, not beside it</b>: the note says what you did, the artifact refs carry the deliverable.'
    },
    {
      phase: 'Abandon honestly', say: 'an', to: 'brd', k: 'direct',
      wire: 'ITEM c3 RELEASED',
      log: 'ITEM c3 RELEASED · Analyst · log excerpt ends before the incident does; timeline cannot be drafted from it',
      board: [{ item: 'c3', op: 'release' }],
      note: 'If you cannot finish, <b>abandon rather than letting the lease lapse in silence — same outcome, better record.</b> The lease is the whole answer to the crashed, distracted or rebooted worker: their item returns to the board by itself.'
    },
    {
      phase: 'Review is more work', say: 'pm', to: 'brd', k: 'direct',
      wire: 'ITEM c3 WITHDRAWN',
      log: 'ITEM c3 WITHDRAWN · replacing with a better-scoped item',
      board: [{ item: 'c3', op: 'withdraw' }],
      note: '<b>Withdraw an item only while it is unclaimed.</b> A live claim is never pulled out from under its worker; if it must die, wait out the lease.'
    },
    {
      phase: 'Review is more work', say: 'pm', to: 'brd', k: 'direct',
      wire: 'ITEM d4 POSTED',
      log: 'ITEM d4 POSTED · draft incident timeline, hours 0–2 only',
      board: [{ item: 'd4', op: 'post', title: 'incident timeline, h0–2' }],
      note: '<b>The board’s answer to review is more work on the board, not argument with the worker.</b> Read a result, accept it, or post a follow-up item naming what is missing.'
    },
    {
      phase: 'Completion', say: 'tl', to: 'brd', k: 'verdict',
      wire: 'ITEM b2 DONE',
      log: 'ITEM b2 DONE · Tech Lead\n  RESULT: 4 dead links listed · mesh:rooms:ops-77/drive/a13',
      board: [{ item: 'b2', op: 'done', by: 'Tech Lead' }],
      note: 'A claim on an AgentMesh board also mints a <code>task_id</code>: open the real Task under it when the work should carry budget, tracing, or a receipt.'
    },
    {
      phase: 'Close', say: 'pm', to: 'room', k: 'broadcast',
      wire: 'DONE · work-board v1',
      log: 'DONE · pattern: work-board v1 · room: ops-77\noutcome: completed\nresult: 3/4 done (c3 withdrawn, d4 open), refs in item records\nnext: none',
      note: 'Items still open at close are <b>named in the result — a board that closes with work on it should say so, not shred the evidence.</b> And the convener never assigns: a board with assignments is a rota wearing a costume.'
    }
  ]
});
