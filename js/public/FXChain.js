
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
        this.clearButton = new ClearButton(this.x, this.y, this.currentSlot);

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
        };

        this.knobs = [];
        this.knobs[0] = new Knob(this.x - 90, this.y + 30, 0, '/frequency');
        this.knobs[1] = new Knob(this.x, this.y + 30, 0, '/bandwidth');
        this.knobs[2] = new Knob(this.x + 90, this.y + 30, 0, '/rolloff');
    }

    show() {
        push();
        fill(this.text.color);
        noStroke();
        textAlign(CENTER, CENTER);
        translate(this.x, this.y);

        push();
        textSize(this.text.filter.size);
        text(this.text.filter.value, this.text.filter.x, this.text.filter.y);
        pop();

        push();
        textSize(this.text.f.size);
        text(this.text.f.value, this.text.f.x, this.text.f.y);
        pop();

        push();
        textSize(this.text.b.size);
        text(this.text.b.value, this.text.b.x, this.text.b.y);
        pop();

        push();
        textSize(this.text.r.size);
        text(this.text.r.value, this.text.r.x, this.text.r.y);
        pop();
        pop();

        for (let i = 0; i < this.knobs.length; i++) {
            this.knobs[i].show();
        }
        this.clearButton.show();
    }

    mousePressed() {
        for (let i = 0; i < this.knobs.length; i++) {
            this.knobs[i].changeValue();
        }
    }

    mouseReleased() {
        this.clearButton.clear();
    }
}


class EQSlot extends Slot {

    constructor(slot) {
        super(slot);
        this.clearButton = new ClearButton(this.x, this.y, this.currentSlot);

        this.text = {
            EQ: {
                value: 'Equalizer',
                x: 0,
                y: -40,
                size: 30
            },
            sub: {
                value: 'Sub',
                x: -100,
                y: 0,
                size: 15
            },
            low: {
                value: 'Low',
                x: -33,
                y: 0,
                size: 15
            },
            mid: {
                value: 'Mid',
                x: 33,
                y: 0,
                size: 15
            },
            high: {
                value: 'High',
                x: 100,
                y: 0,
                size: 15
            },
            color: 150
        };

        this.knobs = [];
        this.knobs[0] = new Knob(this.x - 100, this.y + 30, 0, '/sub');
        this.knobs[1] = new Knob(this.x - 33, this.y + 30, 0, '/low');
        this.knobs[2] = new Knob(this.x + 33, this.y + 30, 0, '/mid');
        this.knobs[3] = new Knob(this.x + 100, this.y + 30, 0, '/high');
    }

    show() {
        push();
        fill(this.text.color);
        noStroke();
        textAlign(CENTER, CENTER);
        translate(this.x, this.y);

        push();
        textSize(this.text.EQ.size);
        text(this.text.EQ.value, this.text.EQ.x, this.text.EQ.y);
        pop();

        push();
        textSize(this.text.sub.size);
        text(this.text.sub.value, this.text.sub.x, this.text.sub.y);
        pop();

        push();
        textSize(this.text.low.size);
        text(this.text.low.value, this.text.low.x, this.text.low.y);
        pop();

        push();
        textSize(this.text.mid.size);
        text(this.text.mid.value, this.text.mid.x, this.text.mid.y);
        pop();

        push();
        textSize(this.text.high.size);
        text(this.text.high.value, this.text.high.x, this.text.high.y);
        pop();
        pop();

        for (let i = 0; i < this.knobs.length; i++) {
            this.knobs[i].show();
        }
        this.clearButton.show();
    }

    mousePressed() {
        for (let i = 0; i < this.knobs.length; i++) {
            this.knobs[i].changeValue();
        }
    }

    mouseReleased() {
        this.clearButton.clear();
    }
}


class Knob {

    constructor(x, y, startValue, address) {
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
        this.range = {
            lower: -127,
            upper: 127
        }

        this.value = startValue;
        this.startValue = startValue;
        this.address = address;
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

                this.sendData();
                y = mouseY
            }, 1);
        }
    }

    sendData() {
        socket.emit('/knobData', {address: this.address, value: this.value});
    }

    reset() {
        this.value = this.startValue;
    }

    evaluate() {
        return this.value;
    }
}


class ClearButton {

    constructor(x, y, slot) {
        this.x = x + 130;
        this.y = y - 55;
        this.size = 20;
        this.l1 = {
            x1: this.x - (this.size / 2),
            y1: this.y - (this.size / 2),
            x2: this.x + (this.size / 2),
            y2: this.y + (this.size / 2)
        }
        this.l2 = {
            x1: this.x + (this.size / 2),
            y1: this.y - (this.size / 2),
            x2: this.x - (this.size / 2),
            y2: this.y + (this.size / 2)
        }

        this.color = {
            stroke: 60,
            mouseOver: 50,
            mousePressed: 65
        }
        this.currentSlot = slot;
    }

    show() {
        push();
        if (rectHitbox(this.x, this.y, 15, 15) && mouseIsPressed) {
            stroke(this.color.mousePressed);
        } else if (rectHitbox(this.x, this.y, 15, 15)) {
            stroke(this.color.mouseOver);
        } else {
            stroke(this.color.stroke);
        }
        strokeWeight(3);
        line(this.l1.x1, this.l1.y1, this.l1.x2, this.l1.y2);
        line(this.l2.x1, this.l2.y1, this.l2.x2, this.l2.y2);
        pop();
    }

    clear() {
        if (rectHitbox(this.x, this.y, 15, 15)) {
            fxSlots[this.currentSlot - 1] = new EmptySlot(this.currentSlot - 1);
            this.sendData();
        }
    }

    sendData() {
        socket.emit('/clearSlot', this.currentSlot);
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
