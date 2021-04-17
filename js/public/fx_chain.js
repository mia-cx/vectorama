
class Slot {

    constructor(slot) {
        this.currentSlot = slot + 1;
        this.x = 800;
        this.y = (screen.height / 2) - 300 + 150 * this.currentSlot - 75;
    }

    show() {
    }

    mousePressed() {
    }

    mouseReleased() {
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
        state = 1;
        chainBox = undefined;
    }
}


class FilterSlot extends Slot {

    constructor(slot) {
        super(slot);

        this.text = {
            filter: {
                value: 'Filter',
                x: 0,
                y: -45,
                size: 30
            },
            lp: {
                value: 'LP',
                x: -105,
                y: 0,
                size: 15
            },
            hp: {
                value: 'HP',
                x: -35,
                y: 0,
                size: 15
            },
            np: {
                value: 'NP',
                x: 35,
                y: 0,
                size: 15
            },
            bp: {
                value: 'BP',
                x: 105,
                y: 0,
                size: 15
            },
            color: 150
        }

        this.knobs = [new Knob(this.x - 105, this.y + 30), new Knob(this.x - 35, this.y + 30), new Knob(this.x + 35, this.y + 30), new Knob(this.x + 105, this.y + 30)];
    }

    show() {
        push();
        fill(this.text.color);
        noStroke();
        textAlign(CENTER, CENTER);

        push();
        textSize(this.text.filter.size);
        translate(this.x, this.y);
        text(this.text.filter.value, this.text.filter.x, this.text.filter.y);
        pop();

        push();
        textSize(this.text.lp.size);
        translate(this.x, this. y);
        text(this.text.lp.value, this.text.lp.x, this.text.lp.y);
        pop();

        push();
        textSize(this.text.hp.size);
        translate(this.x, this. y);
        text(this.text.hp.value, this.text.hp.x, this.text.hp.y);
        pop();

        push();
        textSize(this.text.np.size);
        translate(this.x, this. y);
        text(this.text.np.value, this.text.np.x, this.text.np.y);
        pop();

        push();
        textSize(this.text.bp.size);
        translate(this.x, this. y);
        text(this.text.bp.value, this.text.bp.x, this.text.bp.y);
        pop();
        pop();

        for (let i = 0; i < this.knobs.length; i++) {
            this.knobs[i].show();
        }
    }

    mousePressed() {
        for (let i = 0; i < this.knobs.length; i++) {
            this.knobs[i].changeValue();
        }
    }
}


class Knob {

    constructor(x, y) {
        this.circle = {
            x: x,
            y: y,
            r: 35,
            color: 150,
        }
        this.line = {
            y1: 0 - (this.circle.r / 2 - 10),
            y2: 0 - (this.circle.r / 2),
            color: 80
        }
        this.value = 0;
        this.range = {
            lower: -127,
            upper: 127
        }
    }

    show() {
        push();
        fill(this.circle.color);
        noStroke();
        ellipse(this.circle.x, this.circle.y, this.circle.r);
        pop();

        push();
        stroke(this.line.color);
        strokeWeight(3);
        translate(this.circle.x, this.circle.y);
        angleMode(DEGREES);
        rotate(this.value);
        line(0, this.line.y1, 0, this.line.y2);
        pop();
    }

    changeValue() {
        if (circleHitbox(this.circle.x, this.circle.y, this.circle.r)) {
            let y = mouseY;
            mouseLock = true;
            let timer = setInterval (() => {
                if (mouseIsPressed === false) {
                    mouseLock = false;
                    clearInterval(timer);
                }
                if (this.value >= this.range.lower && this.value <= this.range.upper) {
                    this.value += y - mouseY;
                }
                if (this.value < this.range.lower) this.value = this.range.lower;
                if (this.value > this.range.upper) this.value = this.range.upper;

                y = mouseY
            }, 1);
        }
    }

    evaluate() {
        return this.value;
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
