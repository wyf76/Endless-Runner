/*
 * Name: Yufan Weng
 * Game Title: Endless Runner
 * Hours Spent: ~18 hours
 * Creative Tilt:
 *    - Implemented persistent high score tracking using localStorage.
 *    - Added an escalating challenge with decreasing obstacle spawn delay and randomized obstacle positions.
 *    - Enhanced the game with multiple sound effects for UI feedback and landing events.
 *    - Custom artwork created in Piskel is used for the animated player.
 */

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { 
      default: "arcade", 
      arcade: { gravity: { y: 500 }, debug: false } 
    },
    scene: [MenuScene, GameScene, GameOverScene, CreditsScene]
  };
  
  const game = new Phaser.Game(config);
  