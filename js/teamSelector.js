document.addEventListener("DOMContentLoaded", function () {
  // Create audio element
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

  // Create div element
  var div = document.createElement("div");
  document.body.append(div);

  // Function to create a 3D model container
  function create3DModelContainer(imageSrc, altText, text) {
    // Create container div
    var container = document.createElement("div");
    container.classList.add("teamDiv");

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

  // Create the main container
  var modelDiv = document.createElement("div");
  modelDiv.classList.add("teamSelectorDiv");

  // Create the first 3D model container
  var ctModelContainer = create3DModelContainer(
    "asset/anti-terrorism-day-background-stop-the-war-with-counter-terrorism-team-generative-ai-photo.jpeg",
    "Counter Terrorist 3d Model",
    "Counter Terrorist"
  );

  // Create the second 3D model container
  var tModelContainer = create3DModelContainer(
    "asset/istockphoto-924055190-612x612.jpg",
    "Terrorist 3d Model",
    "Terrorist"
  );

  // Append both model containers to the main container
  modelDiv.appendChild(ctModelContainer);
  ctModelContainer.setAttribute("id", "ctModel");
  modelDiv.appendChild(tModelContainer);

  // Append the main container to the document body
  document.body.appendChild(modelDiv);

  //Start of Auto button
  var autobtn = document.createElement("button");
  autobtn.classList.add("autobtn");
  autobtn.textContent = "Auto Select";
  modelDiv.append(autobtn);

  // Add event listener to the autobtn
  autobtn.addEventListener("click", function () {
    // Generate a random number (0 or 1)
    var random = Math.floor(Math.random() * 2);

    // If the random number is 0, select the Counter-Terrorist model
    // Otherwise, select the Terrorist model
    if (random === 0) {
      ctModelContainer.classList.add("selected");
      tModelContainer.classList.remove("selected");
    } else {
      tModelContainer.classList.add("selected");
      ctModelContainer.classList.remove("selected");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Preload the click sound
  var clickSound = new Audio();
  clickSound.src = "../asset/mixkit-classic-click-1117.wav";

  // Add event listener to all elements with the class "teamDiv" and "autobtn"
  var clickableElements = document.querySelectorAll(".teamDiv, .autobtn");
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
      audioClick.addEventListener('ended', function () {
        window.location.href = "../PlayerSelector.html";
      });
    });
  });
});
