
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

        this.waveFormSelectionBox = new WaveFormSelectionBox(this.x - 175, this.y + 30);
        this.adsrBox = new ADSRBox(this.x, this.y + 30);
        this.pitchBox = new PitchBox(this.x + 175, this.y + 30);
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
        this.adsrBox.show();
        this.pitchBox.show();
    }

    mousePressed() {
        this.waveFormSelectionBox.mousePressed();
        this.adsrBox.mousePressed();
        this.pitchBox.mousePressed();
    }
}


class Box {

    constructor(x, y, instance) {
        this.x = x;
        this.y = y;
        this.instance = instance;
    }

    show() {
    }

    mousePressed() {
    }
}


class WaveFormSelectionBox extends Box{

    constructor(x, y, instance) {
        super(x, y, instance);

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


class ADSRBox extends Box{

    constructor(x, y, instance) {
        super(x, y, instance);

        this.box = {
            width: 150,
            height: 130,
            stroke: 90,
            fill: 120
        }

        this.text = {
            a: {
                value: 'Attack',
                x: -30,
                y: -50
            },
            d: {
                value: 'Decay',
                x: 30,
                y: -50
            },
            s: {
                value: 'Sustain',
                x: -30,
                y: 10
            },
            r: {
                value: 'Release',
                x: 30,
                y: 10
            },
            color: 80,
            size: 15
        };

        this.knobs = [];
        this.knobs[0] = new Knob(this.x - 30, this.y - 20, -127);
        this.knobs[1] = new Knob(this.x + 30, this.y - 20, -127);
        this.knobs[2] = new Knob(this.x - 30, this.y + 40, -127);
        this.knobs[3] = new Knob(this.x + 30, this.y + 40, -127);
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

        text(this.text.a.value, this.text.a.x, this.text.a.y);
        text(this.text.d.value, this.text.d.x, this.text.d.y);
        text(this.text.s.value, this.text.s.x, this.text.s.y);
        text(this.text.r.value, this.text.r.x, this.text.r.y);
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


class PitchBox extends Box{

    constructor(x, y, instance) {
        super(x, y, instance);

        this.box = {
            width: 150,
            height: 130,
            stroke: 90,
            fill: 120
        }

        this.knob = new Knob(this.x, this.y, 0);

        this.text = {
            pitch: {
                value: 'Pitch',
                x: 0,
                y: -40,
                color: 80,
                size: 20
            },
            reset: {
                value: 'Reset',
                x: 0,
                y: 40,
                color: {
                    fill: 80,
                    mouseOver: 90,
                    mousePressed: 100
                },
                width: 100,
                height: 20,
                size: 20
            }
        }
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
        textSize(this.text.pitch.size);
        noStroke();
        fill(this.text.pitch.color);
        textAlign(CENTER, CENTER);

        text(this.text.pitch.value, this.text.pitch.x, this.text.pitch.y);
        pop();

        push();
        translate(this.x, this.y);
        textSize(this.text.reset.size);
        noStroke();
        if (mouseIsPressed && rectHitbox(this.x + this.text.reset.x, this.y + this.text.reset.y, this.text.reset.width, this.text.reset.height)) {
            fill(this.text.reset.color.mousePressed);
        } else if (rectHitbox(this.x + this.text.reset.x, this.y + this.text.reset.y, this.text.reset.width, this.text.reset.height)) {
            fill(this.text.reset.color.mouseOver);
        } else {
            fill(this.text.reset.color.fill);
        }
        textAlign(CENTER, CENTER);

        text(this.text.reset.value, this.text.reset.x, this.text.reset.y);

        stroke(this.text.reset.color.fill);
        noFill();
        rect(this.text.reset.x - (this.text.reset.width / 2), this.text.reset.y - (this.text.reset.height / 2), this.text.reset.width, this.text.reset.height);
        pop();

        this.knob.show();
    }

    mousePressed() {
        this.knob.changeValue();

        if (rectHitbox(this.x + this.text.reset.x, this.y + this.text.reset.y, this.text.reset.width, this.text.reset.height)) {
            this.knob.reset();
        }
    }
}


class WaveFormKnob extends Knob {

    constructor(x, y) {
        super(x, y, 0);
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
