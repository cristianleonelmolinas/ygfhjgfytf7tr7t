import { SHAPES, POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START } from '../../utils.js';
const { TRIANGLE, SQUARE, DIAMOND, REDTRIANGLE } = SHAPES;
export default class Game extends Phaser.Scene {
    score;
    constructor() {
        super('Game');

    }

    init() {
        this.gameOver = false
        this.shapesRecolected = {
            [TRIANGLE]: { count: 0, score: 10 },
            [SQUARE]: { count: 0, score: 20 },
            [DIAMOND]: { count: 0, score: 30 },
            [REDTRIANGLE]: { count: 0, score: -50, },


        };
        console.log(this.shapesRecolected)
    }


    create() {
        //add background
        this.add.image(400, 300, "sky").setScale(0.555);

        this.add.image(750, 50, "moon").setScale(.2)

        //add static platforms group
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 580, "ground").setScale(2).refreshBody();

        platforms.create(20, 280, "ground").setScale(1).refreshBody();

        platforms.create(700, 400, "ground").setScale(1).refreshBody();

       /// platforms.create( 250, 470, "ground").setScale(1).refreshBody();
        //
        this.shapesGroup = this.physics.add.group();
        /// this.shapesGroup.create(100, 0, 'diamond');
        /// this.shapesGroup.create(200, 0, 'triangle');
        ///this.shapesGroup.create(300, 0, 'square');

        //create event to add shapes
        this.time.addEvent({
            delay: 3000,
            callback: this.addShape,
            callbackScope: this,
            loop: true,
        });

        this.time.addEvent({
            delay: 1000,
            callback: this.onSecond,
            callbackScope: this,
            loop: true,
        });

        //
        //
        this.player = this.physics.add.sprite(100, 450, "ninja");
        this.player.setCollideWorldBounds(true);

        //create cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        //colliders
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, this.shapesGroup);
        this.physics.add.collider(platforms, this.shapesGroup);

        //add overlap between player and shapes
        this.physics.add.overlap(
            this.player,
            this.shapesGroup,
            this.collectShape,
            null,
            this
        );

        this.physics.add.overlap(
            this.shapesGroup,
            platforms,
            this.reduce,
            null,
            this
        )

        //add score on scene
        this.score = 0;
        this.scoreText = this.add.text(20, 20, "Score:" + this.score, {
            fontSize: "34px",
            fontStyle: "bold",
            fill: "#ffffff",
        });
        //add timer
        this.timer = 60
        this.timerText = this.add.text(750, 20, this.timer, {
            fontSize: "32px",
            fontStyle: "bold",
            fill: "#000",
        });
    }

    update() {

        if (this.score >= 100) {
            this.scene.start("Win")
        }

        if (this.gameOver) {
            this.scene.start("GameOver")
        }

        //movement player
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-230);
        } else
            if (this.cursors.right.isDown) {
                this.player.setVelocityX(230);
            } else {
                this.player.setVelocityX(0);
            }

        //player jump
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-270);
        }

    }

    addShape() {
        //get random shape
        const randomShape = Phaser.Math.RND.pick([DIAMOND, SQUARE, TRIANGLE, REDTRIANGLE]);

        //get random position x
        const randomX = Phaser.Math.RND.between(0, 800);

        //add shape to screen

        this.shapesGroup.create(randomX, 0, randomShape)
            .setCircle(32, 0, 0)
            
            .setBounce(0, 1)
            .setData(POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START);;


        console.log("shape is added", randomX, randomShape);

    }

    collectShape(player, shape) {
        shape.destroy()

        const shapeName = shape.texture.key;

        this.shapesRecolected[shapeName].count++;

        const percentage = shape.getData(POINTS_PERCENTAGE);

        const scoreNow = this.shapesRecolected[shapeName].score * percentage;

        this.score += this.shapesRecolected[shapeName].score;

        console.log(this.shapesRecolected[shapeName].score)

        this.scoreText.setText(`Score: ${this.score.toString()}`);

        console.log(this.shapesRecolected);

    }
    onSecond() {
        this.timer--;

        this.timerText.setText(this.timer);

        if (this.timer <= 0) {

            this.gameOver = true;
        }
    }

    reduce(shape, platforms) {
        let bounce = shape.getData("bounce");

        console.log(shape.texture.key, bounce);

        let sumabounce = bounce + 1;

        shape.setData("bounce", sumabounce);

        const newPercentage = shape.getData(POINTS_PERCENTAGE) - 0.25;

        console.log(shape.texture.key, newPercentage);

        shape.setData(POINTS_PERCENTAGE, newPercentage);

        if (newPercentage <= 0) {
            shape.destroy();
            return;
        }

        // show text
        const text = this.add.text(shape.body.position.x + 10, shape.body.position.y, "- 35%", {
            fontSize: "22px",
            fontStyle: "bold",
            fill: "red",
        });
        setTimeout(() => {
            text.destroy();
        }, 200);
    }
}