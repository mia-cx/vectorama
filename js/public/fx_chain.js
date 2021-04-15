
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

            text: {
                value: 'New Effect',
                size: 25
            },

            color: {
                fill: 80,
                fillMouseOver: 75,
                fillPressed: 70,
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
        } else if (rectHitbox(this.x, this.y, this.button.width, this.button.height)){
            fill(this.button.color.fillMouseOver);
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
        textSize(this.button.text.size);
        text(this.button.text.value, this.x, this.y);
        pop();
    }

    mouseReleased() {
        if (rectHitbox(this.x, this.y, this.button.width, this.button.height)) {
            this.newEffect();
        }
    }

    newEffect() {
        selectionScreen = new SelectionScreen(this.currentSlot);
        console.log(this.currentSlot);
        state = 1;
        chainBox = undefined;
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

    background() {
        push();
        fill(this.color.fill);
        noStroke();
        translate(this.x, this.y);
        rect(0 - (this.width / 2), 0 - (this.height / 2), this.width, this.height, 20);
        pop();
    }

    stroke() {
        push();
        noFill();
        stroke(this.color.stroke);
        strokeWeight(3)
        translate(this.x, this.y);
        rect(0 - (this.width / 2), 0 - (this.height / 2), this.width, this.height, 20);
        pop();
    }

    show() {
        this.background();

        for (let i = 1; i < 4; i++) {
            let y = this.y - (this.height / 2) + (this.height / 4) * (i);
            push();
            translate(this.x, y);
            strokeWeight(2);
            stroke(this.color.line);
            line(0 - (this.width / 2), 0, this.width / 2, 0);
            pop();
        }
        this.stroke();

        for (let i = 0; i < fxSlots.length; i++) {
            fxSlots[i].show();
        }
    }
}

