export default class Win extends Phaser.Scene {
  constructor() {
    super("Win");
  }

  create() {
    this.add.image(400, 300, "win2").setScale(0.7);
  }
}
