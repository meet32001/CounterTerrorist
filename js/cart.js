function handleMouseOver(image, text, matchingSkin) {
  text.textContent = matchingSkin.name;
  text.style.color = "white"; // Hide the image on mouseover
  image.style.display = "none"; // Show the text on mouseover
}

// function handleMouseOut(image,text,matchingSkin) {
//   image.style.backgroundImage = 'url(path/to/your/image.jpg)'; // Show the image again on mouseout
//   text.style.display = 'none'; // Hide the text on mouseout
// }

document.addEventListener("DOMContentLoaded", function () {
  let apiTeamCategory = localStorage.getItem("apiTeamCategory");
  let myPlayerWeapon = JSON.parse(localStorage.getItem("myPlayerWeapon"));
  let currentTeamWeapon = JSON.parse(localStorage.getItem("currentTeamWeapon"));
  let agentName = localStorage.getItem("agentName");
  // console.log(agentName);

  const cartDiv = document.createElement("div");
  cartDiv.setAttribute("class", "cartDiv");
  document.body.append(cartDiv);

  const headingDiv = document.createElement("div");
  headingDiv.setAttribute("class", "headingDiv");
  headingDiv.textContent = apiTeamCategory;
  cartDiv.append(headingDiv);

  const otherTeambtn = document.createElement("button");
  otherTeambtn.classList = "otherTeambtn";
  otherTeambtn.innerHTML = "Other Team";
  headingDiv.appendChild(otherTeambtn);

  otherTeambtn.addEventListener("click", function () {
    // Create new audio element
    var audioClick = new Audio();

    audioClick.src = "../asset/mixkit-classic-click-1117.wav";
    audioClick.play();

    // Decrease volume of ongoing audio (if it exists)
    if (backgroundAudio) {
      backgroundAudio.volume = 0.5; // Adjust volume as needed
    }

    // Store reference to the new audio as ongoing audio
    backgroundAudio = audioClick;
    audioClick.addEventListener("ended", function () {
      window.location.href = "../otherTeamCart.html";
    });
  });

  var agenturl = "../asset/agents.json";
  var skinurl = "../asset/skins.json";

  var agentIds = JSON.parse(localStorage.getItem("randomAgentIds"));

  fetch(agenturl)
    .then((response) => response.json())
    .then((allAgents) => {
      // Loop through agentIds array starting from index 1
      for (let i = 0; i <= agentIds.length; i++) {
        var selectedAgents = allAgents.filter(
          (agent) => agentIds[i] && agentIds[i].includes(agent.id)
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
          let xx = [];
          myPlayerWeapon.forEach((item, index) => {
            let matchingSkin = allSkins.find((skin) => skin.id === item.id);
            xx.push(matchingSkin);

            if (matchingSkin) {
              let img = document.createElement("img");
              img.src = matchingSkin.image;

              // let z = xx.find((x) => x.id === img.id);

              // img.addEventListener("mouseover", function () {
              //   img.style.display = "none";
              //   p.style.display = "block";
              //   p.textContent = z.name;

              //   console.log(z.name);
              // });

              // img.addEventListener('mouseout', function(){
              //   p.style.display = 'none';

              // });

              // };

              let playerWeaponDiv = document
                .getElementById(`wholePlayerDivId0`)
                .querySelector(".playerWeaponDiv");
              playerWeaponDiv.appendChild(img);
            }
          });
          // console.log(xx);
        })
        .catch((error) => console.error("Error:", error));

      fetch(skinurl)
        .then((response) => response.json())
        .then((allSkins) => {
          currentTeamWeapon.forEach((item, index) => {
            let imgIndex = 0;
            for (let key in item) {
              let matchingSkin = allSkins.find((skin) => skin.id === item[key]);
              if (matchingSkin) {
                let img1 = document.createElement("img");
                img1.src = matchingSkin.image;
                // console.log(matchingSkin);
                img1.id = matchingSkin.id;
                let playerWeaponDiv = document
                  .getElementById(`wholePlayerDivId${index + 1}`)
                  .querySelector(".playerWeaponDiv");
                playerWeaponDiv.appendChild(img1);
                if (playerWeaponDiv) {
                  playerWeaponDiv.appendChild(img1);
                }
              }
            }
            // img1.id = `img${index + 1}`;
          });
        })
        .catch((error) => console.error("Error:", error));
    })
    .catch((error) => console.error("Error:", error));
});
