document.addEventListener("DOMContentLoaded", async () => {
  const clickedDivId = localStorage.getItem("clickedDivId");
  const random = Number(localStorage.getItem("random"));

  // Decide categories
  let apiTeamCategory = "Terrorist";
  let oppositeTeamCategory = "Counter-Terrorist";

  if (clickedDivId === "autobtn") {
    apiTeamCategory = random === 0 ? "Counter-Terrorist" : "Terrorist";
    oppositeTeamCategory = random === 0 ? "Terrorist" : "Counter-Terrorist";
  } else if (clickedDivId === "ctModel") {
    apiTeamCategory = "Counter-Terrorist";
    oppositeTeamCategory = "Terrorist";
  }

  localStorage.setItem("apiTeamCategory", apiTeamCategory);
  localStorage.setItem("oppositeTeamCategory", oppositeTeamCategory);

  const agentUrl = "../asset/agents.json";

  // Heading
  const teamHeading = document.createElement("h1");
  teamHeading.classList.add("teamHeading");
  teamHeading.textContent = apiTeamCategory;
  document.body.append(teamHeading);

  // Container
  const playerSelector = document.createElement("div");
  playerSelector.classList.add("PlayerSelector");
  document.body.append(playerSelector);

  // Utility: Fisher–Yates shuffle
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  let backgroundAudio = null;
  let navigated = false;

  try {
    const res = await fetch(agentUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    const data = await res.json();

    const teamAgents = data.filter((item) => item.team?.name === apiTeamCategory);
    const oppAgents = data.filter((item) => item.team?.name === oppositeTeamCategory);

    // Pick 4 random opponents
    const selectedOppAgents = shuffle(oppAgents).slice(0, 4).map(a => ({
      id: a.id,
      name: a.name,
      image: a.image
    }));
    localStorage.setItem("oppTeamAgentData", JSON.stringify(selectedOppAgents));

    // Render team agents
    const frag = document.createDocumentFragment();

    teamAgents.forEach((agent) => {
      const player = document.createElement("div");
      player.classList.add("player");

      const img = document.createElement("img");
      img.src = agent.image;
      img.alt = agent.name || agent.rarity?.name || "Agent";

      const playerName = document.createElement("p");
      // Use the agent name; fall back to rarity
      playerName.textContent = agent.name || agent.rarity?.name || "Unknown";

      player.append(img, playerName);

      player.addEventListener("click", async () => {
        if (navigated) return; // prevent double clicks
        navigated = true;

        // Lower background first
        if (backgroundAudio) backgroundAudio.volume = 0.5;

        // Click sound
        const audioClick = new Audio("../asset/mixkit-classic-click-1117.wav");
        backgroundAudio = audioClick;

        // Choose 3 more unique agents from the same team
        const randomAgents = new Set([agent.id]);
        while (randomAgents.size < 4 && randomAgents.size < teamAgents.length) {
          const randomIndex = Math.floor(Math.random() * teamAgents.length);
          randomAgents.add(teamAgents[randomIndex].id);
        }

        localStorage.setItem("randomAgentIds", JSON.stringify([...randomAgents]));

        // Navigate after sound, with fallback
        try {
          await audioClick.play();
          audioClick.addEventListener("ended", () => {
            window.location.href = "../TeamForm.html";
          }, { once: true });
          // Safety fallback in case 'ended' never fires
          setTimeout(() => {
            if (document.location.href.indexOf("TeamForm.html") === -1) {
              window.location.href = "../TeamForm.html";
            }
          }, 1200);
        } catch {
          // If play() fails (e.g., blocked), navigate immediately
          window.location.href = "../TeamForm.html";
        }
      });

      frag.appendChild(player);
    });

    playerSelector.appendChild(frag);
  } catch (err) {
    console.error("Error:", err);
    // Optional: surface to UI
    const msg = document.createElement("p");
    msg.textContent = "Failed to load agents. Please try again.";
    msg.style.color = "red";
    document.body.append(msg);
  }
});