
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
        effectSelectionScreen = new EffectSelectionScreen(this.currentSlot, ['Filter', 'EQ', 'Delay', 'Distortion', 'WaveShaper', 'Return']);
        state = 1;
        chainBox = undefined;
    }
}


class FilterSlot extends Slot {

    constructor(slot, type) {
        super(slot);

        this.type = type;

        this.text = {
            filter: {
                value: this.type,
                x: 0,
                y: -40,
                size: 30
            },
            f: {
                value: 'Frequency',
                x: -90,
                y: 0,
                size: 15
            },
            b: {
                value: 'Bandwidth',
                x: 0,
                y: 0,
                size: 15
            },
            r: {
                value: 'Rolloff',
                x: 90,
                y: 0,
                size: 15
            },
            color: 150
        }

        this.knobs = [new Knob(this.x - 90, this.y + 30), new Knob(this.x, this.y + 30), new Knob(this.x + 90, this.y + 30)];
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
        textSize(this.text.f.size);
        translate(this.x, this.y);
        text(this.text.f.value, this.text.f.x, this.text.f.y);
        pop();

        push();
        textSize(this.text.b.size);
        translate(this.x, this.y);
        text(this.text.b.value, this.text.b.x, this.text.b.y);
        pop();

        push();
        textSize(this.text.r.size);
        translate(this.x, this.y);
        text(this.text.r.value, this.text.r.x, this.text.r.y);
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
