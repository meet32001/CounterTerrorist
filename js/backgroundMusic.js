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
});