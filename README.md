# Menger Sponge Implementation

[Three.js](https://threejs.org) implementation of the Menger Sponge. I set the program to recurse over 3 levels, essentially, by setting:
```javascript
var last = 2;
```
Higher levels of `last` work, although cause the browser to lag. If you wish, you could download the files and alter the value of `last` to observe said sponge.

### Structure
* `index.html`
  * Basic HTML file for browser configuration and to make way for the canvas.
* `README.md`
  * Document to explain the application
* `style.css`
  * Basic styling
* `three.js`
  * Implementation of the Menger Sponge
    * Basic setup for the 3D environment
    * `render()`
      * Function to render the sponge as it rotates
    *  `mengerSponge(x, y, z, width, current, last)`
      * Recursive helper function to draw a sponge with the passed in parameters
    *  `cube(i, j, k, x, y, z, width)`
      * Helper function to draw a cube component of a sponge with the passed in parameters
