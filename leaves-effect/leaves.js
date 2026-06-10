/* ════════════════════════════════════════════════════════════
       LEAVES GENERATOR
    ════════════════════════════════════════════════════════════ */

const config = {
  leafCount: 15, // Total number of leaves
  animationDuration: 5, // Duration in seconds
  minDelay: 0, // Minimum delay before animation starts
  maxDelay: 5, // Maximum delay before animation starts
};

/**
 * Generate random delay for staggered leaf falling effect
 */
function getRandomDelay() {
  return Math.random() * (config.maxDelay - config.minDelay) + config.minDelay;
}

/**
 * Generate random starting position (right side of screen)
 */
function getRandomStartPosition() {
  return Math.random() * 100; // 0-100% from right
}

/**
 * Create a single leaf element with random properties
 */
function createLeaf(index) {
  const leaf = document.createElement('i');

  // Set random animation delay
  const delay = getRandomDelay();
  leaf.style.animationDelay = `${delay}s`;
  leaf.style.webkitAnimationDelay = `${delay}s`;

  // Set random starting position from right
  const startPosition = getRandomStartPosition();
  leaf.style.right = `${startPosition}%`;

  // Set animation duration
  const duration = config.animationDuration + (Math.random() * 2 - 1); // ±1 second variation
  leaf.style.animationDuration = `${duration}s`;
  leaf.style.webkitAnimationDuration = `${duration}s`;

  return leaf;
}

/**
 * Initialize and generate all leaves
 */
function initializeLeaves() {
  const leavesContainer = document.getElementById('leaves');

  // Clear existing leaves (if any)
  leavesContainer.innerHTML = '';

  // Generate leaves
  for (let i = 0; i < config.leafCount; i++) {
    const leaf = createLeaf(i);
    leavesContainer.appendChild(leaf);
  }

  console.log(`✅ Generated ${config.leafCount} falling leaves`);
}

/**
 * Regenerate leaves (useful for dynamic updates)
 */
function regenerateLeaves(count) {
  if (count) {
    config.leafCount = count;
  }
  initializeLeaves();
}

// Initialize leaves when page loads
window.addEventListener('DOMContentLoaded', initializeLeaves);

// Expose function to window for dynamic control
window.regenerateLeaves = regenerateLeaves;

// Optional: Add more leaves on window resize for better coverage
window.addEventListener('resize', () => {
  const screenWidth = window.innerWidth;
  const optimalLeafCount = Math.ceil(screenWidth / 100); // 1 leaf per 100px width
  if (optimalLeafCount !== config.leafCount) {
    regenerateLeaves(Math.max(15, optimalLeafCount));
  }
});
