// Grab DOM elements:
const movementDisplay = document.querySelector('#movement');
const game = document.querySelector('#game');

// Syncing up the canvas's internal height and width to its apparent height and width:
const computedStyle = getComputedStyle(game);
const height = computedStyle.height;
const width = computedStyle.width;
game.height = parseInt(height);
game.width = parseInt(width);

// Grab a context and use it to draw:
const ctx = game.getContext('2d');
ctx.fillStyle = 'white';
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;
ctx.fillRect(10, 10, 100, 100);
ctx.strokeRect(10, 10, 100, 100);