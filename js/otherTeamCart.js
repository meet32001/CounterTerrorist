document.addEventListener("DOMContentLoaded", function () {
    let oppositeTeamCategory = localStorage.getItem("oppositeTeamCategory");
    let oppositeTeamWeapon = JSON.parse(localStorage.getItem("oppositeTeamWeapon"));
    // console.log(oppositeTeamWeapon);
    let oppTeamAgentData = JSON.parse(localStorage.getItem("oppTeamAgentData"));
    // console.log(oppTeamAgentData[0]);
    
    const cartDiv = document.createElement("div");
    cartDiv.setAttribute("class", "cartDiv");
    document.body.append(cartDiv);
  
    const headingDiv = document.createElement("div");
    headingDiv.setAttribute("class", "headingDiv");
    headingDiv.textContent = oppositeTeamCategory;
    cartDiv.append(headingDiv);

    var agenturl = "../asset/agents.json";
    var skinurl = "../asset/skins.json";

    fetch(agenturl)
      .then((response) => response.json())
      .then((allAgents) => {
        // Loop through agentIds array starting from index 1
        for (let i = 0; i < oppTeamAgentData.length; i++) {
          var selectedAgents = allAgents.filter(
            (agent) => agent.id === oppTeamAgentData[i].id
          );
  
          selectedAgents.forEach((agent) => {
            const wholePlayerDiv = document.createElement("div");
            wholePlayerDiv.classList = "wholePlayerDiv";
            wholePlayerDiv.id = `wholePlayerDivId${i}`;
            cartDiv.append(wholePlayerDiv);
  
            const playerAgentDiv = document.createElement("div");
            playerAgentDiv.classList = "playerAgentDiv";
            wholePlayerDiv.append(playerAgentDiv);
  
            let img = document.createElement("img");
            img.src = agent.image;
            playerAgentDiv.appendChild(img);
  
            const playerWeaponDiv = document.createElement("div");
            playerWeaponDiv.classList = "playerWeaponDiv";
            wholePlayerDiv.append(playerWeaponDiv);
          });
        }

        fetch(skinurl)
          .then((response) => response.json())
          .then((allSkins) => {
            oppositeTeamWeapon.forEach((item, index) => {
              for (let key in item) {
                let matchingSkin = allSkins.find((skin) => skin.id === item[key]);
  
                if (matchingSkin) {
                  let img = document.createElement("img");
                  img.src = matchingSkin.image;
                  let playerWeaponDiv = document
                    .getElementById(`wholePlayerDivId${index}`)
                    .querySelector(".playerWeaponDiv");
                  playerWeaponDiv.appendChild(img);
                  if (playerWeaponDiv) {
                    playerWeaponDiv.appendChild(img);
                  }
                }
              }
            });
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => console.error("Error:", error));
  });
  