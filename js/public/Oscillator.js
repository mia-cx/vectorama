
class Oscillator {

    constructor(x, y, instance) {
        this.x = x;
        this.y = y;
        this.width = 550;
        this.height = 250;
        this.instance = instance;

        this.text = {
            oscillator: {
                value: `Oscillator ${instance}`,
                x: 0,
                y: -80,
                size: 50
            },
            color: 80
        };

        this.waveFormSelectionBox = new WaveFormSelectionBox(this.x - 150, this.y + 30);
    }

    outline() {
        push();
        strokeWeight(2);
        stroke(90);
        fill(110);
        translate(this.x, this.y)
        rect(0 - (this.width / 2), 0 - (this.height / 2), this.width, this.height, 20);
        pop();
    }

    show() {
        this.outline();

        push();
        translate(this.x, this.y);
        textAlign(CENTER, CENTER);

        push();
        noStroke();
        fill(this.text.color);
        textSize(this.text.oscillator.size);
        text(this.text.oscillator.value, this.text.oscillator.x, this.text.oscillator.y);
        pop();
        pop();

        this.waveFormSelectionBox.show();
    }

    mousePressed() {
        this.waveFormSelectionBox.mousePressed();
    }
}


class WaveFormSelectionBox {

    constructor(x, y, instance) {
        this.x = x;
        this.y = y;
        this.instance = instance;

        this.box = {
            width: 150,
            height: 130,
            stroke: 90,
            fill: 120
        }

        this.text = {
            none: {
                value: 'None',
                x: 0,
                y: -40
            },
            sine: {
                value: 'Sine',
                x: 45,
                y: -17
            },
            noise: {
                value: 'Noise',
                x: 45,
                y: 17
            },
            saw: {
                value: 'Saw',
                x: -45,
                y: -17
            },
            pulse: {
                value: 'Pulse',
                x: -45,
                y: 17
            },
            triangle: {
                value: 'Triangle',
                x: 0,
                y: 40
            },
            color: 80,
            size: 17
        }

        this.waveFormKnob = new WaveFormKnob(this.x, this.y);
    }

    show() {
        push();
        stroke(this.box.stroke);
        strokeWeight(2);
        fill(this.box.fill);
        translate(this.x, this.y);
        rect(0 - (this.box.width / 2), 0 - (this.box.height / 2), this.box.width, this.box.height, 20)
        pop();

        push();
        translate(this.x, this.y);
        textSize(this.text.size);
        noStroke();
        fill(this.text.color);
        textAlign(CENTER, CENTER);

        text(this.text.none.value, this.text.none.x, this.text.none.y);
        text(this.text.sine.value, this.text.sine.x, this.text.sine.y);
        text(this.text.noise.value, this.text.noise.x, this.text.noise.y);
        text(this.text.saw.value, this.text.saw.x, this.text.saw.y);
        text(this.text.pulse.value, this.text.pulse.x, this.text.pulse.y);
        text(this.text.triangle.value, this.text.triangle.x, this.text.triangle.y);
        pop();

        this.waveFormKnob.show();
    }

    mousePressed() {
        this.waveFormKnob.changeValue();
    }
}


class WaveFormKnob extends Knob {

    constructor(x, y) {
        super(x, y);
    }

    changeValue() {
        if (circleHitbox(this.circle.x, this.circle.y, this.circle.r)) {
            let y = mouseY;
            mouseLock = true;
            let timer = setInterval(() => {
                if (mouseIsPressed === false) {
                    mouseLock = false;
                    clearInterval(timer);
                }
                if (y - mouseY > 100) {
                    this.value += 60;
                    if (this.value === 360) this.value = 0;
                    console.log(this.value);
                    y = mouseY;
                }
                if (y - mouseY < -100) {
                    this.value -= 60;
                    if (this.value === -360) this.value = 0;
                    console.log(this.value);
                    y = mouseY;
                }
            })
        }
    }
}
