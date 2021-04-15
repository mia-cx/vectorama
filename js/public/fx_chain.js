
let state = 0;


class Slot {

    constructor(slot) {
        this.currentSlot = slot + 1;
        this.x = 800;
        this.y = (screen.height / 2) - 300 + 150 * this.currentSlot - 75;
    }
}


class EmptySlot extends Slot {

    constructor(slot) {
        super(slot);

        this.button = {

            width: 200,
            height: 30,
            value: 'New Effect',

            color: {
                fill: 80,
                fillPressed: 75,
                stroke: 60,
                text: 60
            }
        }
    }

    show() {
        push();
        stroke(this.button.color.stroke);
        strokeWeight(3);
        if (mouseIsPressed && rectHitbox(this.x, this.y, this.button.width, this.button.height)) {
            fill(this.button.color.fillPressed);
        } else {
            fill(this.button.color.fill);
        }
        translate(this.x, this.y);
        rect(0 - (this.button.width / 2), 0 - (this.button.height / 2), this.button.width, this.button.height);
        pop();

        push();
        noStroke();
        fill(this.button.color.text);
        textAlign(CENTER, CENTER);
        textSize(25);
        text(this.button.value, this.x, this.y);
        pop();
    }
}


class ChainBox {

    constructor() {
        this.x = 800;
        this.y = screen.height / 2;
        this.width = 300;
        this.height = 600;
        this.color = {
            fill: 80,
            stroke: 60,
            line: 100
        }
    }

    show() {
        push();
        fill(this.color.fill);
        noStroke();
        translate(this.x, this.y);
        rect(0 - (this.width / 2), 0 - (this.height / 2), this.width, this.height, 20);
        pop();

        if (state === 0) {
            for (let i = 1; i < 4; i++) {
                let y = this.y - (this.height / 2) + (this.height / 4) * (i);
                push();
                translate(this.x, y);
                strokeWeight(2);
                stroke(this.color.line);
                line(0 - (this.width / 2), 0, this.width / 2, 0);
                pop();
            }
        }

        push();
        noFill();
        stroke(this.color.stroke);
        strokeWeight(3)
        translate(this.x, this.y);
        rect(0 - (this.width / 2), 0 - (this.height / 2), this.width, this.height, 20);
        pop()
    }
}
