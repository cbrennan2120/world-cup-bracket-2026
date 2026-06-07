// USA '26 World Cup Bracket Showdown - JavaScript Engine (48-Team Version)

// Official 2026 FIFA World Cup Teams list (12 groups of 4 teams)
const DEFAULT_TEAMS = {
  A: [
    { id: "mexico", name: "Mexico", flag: "🇲🇽" },
    { id: "south_korea", name: "South Korea", flag: "🇰🇷" },
    { id: "south_africa", name: "South Africa", flag: "🇿🇦" },
    { id: "czechia", name: "Czechia", flag: "🇨🇿" }
  ],
  B: [
    { id: "canada", name: "Canada", flag: "🇨🇦" },
    { id: "qatar", name: "Qatar", flag: "🇶🇦" },
    { id: "switzerland", name: "Switzerland", flag: "🇨🇭" },
    { id: "bosnia", name: "Bosnia & Herz.", flag: "🇧🇦" }
  ],
  C: [
    { id: "brazil", name: "Brazil", flag: "🇧🇷" },
    { id: "haiti", name: "Haiti", flag: "🇭🇹" },
    { id: "morocco", name: "Morocco", flag: "🇲🇦" },
    { id: "scotland", name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" }
  ],
  D: [
    { id: "usa", name: "USA", flag: "🇺🇸" },
    { id: "australia", name: "Australia", flag: "🇦🇺" },
    { id: "paraguay", name: "Paraguay", flag: "🇵🇾" },
    { id: "turkey", name: "Turkey", flag: "🇹🇷" }
  ],
  E: [
    { id: "ecuador", name: "Ecuador", flag: "🇪🇨" },
    { id: "germany", name: "Germany", flag: "🇩🇪" },
    { id: "ivory_coast", name: "Ivory Coast", flag: "🇨🇮" },
    { id: "curacao", name: "Curacao", flag: "🇨🇼" }
  ],
  F: [
    { id: "japan", name: "Japan", flag: "🇯🇵" },
    { id: "netherlands", name: "Netherlands", flag: "🇳🇱" },
    { id: "sweden", name: "Sweden", flag: "🇸🇪" },
    { id: "tunisia", name: "Tunisia", flag: "🇹🇳" }
  ],
  G: [
    { id: "belgium", name: "Belgium", flag: "🇧🇪" },
    { id: "egypt", name: "Egypt", flag: "🇪🇬" },
    { id: "iran", name: "Iran", flag: "🇮🇷" },
    { id: "new_zealand", name: "New Zealand", flag: "🇳🇿" }
  ],
  H: [
    { id: "cape_verde", name: "Cape Verde", flag: "🇨🇻" },
    { id: "saudi_arabia", name: "Saudi Arabia", flag: "🇸🇦" },
    { id: "spain", name: "Spain", flag: "🇪🇸" },
    { id: "uruguay", name: "Uruguay", flag: "🇺🇾" }
  ],
  I: [
    { id: "france", name: "France", flag: "🇫🇷" },
    { id: "iraq", name: "Iraq", flag: "🇮🇶" },
    { id: "norway", name: "Norway", flag: "🇳🇴" },
    { id: "senegal", name: "Senegal", flag: "🇸🇳" }
  ],
  J: [
    { id: "algeria", name: "Algeria", flag: "🇩🇿" },
    { id: "argentina", name: "Argentina", flag: "🇦🇷" },
    { id: "austria", name: "Austria", flag: "🇦🇹" },
    { id: "jordan", name: "Jordan", flag: "🇯🇴" }
  ],
  K: [
    { id: "colombia", name: "Colombia", flag: "🇨🇴" },
    { id: "dr_congo", name: "DR Congo", flag: "🇨🇩" },
    { id: "portugal", name: "Portugal", flag: "🇵🇹" },
    { id: "uzbekistan", name: "Uzbekistan", flag: "🇺🇿" }
  ],
  L: [
    { id: "croatia", name: "Croatia", flag: "🇭🇷" },
    { id: "england", name: "England", flag: "🏴" }, // Fallback standard representation
    { id: "ghana", name: "Ghana", flag: "🇬🇭" },
    { id: "panama", name: "Panama", flag: "🇵🇦" }
  ]
};

// Map team ID to object quickly
const TEAM_MAP = {};
Object.keys(DEFAULT_TEAMS).forEach(g => {
  DEFAULT_TEAMS[g].forEach(t => {
    TEAM_MAP[t.id] = t;
  });
});

// Normalized mapping for API sync (resolving team names to IDs)
const TEAM_NAME_TO_ID = {
  "usa": "usa", "united states": "usa", "mexico": "mexico", "canada": "canada", "panama": "panama",
  "argentina": "argentina", "brazil": "brazil", "uruguay": "uruguay", "colombia": "colombia",
  "france": "france", "england": "england", "spain": "spain", "germany": "germany",
  "portugal": "portugal", "italy": "italy", "netherlands": "netherlands", "belgium": "belgium",
  "croatia": "croatia", "morocco": "morocco", "senegal": "senegal", "cameroon": "cameroon",
  "japan": "japan", "south korea": "south_korea", "korea republic": "south_korea", "australia": "australia", "iran": "iran",
  "switzerland": "switzerland", "denmark": "denmark", "poland": "poland", "ukraine": "ukraine",
  "saudi arabia": "saudi_arabia", "ecuador": "ecuador", "ghana": "ghana", "tunisia": "tunisia",
  "czechia": "czechia", "czech republic": "czechia", "south africa": "south_africa",
  "qatar": "qatar", "bosnia": "bosnia", "bosnia and herzegovina": "bosnia",
  "haiti": "haiti", "scotland": "scotland", "turkey": "turkey", "türkiye": "turkey",
  "paraguay": "paraguay", "cote d'ivoire": "ivory_coast", "ivory coast": "ivory_coast",
  "curacao": "curacao", "curaçao": "curacao", "sweden": "sweden", "egypt": "egypt",
  "new zealand": "new_zealand", "cape verde": "cape_verde", "iraq": "iraq", "norway": "norway",
  "algeria": "algeria", "austria": "austria", "jordan": "jordan", "dr congo": "dr_congo",
  "congo dr": "dr_congo", "uzbekistan": "uzbekistan"
};

// Round of 32 Match Sources configuration (incorporates group stage and wildcards)
const MATCH_SOURCES = {
  // Round of 32 Left
  R32_1: { t1: { type: 'group', group: 'A', rank: 0 }, t2: { type: 'wildcard', index: 0 } },
  R32_2: { t1: { type: 'group', group: 'B', rank: 0 }, t2: { type: 'wildcard', index: 1 } },
  R32_3: { t1: { type: 'group', group: 'C', rank: 0 }, t2: { type: 'wildcard', index: 2 } },
  R32_4: { t1: { type: 'group', group: 'D', rank: 0 }, t2: { type: 'wildcard', index: 3 } },
  R32_5: { t1: { type: 'group', group: 'E', rank: 0 }, t2: { type: 'wildcard', index: 4 } },
  R32_6: { t1: { type: 'group', group: 'F', rank: 0 }, t2: { type: 'wildcard', index: 5 } },
  R32_7: { t1: { type: 'group', group: 'G', rank: 0 }, t2: { type: 'wildcard', index: 6 } },
  R32_8: { t1: { type: 'group', group: 'H', rank: 0 }, t2: { type: 'wildcard', index: 7 } },

  // Round of 32 Right
  R32_9:  { t1: { type: 'group', group: 'I', rank: 0 }, t2: { type: 'group', group: 'A', rank: 1 } },
  R32_10: { t1: { type: 'group', group: 'J', rank: 0 }, t2: { type: 'group', group: 'B', rank: 1 } },
  R32_11: { t1: { type: 'group', group: 'K', rank: 0 }, t2: { type: 'group', group: 'C', rank: 1 } },
  R32_12: { t1: { type: 'group', group: 'L', rank: 0 }, t2: { type: 'group', group: 'D', rank: 1 } },
  R32_13: { t1: { type: 'group', group: 'E', rank: 1 }, t2: { type: 'group', group: 'F', rank: 1 } },
  R32_14: { t1: { type: 'group', group: 'G', rank: 1 }, t2: { type: 'group', group: 'H', rank: 1 } },
  R32_15: { t1: { type: 'group', group: 'I', rank: 1 }, t2: { type: 'group', group: 'J', rank: 1 } },
  R32_16: { t1: { type: 'group', group: 'K', rank: 1 }, t2: { type: 'group', group: 'L', rank: 1 } },

  // Round of 16 Left
  R16_1: { t1: { type: 'knockout', matchId: 'R32_1' }, t2: { type: 'knockout', matchId: 'R32_2' } },
  R16_2: { t1: { type: 'knockout', matchId: 'R32_3' }, t2: { type: 'knockout', matchId: 'R32_4' } },
  R16_3: { t1: { type: 'knockout', matchId: 'R32_5' }, t2: { type: 'knockout', matchId: 'R32_6' } },
  R16_4: { t1: { type: 'knockout', matchId: 'R32_7' }, t2: { type: 'knockout', matchId: 'R32_8' } },

  // Round of 16 Right
  R16_5: { t1: { type: 'knockout', matchId: 'R32_9' },  t2: { type: 'knockout', matchId: 'R32_10' } },
  R16_6: { t1: { type: 'knockout', matchId: 'R32_11' }, t2: { type: 'knockout', matchId: 'R32_12' } },
  R16_7: { t1: { type: 'knockout', matchId: 'R32_13' }, t2: { type: 'knockout', matchId: 'R32_14' } },
  R16_8: { t1: { type: 'knockout', matchId: 'R32_15' }, t2: { type: 'knockout', matchId: 'R32_16' } },

  // Quarterfinals
  QF_1: { t1: { type: 'knockout', matchId: 'R16_1' }, t2: { type: 'knockout', matchId: 'R16_2' } },
  QF_2: { t1: { type: 'knockout', matchId: 'R16_3' }, t2: { type: 'knockout', matchId: 'R16_4' } },
  QF_3: { t1: { type: 'knockout', matchId: 'R16_5' }, t2: { type: 'knockout', matchId: 'R16_6' } },
  QF_4: { t1: { type: 'knockout', matchId: 'R16_7' }, t2: { type: 'knockout', matchId: 'R16_8' } },

  // Semifinals
  SF_1: { t1: { type: 'knockout', matchId: 'QF_1' }, t2: { type: 'knockout', matchId: 'QF_2' } },
  SF_2: { t1: { type: 'knockout', matchId: 'QF_3' }, t2: { type: 'knockout', matchId: 'QF_4' } },

  // Final
  F_1: { t1: { type: 'knockout', matchId: 'SF_1' }, t2: { type: 'knockout', matchId: 'SF_2' } },

  // Champion
  Champion: { t1: { type: 'knockout', matchId: 'F_1' } }
};

// Match rendering layout configuration
const BRACKET_LAYOUT = {
  'r32-left': ['R32_1', 'R32_2', 'R32_3', 'R32_4', 'R32_5', 'R32_6', 'R32_7', 'R32_8'],
  'r16-left': ['R16_1', 'R16_2', 'R16_3', 'R16_4'],
  'qf-left': ['QF_1', 'QF_2'],
  'sf-left': ['SF_1'],
  'final-match-container': ['F_1'],
  'sf-right': ['SF_2'],
  'qf-right': ['QF_3', 'QF_4'],
  'r16-right': ['R16_5', 'R16_6', 'R16_7', 'R16_8'],
  'r32-right': ['R32_9', 'R32_10', 'R32_11', 'R32_12', 'R32_13', 'R32_14', 'R32_15', 'R32_16']
};

const MATCH_LABELS = {
  R32_1: "R32 - MATCH 1", R32_2: "R32 - MATCH 2", R32_3: "R32 - MATCH 3", R32_4: "R32 - MATCH 4",
  R32_5: "R32 - MATCH 5", R32_6: "R32 - MATCH 6", R32_7: "R32 - MATCH 7", R32_8: "R32 - MATCH 8",
  R32_9: "R32 - MATCH 9", R32_10: "R32 - MATCH 10", R32_11: "R32 - MATCH 11", R32_12: "R32 - MATCH 12",
  R32_13: "R32 - MATCH 13", R32_14: "R32 - MATCH 14", R32_15: "R32 - MATCH 15", R32_16: "R32 - MATCH 16",
  R16_1: "R16 - MATCH 1", R16_2: "R16 - MATCH 2", R16_3: "R16 - MATCH 3", R16_4: "R16 - MATCH 4",
  R16_5: "R16 - MATCH 5", R16_6: "R16 - MATCH 6", R16_7: "R16 - MATCH 7", R16_8: "R16 - MATCH 8",
  QF_1: "QUARTERFINAL 1", QF_2: "QUARTERFINAL 2", QF_3: "QUARTERFINAL 3", QF_4: "QUARTERFINAL 4",
  SF_1: "SEMIFINAL 1", SF_2: "SEMIFINAL 2", F_1: "WORLD CUP FINAL"
};

// Topological order of matches to propagate updates correctly
const PROPAGATION_ORDER = [
  'R32_1', 'R32_2', 'R32_3', 'R32_4', 'R32_5', 'R32_6', 'R32_7', 'R32_8',
  'R32_9', 'R32_10', 'R32_11', 'R32_12', 'R32_13', 'R32_14', 'R32_15', 'R32_16',
  'R16_1', 'R16_2', 'R16_3', 'R16_4', 'R16_5', 'R16_6', 'R16_7', 'R16_8',
  'QF_1', 'QF_2', 'QF_3', 'QF_4',
  'SF_1', 'SF_2',
  'F_1',
  'Champion'
];

// Empty bracket template helper
const createEmptyBracket = () => {
  const groups = {};
  for (let i = 65; i <= 76; i++) { // A to L
    groups[String.fromCharCode(i)] = [];
  }
  
  const knockouts = {};
  PROPAGATION_ORDER.forEach(mId => {
    knockouts[mId] = { team1: null, team2: null, winner: null };
  });

  return {
    nickname: "Anonymous Coach",
    groups: groups,
    wildcards: [],
    knockouts: knockouts
  };
};

// App States
let state = createEmptyBracket();
state.nickname = "Coach Anonymous";

let masterResults = createEmptyBracket();
masterResults.nickname = "Master Results";

let friendBracket = null;
let leaderboardBank = [];
let clientId = '';
let liveGroupStandings = {};

// Navigation & views
let currentViewMode = 'my';
let activeTab = 'my-predictions';
let activeMobileRound = 'r32';

// Initialize the app on load
window.addEventListener('DOMContentLoaded', () => {
  loadLocalStorage();
  parseUrlHash();
  renderGroupStage();
  renderWildcards();
  renderKnockoutBracket();
  updateSyncPanelUI();
  renderLeaderboard();
  
  // Fetch central database brackets on load
  fetchBracketsFromServer();

  // Initialize premium UX features
  initGrabToScroll();
  initWheelScrollRedirect();
  updateCompletionProgress();
  initPathHoverHighlights();
  
  // Setup elements
  document.getElementById('save-nickname-btn').addEventListener('click', saveNickname);
  document.getElementById('download-bracket-btn').addEventListener('click', downloadBracketJsonFile);
  document.getElementById('copy-json-btn').addEventListener('click', copyRawJsonString);
  document.getElementById('copy-share-url-btn').addEventListener('click', copyShareUrl);
  document.getElementById('sync-now-btn').addEventListener('click', syncLiveScores);
  document.getElementById('toggle-admin-btn').addEventListener('click', toggleAdminMode);
  document.getElementById('clear-leaderboard-btn').addEventListener('click', clearLeaderboardBank);
  document.getElementById('upload-leaderboard-btn').addEventListener('click', () => {
    document.getElementById('leaderboard-file-input').click();
  });
  document.getElementById('leaderboard-file-input').addEventListener('change', handleLeaderboardUpload);
  document.getElementById('publish-leaderboard-btn').addEventListener('click', publishBracketToLeaderboard);
  document.getElementById('sync-server-btn').addEventListener('click', async () => {
    const success = await fetchBracketsFromServer();
    if (success) {
      showToast("🔄 Leaderboard synced with server!");
    }
  });
  
  // Friend View event listeners
  document.getElementById('friend-file-input').addEventListener('change', handleFriendUpload);
  document.getElementById('toggle-friend-view-btn').addEventListener('click', enableFriendView);
  document.getElementById('unload-friend-btn').addEventListener('click', disableFriendView);
  
  // Drag and drop zone setup
  const dropZone = document.getElementById('upload-drag-zone');
  dropZone.addEventListener('click', () => document.getElementById('friend-file-input').click());
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0], 'friend');
    }
  });

  // Load live scores automatically on load
  syncLiveScores(false);
});

