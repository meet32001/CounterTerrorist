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
  var agenturl = "../asset/skins.json";

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

      var cartbtn = document.createElement("button");
      cartbtn.classList = "cartbtn";
      cartbtn.textContent = "View Cart";

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

      var viewCartItem = document.createElement("h6");
      viewCartItem.classList = "viewCartItem";
      let viewCartAmount = 0;

      var processedCategories = new Set();

      var lastClickedButton = null;
      // Initialize an object to store the weapon IDs by category
      var weaponsByCategory = {};
      var currentTeamWeapon = [];
      var oppositeTeamWeapon = [];
      var myPlayerWeapon = [];

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
        });

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

            button.addEventListener("click", function () {
              var apiTeamCategory = localStorage.getItem("apiTeamCategory");
              //   console.log(apiTeamCategory);

              clicksound();
              if (lastClickedButton) {
                lastClickedButton.classList.remove("active");
              }

              button.classList.add("active");
              lastClickedButton = button;

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

                          matchingData.forEach((data) => {
                            var weaponDetails = document.createElement("div");
                            weaponDetails.classList = "weaponDetails";
                            weaponSubcategoryPatternDiv.appendChild(
                              weaponDetails
                            );

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

                            weaponDetails.addEventListener(
                              "click",
                              function () {
                                viewCartItem.style.visibility = "visible";
                                viewCartItem.textContent = `${++viewCartAmount}`;
                                myPlayerWeapon.push({
                                  id: data.id,
                                  category: data.category.name,
                                });
                                // console.log(myPlayerWeapon);

                                clicksound();
                                weaponbalance = weaponbalance - wepaonPrice;
                                if (weaponbalance < 0) {
                                  alert("You don't have enough balance");
                                } else {
                                  weaponpara.textContent = `Balance: ${weaponbalance}`;
                                }
                              }
                            );
                          });
                        });
                        processedWeapon.add(weaponName);
                        weaponSubcategoryDiv.appendChild(button);
                      }
                    }
                  });
                })
                .catch((error) => console.error("Error:", error));
            });
            weaponCategoryDiv.appendChild(button);
            weaponCategoryDiv.appendChild(cartbtn);
            weaponCategoryDiv.appendChild(viewCartItem);
            processedCategories.add(categoryName);
          }
        }
      });

      cartbtn.addEventListener("click", function () {
        clicksound();
        // console.log(myPlayerWeapon);

        // Extract the category of each item in myPlayerWeapon
        let categories = myPlayerWeapon.map((item) => item.category);

        // Create a Set from the categories array
        let uniqueCategories = new Set(categories);

        if(uniqueCategories.size === 0){
          alert("Please select at least one weapon.");
        }
        else if (uniqueCategories.size < 6) {
          alert("Please select one weapon from each category.");
        }
        // Check if all categories are unique
        else if(uniqueCategories.size === myPlayerWeapon.length) {
          localStorage.setItem("myPlayerWeapon", JSON.stringify(myPlayerWeapon));
          localStorage.setItem("currentTeamWeapon",JSON.stringify(currentTeamWeapon));
          localStorage.setItem("oppositeTeamWeapon",JSON.stringify(oppositeTeamWeapon));
          window.location.href = "cart.html";
          // console.log("All items have unique categories.");
        } else {
          myPlayerWeapon=[];
          alert("Please select only one weapon from each category.");
        }
      });
    })
    .catch((error) => console.error("Error:", error));
});
