document.addEventListener("DOMContentLoaded", function () {
  var backgroundAudio = document.createElement("audio");
  backgroundAudio.setAttribute("autoplay", "");
  backgroundAudio.setAttribute("id", "backgroundAudio");
  backgroundAudio.loop = true;

  var source = document.createElement("source");
  source.setAttribute(
    "src",
    "../asset/02 Counter-Strike - Global Offensive Theme 2.mp3"
  );
  backgroundAudio.appendChild(source);
  document.body.appendChild(backgroundAudio);

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
  
  Weaponsbtn.addEventListener("click", function (event) {
    handleClickEvent(true);
  });
  var nameurl = "https://randomuser.me/api/";
  var agenturl = "https://bymykel.github.io/CSGO-API/api/en/agents.json";

  //   fetch(nameurl)
  //     .then((response) => response.json()) // Parse the data as JSON
  //     .then((data) => {
  //       console.log(data); // Do something with the data
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error); // Handle any errors
  //     });

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
        agentName.textContent = "Name ";
        agentDescription.textContent = "Description " + agent.description;
        agentRarity.textContent = "Rarity " + agent.rarity.name;
        selectedplayerDetails.appendChild(img);
        selectedplayerDetails.appendChild(agentName);
        selectedplayerDetails.appendChild(agentRarity);
        selectedplayerDetails.appendChild(agentDescription);
      });

      // Get the other agent IDs from local storage
      var otherAgentIds = agentIds.slice(1);

      // Filter the agents based on the other agent IDs from local storage
      var otherAgents = allAgents.filter((agent) =>
        otherAgentIds.includes(agent.id)
      );

      otherAgents.forEach((agent) => {
        var randomPlayer = document.createElement("div");
        randomPlayer.classList.add("randomPlayer");
        randomplayersDiv.append(randomPlayer);

        var img1 = document.createElement("img");
        img1.src = agent.image;
        randomPlayer.appendChild(img1);

        var agentName = document.createElement("p");
        agentName.textContent = "Name " + agent.name;
        randomPlayer.appendChild(agentName);

        var agentRarity = document.createElement("p");
        agentRarity.textContent = "Rarity " + agent.rarity.name;
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
      if (isTeamName) {
        teamNameHeading.textContent = "Team: " + agentUsernameInput.value;
      } else {
        agentName.textContent = "Name: " + agentUsernameInput.value; 
      }
      handleClickEvent();
    });

    inputDiv.appendChild(agentUsernameLabel);
    inputDiv.appendChild(agentUsernameInput);
    inputDiv.appendChild(submitButton);
  }
});

function handleClickEvent(isweapon = false) {
  var audioClick = new Audio();
  audioClick.src = "../asset/mixkit-classic-click-1117.wav";
  audioClick.play();

  // Decrease volume of ongoing audio (if it exists)
  if (backgroundAudio) {
    backgroundAudio.volume = 0.5; // Adjust volume as needed
  }

  // Store reference to the new audio as ongoing audio
  backgroundAudio = audioClick;

  if (isweapon) {
    audioClick.addEventListener("ended", function () {
      // window.location.href = "../TeamForm.html";
    });
  }
}