// Toast system
function showToast(message) {
  const container = document.getElementById('toast-container');
  container.textContent = message;
  container.style.display = 'block';
  setTimeout(() => {
    container.style.display = 'none';
  }, 3000);
}

// LocalStorage helpers
function loadLocalStorage() {
  clientId = localStorage.getItem('wc_client_id');
  if (!clientId) {
    clientId = 'client_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('wc_client_id', clientId);
  }

  const savedNick = localStorage.getItem('wc_nickname');
  if (savedNick) {
    state.nickname = savedNick;
    document.getElementById('coach-nickname-input').value = savedNick;
  }
  
  const savedBracket = localStorage.getItem('wc_my_bracket');
  if (savedBracket) {
    try {
      const parsed = JSON.parse(savedBracket);
      if (parsed.groups && parsed.knockouts) {
        state.groups = parsed.groups;
        state.wildcards = parsed.wildcards || [];
        state.knockouts = parsed.knockouts;
        state.nickname = parsed.nickname || state.nickname;
        propagateBracketState(state);
      }
    } catch(e) {
      console.error("Error loading bracket", e);
    }
  }

  const savedMaster = localStorage.getItem('wc_master_results');
  if (savedMaster) {
    try {
      const parsed = JSON.parse(savedMaster);
      if (parsed.groups && parsed.knockouts) {
        masterResults.groups = parsed.groups;
        masterResults.wildcards = parsed.wildcards || [];
        masterResults.knockouts = parsed.knockouts;
        propagateBracketState(masterResults);
      }
    } catch(e) {
      console.error("Error loading master results", e);
    }
  }

  const savedBank = localStorage.getItem('wc_leaderboard_bank');
  if (savedBank) {
    try {
      leaderboardBank = JSON.parse(savedBank);
    } catch(e) {
      console.error("Error loading leaderboard bank", e);
    }
  }

  const savedStats = localStorage.getItem('wc_live_group_standings');
  if (savedStats) {
    try {
      liveGroupStandings = JSON.parse(savedStats);
    } catch(e) {
      console.error("Error loading live group standings", e);
    }
  }
}

