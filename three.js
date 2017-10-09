// Renderer
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
renderer.setClearColor(0xE6E6EE);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Setup
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
var scene = new THREE.Scene();
var light1 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light1);
var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);

// Create the menger sponge
var parent = new THREE.Object3D();
parent.position.set(0, 0, -2000);
scene.add(parent);
var width = 81;
var last = 2;
mengerSponge(-3 * width, -3 * width, 0, width, 1, last);

// Render
requestAnimationFrame(render);

function render() {
  parent.rotation.x = 0.1;
  parent.rotation.y = 0.3;
  parent.rotation.z += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

/**
 * Construct sponge
 * @param x       - starting x position for the sponge
 * @param y       - starting y position for the sponge
 * @param z       - starting z position for the sponge
 * @param width   - width of the sponge to be constructed
 * @param current - current level of recursive depth in constructing the sponge
 * @param last    - last level of recursive depth to be reached
 */
function mengerSponge(x, y, z, width, current, last) {
  // iterate over the x axis
  for (var i = 1; i <= 3; i++) {
    // iterate over the y axis
    for (var j = 1; j <= 3; j++) {
      // iterate over the z axis
      for (var k = 1; k <= 3; k++) {
        // count the number of overlaps between x, y, and z coordinates
        // relative to the middle third of each cube
        var num2 = 0;
        if (i == 2) num2++;
        if (j == 2) num2++;
        if (k == 2) num2++;

        // If there are less than 2 overlaps, then there should be a mengerSponge
        // in the specified area
        if (num2 < 2) {
          // Recurse further if there are more levels
          if (current < last) {
            mengerSponge(
              (x + i * width),
              (y + j * width),
              (z + k * width),
              (width / 3),
              (current + 1),
              last
            );
          } else if (current == last) {
            // Otherwise draw a cube in the specified location
            cube(i, j, k, x, y, z, width);
          }
        }
      }
    }
  }
}

/**
 * Draw a cube of the passed in width in the passed in coordinates
 * @param i     - x index out of 2 of the cubes in the sponge
 * @param j     - y index out of 2 of the cubes in the sponge
 * @param k     - z index out of 2 of the cubes in the sponge
 * @param x     - starting x pixel index of the sponge
 * @param y     - starting y pixel index of the sponge
 * @param z     - starting z pixel index of the sponge
 * @param width - width of the cube to be added
 */
function cube(i, j, k, x, y, z, width) {
  // create a cube of the passed in width
  var geometry = new THREE.BoxGeometry(width, width, width);
  var material = new THREE.MeshPhongMaterial({color: 0xAAAAAA});
  var cube = new THREE.Mesh(geometry, material);

  // Set the position of the cube
  cube.position.set(
    x + ((i + 1) * width),
    y + ((j + 1) * width),
    z + ((k + 1) * width)
  );

  // Add the cube to the screen
  parent.add(cube);
}
