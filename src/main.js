// main.js
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { 
        default: "arcade", 
        arcade: { gravity: { y: 500 }, debug: false } 
    },
    scene: [MenuScene, GameScene, GameOverScene]
};

const game = new Phaser.Game(config);