// scenes/GameScene.js
class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }
    preload() {
        this.load.image("background", "./assets/background_with_clouds.png");
        this.load.spritesheet("player", "./assets/player.png", { frameWidth: 32, frameHeight: 48 });
        this.load.audio("gameMusic", "./assets/game_music.wav");
        this.load.image("obstacle", "./assets/circular_obstacle.png");
        this.load.audio("jumpSound", "./assets/jump.wav");
    }
    create() {
        this.bg = this.add.tileSprite(0, 0, 800, 600, "background").setOrigin(0, 0).setScale(1.1);
        this.player = this.physics.add.sprite(100, 450, "player").setScale(1.5);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.obstacles = this.physics.add.group();
        this.physics.add.collider(this.player, this.obstacles, this.gameOver, null, this);
        this.time.addEvent({ delay: 2000, callback: this.spawnObstacle, callbackScope: this, loop: true });
        this.score = 0;
        this.scoreText = this.add.text(10, 10, "Score: 0", { fontSize: "20px", fill: "#fff" });
        this.sound.play("gameMusic", { loop: true });
    }
    update() {
        this.bg.tilePositionX += 5;
        
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.sound.play("jumpSound");
            this.player.setVelocityY(-300);
        }
        
        this.score += 1;
        this.scoreText.setText("Score: " + this.score);
    }
    spawnObstacle() {
        let obstacle = this.obstacles.create(800, 550, "obstacle").setScale(1.2);
        obstacle.setVelocityX(-200);
        obstacle.setImmovable(true);
    }
    gameOver() {
        this.scene.start("GameOverScene");
    }
}