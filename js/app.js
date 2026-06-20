const EVENT_TITLE = "COUNTDOWN TO THE 2026 SEASON!";
const EVENT_TIME_ISO = "2026-09-13T19:20:00-04:00";

// ==========================
// TITLE / DATE
// ==========================
const titleEl = document.getElementById("event-title");
const whenEl = document.getElementById("event-when");

if (titleEl) titleEl.textContent = EVENT_TITLE;

if (whenEl) {
  const eventDate = new Date(EVENT_TIME_ISO);
  whenEl.textContent = eventDate.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

// ==========================
// COUNTDOWN TIMER
// ==========================
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date().getTime();
  const eventTime = new Date(EVENT_TIME_ISO).getTime();
  const diff = eventTime - now;

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";
    clearInterval(countdownInterval);
    return;
  }

  daysEl.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
  hoursEl.textContent = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  minutesEl.textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  secondsEl.textContent = Math.floor((diff % (1000 * 60)) / 1000);
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// ==========================
// COPY SHAREABLE LINK
// ==========================
const copyBtn = document.getElementById("copy-link");
const statusEl = document.getElementById("status");

if (copyBtn && statusEl) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      statusEl.textContent = "Link copied!";
    } catch {
      statusEl.textContent = "Could not copy link.";
    }

    setTimeout(() => {
      statusEl.textContent = "";
    }, 2000);
  });
}

// ==========================
// SECTIONS
// ==========================
const itineraryBtn = document.getElementById("itinerary-btn");
const itinerarySection = document.getElementById("itinerary");
const scheduleBtn = document.getElementById("schedule-btn");
const scheduleSection = document.getElementById("schedule");