function saveMyBracketToStorage() {
  localStorage.setItem('wc_my_bracket', JSON.stringify(state));
}

function saveMasterResultsToStorage() {
  localStorage.setItem('wc_master_results', JSON.stringify(masterResults));
}

function saveLeaderboardToStorage() {
  localStorage.setItem('wc_leaderboard_bank', JSON.stringify(leaderboardBank));
}

// Save Nickname
function saveNickname() {
  const input = document.getElementById('coach-nickname-input');
  const val = input.value.trim();
  if (val) {
    state.nickname = val;
    localStorage.setItem('wc_nickname', val);
    saveMyBracketToStorage();
    showToast(`Coach name saved: "${val}"! ⚽`);
    renderLeaderboard();
  } else {
    showToast("Please enter a valid Coach Nickname!");
  }
}

// Navigation Tabs Manager
function switchView(tabId) {
  activeTab = tabId;
  
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(`section-${tabId}`).classList.add('active');

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  document.getElementById(`tab-${tabId === 'my-predictions' ? 'my-predictions' : tabId === 'manager' ? 'manager' : 'leaderboard'}`).classList.add('active');
  
  if (tabId === 'manager') {
    generateShareLink();
  }
}

// Mobile view round selector (Safe check)
function setMobileRound(roundId) {
  activeMobileRound = roundId;
  
  const activeBtn = document.getElementById(`m-btn-${roundId}`);
  if (activeBtn) {
    document.querySelectorAll('.mobile-round-selector .comic-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
  }

  const columns = document.querySelectorAll('.bracket-column');
  if (columns.length > 0) {
    columns.forEach(col => {
      col.classList.remove('mobile-visible');
    });
    const colLeft = document.getElementById(`${roundId}-left`);
    const colRight = document.getElementById(`${roundId}-right`);
    if (colLeft) colLeft.classList.add('mobile-visible');
    if (colRight) colRight.classList.add('mobile-visible');
  }

  const centerCol = document.querySelector('.center-champion-column');
  if (centerCol) {
    centerCol.classList.remove('mobile-visible');
    if (roundId === 'final') {
      centerCol.classList.add('mobile-visible');
    }
  }
}

// State Machine Bracket Propagation Logic
function propagateBracketState(bracket) {
  // Validate selected wildcards: filter out teams that are no longer 3rd place in their groups
  const current3rdPlaces = [];
  Object.keys(bracket.groups).forEach(g => {
    const picks = bracket.groups[g] || [];
    if (picks[2]) current3rdPlaces.push(picks[2]);
  });
  bracket.wildcards = (bracket.wildcards || []).filter(teamId => current3rdPlaces.includes(teamId));

  // Propagate topological matches
  PROPAGATION_ORDER.forEach(matchId => {
    const rules = MATCH_SOURCES[matchId];
    const matchSlot = bracket.knockouts[matchId];
    
    // Resolve Team 1
    let t1 = null;
    if (rules.t1.type === 'group') {
      const picks = bracket.groups[rules.t1.group] || [];
      const teamId = picks[rules.t1.rank];
      if (teamId) t1 = teamId;
    } else if (rules.t1.type === 'wildcard') {
      const teamId = bracket.wildcards[rules.t1.index];
      if (teamId) t1 = teamId;
    } else if (rules.t1.type === 'knockout') {
      const sourceWinner = bracket.knockouts[rules.t1.matchId]?.winner;
      if (sourceWinner) t1 = sourceWinner;
    }
    matchSlot.team1 = t1;

    // Resolve Team 2
    let t2 = null;
    if (rules.t2) {
      if (rules.t2.type === 'group') {
        const picks = bracket.groups[rules.t2.group] || [];
        const teamId = picks[rules.t2.rank];
        if (teamId) t2 = teamId;
      } else if (rules.t2.type === 'wildcard') {
        const teamId = bracket.wildcards[rules.t2.index];
        if (teamId) t2 = teamId;
      } else if (rules.t2.type === 'knockout') {
        const sourceWinner = bracket.knockouts[rules.t2.matchId]?.winner;
        if (sourceWinner) t2 = sourceWinner;
      }
    }
    matchSlot.team2 = t2;

    // Validate winner
    if (matchSlot.winner) {
      if (matchSlot.winner !== t1 && matchSlot.winner !== t2) {
        matchSlot.winner = null; // Clear invalid winner
      }
    }
  });
}

// Handle Group Stage Team Click
function selectGroupTeam(groupLetter, teamId) {
  if (currentViewMode === 'friend') {
    showToast("Viewing Friend's Bracket in Read-Only Mode! 🚫");
    return;
  }
  
  const targetBracket = (currentViewMode === 'admin') ? masterResults : state;
  const currentPicks = targetBracket.groups[groupLetter] || [];
  const index = currentPicks.indexOf(teamId);

  if (index > -1) {
    currentPicks.splice(index, 1);
  } else {
    if (currentPicks.length < 3) { // 1st, 2nd, 3rd
      currentPicks.push(teamId);
    } else {
      showToast("Group selections full! Deselect a ranked team first.");
      return;
    }
  }

  targetBracket.groups[groupLetter] = currentPicks;
  propagateBracketState(targetBracket);

  if (currentViewMode === 'admin') {
    saveMasterResultsToStorage();
  } else {
    saveMyBracketToStorage();
  }

  renderGroupStage();
  renderWildcards();
  renderKnockoutBracket();
  renderLeaderboard();
  updateCompletionProgress();
}

// Handle Wildcard Checklist clicks
function toggleWildcardSelection(teamId) {
  const targetBracket = (currentViewMode === 'admin') ? masterResults : state;
  if (!targetBracket.wildcards) targetBracket.wildcards = [];

  const idx = targetBracket.wildcards.indexOf(teamId);
  if (idx > -1) {
    targetBracket.wildcards.splice(idx, 1);
  } else {
    if (targetBracket.wildcards.length < 8) {
      targetBracket.wildcards.push(teamId);
    } else {
      showToast("You can only select exactly 8 wildcard teams! Deselect one first.");
      return;
    }
  }

  propagateBracketState(targetBracket);

  if (currentViewMode === 'admin') {
    saveMasterResultsToStorage();
  } else {
    saveMyBracketToStorage();
  }

  renderWildcards();
  renderKnockoutBracket();
  renderLeaderboard();
  updateCompletionProgress();
}

// Handle Knockout Winner Click
function selectKnockoutWinner(matchId, winnerId) {
  if (currentViewMode === 'friend') {
    showToast("Viewing Friend's Bracket in Read-Only Mode! 🚫");
    return;
  }

  const targetBracket = (currentViewMode === 'admin') ? masterResults : state;
  const match = targetBracket.knockouts[matchId];

  if (winnerId !== match.team1 && winnerId !== match.team2) {
    return;
  }

  const isNewChampion = (matchId === 'F_1' && match.winner !== winnerId);
  match.winner = winnerId;

  propagateBracketState(targetBracket);

  if (currentViewMode === 'admin') {
    saveMasterResultsToStorage();
  } else {
    saveMyBracketToStorage();
  }

  if (isNewChampion && currentViewMode === 'my') {
    triggerConfetti();
  }

  renderKnockoutBracket();
  renderLeaderboard();
  updateCompletionProgress();
  autoFocusMatch(matchId);
}

// Confetti burst
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 150,
      spread: 85,
      origin: { y: 0.6 }
    });
  }
}

