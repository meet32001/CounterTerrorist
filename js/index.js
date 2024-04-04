document.addEventListener("DOMContentLoaded", function () {
  var StartPageDiv = document.createElement("div");
  StartPageDiv.setAttribute("class", "StartPageDiv");
  document.body.append(StartPageDiv);

  // Create audio element
  var audio = document.createElement("audio");
  // audio.setAttribute("controls", "");
  audio.setAttribute("autoplay", "");

  // Create source element
  var source = document.createElement("source");
  source.setAttribute("src", "../asset/epic-hybrid-logo-157092.mp3");

  // Append source to audio
  audio.appendChild(source);

  // Append audio to body
  StartPageDiv.appendChild(audio);

  // Create h1 element
  var h1 = document.createElement("h1");
  h1.textContent = "Bullet Wave";
  h1.style.visibility = "hidden";

  // Append h1 to body
  StartPageDiv.appendChild(h1);

  // Create a element
  var a = document.createElement("a");
  a.setAttribute("class", "button");
  a.setAttribute("href", "#");
  a.textContent = "Start game";

  // Append a to body
  StartPageDiv.appendChild(a);

  var loadingBar = document.createElement("div");
  loadingBar.setAttribute("class", "loading-bar");
  // Initially hide the loading bar
  loadingBar.style.visibility = "hidden";
  StartPageDiv.appendChild(loadingBar);

  setTimeout(function () {
    h1.style.visibility = "visible";
    h1.classList.add("animated");
  }, 6000);

  a.addEventListener("click", function () {
    loadingBar.style.visibility = "visible";
    // Start the loading animation
    loadingBar.classList.add("loading");
    // Simulate a loading process for at least 3 seconds
    setTimeout(function () {
      // Additional functionality here (e.g., starting the game or loading resources)
      loadingBar.style.visibility = "hidden"; // Hide the loading bar after loading
      loadingBar.classList.remove("loading"); // Remove loading animation
      window.location.href = "TeamSelector.html";
    }, 3000); // 3000 milliseconds = 3 seconds
  });
});
