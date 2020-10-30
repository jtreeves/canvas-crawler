// Grab DOM elements:
const movementDisplay = document.querySelector('#movement');
const game = document.querySelector('#game');

// Syncing up the canvas's internal height and width to its apparent height and width:
const computedStyle = getComputedStyle(game);
const height = computedStyle.height;
const width = computedStyle.width;
game.height = parseInt(height);
game.width = parseInt(width);

// Grab a context and set its properties:
const ctx = game.getContext('2d');
ctx.fillStyle = 'white';
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;

// SUPERANNUATED ELEMENTS:
// Draw a rectangle:
// ctx.fillRect(10, 10, 100, 100);
// ctx.strokeRect(10, 10, 100, 100);
// function drawBox(x, y, size, color) {
//     ctx.fillStyle = color;
//     ctx.fillRect(x, y, size, size);
// }
// document.getElementById('status').addEventListener('click', function() {
//     drawBox(200, 200, 50, 'green');
//     drawBox(300, 300, 50, 'pink');
// });
// const ogre = {
//     x: 10,
//     y: 10,
//     color: "#BADA55",
//     width: 40,
//     height: 80,
//     alive: true,
//     render: function () {
//       ctx.fillStyle = this.color
//       ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }
// const hero = {
//     x: 0,
//     y: 0,
//     color: "hotpink",
//     width: 20,
//     height: 20,
//     alive: true,
//     render: function () {
//       ctx.fillStyle = this.color
//       ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }

// Create factory function for characters:
class Crawler {
    constructor(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;
    };
    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};

// Instantiate key characters using factory function:
const ogre = new Crawler(10, 10, '#BADA55', 40, 80);
const hero = new Crawler(150, 150, 'hotpink', 20, 20);

// Add event listener to render key characters at start:
document.getElementById('status').addEventListener('click', function() {
        hero.render();
        ogre.render();
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'w') {
        hero.y -= 10;
    } else if (event.key === 'a') {
        hero.x -= 10;
    } else if (event.key === 's') {
        hero.y += 10;
    } else if (event.key === 'd') {
        hero.x += 10;
    };
    // Alternative to console.log, allows us to view the hero's movement in the upper-right box on the app's page, which is our cheat area:
    movementDisplay.textContent = `X: ${hero.x}, Y: ${hero.y}`;
});

// Detect collision:
function detectHit() {
    // Hit comes from the right:
    if (hero.x < ogre.x + ogre.width
        && hero.x + hero.width > ogre.x
        && hero.y < ogre.y + ogre.height
        && hero.y + hero.height > ogre.y) {
        ogre.alive = false;
    }
}

// Create animation: 
function rePaint() {
     // Clear off the entire canvas:
    ctx.clearRect(0, 0, game.width, game.height);
     // Re-render the hero and ogre:
    hero.render();
    // Ensure ogre only appears if it's alive (so it will disappear when dead):
    if (ogre.alive) {
        ogre.render();
    }
    detectHit();
}

// Ensure animations runs periodically, and quickly enough so as to appear smooth to the user:
setInterval(rePaint, 100);