// Render Group Stage grid
function renderGroupStage() {
  const container = document.getElementById('group-stage-container');
  container.innerHTML = '';

  const targetBracket = getActiveBracketForRender();

  Object.keys(DEFAULT_TEAMS).forEach(groupLetter => {
    const card = document.createElement('div');
    card.className = 'group-card';

    // Check LocalStorage for collapsed state
    const isCollapsed = localStorage.getItem(`wc_group_collapsed_${groupLetter}`) === 'true';
    if (isCollapsed) {
      card.classList.add('collapsed');
    }

    const header = document.createElement('div');
    header.className = 'group-header-row';

    const headerTitle = document.createElement('div');
    headerTitle.className = 'group-header';
    headerTitle.textContent = `GROUP ${groupLetter}`;
    header.appendChild(headerTitle);

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'group-toggle-btn';
    toggleBtn.textContent = isCollapsed ? '＋' : '－';
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const collapsed = card.classList.toggle('collapsed');
      toggleBtn.textContent = collapsed ? '＋' : '－';
      localStorage.setItem(`wc_group_collapsed_${groupLetter}`, collapsed ? 'true' : 'false');
    });
    header.appendChild(toggleBtn);
    card.appendChild(header);

    const teamList = document.createElement('div');
    teamList.className = 'group-team-list';

    const picks = targetBracket.groups[groupLetter] || [];

    DEFAULT_TEAMS[groupLetter].forEach(team => {
      const item = document.createElement('div');
      item.className = 'team-item';
      
      const idx = picks.indexOf(team.id);
      if (idx === 0) item.classList.add('selected-1st');
      else if (idx === 1) item.classList.add('selected-2nd');
      else if (idx === 2) {
        item.style.backgroundColor = '#E0F2FE'; // Sky blue for 3rd place
        item.style.borderColor = 'var(--color-border)';
      }

      const leftPart = document.createElement('div');
      leftPart.className = 'team-flag-name';
      
      const flagSpan = document.createElement('span');
      flagSpan.className = 'team-flag';
      flagSpan.textContent = team.flag;
      leftPart.appendChild(flagSpan);

      const nameSpan = document.createElement('span');
      nameSpan.textContent = team.name;
      leftPart.appendChild(nameSpan);
      
      leftPart.appendChild(flagSpan);
      leftPart.appendChild(nameSpan);
      // Clean duplicate appendages
      leftPart.innerHTML = `<span class="team-flag">${team.flag}</span> <span>${team.name}</span>`;

      item.appendChild(leftPart);

      const rankBadge = document.createElement('span');
      if (idx === 0) {
        rankBadge.className = 'team-rank-badge rank-badge-1';
        rankBadge.textContent = '1st';
      } else if (idx === 1) {
        rankBadge.className = 'team-rank-badge rank-badge-2';
        rankBadge.textContent = '2nd';
      } else if (idx === 2) {
        rankBadge.className = 'team-rank-badge';
        rankBadge.style.backgroundColor = 'var(--color-navy)';
        rankBadge.style.color = '#60A5FA';
        rankBadge.style.border = '2px solid var(--color-border)';
        rankBadge.textContent = '3rd';
      } else {
        rankBadge.className = 'team-rank-badge rank-badge-empty';
        rankBadge.textContent = '—';
      }
      item.appendChild(rankBadge);

      item.addEventListener('click', () => selectGroupTeam(groupLetter, team.id));
      teamList.appendChild(item);
    });

    card.appendChild(teamList);

    const inst = document.createElement('div');
    inst.className = 'group-instructions';
    if (picks.length === 0) inst.textContent = 'Select 1st, 2nd, 3rd';
    else if (picks.length === 1) inst.textContent = 'Select 2nd place';
    else if (picks.length === 2) inst.textContent = 'Select 3rd place';
    else inst.textContent = 'Standings completed! 👍';
    card.appendChild(inst);

    // Collapsed summary preview
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'group-collapsed-summary';
    if (picks.length > 0) {
      const names = picks.map(id => {
        const t = TEAM_MAP[id];
        return t ? `${t.flag} ${t.name}` : id;
      });
      summaryDiv.textContent = names.join(' ➔ ');
    } else {
      summaryDiv.textContent = 'No picks made yet';
      summaryDiv.style.color = 'var(--color-dark-gray)';
    }
    card.appendChild(summaryDiv);

    container.appendChild(card);
  });
}

// Render Wildcards panel
function renderWildcards() {
  const panel = document.getElementById('wildcard-selection-panel');
  const checklist = document.getElementById('wildcard-checklist-container');
  const msg = document.getElementById('wildcard-status-msg');
  
  const targetBracket = getActiveBracketForRender();
  
  // Gather all 3rd place selections
  const thirdPlaceTeams = [];
  Object.keys(DEFAULT_TEAMS).forEach(groupLetter => {
    const picks = targetBracket.groups[groupLetter] || [];
    if (picks[2]) {
      const team = TEAM_MAP[picks[2]];
      if (team) {
        thirdPlaceTeams.push({ group: groupLetter, team: team });
      }
    }
  });

  if (thirdPlaceTeams.length === 0) {
    panel.style.display = 'none';
    return;
  }
  
  panel.style.display = 'block';
  checklist.innerHTML = '';

  const selectedCount = (targetBracket.wildcards || []).length;
  msg.textContent = `Selected: ${selectedCount} of 8`;
  if (selectedCount === 8) {
    msg.style.color = 'var(--color-green)';
  } else {
    msg.style.color = 'var(--color-red)';
  }

  thirdPlaceTeams.forEach(item => {
    const isChecked = (targetBracket.wildcards || []).includes(item.team.id);
    
    const label = document.createElement('label');
    label.className = `wildcard-checkbox-card ${isChecked ? 'selected' : ''}`;
    
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = isChecked;
    cb.disabled = (currentViewMode === 'friend'); // Read-only

    cb.addEventListener('change', () => {
      if (currentViewMode === 'friend') return;
      toggleWildcardSelection(item.team.id);
    });

    label.appendChild(cb);

    const text = document.createElement('span');
    const teamStats = liveGroupStandings[item.group]?.[item.team.id];
    let statsText = '';
    if (teamStats) {
      statsText = ` (${teamStats.points} pts, GD ${teamStats.gd > 0 ? '+' + teamStats.gd : teamStats.gd})`;
    }
    text.textContent = `[G-${item.group}] ${item.team.flag} ${item.team.name}${statsText}`;
    label.appendChild(text);

    checklist.appendChild(label);
  });
}

