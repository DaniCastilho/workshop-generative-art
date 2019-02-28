const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palletes = require('nice-color-palettes');


// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const settings = {
  dimensions: [512,512],
  fps: 25,
  duration:4,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true },
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('#f3f3f3', 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();
  camera.position.set(2, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // // Setup camera controller
  // const controls = new THREE.OrbitControls(camera);

  // Setup your scene
  const scene = new THREE.Scene();
  const box =     new THREE.BoxGeometry(1, 1, 1)
  const pallete = random.pick(palletes)
for (let i = 0; i < 40; i++) {
  const mesh = new THREE.Mesh(
    box,
    new THREE.MeshStandardMaterial({
      color: random.pick(pallete)
    })
  );

  mesh.position.set(
    random.range(-1,1),  
    random.range(-1,1) , 
    random.range(-1,1)  
  );
  mesh.scale.set(
    random.range(-1,1),  
    random.range(-1,1) , 
    random.range(-1,1)  
  )
  mesh.scale.multiplyScalar(0.5);
  scene.add(mesh);
  
}
  scene.add(new THREE.AmbientLight('hsl(360, 0%, 55%)'));
  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(2,2,4)
  scene.add(light)

  // // Specify an ambient/unlit colour
  // scene.add(new THREE.AmbientLight('#59314f'));

  // // Add some light
  // const light = new THREE.PointLight('#45caf7', 1, 15.5);
  // light.position.set(2, 2, -4).multiplyScalar(1.5);
  // scene.add(light);

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      // ...
      
      const aspect = viewportWidth / viewportHeight;
      
      // Ortho zoom
      const zoom = 2;
      
      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;
      
      // Near/Far
      camera.near = -100;
      camera.far = 100;
      
      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());
      
      // Update the camera

      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render ({ playhead }) {
      scene.rotation.y = playhead * Math.PI * 2;
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload () {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
