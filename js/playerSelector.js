document.addEventListener("DOMContentLoaded", function () {
  var clickedDivId = localStorage.getItem("clickedDivId");

  let apiTeamCategory;

  switch (clickedDivId) {
    case "autobtn":
      const random = localStorage.getItem("random");
      apiTeamCategory = random == 0 ? "Counter-Terrorist" : "Terrorist";
      localStorage.setItem("apiTeamCategory", apiTeamCategory);
      break;
    case "ctModel":
      apiTeamCategory = "Counter-Terrorist";
      localStorage.setItem("apiTeamCategory",apiTeamCategory);
      break;
    default:
      apiTeamCategory = "Terrorist";
      localStorage.setItem("apiTeamCategory",apiTeamCategory);
  }

  // Replace 'en' with the desired language
  var nameurl = "https://randomuser.me/api/";
  var agenturl = "https://bymykel.github.io/CSGO-API/api/en/agents.json";

  //Start of teamHeading heading
  var teamHeading = document.createElement("h1");
  teamHeading.classList.add("teamHeading");
  teamHeading.textContent=apiTeamCategory;
  document.body.append(teamHeading);

  //Start of PlayerSelector Div
  var PlayerSelector = document.createElement("div");
  PlayerSelector.classList.add("PlayerSelector");
  document.body.append(PlayerSelector);

  fetch(nameurl)
    .then((response) => response.json()) // Parse the data as JSON
    .then((data) => {
      console.log(data); // Do something with the data
    })
    .catch((error) => {
      console.error("Error:", error); // Handle any errors
    });

  fetch(agenturl)
    .then((response) => response.json()) // Parse the data as JSON
    .then((data) => {
      let terroristData = data.filter(
        (item) => item.team.name === apiTeamCategory
      );

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
