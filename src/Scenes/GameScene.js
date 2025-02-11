class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    // Load the player spritesheet (2 frames: frame 0 = standing, frame 1 = jumping).
    this.load.spritesheet("player", "./assets/player.png", {
      frameWidth: 32,   // Adjust as needed.
      frameHeight: 48   // Adjust as needed.
    });
    this.load.image("background", "./assets/background.png");
    this.load.image("obstacle", "./assets/obstacle.png");
    this.load.audio("gameMusic", "./assets/game_music.wav");
    this.load.audio("jumpSound", "./assets/jump.wav");     // SFX #1.
    this.load.audio("hitSound", "./assets/hit.wav");         // SFX #2.
    this.load.audio("landSound", "./assets/land.wav");       // SFX #4.
  }

  create() {
    // Create a scrolling background.
    this.bg = this.add.tileSprite(400, 300, 800, 600, "background");

    // Create the player sprite and enable physics.
    this.player = this.physics.add.sprite(100, 450, "player").setScale(2.0);
    this.player.setCollideWorldBounds(true);

    // Create the "stand" animation using frame 0.
    this.anims.create({
      key: 'stand',
      frames: [{ key: 'player', frame: 0 }],
      frameRate: 1,
      repeat: -1
    });

    // Create the "jump" animation using frame 1.
    this.anims.create({
      key: 'jump',
      frames: [{ key: 'player', frame: 1 }],
      frameRate: 1,
      repeat: 0
    });

    // Start with the stand animation.
    this.player.anims.play('stand', true);

    // Set up input keys.
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Create an obstacles group and set up collision detection.
    this.obstacles = this.physics.add.group();
    this.physics.add.collider(this.player, this.obstacles, this.handleGameOver, null, this);

    // Flag to prevent multiple game-over triggers.
    this.isGameOver = false;

    // Begin spawning obstacles.
    this.obstacleSpawnDelay = 2000; // Starting delay in milliseconds.
    this.spawnObstacle();

    // Set up score and high score displays.
    this.score = 0;
    this.scoreText = this.add.text(400, 20, "Score: 0", { fontSize: "20px", fill: "#fff" })
                              .setOrigin(0.5, 0)
                              .setDepth(10);
    this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
    this.highScoreText = this.add.text(10, 60, "High Score: " + this.highScore, { fontSize: "20px", fill: "#fff" })
                                .setDepth(10);

    // Play looping game background music.
    this.sound.play("gameMusic", { loop: true });

    // For detecting landing events (to play the landing sound).
    this.wasOnFloor = true;
  }

  update() {
    // Scroll the background.
    this.bg.tilePositionX += 5;

    // Check for jump input: trigger a jump only when the jump key is pressed and the player is on the floor.
    if ((Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
         Phaser.Input.Keyboard.JustDown(this.spaceKey)) &&
         this.player.body.onFloor()) {
      this.sound.play("jumpSound");
      this.player.setVelocityY(-400);
      this.player.anims.play('jump');
    }

    // Animation control:
    // If the player is not on the floor, ensure the jump animation is playing.
    if (!this.player.body.onFloor()) {
      this.player.anims.play('jump', true);
    } else {
      this.player.anims.play('stand', true);
    }

    // Play the landing sound when the player lands (transitioning from airborne to on the floor).
    if (!this.wasOnFloor && this.player.body.onFloor()) {
      this.sound.play("landSound");
    }
    this.wasOnFloor = this.player.body.onFloor();

    // Increase the score slowly and update the display (using Math.floor to avoid decimals).
    this.score += 0.2;
    this.scoreText.setText("Score: " + Math.floor(this.score));

    // Update the high score if necessary.
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.highScoreText.setText("High Score: " + Math.floor(this.highScore));
      localStorage.setItem('highScore', Math.floor(this.highScore));
    }
  }

  spawnObstacle() {
    // Add a slight random variation to the obstacle's vertical position.
    let randomY = 550 + Phaser.Math.Between(-30, 30);
    let obstacle = this.obstacles.create(800, randomY, "obstacle").setScale(0.06);
    obstacle.setVelocityX(-200);
    obstacle.body.allowGravity = false;

    // Gradually decrease the obstacle spawn delay (minimum of 800ms).
    this.obstacleSpawnDelay = Math.max(800, this.obstacleSpawnDelay - 10);
    this.time.delayedCall(this.obstacleSpawnDelay, this.spawnObstacle, [], this);
  }

  handleGameOver(player, obstacle) {
    if (this.isGameOver) return;
    this.isGameOver = true;
    this.sound.play("hitSound");
    this.sound.stopByKey("menuMusic");
    this.scene.start("GameOverScene", { score: Math.floor(this.score) });
  }
}
