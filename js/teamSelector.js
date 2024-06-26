 // Function to create a 3D model container
 function create3DModelContainer(imageSrc, altText, text,containerId) {
  // Create container div
  var container = document.createElement("div");
  container.classList.add("teamDiv");
  container.setAttribute("id", containerId);

  // Create image element
  var image = document.createElement("img");
  image.src = imageSrc;
  image.alt = altText;

  // Create text element
  var paragraph = document.createElement("p");
  paragraph.classList.add("teamDivText");
  paragraph.textContent = text;

  // Append image and text to the container
  container.appendChild(image);
  container.appendChild(paragraph);

  return container;
}

document.addEventListener("DOMContentLoaded", function () {
  // Create div element
  var div = document.createElement("div");
  document.body.append(div);

  // Create the main container
  var modelDiv = document.createElement("div");
  modelDiv.classList.add("teamSelectorDiv");

  // Create the first 3D model container
  var ctModelContainer = create3DModelContainer(
    "asset/anti-terrorism-day-background-stop-the-war-with-counter-terrorism-team-generative-ai-photo.jpeg",
    "Counter Terrorist 3d Model",
    "Counter Terrorist",
    "ctModel"
  );

  // Create the second 3D model container
  var tModelContainer = create3DModelContainer(
    "asset/istockphoto-924055190-612x612.jpg",
    "Terrorist 3d Model",
    "Terrorist",
    "tModel"
  );

  // Append both model containers to the main container
  modelDiv.appendChild(ctModelContainer);
  modelDiv.appendChild(tModelContainer);

  // Append the main container to the document body
  document.body.appendChild(modelDiv);

  //Start of Auto button
  var autobtn = document.createElement("button");
  autobtn.setAttribute("id", "autobtn");
  autobtn.textContent = "Auto Select";
  modelDiv.append(autobtn);
});

document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to all elements with the class "teamDiv" and "autobtn"
  var clickableElements = document.querySelectorAll(".teamDiv, #autobtn");
  clickableElements.forEach(function (element) {
    element.addEventListener("click", function () {
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
      localStorage.setItem("clickedDivId", this.id);

       // Retrieve the id from localStorage
       var clickedDivId = localStorage.getItem("clickedDivId");

       // Select the element with that id
       var clickedElement = document.getElementById(clickedDivId);

       // Add the class to the selected element
       if (clickedElement.id === "autobtn") {
         var random = Math.floor(Math.random() * 2);
        //  console.log(random);
         localStorage.setItem("random", random);
       }
       else {
         clickedElement.classList.add("selected");
        //  console.log(clickedElement);
       }

      audioClick.addEventListener("ended", function () {
       
        window.location.href = "../PlayerSelector.html";
      });
    });
  });
});
