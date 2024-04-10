document.addEventListener("DOMContentLoaded", function () {
  var clickedDivId = localStorage.getItem("clickedDivId");

  let apiTeamCategory, oppositeTeamCategory;

  switch (clickedDivId) {
    case "autobtn":
      const random = localStorage.getItem("random");
      apiTeamCategory = random == 0 ? "Counter-Terrorist" : "Terrorist";
      oppositeTeamCategory = random == 0 ? "Terrorist" : "Counter-Terrorist";
      localStorage.setItem("apiTeamCategory", apiTeamCategory);
      localStorage.setItem("oppositeTeamCategory", oppositeTeamCategory);
      break;
    case "ctModel":
      apiTeamCategory = "Counter-Terrorist";
      oppositeTeamCategory = "Terrorist";
      localStorage.setItem("apiTeamCategory", apiTeamCategory);
      localStorage.setItem("oppositeTeamCategory", oppositeTeamCategory);
      break;
    default:
      apiTeamCategory = "Terrorist";
      oppositeTeamCategory = "Counter-Terrorist";
      localStorage.setItem("apiTeamCategory", apiTeamCategory);
      localStorage.setItem("oppositeTeamCategory", oppositeTeamCategory);
  }

  var agenturl = "https://bymykel.github.io/CSGO-API/api/en/agents.json";

  //Start of teamHeading heading
  var teamHeading = document.createElement("h1");
  teamHeading.classList.add("teamHeading");
  teamHeading.textContent = apiTeamCategory;
  document.body.append(teamHeading);

  //Start of PlayerSelector Div
  var PlayerSelector = document.createElement("div");
  PlayerSelector.classList.add("PlayerSelector");
  document.body.append(PlayerSelector);

  fetch(agenturl)
    .then((response) => response.json()) // Parse the data as JSON
    .then((data) => {
      let terroristData = data.filter(
        (item) => item.team.name === apiTeamCategory
      );

      let oppTeamAgentData = data.filter(
        (item) => item.team.name === oppositeTeamCategory
      );
      
      oppTeamAgentData.sort(() => Math.random() - 0.5);
      var selectedOppAgents = oppTeamAgentData.slice(0, 4);
      localStorage.setItem("oppTeamAgentData", JSON.stringify(selectedOppAgents));

      // Use a for loop to iterate over the data
      terroristData.forEach((element) => {
        var playerId = element.id;

        var player = document.createElement("div");
        player.classList.add("player");
        PlayerSelector.appendChild(player);

        var img = document.createElement("img");
        img.src = element.image;
        player.appendChild(img);

        var playerName = document.createElement("p");
        playerName.textContent = element.rarity.name;
        player.appendChild(playerName);

        // Add a click event listener to the player div
        player.addEventListener("click", function () {
          var audioClick = new Audio();

          audioClick.src = "../asset/mixkit-classic-click-1117.wav";
          audioClick.play();

          // Decrease volume of ongoing audio (if it exists)
          if (backgroundAudio) {
            backgroundAudio.volume = 0.5; // Adjust volume as needed
          }

          // Store reference to the new audio as ongoing audio
          backgroundAudio = audioClick;
          //   console.log(playerId);

          var randomAgents = [playerId];
          while (randomAgents.length < 4) {
            var randomIndex = Math.floor(Math.random() * terroristData.length);
            var randomAgentId = terroristData[randomIndex].id;

            // Only add the random agent ID if it's not already in the array
            if (!randomAgents.includes(randomAgentId)) {
              randomAgents.push(randomAgentId);
            }
          }

          // Store the IDs of the random agents in local storage
          localStorage.setItem("randomAgentIds", JSON.stringify(randomAgents));

          audioClick.addEventListener("ended", function () {
            window.location.href = "../TeamForm.html";
          });
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error); // Handle any errors
    });
});