// Render Knockout Bracket Tree
function renderKnockoutBracket() {
  const targetBracket = getActiveBracketForRender();

  // Render columns
  Object.keys(BRACKET_LAYOUT).forEach(colId => {
    const colDiv = document.getElementById(colId);
    if (!colDiv) return;
    colDiv.innerHTML = '';

    const matchIds = BRACKET_LAYOUT[colId];
    matchIds.forEach(matchId => {
      const match = targetBracket.knockouts[matchId];
      
      const card = document.createElement('div');
      card.className = 'match-card';
      card.id = `match-${matchId}`;

      const label = document.createElement('div');
      label.className = 'match-label';
      label.textContent = MATCH_LABELS[matchId] || matchId;
      card.appendChild(label);

      const teamList = document.createElement('div');
      teamList.className = 'match-teams';

      // Team 1 Row
      const row1 = createMatchTeamRow(match.team1, match.winner === match.team1 && match.team1 !== null, match.winner !== match.team1 && match.winner !== null);
      row1.addEventListener('click', () => {
        if (match.team1) selectKnockoutWinner(matchId, match.team1);
      });
      teamList.appendChild(row1);

      // Team 2 Row
      const row2 = createMatchTeamRow(match.team2, match.winner === match.team2 && match.team2 !== null, match.winner !== match.team2 && match.winner !== null);
      row2.addEventListener('click', () => {
        if (match.team2) selectKnockoutWinner(matchId, match.team2);
      });
      teamList.appendChild(row2);

      card.appendChild(teamList);
      colDiv.appendChild(card);
    });
  });

  // Render Champion Pod
  const championPod = document.getElementById('champion-pod-display');
  championPod.innerHTML = '';
  
  const finalMatch = targetBracket.knockouts['F_1'];
  if (finalMatch && finalMatch.winner) {
    const champTeam = TEAM_MAP[finalMatch.winner];
    if (champTeam) {
      const flag = document.createElement('div');
      flag.className = 'champ-flag';
      flag.textContent = champTeam.flag;
      
      const name = document.createElement('div');
      name.textContent = champTeam.name;
      name.style.fontSize = '1.3rem';
      
      championPod.appendChild(flag);
      championPod.appendChild(name);
    }
  } else {
    const empty = document.createElement('span');
    empty.className = 'champ-empty-msg';
    empty.textContent = 'Select Winner Above!';
    championPod.appendChild(empty);
  }

  // Force active mobile round updates
  setMobileRound(activeMobileRound);
}

// Match Row Helper
function createMatchTeamRow(teamId, isWinner, isLoser) {
  const row = document.createElement('div');
  row.className = 'match-team-row';

  if (!teamId) {
    row.classList.add('empty-slot');
    row.textContent = 'TBD';
    return row;
  }

  row.dataset.teamId = teamId;

  if (isWinner) row.classList.add('winner-selected');
  if (isLoser) row.classList.add('loser-selected');

  const team = TEAM_MAP[teamId];
  if (team) {
    const flag = document.createElement('span');
    flag.style.marginRight = '8px';
    flag.textContent = team.flag;
    row.appendChild(flag);

    const name = document.createElement('span');
    name.textContent = team.name;
    row.appendChild(name);
    
    if (isWinner) {
      const star = document.createElement('span');
      star.style.marginLeft = 'auto';
      star.textContent = '⭐';
      row.appendChild(star);
    }
  } else {
    row.textContent = teamId;
  }

  return row;
}

// Get active bracket depending on current view mode
function getActiveBracketForRender() {
  if (currentViewMode === 'friend') return friendBracket;
  if (currentViewMode === 'admin') return masterResults;
  return state;
}

// Helper to normalize and clean team names for sync matching
function cleanTeamName(name) {
  if (!name) return "";
  // Strip flags & country codes in parentheses e.g. "Argentina (ARG)" or "USA (USA)"
  let cleaned = name.split('(')[0].replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, '').trim().toLowerCase();
  return TEAM_NAME_TO_ID[cleaned] || cleaned;
}

// Helper to determine the winner of a match from live scores
function parseWinnerFromLiveMatch(match, team1Id, team2Id) {
  if (!match.score) return null;

  const liveTeam1Id = cleanTeamName(match.team1);
  const liveTeam2Id = cleanTeamName(match.team2);
  
  let isFlipped = false;
  if (liveTeam1Id === team1Id && liveTeam2Id === team2Id) {
    isFlipped = false;
  } else if (liveTeam1Id === team2Id && liveTeam2Id === team1Id) {
    isFlipped = true;
  } else {
    return null; // Teams don't match
  }

  let winIdx = -1; // 0 for liveTeam1, 1 for liveTeam2

  // 1. Penalties
  if (match.score.pen) {
    if (match.score.pen[0] > match.score.pen[1]) winIdx = 0;
    else if (match.score.pen[1] > match.score.pen[0]) winIdx = 1;
  }
  // 2. Extra Time
  else if (match.score.aet) {
    if (match.score.aet[0] > match.score.aet[1]) winIdx = 0;
    else if (match.score.aet[1] > match.score.aet[0]) winIdx = 1;
  }
  // 3. Full Time
  else if (match.score.ft) {
    if (match.score.ft[0] > match.score.ft[1]) winIdx = 0;
    else if (match.score.ft[1] > match.score.ft[0]) winIdx = 1;
  }

  if (winIdx === -1) return null;

  if (winIdx === 0) {
    return isFlipped ? team2Id : team1Id;
  } else {
    return isFlipped ? team1Id : team2Id;
  }
}

// Live Score Sync (Option 1 - openfootball)
let syncStatus = 'idle';
let lastSyncedCount = 0;

async function syncLiveScores(userTriggered = true) {
  syncStatus = 'syncing';
  updateSyncPanelUI();
  
  if (userTriggered) {
    showToast("Syncing latest scores from openfootball... 🔄");
  }

  try {
    const url = "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";
    const fetchUrl = userTriggered ? `${url}?t=${Date.now()}` : url;
    
    const response = await fetch(fetchUrl);
    if (!response.ok) throw new Error("Network response was not ok");
    
    const data = await response.json();
    if (!data || !data.matches) throw new Error("Invalid openfootball JSON format");

    processLiveMatchesData(data.matches);
    
    syncStatus = 'success';
    showToast("Live scores successfully synchronized! 🏆");
  } catch (err) {
    console.error("Live sync failed", err);
    syncStatus = 'failed';
    if (userTriggered) {
      showToast("Live Sync failed. Verify connection or edit manually.");
    }
  }

  updateSyncPanelUI();
  renderGroupStage();
  renderWildcards();
  renderKnockoutBracket();
  renderLeaderboard();
}

// Process data from matches array for 12 groups
function processLiveMatchesData(matches) {
  const newMaster = createEmptyBracket();
  newMaster.nickname = "Master Results";

  // Initialize group stats map
  const groupStandings = {};
  for (let i = 65; i <= 76; i++) { // A to L
    const g = String.fromCharCode(i);
    groupStandings[g] = {};
    DEFAULT_TEAMS[g].forEach(t => {
      groupStandings[g][t.id] = { id: t.id, points: 0, gd: 0, gs: 0 };
    });
  }

  let completedMatchesCount = 0;
  const knockoutMatchesList = [];

  matches.forEach(match => {
    const roundName = match.round || "";
    const groupMatch = roundName.match(/Group\s+([A-L])/i);
    
    if (groupMatch) {
      const gLetter = groupMatch[1].toUpperCase();
      const t1Id = cleanTeamName(match.team1);
      const t2Id = cleanTeamName(match.team2);

      if (groupStandings[gLetter] && groupStandings[gLetter][t1Id] && groupStandings[gLetter][t2Id]) {
        if (match.score && match.score.ft) {
          completedMatchesCount++;
          const t1Goals = match.score.ft[0];
          const t2Goals = match.score.ft[1];

          const s1 = groupStandings[gLetter][t1Id];
          const s2 = groupStandings[gLetter][t2Id];

          s1.gs += t1Goals;
          s2.gs += t2Goals;
          s1.gd += (t1Goals - t2Goals);
          s2.gd += (t2Goals - t1Goals);

          if (t1Goals > t2Goals) {
            s1.points += 3;
          } else if (t2Goals > t1Goals) {
            s2.points += 3;
          } else {
            s1.points += 1;
            s2.points += 1;
          }
        }
      }
    } else {
      knockoutMatchesList.push(match);
    }
  });

  // Calculate actual group rankings & pool 3rd place wildcards
  const all3rdPlaceStats = [];
  Object.keys(groupStandings).forEach(gLetter => {
    const teams = Object.values(groupStandings[gLetter]);
    
    // Sort
    teams.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.gd !== a.gd) return b.gd - a.gd;
      return b.gs - a.gs;
    });

    newMaster.groups[gLetter] = [teams[0].id, teams[1].id, teams[2].id];
    
    // Add 3rd place to wildcard candidate list
    all3rdPlaceStats.push({
      id: teams[2].id,
      points: teams[2].points,
      gd: teams[2].gd,
      gs: teams[2].gs
    });
  });

  // Rank 3rd place teams to advance the top 8 actual wildcards
  all3rdPlaceStats.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gs - a.gs;
  });
  newMaster.wildcards = all3rdPlaceStats.slice(0, 8).map(x => x.id);

  // Propagate group stage and wildcards to R32
  propagateBracketState(newMaster);

  // Parse Knockout winners (R32, R16, QF, SF, F_1)
  const roundsToEval = [
    { matches: ['R32_1', 'R32_2', 'R32_3', 'R32_4', 'R32_5', 'R32_6', 'R32_7', 'R32_8', 'R32_9', 'R32_10', 'R32_11', 'R32_12', 'R32_13', 'R32_14', 'R32_15', 'R32_16'], key: /Round of 32/i },
    { matches: ['R16_1', 'R16_2', 'R16_3', 'R16_4', 'R16_5', 'R16_6', 'R16_7', 'R16_8'], key: /Round of 16/i },
    { matches: ['QF_1', 'QF_2', 'QF_3', 'QF_4'], key: /Quarter/i },
    { matches: ['SF_1', 'SF_2'], key: /Semi/i },
    { matches: ['F_1'], key: /Final$/i }
  ];

  roundsToEval.forEach(stage => {
    const liveStageMatches = knockoutMatchesList.filter(m => m.round.match(stage.key));

    stage.matches.forEach(matchId => {
      const slot = newMaster.knockouts[matchId];
      if (!slot.team1 || !slot.team2) return;

      const matchingLiveMatch = liveStageMatches.find(m => {
        const t1 = cleanTeamName(m.team1);
        const t2 = cleanTeamName(m.team2);
        return (t1 === slot.team1 && t2 === slot.team2) || (t1 === slot.team2 && t2 === slot.team1);
      });

      if (matchingLiveMatch) {
        const winner = parseWinnerFromLiveMatch(matchingLiveMatch, slot.team1, slot.team2);
        if (winner) {
          slot.winner = winner;
          completedMatchesCount++;
          propagateBracketState(newMaster);
        }
      }
    });
  });

  masterResults = newMaster;
  lastSyncedCount = completedMatchesCount;
  saveMasterResultsToStorage();

  // Store globally and save to localStorage
  liveGroupStandings = groupStandings;
  localStorage.setItem('wc_live_group_standings', JSON.stringify(groupStandings));
}

