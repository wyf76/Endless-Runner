class CreditsScene extends Phaser.Scene {
  constructor() {
    super("CreditsScene");
  }

  create() {
    const creditsText =
      "Credits:\n\n" +
      "Game Design & Programming: Your Name\n" +
      "Artwork: Created by me\n" +
      "Music: Royalty-free sources\n" +
      "Sound Effects: Royalty-free sources\n\n" +
      "Click anywhere to return to Menu";

    this.add.text(400, 300, creditsText, { fontSize: "18px", fill: "#fff", align: "center" })
            .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("MenuScene");
    });
  }
}
