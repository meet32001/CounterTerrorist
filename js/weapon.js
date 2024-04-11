function getRandomMultipleOfFive(min, max) {
  min = Math.ceil(min / 5) * 5; // Round min up to nearest multiple of 5
  max = Math.floor(max / 5) * 5; // Round max down to nearest multiple of 5
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  return Math.floor(random / 5) * 5; // Ensure result is a multiple of 5
}

function swtichFunction(categoryName, matchingData) {
  let price;
  // Switch case for 6 categories
  switch (categoryName) {
    case "Pistols":
    case "Rifles":
    case "Heavy":
    case "SMGs":
    case "Knives":
    case "Gloves":
      // Create a random number for each weapon of each category
      matchingData.forEach((agent) => {
        switch (categoryName) {
          case "Pistols":
            price = getRandomMultipleOfFive(200, 700);
            break;
          case "Rifles":
            price = getRandomMultipleOfFive(1500, 3500);
            break;
          case "Heavy":
            price = getRandomMultipleOfFive(2500, 4500);
            break;
          case "SMGs":
            price = getRandomMultipleOfFive(1000, 1500);
            break;
          case "Knives":
            price = getRandomMultipleOfFive(100, 500);
            break;
          case "Gloves":
            price = getRandomMultipleOfFive(100, 500);
            break;
        }
        agent.price = price;
        // console.log(agent.price);
      });
      break;
    default:
      console.log("Invalid category");
  }
  return price;
}

function displayClickedWeapons(clickedWeapons) {
  console.log(clickedWeapons);
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

      let weaponbalance = 9000;
      var weaponpara = document.createElement("div");
      weaponpara.classList = "weaponpara";
      weaponpara.textContent = `Balance: ${weaponbalance}`;
      weaponCategoryDiv.appendChild(weaponpara);

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
      // Initialize an object to store the weapon IDs by category
      var weaponsByCategory = {};
      var currentTeamWeapon = [];
      var oppositeTeamWeapon = [];

      // Fetch the weapon data from the API
      fetch(agenturl)
        .then((response) => response.json())
        .then((data) => {
          // Group the weapon IDs by category
          data.forEach((weapon) => {
            var category = weapon.category.name;
            if (!weaponsByCategory[category]) {
              weaponsByCategory[category] = [];
            }
            weaponsByCategory[category].push(weapon.id);
          });

          // Initialize seven empty arrays to store the weapon IDs
          let weaponArrays = [[], [], [], [], [], [], [], []];

          // For each array, randomly select a weapon ID from each category
          for (var i = 0; i < 8; i++) {
            for (var category in weaponsByCategory) {
              if (weaponsByCategory[category].length > 0) {
                var randomIndex = Math.floor(
                  Math.random() * weaponsByCategory[category].length
                );
                var selectedWeaponId = weaponsByCategory[category].splice(
                  randomIndex,
                  1
                )[0];
                weaponArrays[i].push(selectedWeaponId);
              }
            }
          }
          // Create a new array that includes all elements from weaponArrays except the first one

          for (var i = 1; i < weaponArrays.length; i++) {
            if (i <= 3) {
              currentTeamWeapon.push(weaponArrays[i]);
            } else {
              oppositeTeamWeapon.push(weaponArrays[i]);
            }
          }
          // console.log(currentTeamWeapon);
          // console.log(oppositeTeamWeapon);
        });

        localStorage.setItem("currentTeamWeapon", JSON.stringify(currentTeamWeapon));
        localStorage.setItem("oppositeTeamWeapon", JSON.stringify(oppositeTeamWeapon));

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
                  weaponSubcategoryPatternDiv.innerHTML = "";

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
                          localStorage.setItem(
                            "subcategoryId",
                            agent.weapon.id
                          );
                          clicksound();
                          var matchingData = filteredDataCategory.filter(
                            (agent) => agent.weapon.name === this.textContent
                          );

                          weaponSubcategoryPatternDiv.innerHTML = "";

                          let clickedWeapons = [];

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

                            let wepaonPrice = swtichFunction(
                              categoryName,
                              matchingData
                            );

                            var price = document.createElement("p");
                            price.textContent = "Price: " + wepaonPrice;
                            weaponDetails.appendChild(price);

                            // Initialize the clickedWeapons array outside the click event handler

                            weaponDetails.addEventListener(
                              "click",
                              function () {
                                console.log(data.id);
                                clicksound();
                                weaponbalance = weaponbalance - wepaonPrice;
                                if (weaponbalance < 0) {
                                  alert("You don't have enough balance");
                                  // weaponbalance = weaponbalance + wepaonPrice;
                                } else {
                                  weaponpara.textContent = `Balance: ${weaponbalance}`;
                                }
                              }
                            );
                          });

                          // console.log(agent.pattern.name);
                        });

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