// Update Sync Panel UI Text & Dot
function updateSyncPanelUI() {
  const dot = document.getElementById('sync-status-dot');
  const text = document.getElementById('sync-status-text');

  dot.className = 'status-dot';
  if (syncStatus === 'syncing') {
    dot.classList.add('dot-yellow');
    text.textContent = "Syncing with GitHub...";
  } else if (syncStatus === 'success') {
    dot.classList.add('dot-green');
    text.textContent = `Live scores synchronized. ${lastSyncedCount} results loaded.`;
  } else if (syncStatus === 'failed') {
    dot.classList.add('dot-red');
    text.textContent = "Sync failed. Check connection or use Manual Editor.";
  } else {
    dot.classList.add('dot-yellow');
    text.textContent = "Offline / Idle. Click Sync to fetch live results.";
  }
}

// Admin Mode Toggle
function toggleAdminMode() {
  const btn = document.getElementById('toggle-admin-btn');
  const badge = document.getElementById('admin-view-badge');

  if (currentViewMode !== 'admin') {
    currentViewMode = 'admin';
    friendBracket = null;
    document.getElementById('friend-view-badge').style.display = 'none';
    
    badge.style.display = 'block';
    btn.textContent = "Exit Master Editor";
    btn.classList.add('btn-gold');
    btn.classList.remove('btn-red');
    showToast("🛠️ Master Results Editor Mode Enabled!");
  } else {
    currentViewMode = 'my';
    badge.style.display = 'none';
    btn.textContent = "Edit Master Results";
    btn.classList.remove('btn-gold');
    btn.classList.add('btn-red');
    showToast("Exited Master Editor. Viewing your bracket.");
  }

  renderGroupStage();
  renderWildcards();
  renderKnockoutBracket();
  renderLeaderboard();
}

// De/Serialization & Sharing Panel
function getBracketStateJson(bracket) {
  return JSON.stringify({
    nickname: bracket.nickname,
    groups: bracket.groups,
    wildcards: bracket.wildcards,
    knockouts: bracket.knockouts
  });
}

function copyRawJsonString() {
  const str = getBracketStateJson(state);
  navigator.clipboard.writeText(str).then(() => {
    showToast("Raw JSON prediction copied to clipboard! 📋");
  }).catch(() => {
    showToast("Copy failed. Please copy manually.");
  });
}

function downloadBracketJsonFile() {
  const str = getBracketStateJson(state);
  const safeNick = state.nickname.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  
  const blob = new Blob([str], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `usa-wc-prediction-${safeNick}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("File downloaded! Send it to friends. 💾");
}

function generateShareLink() {
  const data = {
    n: state.nickname,
    g: state.groups,
    w: state.wildcards || [],
    k: {}
  };
  
  Object.keys(state.knockouts).forEach(mId => {
    if (state.knockouts[mId].winner) {
      data.k[mId] = state.knockouts[mId].winner;
    }
  });

  const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(data));
  const shareUrl = `${window.location.origin}${window.location.pathname}#bracket=${compressed}`;
  
  document.getElementById('share-url-input').value = shareUrl;
}

function copyShareUrl() {
  const input = document.getElementById('share-url-input');
  input.select();
  navigator.clipboard.writeText(input.value).then(() => {
    showToast("Shareable link copied to clipboard! 🔗");
  }).catch(() => {
    showToast("Copy failed.");
  });
}

// Parse URL hash on load
function parseUrlHash() {
  const hash = window.location.hash;
  if (hash.startsWith('#bracket=')) {
    const rawData = hash.substring(9);
    try {
      const decompressed = LZString.decompressFromEncodedURIComponent(rawData);
      if (decompressed) {
        const parsed = JSON.parse(decompressed);
        if (parsed.n && parsed.g && parsed.k) {
          friendBracket = createEmptyBracket();
          friendBracket.nickname = parsed.n;
          friendBracket.groups = parsed.g;
          friendBracket.wildcards = parsed.w || [];
          
          Object.keys(parsed.k).forEach(mId => {
            if (friendBracket.knockouts[mId]) {
              friendBracket.knockouts[mId].winner = parsed.k[mId];
            }
          });

          propagateBracketState(friendBracket);
          addToLeaderboardBank(friendBracket);
          enableFriendView();
          showToast(`Loaded Friend's predictions: "${parsed.n}"! 🥳`);
        }
      }
    } catch(e) {
      console.error("Failed to parse bracket link", e);
      showToast("Invalid share link format!");
    }
  }
}

// Import friend file helpers
function handleFriendUpload(e) {
  if (e.target.files.length > 0) {
    handleFileSelected(e.target.files[0], 'friend');
  }
}

function handleLeaderboardUpload(e) {
  if (e.target.files.length > 0) {
    Array.from(e.target.files).forEach(file => {
      handleFileSelected(file, 'leaderboard');
    });
  }
}

function handleFileSelected(file, mode) {
  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const parsed = JSON.parse(event.target.result);
      if (parsed.groups && parsed.knockouts && parsed.nickname) {
        const newBracket = createEmptyBracket();
        newBracket.nickname = parsed.nickname;
        newBracket.groups = parsed.groups;
        newBracket.wildcards = parsed.wildcards || [];
        
        Object.keys(parsed.knockouts).forEach(mId => {
          if (newBracket.knockouts[mId]) {
            newBracket.knockouts[mId].winner = parsed.knockouts[mId].winner;
          }
        });

        propagateBracketState(newBracket);

        if (mode === 'friend') {
          friendBracket = newBracket;
          document.getElementById('loaded-friend-nickname').textContent = newBracket.nickname;
          document.getElementById('loaded-friend-indicator').style.display = 'block';
          addToLeaderboardBank(newBracket);
          showToast(`Friend bracket loaded: "${newBracket.nickname}"!`);
        } else {
          addToLeaderboardBank(newBracket);
          showToast(`Added to Leaderboard: "${newBracket.nickname}"!`);
        }
      } else {
        showToast("Invalid JSON schema.");
      }
    } catch(err) {
      showToast("Failed to parse file.");
    }
  };
  reader.readAsText(file);
}

// Add bracket object to leaderboard bank
function addToLeaderboardBank(bracket) {
  const idx = leaderboardBank.findIndex(b => b.nickname.toLowerCase() === bracket.nickname.toLowerCase());
  if (idx > -1) {
    leaderboardBank[idx] = bracket;
  } else {
    leaderboardBank.push(bracket);
  }
  saveLeaderboardToStorage();
  renderLeaderboard();
}