if (itineraryBtn && itinerarySection) {
  itineraryBtn.addEventListener("click", (event) => {
    event.preventDefault();
    itinerarySection.classList.toggle("hidden");

    if (!itinerarySection.classList.contains("hidden")) {
      itinerarySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

if (scheduleBtn && scheduleSection) {
  scheduleBtn.addEventListener("click", (event) => {
    event.preventDefault();
    scheduleSection.classList.toggle("hidden");

    if (!scheduleSection.classList.contains("hidden")) {
      scheduleSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// ==========================
// SCHEDULE DATA
// ==========================
const cowboysSchedule = [
  {
    week: 1,
    dateTime: "Sun 09/13 · 7:20 PM",
    matchup: "Cowboys @ Giants",
    homeAway: "Away",
  },
  {
    week: 2,
    dateTime: "Sun 09/20 · 3:25 PM",
    matchup: "Commanders @ Cowboys",
    homeAway: "Home",
  },
  {
    week: 3,
    dateTime: "Sun 09/27 · 3:25 PM",
    matchup: "Ravens @ Cowboys",
    homeAway: "Home",
  },
  {
    week: 4,
    dateTime: "Sun 10/04 · 12:00 PM",
    matchup: "Cowboys @ Texans",
    homeAway: "Away",
  },
  {
    week: 5,
    dateTime: "Thu 10/08 · 7:15 PM",
    matchup: "Buccaneers @ Cowboys",
    homeAway: "Home",
  },
  {
    week: 6,
    dateTime: "Sun 10/18 · 7:20 PM",
    matchup: "Cowboys @ Packers",
    homeAway: "Away",
  },
  {
    week: 7,
    dateTime: "Mon 10/26 · 7:15 PM",
    matchup: "Cowboys @ Eagles",
    homeAway: "Away",
  },
  {
    week: 8,
    dateTime: "Sun 11/01 · 12:00 PM",
    matchup: "Cardinals @ Cowboys",
    homeAway: "Home",
  },
  {
    week: 9,
    dateTime: "Sun 11/08 · 12:00 PM",
    matchup: "Cowboys @ Colts",
    homeAway: "Away",
  },
  {
    week: 10,
    dateTime: "Sun 11/15 · 3:25 PM",
    matchup: "49ers @ Cowboys",
    homeAway: "Home",
  },
  {
    week: 11,
    dateTime: "Sun 11/22 · 12:00 PM",
    matchup: "Titans @ Cowboys",
    homeAway: "Home",
  },
  {
    week: 12,
    dateTime: "Thu 11/26 · 3:30 PM",
    matchup: "Eagles @ Cowboys",
    homeAway: "Home",
  },
  {
    week: 13,
    dateTime: "Mon 12/07 · 7:15 PM",
    matchup: "Cowboys @ Seahawks",
    homeAway: "Away",
  },
  { week: 14, dateTime: "BYE", matchup: "BYE WEEK", homeAway: "—" },
  {
    week: 15,
    dateTime: "Sun 12/20 · 3:25 PM",
    matchup: "Cowboys @ Rams",
    homeAway: "Away",
  },
  {
    week: 16,
    dateTime: "Sun 12/27 · 7:20 PM",
    matchup: "Jaguars @ Cowboys",
    homeAway: "Home",
  },
  {
    week: 17,
    dateTime: "Sun 01/03 · 12:00 PM",
    matchup: "Giants @ Cowboys",
    homeAway: "Home",
  },
  {
    week: 18,
    dateTime: "TBD",
    matchup: "Cowboys @ Commanders",
    homeAway: "Away",
  },
];

// ==========================
// ADMIN / RESULTS SYSTEM
// ==========================
let isAdminUnlocked = false;
let gameResults = JSON.parse(localStorage.getItem("gameResults")) || {};

const recordDisplay = document.getElementById("record-display");
const nextGameDisplay = document.getElementById("next-game-display");
const nextGameDate = document.getElementById("next-game-date");
const gamesPlayedEl = document.getElementById("games-played");
const winPercentEl = document.getElementById("win-percent");
const currentStreakEl = document.getElementById("current-streak");

const seasonProgressEl = document.getElementById("season-progress");
const progressTextEl = document.getElementById("progress-text");
const lastResultEl = document.getElementById("last-result");
function saveResults() {
  localStorage.setItem("gameResults", JSON.stringify(gameResults));
}

function getRecordStats() {
  let wins = 0;
  let losses = 0;

  Object.values(gameResults).forEach((result) => {
    if (result === "W") wins++;
    if (result === "L") losses++;
  });

  return {
    wins,
    losses,
    gamesPlayed: wins + losses,
  };
}

function calculateRecord() {
  const { wins, losses } = getRecordStats();

  if (recordDisplay) {
    recordDisplay.textContent = `${wins} - ${losses}`;
  }
}

function calculateCurrentStreak() {
  const playedGames = cowboysSchedule
    .filter((game) => game.matchup !== "BYE WEEK" && gameResults[game.week])
    .map((game) => gameResults[game.week]);

  if (playedGames.length === 0) return "—";

  const latestResult = playedGames[playedGames.length - 1];
  let streakCount = 0;

  for (let i = playedGames.length - 1; i >= 0; i--) {
    if (playedGames[i] === latestResult) {
      streakCount++;
    } else {
      break;
    }
  }

  return `${latestResult}${streakCount}`;
}

function updateSeasonStats() {
  const { wins, gamesPlayed } = getRecordStats();

  if (gamesPlayedEl) {
    gamesPlayedEl.textContent = `${gamesPlayed} / 17`;
  }

  if (winPercentEl) {
    const winPercent =
      gamesPlayed === 0
        ? ".000"
        : (wins / gamesPlayed).toFixed(3).replace(/^0/, "");

    winPercentEl.textContent = winPercent;
  }

  if (seasonProgressEl && progressTextEl) {
    const progress = (gamesPlayed / 17) * 100;

    seasonProgressEl.style.width = `${progress}%`;
    progressTextEl.textContent = `${Math.round(progress)}%`;
  }

  if (currentStreakEl) {
    currentStreakEl.textContent = calculateCurrentStreak();
  }

  if (lastResultEl) {
    const playedGames = cowboysSchedule.filter(
      (game) => game.matchup !== "BYE WEEK" && gameResults[game.week],
    );

    if (playedGames.length === 0) {
      lastResultEl.textContent = "No games played yet";
    } else {
      const lastGame = playedGames[playedGames.length - 1];
      const lastResult = gameResults[lastGame.week];

      lastResultEl.textContent = `${lastResult} - ${lastGame.matchup}`;
    }
  }
}

function updateNextGame() {
  const nextGame = cowboysSchedule.find((game) => {
    return game.matchup !== "BYE WEEK" && !gameResults[game.week];
  });

  if (!nextGameDisplay || !nextGameDate) return;

  if (nextGame) {
    nextGameDisplay.textContent = nextGame.matchup;
    nextGameDate.textContent = nextGame.dateTime;
  } else {
    nextGameDisplay.textContent = "Season Complete";
    nextGameDate.textContent = "All games have results";
  }
}

function updateAppState() {
  saveResults();
  calculateRecord();
  updateSeasonStats();
  updateNextGame();
}

// ==========================
// RENDER SCHEDULE
// ==========================
const scheduleBody = document.getElementById("scheduleBody");
const weekSelect = document.getElementById("weekSelect");

function renderSchedule() {
  if (!scheduleBody || !weekSelect) return;

  scheduleBody.innerHTML = "";
  weekSelect.innerHTML = `<option value="">Select a week</option>`;

  cowboysSchedule.forEach((game) => {
    const opt = document.createElement("option");
    opt.value = String(game.week);
    opt.textContent = `Week ${game.week}`;
    weekSelect.appendChild(opt);

    const tr = document.createElement("tr");
    tr.id = `week-${game.week}`;

    if (game.week === 1) tr.classList.add("current-week");

    const savedResult = gameResults[game.week];

    if (savedResult === "W") tr.classList.add("game-win");
    if (savedResult === "L") tr.classList.add("game-loss");

    let resultCell = "";

    if (game.matchup === "BYE WEEK") {
      resultCell = `<span class="bye-result">BYE</span>`;
    } else if (savedResult) {
      resultCell = `<span class="saved-result">${savedResult}</span>`;
    } else {
      resultCell = `
        <button class="result-btn win-btn" data-week="${game.week}" data-result="W">W</button>
        <button class="result-btn loss-btn" data-week="${game.week}" data-result="L">L</button>
      `;
    }

    tr.innerHTML = `
      <td>Week ${game.week}</td>
      <td>${game.dateTime}</td>
      <td>${game.matchup}</td>
      <td>${game.homeAway}</td>
      <td>${resultCell}</td>
    `;

    scheduleBody.appendChild(tr);
  });

  weekSelect.addEventListener("change", () => {
    const week = weekSelect.value;
    if (!week) return;

    const row = document.getElementById(`week-${week}`);
    if (row) row.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

renderSchedule();
updateAppState();

// ==========================
// ADMIN LOGIN
// ==========================
const loginBtn = document.getElementById("login-btn");
const adminPassword = document.getElementById("admin-password");
const adminControls = document.getElementById("admin-controls");
const adminLogin = document.getElementById("admin-login");
const adminStatus = document.getElementById("admin-status");

if (loginBtn && adminPassword && adminControls && adminLogin && adminStatus) {
  loginBtn.addEventListener("click", () => {
    if (adminPassword.value === "cowboys2026") {
      isAdminUnlocked = true;
      adminControls.style.display = "block";
      adminLogin.style.display = "none";
      adminStatus.style.display = "block";
      alert("Admin unlocked");
    } else {
      alert("Wrong password");
    }
  });
}

// ==========================
// RESET RECORD BUTTON
// ==========================
const resetRecordBtn = document.getElementById("reset-record-btn");

if (resetRecordBtn) {
  resetRecordBtn.addEventListener("click", () => {
    gameResults = {};
    localStorage.removeItem("gameResults");
    renderSchedule();
    updateAppState();
  });
}

// ==========================
// SCHEDULE W/L BUTTONS
// ==========================
document.addEventListener("click", function (event) {
  if (!event.target.classList.contains("result-btn")) return;

  if (!isAdminUnlocked) {
    alert("Admin password required to update results.");
    return;
  }

  const week = event.target.dataset.week;
  const result = event.target.dataset.result;

  gameResults[week] = result;

  renderSchedule();
  updateAppState();
});
