const EVENT_TITLE = "COUNTDOWN TO THE 2026 SEASON!";
const EVENT_TIME_ISO = "2026-09-13T19:20:00-04:00";

// Optional title/when text (only runs if elements exist)
const titleEl = document.getElementById("event-title");
const whenEl = document.getElementById("event-when");

if (titleEl) {
  titleEl.textContent = EVENT_TITLE;
}

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
//   COUNTDOWN TIMER
// ==========================
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date().getTime();
  const eventTime = new Date(EVENT_TIME_ISO).getTime();
  let diff = eventTime - now;

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// ==========================
//   COPY SHAREABLE LINK
// ==========================
const copyBtn = document.getElementById("copy-link");
const statusEl = document.getElementById("status");

if (copyBtn && statusEl) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      statusEl.textContent = "Link copied!";
    } catch (err) {
      statusEl.textContent = "Could not copy link.";
    }

    setTimeout(() => {
      statusEl.textContent = "";
    }, 2000);
  });
}

// ==========================
//   ITINERARY TOGGLE
// ==========================
// button id="itinerary-btn"
// section id="itinerary" class="card hidden"
const itineraryBtn = document.getElementById("itinerary-btn");
const itinerarySection = document.getElementById("itinerary");
const scheduleBtn = document.getElementById("schedule-btn");
const scheduleSection = document.getElementById("schedule");
const scheduleBody = document.getElementById("scheduleBody");
const weekSelect = document.getElementById("weekSelect");

// ============================
// SCHEDULE DATA (edit later)
// ============================
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

// ============================
// RENDER SCHEDULE TABLE + DROPDOWN
// ============================
function renderSchedule() {
  if (!scheduleBody || !weekSelect) return;

  // Clear existing
  scheduleBody.innerHTML = "";
  weekSelect.innerHTML = `<option value="">Select a week</option>`;

  cowboysSchedule.forEach((game) => {
    // Dropdown option
    const opt = document.createElement("option");
    opt.value = String(game.week);
    opt.textContent = `Week ${game.week}`;
    weekSelect.appendChild(opt);

    // Table row
    const tr = document.createElement("tr");
    tr.id = `week-${game.week}`;
    if (game.week === 1) {
      tr.classList.add("current-week");
    }
    tr.innerHTML = `
  <td>Week ${game.week}</td>
  <td>${game.dateTime}</td>
  <td>${game.matchup}</td>
  <td>${game.homeAway}</td>
  <td>
    <button class="result-btn win-btn" data-result="W">W</button>
    <button class="result-btn loss-btn" data-result="L">L</button>
  </td>
`;

    scheduleBody.appendChild(tr);
  });

  // Jump to week behavior
  weekSelect.addEventListener("change", () => {
    const week = weekSelect.value;
    if (!week) return;

    const row = document.getElementById(`week-${week}`);
    if (row) row.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Call once on page load
// Call once on page load
renderSchedule();

let wins = 0;
let losses = 0;

function updateRecordDisplay() {
  const recordDisplay = document.getElementById("record-display");
  recordDisplay.textContent = `${wins} - ${losses}`;
}

document.addEventListener("click", function (event) {
  if (!event.target.classList.contains("result-btn")) return;

  const cell = event.target.parentElement;

  if (cell.dataset.completed === "true") return;

  const result = event.target.dataset.result;

  if (result === "W") {
    wins++;
  } else if (result === "L") {
    losses++;
  }

  cell.dataset.completed = "true";

  const buttons = cell.querySelectorAll(".result-btn");

  buttons.forEach((button) => {
    if (button !== event.target) {
      button.style.display = "none";
    }
  });

  event.target.classList.add("selected-result");

  updateRecordDisplay();
});

if (itineraryBtn && itinerarySection) {
  itineraryBtn.addEventListener("click", (event) => {
    event.preventDefault();
    itinerarySection.classList.toggle("hidden");

    if (!itinerarySection.classList.contains("hidden")) {
      itinerarySection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

if (scheduleBtn && scheduleSection) {
  scheduleBtn.addEventListener("click", (event) => {
    event.preventDefault();
    scheduleSection.classList.toggle("hidden");

    if (!scheduleSection.classList.contains("hidden")) {
      scheduleSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}
const resetBtn = document.getElementById("reset-record-btn");

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    wins = 0;
    losses = 0;

    updateRecordDisplay();

    document.querySelectorAll("td[data-completed]").forEach((cell) => {
      cell.dataset.completed = "false";
    });

    document.querySelectorAll(".result-btn").forEach((button) => {
      button.style.display = "inline-block";
      button.classList.remove("selected-result");
    });
  });
}
