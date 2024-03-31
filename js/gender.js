document.addEventListener("DOMContentLoaded", function () {
  // Dynamically load GLTFLoader.js script
  const gltfLoaderScript = document.createElement("script");
  gltfLoaderScript.src =
    "https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js";

  var p = document.createElement("p");
  p.textContent = "hello";
  document.body.append(p);

  var audio = document.createElement("audio");
  audio.setAttribute("autoplay", "");
  audio.loop = true;

  var source = document.createElement("source");
  source.setAttribute(
    "src",
    "../asset/02 Counter-Strike - Global Offensive Theme 2.mp3"
  );
  audio.appendChild(source);
  document.body.appendChild(audio);

  // Wait for the GLTFLoader.js script to load before using the THREE.GLTFLoader class
  gltfLoaderScript.addEventListener("load", function () {
    // Load the Three.js library
    const threeScript = document.createElement("script");
    threeScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js 76";
    document.head.appendChild(threeScript);

    threeScript.addEventListener("load", function () {
      // Create the scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // Load the 3D model
      const loader = new THREE.GLTFLoader();
      loader.load(
        "../asset/cs2_terrorist.glb",
        (gltf) => {
          const model = gltf.scene;
          scene.add(model);

          // Add the cube to the scene
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
          const cube = new THREE.Mesh(geometry, material);
          scene.add(cube);

          camera.position.z = 5;

          function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
          }
          animate();
        },
        undefined,
        (error) => {
          console.error("Error loading 3D model", error);
        }
      );
    });
  });

  document.head.appendChild(gltfLoaderScript);
});
