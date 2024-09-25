const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the starting point
const startX = canvas.width / 2;
const startY = canvas.height - 50; // Top point of the V (flipped)
const bottomY = 100; // Bottom point of the V (flipped)
const initialWidth = 200; // Initial width of the V

// Animation parameters
let animationProgress = 0; // Progress of the animation (0 to 1)
const duration = 2000; // Duration of the animation in milliseconds
const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Easing function

// Draw the initial V shape
function drawVShape(currentY, currentWidth) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Set line weight
  ctx.lineWidth = 5; // Adjust the weight as needed

  // Draw the blue V
  ctx.strokeStyle = 'blue';
  ctx.beginPath();
  ctx.moveTo(startX, currentY);
  ctx.lineTo(startX - currentWidth, bottomY);
  ctx.moveTo(startX, currentY);
  ctx.lineTo(startX + currentWidth, bottomY);
  ctx.stroke(); // Render the blue lines

  // Draw the dark blue V
  ctx.strokeStyle = 'darkblue';
  ctx.beginPath();
  ctx.moveTo(startX, currentY);
  ctx.lineTo(startX - currentWidth, bottomY);
  ctx.moveTo(startX, currentY);
  ctx.lineTo(startX + currentWidth, bottomY);
  ctx.stroke(); // Render the dark blue lines

  // Draw the black V
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(startX, currentY);
  ctx.lineTo(startX - currentWidth, bottomY);
  ctx.moveTo(startX, currentY);
  ctx.lineTo(startX + currentWidth, bottomY);
  ctx.stroke(); // Render the black lines
}

// Animation loop
function animate() {
  const t = Math.min(animationProgress / 1, 1); // Clamp t between 0 and 1
  const easedT = easeInOutQuad(t);

  // Adjust the amount the V goes down (e.g., 50px)
  const maxDrop = 240; // Maximum drop in pixels
  const currentY = startY + (maxDrop * easedT); // Move down by maxDrop px at max
  const currentWidth = initialWidth * (1 + 3 * easedT); // Increase width significantly (up to 3x)

  drawVShape(currentY, currentWidth);

  // Continue the animation until it completes
  if (animationProgress < duration) {
    animationProgress += 1 / (duration / 16); // Approx. 60 FPS
    requestAnimationFrame(animate);
  }
}

// Initial drawing of the V shape
drawVShape(startY, initialWidth);

// Start the animation on canvas click
canvas.addEventListener('click', () => {
  animationProgress = 0; // Reset progress for new animation
  animate();
});