function enableFriendView() {
  if (friendBracket) {
    currentViewMode = 'friend';
    document.getElementById('friend-nickname-display').textContent = friendBracket.nickname;
    document.getElementById('friend-view-badge').style.display = 'block';
    
    document.getElementById('admin-view-badge').style.display = 'none';
    const adminBtn = document.getElementById('toggle-admin-btn');
    adminBtn.textContent = "Edit Master Results";
    adminBtn.className = 'comic-btn btn-red';

    switchView('my-predictions');
    renderGroupStage();
    renderWildcards();
    renderKnockoutBracket();
  }
}

function disableFriendView() {
  currentViewMode = 'my';
  document.getElementById('friend-view-badge').style.display = 'none';
  renderGroupStage();
  renderWildcards();
  renderKnockoutBracket();
  showToast("Switched back to your predictions!");
}

// Calculate Leaderboard rankings and render scoreboard
function renderLeaderboard() {
  const tbody = document.getElementById('leaderboard-tbody');
  tbody.innerHTML = '';

  const allBrackets = [];
  
  allBrackets.push({
    nickname: state.nickname + " (You)",
    isUser: true,
    data: state,
    scores: calculateScores(state, masterResults)
  });

  leaderboardBank.forEach(b => {
    if (b.nickname.toLowerCase() !== state.nickname.toLowerCase()) {
      allBrackets.push({
        nickname: b.nickname,
        isUser: false,
        data: b,
        scores: calculateScores(b, masterResults)
      });
    }
  });

  allBrackets.sort((a, b) => b.scores.total - a.scores.total);

  allBrackets.forEach((item, index) => {
    const tr = document.createElement('tr');
    if (item.isUser) {
      tr.style.backgroundColor = '#FFFEE6';
      tr.style.border = '3px solid var(--color-red)';
    }

    const tdRank = document.createElement('td');
    tdRank.className = 'rank-cell';
    
    const rankNum = index + 1;
    if (rankNum === 1) {
      const badge = document.createElement('span');
      badge.className = 'rank-badge-gold';
      badge.textContent = '🥇';
      tdRank.appendChild(badge);
    } else if (rankNum === 2) {
      tdRank.textContent = '🥈';
    } else if (rankNum === 3) {
      tdRank.textContent = '🥉';
    } else {
      tdRank.textContent = rankNum;
    }
    tr.appendChild(tdRank);

    const tdName = document.createElement('td');
    const link = document.createElement('a');
    link.href = '#';
    link.style.color = 'var(--color-navy)';
    link.style.textDecoration = 'underline';
    link.style.cursor = 'pointer';
    link.textContent = item.nickname;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.isUser) {
        disableFriendView();
      } else {
        friendBracket = item.data;
        enableFriendView();
      }
    });
    tdName.appendChild(link);
    tr.appendChild(tdName);

    const tdGroup = document.createElement('td');
    tdGroup.style.textAlign = 'center';
    tdGroup.textContent = item.scores.group + item.scores.wildcard; // Combine group & wildcard scores
    tr.appendChild(tdGroup);

    const tdKnockout = document.createElement('td');
    tdKnockout.style.textAlign = 'center';
    tdKnockout.textContent = item.scores.knockout;
    tr.appendChild(tdKnockout);

    const tdTotal = document.createElement('td');
    tdTotal.className = 'score-cell';
    tdTotal.textContent = item.scores.total;
    tr.appendChild(tdTotal);

    const tdDelete = document.createElement('td');
    tdDelete.className = 'delete-cell';
    
    if (!item.isUser) {
      const delBtn = document.createElement('button');
      delBtn.className = 'btn-icon-delete';
      delBtn.innerHTML = '🗑️';
      delBtn.addEventListener('click', () => {
        deleteFriendFromBank(item.nickname);
      });
      tdDelete.appendChild(delBtn);
    } else {
      tdDelete.textContent = '—';
    }
    tr.appendChild(tdDelete);

    tbody.appendChild(tr);
  });
}

// Compare scoring system
function calculateScores(pred, actual) {
  let groupScore = 0;
  let wildcardScore = 0;
  let knockoutScore = 0;

  const predGroups = pred.groups || {};
  const predWildcards = pred.wildcards || [];
  const predKnockouts = pred.knockouts || {};
  const actualKnockouts = actual.knockouts || {};

  // Group picks: 1 pt each for correct 1st, 2nd, and 3rd place rankings
  Object.keys(DEFAULT_TEAMS).forEach(gLetter => {
    const predPicks = predGroups[gLetter] || [];
    const actualPicks = actual.groups[gLetter] || [];
    
    if (predPicks[0] && predPicks[0] === actualPicks[0]) groupScore += 1;
    if (predPicks[1] && predPicks[1] === actualPicks[1]) groupScore += 1;
    if (predPicks[2] && predPicks[2] === actualPicks[2]) groupScore += 1;
  });

  // Wildcard selections: 1 pt each for correct wildcard teams predicted to advance
  const actualWildcards = actual.wildcards || [];
  predWildcards.forEach(wTeamId => {
    if (actualWildcards.includes(wTeamId)) {
      wildcardScore += 1;
    }
  });

  // Knockouts: R32: 2pt, R16: 4pt, QF: 8pt, SF: 16pt, Champ: 32pt
  
  // R32 (16 matches)
  const r32Matches = ['R32_1', 'R32_2', 'R32_3', 'R32_4', 'R32_5', 'R32_6', 'R32_7', 'R32_8', 'R32_9', 'R32_10', 'R32_11', 'R32_12', 'R32_13', 'R32_14', 'R32_15', 'R32_16'];
  r32Matches.forEach(mId => {
    if (predKnockouts[mId]?.winner && predKnockouts[mId].winner === actualKnockouts[mId]?.winner) {
      knockoutScore += 2;
    }
  });

  // R16 (8 matches)
  const r16Matches = ['R16_1', 'R16_2', 'R16_3', 'R16_4', 'R16_5', 'R16_6', 'R16_7', 'R16_8'];
  r16Matches.forEach(mId => {
    if (predKnockouts[mId]?.winner && predKnockouts[mId].winner === actualKnockouts[mId]?.winner) {
      knockoutScore += 4;
    }
  });

  // QF (4 matches)
  const qfMatches = ['QF_1', 'QF_2', 'QF_3', 'QF_4'];
  qfMatches.forEach(mId => {
    if (predKnockouts[mId]?.winner && predKnockouts[mId].winner === actualKnockouts[mId]?.winner) {
      knockoutScore += 8;
    }
  });

  // SF (2 matches)
  const sfMatches = ['SF_1', 'SF_2'];
  sfMatches.forEach(mId => {
    if (predKnockouts[mId]?.winner && predKnockouts[mId].winner === actualKnockouts[mId]?.winner) {
      knockoutScore += 16;
    }
  });

  // Final / Champ (1 match)
  if (predKnockouts['F_1']?.winner && predKnockouts['F_1'].winner === actualKnockouts['F_1']?.winner) {
    knockoutScore += 32;
  }

  return {
    group: groupScore,
    wildcard: wildcardScore,
    knockout: knockoutScore,
    total: groupScore + wildcardScore + knockoutScore
  };
}

// Delete friend bracket (passcode protected for backend, fallback to local removal)
async function deleteFriendFromBank(nick) {
  const passcode = prompt(`Enter Admin Passcode to delete bracket for "${nick}":`);
  if (passcode === null) return; // cancelled

  if (!passcode.trim()) {
    showToast("❌ Admin passcode cannot be empty.");
    return;
  }

  try {
    const response = await fetch('/api/delete-bracket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nickname: nick, passcode: passcode.trim() })
    });

    const resData = await response.json();
    if (response.ok) {
      showToast(`🗑️ Deleted bracket for "${nick}" from database.`);
      leaderboardBank = leaderboardBank.filter(b => b.nickname !== nick);
      saveLeaderboardToStorage();
      renderLeaderboard();
    } else {
      if (response.status === 403) {
        showToast(`❌ Error: ${resData.error || 'Unauthorized'}`);
      } else {
        if (confirm(`Could not delete from server (${resData.error || 'not found'}). Delete locally only?`)) {
          leaderboardBank = leaderboardBank.filter(b => b.nickname !== nick);
          saveLeaderboardToStorage();
          renderLeaderboard();
          showToast(`Removed local bracket "${nick}".`);
        }
      }
    }
  } catch (err) {
    console.error("Error deleting bracket:", err);
    if (confirm("Network error deleting from server. Delete locally only?")) {
      leaderboardBank = leaderboardBank.filter(b => b.nickname !== nick);
      saveLeaderboardToStorage();
      renderLeaderboard();
      showToast(`Removed local bracket "${nick}".`);
    }
  }
}

