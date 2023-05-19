import {SHAPES} from '../../utils.js';
const{TRIANGLE, SQUARE, DIAMOND, REDTRIANGLE} = SHAPES;
export default class Preload extends Phaser.Scene {
constructor() {
    super("Preload");
}

preload(){
    this.load.image("sky", "./assets/images/fondo.jpg");

    this.load.image("ground", "./assets/images/platform.png");

    this.load.image("ninja", "./assets/images/Ninja.png");

    this.load.image(SQUARE, "./assets/images/cuadrado.png");

    this.load.image(DIAMOND, "./assets/images/dimante.gif");

    this.load.image(TRIANGLE, "./assets/images/Triangle.png");

    this.load.image("moon", "./assets/images/moon4.png");

    this.load.image(REDTRIANGLE, "./assets/images/trianguloRojo.png");
    
    this.load.image("win2", "./assets/images/win.jpeg");

    this.load.image("gameOver", "./assets/images/gamerOver.jpg");


}

create() {
    this.scene.start("Game");
}











}