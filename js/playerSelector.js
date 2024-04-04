// document.addEventListener("DOMContentLoaded", function () {
//   // Replace 'en' with the desired language
//   var nameurl = "https://randomuser.me/api/";
//   var agenturl = "https://bymykel.github.io/CSGO-API/api/en/agents.json";

//   //Start of PlayerSelector Div
//   var PlayerSelector = document.createElement("div");
//   PlayerSelector.classList.add("PlayerSelector");
//   document.body.append(PlayerSelector);

//   // fetch(nameurl)
//   //   .then((response) => response.json()) // Parse the data as JSON
//   //   .then((data) => {
//   //     console.log(data); // Do something with the data
//   //   })
//   //   .catch((error) => {
//   //     console.error("Error:", error); // Handle any errors
//   //   });

//   fetch(agenturl)
//     .then((response) => response.json()) // Parse the data as JSON
//     .then((data) => {
//       // Use a for loop to iterate over the data
//       for (let i = 0; i < data.length; i++) {
//         // Log some properties of each item
//         console.log(`Id: ${data[i].id}`);
//         console.log(`Image: ${data[i].image}`);
//         console.log(`Name: ${data[i].name}`);
//         console.log(`Team: ${data[i].team.id}`);
//         console.log(`Description: ${data[i].description}`);

//         var player = document.createElement("div");
//         player.classList.add("player");
//         PlayerSelector.appendChild(player);
        
//         // Create an img element and set its src attribute to the image URL
//         var img = document.createElement("img");
//         img.src = data[i].image;

//         // Append the img element to the body
//         player.appendChild(img);
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error); // Handle any errors
//     });

// });
