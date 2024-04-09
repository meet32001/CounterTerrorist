function getRandomMultipleOfFive(min, max) {
  min = Math.ceil(min / 5) * 5; // Round min up to nearest multiple of 5
  max = Math.floor(max / 5) * 5; // Round max down to nearest multiple of 5
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  return Math.floor(random / 5) * 5; // Ensure result is a multiple of 5
}

function swtichFunction(categoryName) {
  // Switch case for 6 categories
  switch (categoryName) {
    case "Pistols":
    case "Rifles":
    case "Heavy":
    case "SMGs":
    case "Knives":
    case "Gloves":
      // Create a random number for each weapon of each category
      filteredData.forEach((agent) => {
        let weponprice;
        switch (categoryName) {
          case "Pistols":
            weponprice = getRandomMultipleOfFive(200, 700);
            break;
          case "Rifles":
            weponprice = getRandomMultipleOfFive(1500, 3500);
            break;
          case "Heavy":
            weponprice = getRandomMultipleOfFive(2500, 4500);
            break;
          case "SMGs":
            weponprice = getRandomMultipleOfFive(1000, 1500);
            break;
          case "Knives":
            weponprice = getRandomMultipleOfFive(100, 500);
            break;
          case "Gloves":
            weponprice = getRandomMultipleOfFive(100, 500);
            break;
        }
        agent.price = weponprice;
      });
      break;
    default:
      console.log("Invalid category");
  }
  return agent.price;
}

function clicksound() {
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
}

function displayBalance(weaponCategoryDiv) {
  var weaponbalance = 9000;
  var weaponpara = document.createElement("div");
  weaponpara.style.color = "white";
  weaponpara.style.fontSize = "2rem";
  weaponpara.style.zIndex = "1000";
  weaponpara.classList = "weaponpara";
  weaponpara.textContent = `Balance: ${weaponbalance}`;
  weaponCategoryDiv.appendChild(weaponpara);
  return weaponCategoryDiv;
}

document.addEventListener("DOMContentLoaded", function () {

  var agenturl = "https://bymykel.github.io/CSGO-API/api/en/skins.json";

  // Fetch all agents data
  fetch(agenturl)
    .then((response) => response.json())
    .then((allAgents) => {
      // Create first div
  var weaponCategoryDiv = document.createElement("div");
  weaponCategoryDiv.classList = "weaponDisplayDivs"; // Set an id for the div
  weaponCategoryDiv.id = "weaponCategoryDiv"; // Set an id for the div
  document.body.appendChild(weaponCategoryDiv); // Append the div to the body

  displayBalance(weaponCategoryDiv);

  // Create second div
  var weaponDiv = document.createElement("div");
  weaponDiv.classList = "weaponDisplayDivs"; // Set an id for the div
  weaponDiv.id = "weaponDiv"; // Set an id for the div
  document.body.appendChild(weaponDiv); // Append the div to the body

  var weaponSubcategoryDiv = document.createElement("div");
  weaponSubcategoryDiv.classList = "weaponDisplayDivs";
  weaponSubcategoryDiv.id = "weaponSubcategoryDiv";
  weaponDiv.appendChild(weaponSubcategoryDiv);

  var weaponSubcategoryPatternDiv = document.createElement("div");
  weaponSubcategoryPatternDiv.classList = "weaponDisplayDivs";
  weaponSubcategoryPatternDiv.id = "weaponSubcategoryPatternDiv";
  weaponDiv.appendChild(weaponSubcategoryPatternDiv);

      var processedCategories = new Set();

      var lastClickedButton = null;

      // Handle the selected agents
      allAgents.forEach((agent) => {
        // Check if category is not null
        if (agent.category.name) {
          var categoryName = agent.category.name;

          if (!processedCategories.has(categoryName)) {
            // Create a button for each category
            var button = document.createElement("button");
            button.textContent = categoryName;
            button.className = "weaponCategoryButton";
            // console.log(categoryName);
            button.addEventListener("click", function () {
              var apiTeamCategory = localStorage.getItem("apiTeamCategory");
              //   console.log(apiTeamCategory);

              clicksound();
              if (lastClickedButton) {
                lastClickedButton.classList.remove("active");
              }

              button.classList.add("active");
              lastClickedButton = button;
              // Handle button click
              //   console.log("Clicked: " + categoryName);
              // Fetch data from the API
              fetch(agenturl)
                .then((response) => response.json())
                .then((data) => {
                  var filteredDataCategory = data.filter(
                    (agent) =>
                      agent.category.name === categoryName &&
                      (agent.team.name === apiTeamCategory ||
                        agent.team.name === "Both Teams")
                  );

                  var processedWeapon = new Set();
                  weaponSubcategoryDiv.innerHTML = "";
                  // Log the pattern of each agent in the filtered data
                  filteredDataCategory.forEach((agent) => {
                    if (agent.weapon.name) {
                      var weaponName = agent.weapon.name;

                      if (!processedWeapon.has(weaponName)) {
                        var button = document.createElement("button");
                        button.textContent = weaponName;
                        button.className = "weaponSubCategoryButton";

                        button.addEventListener("click", function () {
                          // console.log(agent.weapon.id);
                          localStorage.setItem("subcategoryId", agent.weapon.id);
                          clicksound();
                          var matchingData = filteredDataCategory.filter(
                            (agent) => agent.weapon.name === this.textContent
                          );

                          weaponSubcategoryPatternDiv.innerHTML = "";

                          matchingData.forEach((data) => {
                            var weaponDetails = document.createElement("div");
                            weaponDetails.classList = "weaponDetails"; // Set a class for the div
                            weaponSubcategoryPatternDiv.appendChild(
                              weaponDetails
                            ); //

                            // Create an img element
                            var img = document.createElement("img");
                            img.src = data.image;
                            weaponDetails.appendChild(img);

                            var p = document.createElement("p");
                            p.textContent = data.name.split(" | ")[1];
                            weaponDetails.appendChild(p);

                            // var price = document.createElement("p");
                            // price.textContent = `Price: $${agent.price}`;
                            // weaponDetails.appendChild(price);

                            weaponDetails.addEventListener("click", function () {
                              clicksound();
                              // localStorage.setItem("patternId", data.id);
                              console.log(data.id);
                            });
                          });
                          // console.log(agent.pattern.name);
                        });

                        // console.log(weaponName);
                        
                        processedWeapon.add(weaponName);
                        weaponSubcategoryDiv.appendChild(button);
                      }
                    }
                  });

                  // var filteredData = filteredData.filter((agent) =>
                  // agent.weapon.name === categoryName &&
                  //     (agent.team.name === apiTeamCategory ||
                  //       agent.team.name === "Both Teams")
                  // );
                })
                .catch((error) => console.error("Error:", error));
            });

            // Append the button to the weaponCategoryDiv
            weaponCategoryDiv.appendChild(button);
            processedCategories.add(categoryName);
          }
        }
      });
    })
    .catch((error) => console.error("Error:", error));
});
