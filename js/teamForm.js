document.addEventListener("DOMContentLoaded", function () {
  let playerName = false;
  let TeamName = false;
  //Start of selectedplayerDetails Div
  var selectedplayerDetails = document.createElement("div");
  selectedplayerDetails.classList.add("selectedplayerDetails");
  document.body.append(selectedplayerDetails);

  var img = document.createElement("img");
  var agentName = document.createElement("p");
  var agentDescription = document.createElement("p");
  var agentRarity = document.createElement("p");

  //Start of selectedplayerNameDiv Div
  var selectedplayerNameDiv = document.createElement("div");
  selectedplayerNameDiv.classList.add("selectedplayerNameDiv");
  document.body.append(selectedplayerNameDiv);
  UserInput(
    ".selectedplayerNameDiv",
    "Agent name:",
    "agentUsername",
    "Enter your agent name"
  );

  //Start of selectedplayerNameDiv Div
  var randomplayersDiv = document.createElement("div");
  randomplayersDiv.classList.add("randomplayersDiv");
  document.body.append(randomplayersDiv);

  teamNameHeading = document.createElement("h1");
  teamNameHeading.setAttribute("id", "teamNameHeading");
  teamNameHeading.textContent = "Team: ";
  randomplayersDiv.prepend(teamNameHeading);

  var teamNameDiv = document.createElement("div");
  teamNameDiv.classList.add("teamNameDiv");
  document.body.append(teamNameDiv);
  UserInput(
    ".teamNameDiv",
    "Team name:",
    "teamName",
    "Enter your team name",
    true
  );

  var Weaponsbtn = document.createElement("button");
  Weaponsbtn.textContent = "Choose Weapons";
  Weaponsbtn.setAttribute("id", "Weaponsbtn");
  document.body.append(Weaponsbtn);

  // var nameurl = "https://randomuser.me/api/";
  var agenturl = "https://bymykel.github.io/CSGO-API/api/en/agents.json";

  // Get the agent IDs from local storage
  var agentIds = JSON.parse(localStorage.getItem("randomAgentIds"));
  // console.log(agentIds);

  // Fetch all agents data
  fetch(agenturl)
    .then((response) => response.json())
    .then((allAgents) => {
      // Filter the agents based on the IDs from local storage
      var selectedAgents = allAgents.filter((agent) =>
        agentIds[0].includes(agent.id)
      );

      // Handle the selected agents
      selectedAgents.forEach((agent) => {
        img.src = agent.image;
        agentName.textContent = "Name: ";
        agentDescription.textContent =
          "Description: " +
          agent.description.substring(
            0,
            Math.floor(agent.description.length / 2)
          );
        agentDescription.style.textAlign = "justify";
        agentRarity.textContent = "Rarity: " + agent.rarity.name;
        selectedplayerDetails.appendChild(img);
        selectedplayerDetails.appendChild(agentName);
        selectedplayerDetails.appendChild(agentRarity);
        selectedplayerDetails.appendChild(agentDescription);
      });

      // Get the other agent IDs from local storage
      var otherAgentIds = agentIds.slice(1);
      // console.log(otherAgentIds);

      // Filter the agents based on the other agent IDs from local storage
      var otherAgents = allAgents.filter((agent) =>
        otherAgentIds.includes(agent.id)
      );

      otherAgents.forEach((agent, index) => {
        var randomPlayer = document.createElement("div");
        randomPlayer.classList.add("randomPlayer");
        randomplayersDiv.append(randomPlayer);

        var img1 = document.createElement("img");
        img1.src = agent.image;
        randomPlayer.appendChild(img1);

        var agentName = document.createElement("p");
        agentName.textContent = agent.name;
        randomPlayer.appendChild(agentName);

        var agentRarity = document.createElement("p");
        agentRarity.textContent = agent.rarity.name;
        randomPlayer.appendChild(agentRarity);
      });
    })
    .catch((error) => console.error("Error:", error));

  function UserInput(
    divName,
    labelDetails,
    inputName,
    inputPlaceholder,
    isTeamName = false
  ) {
    var inputDiv = document.querySelector(divName);
    // console.log(inputDiv);

    var agentUsernameLabel = document.createElement("label");
    agentUsernameLabel.setAttribute("for", "agentUsername");
    agentUsernameLabel.textContent = labelDetails;

    var agentUsernameInput = document.createElement("input");
    agentUsernameInput.setAttribute("type", "text");
    agentUsernameInput.setAttribute("id", inputName);
    agentUsernameInput.setAttribute("name", inputName);
    agentUsernameInput.setAttribute("placeholder", inputPlaceholder);

    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("id", "submitButton");

    submitButton.addEventListener("click", function (event) {
      handleClickEvent(false, isTeamName, agentUsernameInput);
    });

    inputDiv.appendChild(agentUsernameLabel);
    inputDiv.appendChild(agentUsernameInput);
    inputDiv.appendChild(submitButton);
  }

  function handleClickEvent(isweapon = false, isTeamName, agentUsernameInput) {
    clickSound();
    const value = agentUsernameInput.value.trim();
    const words = value.split(" ");

    if (value === "") {
      alert("Please enter a value.");
      return false; // Return false if the input is empty
    } else if (words.length > 2) {
      alert("Please enter only two words.");
      return false; // Return false if there are more than two words
    } else {
      if (isTeamName) {
        playerName = true;
        teamNameHeading.textContent = `Team: ${value}`;
        localStorage.setItem("teamName", value);
      } else {
        TeamName = true;
        agentName.textContent = `Name: ${value}`;
        localStorage.setItem("agentName", value);
      }
      return true; // Return true if the input is valid
    }
  }

  Weaponsbtn.addEventListener("click", function (event) {
    clickSound();
    if (playerName && TeamName) {
      window.location.href = "../weapon.html";
    } else {
      alert("Please enter a value.");
    }
  });

  function clickSound() {
    var audioClick = new Audio();
    audioClick.src = "../asset/mixkit-classic-click-1117.wav";
    audioClick.play();

    // Decrease volume of ongoing audio (if it exists)
    if (backgroundAudio) {
      backgroundAudio.volume = 0.5; // Adjust volume as needed
    }

    // Store reference to the new audio as ongoing audio
    backgroundAudio = audioClick;
  }
});