// Clear Leaderboard bank completely
function clearLeaderboardBank() {
  if (confirm("Are you sure you want to clear all friend brackets?")) {
    leaderboardBank = [];
    saveLeaderboardToStorage();
    renderLeaderboard();
    showToast("Standings cleared!");
  }
}

// Publish local bracket to central Netlify Blobs database
async function publishBracketToLeaderboard() {
  const nickname = state.nickname || document.getElementById('coach-nickname-input').value.trim();
  if (!nickname) {
    showToast("❌ Please save a Coach Nickname first!");
    switchView('my-predictions');
    document.getElementById('coach-nickname-input').focus();
    return;
  }

  // Count progress
  let completed = 0;
  Object.keys(DEFAULT_TEAMS).forEach(gLetter => {
    const picks = state.groups[gLetter] || [];
    completed += picks.filter(Boolean).length;
  });
  completed += (state.wildcards || []).length;
  PROPAGATION_ORDER.forEach(mId => {
    if (state.knockouts[mId]?.winner) completed += 1;
  });

  if (completed < 75) {
    showToast(`❌ Cannot publish! Your bracket is incomplete (${completed}/75 selections made).`);
    return;
  }

  state.nickname = nickname;
  localStorage.setItem('wc_nickname', nickname);
  saveMyBracketToStorage();

  const payload = {
    nickname: state.nickname,
    clientId: localStorage.getItem('wc_client_id'),
    groups: state.groups,
    wildcards: state.wildcards,
    knockouts: state.knockouts
  };

  const btn = document.getElementById('publish-leaderboard-btn');
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '📤 Publishing...';

  try {
    const response = await fetch('/api/submit-bracket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const resData = await response.json();
    if (response.ok) {
      showToast(`🎉 Published bracket for "${state.nickname}"!`);
      await fetchBracketsFromServer();
    } else {
      showToast(`❌ Error: ${resData.error || 'Failed to publish'}`);
    }
  } catch (err) {
    console.error("Error publishing bracket:", err);
    showToast("❌ Network error publishing bracket.");
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
}

// Fetch brackets from serverless API and merge with local custom ones
async function fetchBracketsFromServer() {
  try {
    const response = await fetch('/api/get-brackets');
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    const remoteBrackets = await response.json();
    
    // Merge remote database brackets into leaderboardBank
    const merged = [...remoteBrackets];
    
    leaderboardBank.forEach(local => {
      const exists = remoteBrackets.some(remote => remote.nickname.toLowerCase() === local.nickname.toLowerCase());
      if (!exists && local.nickname.toLowerCase() !== state.nickname.toLowerCase()) {
        merged.push(local);
      }
    });

    leaderboardBank = merged;
    saveLeaderboardToStorage();
    renderLeaderboard();
    return true;
  } catch (err) {
    console.error("Error fetching brackets from server:", err);
    showToast("⚠️ Could not sync leaderboard with central database.");
    return false;
  }
}

// Expose navigation functions to global window scope for inline HTML onclick handlers
window.switchView = switchView;
window.setMobileRound = setMobileRound;

// Initialize premium UX features on DOM load
function initGrabToScroll() {
  const wrapper = document.querySelector('.bracket-tree-wrapper');
  if (!wrapper) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // only left click
    if (e.target.closest('.match-card') || e.target.closest('.minimap-btn') || e.target.closest('button')) return;

    isDown = true;
    wrapper.style.cursor = 'grabbing';
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener('mouseleave', () => {
    isDown = false;
    wrapper.style.cursor = 'grab';
  });

  wrapper.addEventListener('mouseup', () => {
    isDown = false;
    wrapper.style.cursor = 'grab';
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrapper.scrollLeft = scrollLeft - walk;
  });
}

function initWheelScrollRedirect() {
  const wrapper = document.querySelector('.bracket-tree-wrapper');
  if (!wrapper) return;

  wrapper.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      wrapper.scrollLeft += e.deltaY;
    }
  }, { passive: false });
}

function scrollToColumn(colId) {
  const wrapper = document.querySelector('.bracket-tree-wrapper');
  const col = document.getElementById(colId);
  if (wrapper && col) {
    const targetScrollLeft = col.offsetLeft - (wrapper.offsetWidth / 2) + (col.offsetWidth / 2);
    wrapper.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
    
    // Update active class on minimap buttons
    document.querySelectorAll('.minimap-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('onclick')?.includes(colId)) {
        btn.classList.add('active');
      }
    });
  }
}
window.scrollToColumn = scrollToColumn;

function initPathHoverHighlights() {
  const container = document.querySelector('.bracket-container');
  if (!container) return;

  container.addEventListener('mouseover', (e) => {
    const row = e.target.closest('.match-team-row');
    if (!row || !row.dataset.teamId) return;

    const teamId = row.dataset.teamId;
    document.querySelectorAll(`.match-team-row[data-team-id="${teamId}"]`).forEach(el => {
      el.classList.add('path-highlight');
      el.closest('.match-card')?.classList.add('match-highlight');
    });
  });

  container.addEventListener('mouseout', (e) => {
    const row = e.target.closest('.match-team-row');
    if (!row) return;

    document.querySelectorAll('.match-team-row.path-highlight').forEach(el => {
      el.classList.remove('path-highlight');
    });
    document.querySelectorAll('.match-card.match-highlight').forEach(el => {
      el.classList.remove('match-highlight');
    });
  });
}

function updateCompletionProgress() {
  if (currentViewMode !== 'my') return;

  let completed = 0;
  
  // Group picks
  Object.keys(DEFAULT_TEAMS).forEach(gLetter => {
    const picks = state.groups[gLetter] || [];
    completed += picks.filter(Boolean).length;
  });

  // Wildcards
  completed += (state.wildcards || []).length;

  // Knockouts
  PROPAGATION_ORDER.forEach(mId => {
    if (state.knockouts[mId]?.winner) {
      completed += 1;
    }
  });

  const total = 75;
  const percent = Math.min(100, Math.round((completed / total) * 100));

  const percentDisplay = document.getElementById('progress-percent-display');
  const fractionDisplay = document.getElementById('progress-fraction-display');
  const fill = document.getElementById('progress-bar-fill');

  if (percentDisplay && fractionDisplay && fill) {
    percentDisplay.textContent = `${percent}%`;
    fractionDisplay.textContent = `${completed} / ${total} picks completed`;
    fill.style.width = `${percent}%`;

    // Dynamic color shifting: red -> gold -> green
    if (percent < 35) {
      fill.style.backgroundColor = 'var(--color-red)';
    } else if (percent < 90) {
      fill.style.backgroundColor = 'var(--color-gold)';
    } else {
      fill.style.backgroundColor = 'var(--color-green)';
    }
  }
}

function findTargetMatch(sourceMatchId) {
  for (const [matchId, rules] of Object.entries(MATCH_SOURCES)) {
    if (rules.t1.type === 'knockout' && rules.t1.matchId === sourceMatchId) {
      return matchId;
    }
    if (rules.t2?.type === 'knockout' && rules.t2.matchId === sourceMatchId) {
      return matchId;
    }
  }
  return null;
}

function autoFocusMatch(matchId) {
  const targetMatchId = findTargetMatch(matchId);
  if (!targetMatchId) {
    const champPod = document.getElementById('champion-pod-display');
    if (champPod) {
      champPod.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    return;
  }

  const targetCard = document.getElementById(`match-${targetMatchId}`);
  if (targetCard) {
    const wrapper = document.querySelector('.bracket-tree-wrapper');
    const col = targetCard.closest('.bracket-column') || targetCard.closest('.center-champion-column');
    if (wrapper && col) {
      const targetScrollLeft = col.offsetLeft - (wrapper.offsetWidth / 2) + (col.offsetWidth / 2);
      wrapper.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
      
      targetCard.style.outline = '4px solid var(--color-green)';
      targetCard.style.transition = 'outline 0.3s ease';
      setTimeout(() => {
        targetCard.style.outline = 'none';
      }, 1000);
    }
  }
}

