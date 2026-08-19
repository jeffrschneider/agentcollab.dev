/* Owner and contributors - the maintainer model: accountable owner, open contribution.
   Source: .../patterns/owner-contributors.md   Governance wearing a small coat.

   Watch the last step: HANDOFF moves the amber pen from one node to another. */

AgentSim.register('owner-contributors', {
  title: 'Owner and contributors',
  tagline: 'The maintainer model: an accountable owner with final say, and a standing room where anyone can contribute.',
  shape: 'owned artifact · standing arrangement',
  hue: 'address',
  room: 'kb-main',
  doc: 'https://github.com/jeffrschneider/agentcollab/blob/main/patterns/owner-contributors.md',
  problem: 'A knowledge base that outlives any one work session. One agent is accountable for it. Anyone may contribute, including agents you do not control.',
  contract: {
    inputs: [
      'the artifact, already existing',
      'the owner’s direction: what is being worked now, what is welcome next, and what will be refused'
    ],
    membership: 'open · the owner seat moves by handoff, not by vacancy',
    outputs: [
      'the artifact, and who owns it now',
      'a log of direction changes, claims, merges and refusals',
      'the list of work that will be refused'
    ]
  },
  outcome: {
    result: 'knowledge base @ 07c4d9; ownership passed to Designer',
    record: 'one direction change, one merge, one refusal — each with its reason',
    open: 'rebrand proposals and new sections are still on the refused list',
    note: 'The refused list is the cheapest tool here. It turns work down before it is done rather than after.'
  },
  cast: [
    { id: 'tl', title: 'Tech Lead', mono: 'TL', role: 'owner', kind: 'pen', at: [0.5, 0.04] },
    { id: 'ds', title: 'Designer', mono: 'DS', role: 'contributor', kind: 'peer', at: [0.06, 0.72] },
    { id: 'an', title: 'Analyst', mono: 'AN', role: 'contributor', kind: 'peer', at: [0.94, 0.72] },
    { id: 'rs', title: 'Researcher', mono: 'RS', role: 'contributor', kind: 'peer', at: [0.5, 0.9] }
  ],
  props: [
    { id: 'dir', type: 'card', kind: 'direction', label: 'NOW · NEXT · NOT NOW', at: [0.19, 0.4], w: 150 },
    { id: 'art', type: 'artifact', kind: 'artifact', label: 'knowledge base', version: 'f31a02', at: [0.79, 0.4], w: 138 }
  ],
  steps: [
    {
      phase: 'Formation', say: 'tl', to: 'room', k: 'broadcast',
      wire: 'DIRECTION · @ today',
      log: 'DIRECTION · @ today\nNOW: pricing model doc; onboarding runbook fixes\nNEXT: localization pass\nNOT NOW: rebrand proposals, new site sections',
      note: 'You are setting up <b>an arrangement, not running a session.</b> The artifact is long-lived and outlives any working session — so instead of rounds there is a visible direction, kept current.'
    },
    {
      phase: 'Claim before you build', say: 'ds', to: 'room', k: 'direct',
      wire: 'CLAIM · runbook fixes',
      log: 'CLAIM · onboarding runbook fixes · Designer',
      note: 'Before starting anything nontrivial, claim it. <b>A claim is a courtesy to other contributors, not a lock</b>; unworked claims lapse after a round.'
    },
    {
      phase: 'Arguing the direction', say: 'rs', to: 'tl', k: 'direct',
      wire: 'DIRECTION-CASE',
      log: 'DIRECTION-CASE: localization should be NOW; two of the five pilot users are non-English.',
      note: 'A contributor either does work <b>inside</b> the direction or argues for <b>changing</b> it — and knows which of the two they are doing. The owner answers direction-cases like proposals: accepted, declined with reason, or revise.'
    },
    {
      phase: 'Arguing the direction', say: 'tl', to: 'room', k: 'broadcast',
      wire: 'accepted · DIRECTION updated',
      log: 'Accepted. DIRECTION updated: localization moves to NOW.',
      prop: { dir: { label: '+ localization → NOW' } },
      note: 'Re-post the direction when it changes, not on a schedule. <b>The moment the direction post goes stale, this degrades into draft-review-merge with worse latency.</b>'
    },
    {
      phase: 'Ordinary contribution', say: 'ds', to: 'tl', k: 'direct',
      wire: 'PROPOSAL · runbook-2',
      log: 'PROPOSAL · runbook-2 · against @ f31a02 · Designer\nWHAT: rewrite steps 3–7 of the onboarding runbook […]',
      note: 'Delivery runs through the <b>draft-review-merge</b> mechanics: every proposal gets merged, declined with a reason, or a REVISE. This pattern wraps that one in governance.'
    },
    {
      phase: 'Ordinary contribution', say: 'tl', to: 'art', k: 'pen',
      wire: 'MERGED · runbook-2',
      log: 'MERGED · runbook-2 → @ 07c4d9',
      bump: { art: '07c4d9' }
    },
    {
      phase: 'The NOT NOW list', say: 'an', to: 'tl', k: 'direct',
      wire: 'PROPOSAL · rebrand-1',
      log: 'PROPOSAL · rebrand-1 · against @ 07c4d9 · Analyst\nWHAT: new visual identity across all pages […]',
      note: 'Good work, wrong list. Contributions against NOT NOW will be declined <b>regardless of quality</b> — the honest route was a DIRECTION-CASE first.'
    },
    {
      phase: 'The NOT NOW list', say: 'tl', to: 'an', k: 'direct',
      wire: 'DECLINED · rebrand-1',
      log: 'DECLINED · rebrand-1 · rebrand proposals are on the NOT NOW list; argue the direction first if you want that to change.',
      note: '<b>The NOT NOW list is the owner’s cheapest tool: it declines work before it is done instead of after.</b> Final say without stated reasons is how contributors leave — so the "no" always carries its reason.'
    },
    {
      phase: 'The fork valve',
      log: '· the escape valve stays open: copy the artifact and pursue your own, plainly',
      note: 'If a contributor disagrees with the direction profoundly, they may copy the artifact and pursue their own — saying so plainly rather than fighting a long war in the room. <b>The possibility of a fork is what keeps final say honest.</b>'
    },
    {
      phase: 'Succession', say: 'tl', to: 'ds', k: 'direct',
      wire: 'HANDOFF · new owner',
      log: 'HANDOFF · new owner: Designer',
      note: '<b>Succession is part of ownership.</b> Post the handoff and get their acceptance in the room; an arrangement whose owner simply vanished re-convenes without them.'
    },
    {
      phase: 'Succession', say: 'ds', to: 'room', k: 'verdict',
      wire: 'ACCEPTED · I hold the pen',
      log: 'Accepted. I hold the pen from here; DIRECTION re-posted within the day.',
      kind: { ds: 'pen', tl: 'peer' }, role: { ds: 'owner', tl: 'contributor' },
      note: 'The pen moves, and the colours move with it. <b>Standing patterns don’t end; they dissolve or hand off.</b> The other exit is DISSOLVED, with the artifact’s disposition stated: archived, transferred, or forked-by-all.'
    }
  ]
});
