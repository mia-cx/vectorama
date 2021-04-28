
class EffectSelectionButton {

    constructor(i, effect, height) {
        this.width = 300;
        this.height = height;
        this.x = 800;
        this.y = (screen.height / 2) - this.width + this.height * (i + 1) - (this.height / 2);
        this.effect = effect;

        this.text = {
            value: this.effect,
            size: 30,
            color: {
                fill: 150,
                fillMouseOver: 120,
                fillPressed: 100
            }
        }
    }

    show() {
        push();
        noStroke();
        if (mouseIsPressed && rectHitbox(this.x, this.y, this.width, this.height)) {
            fill(this.text.color.fillPressed);
        } else if (rectHitbox(this.x, this.y, this.height, this.height)) {
            fill(this.text.color.fillMouseOver);
        } else {
            fill(this.text.color.fill);
        }
        textAlign(CENTER, CENTER);
        textSize(this.text.size);
        text(this.text.value, this.x, this.y);
        pop();
    }

    mouseReleased(slot) {
        if (rectHitbox(this.x, this.y, this.width, this.height)) {
            this.addEffect(slot);
        }
    }

    addEffect(slot) {
        if (this.effect === 'Return') {
            effectSelectionScreen.selfDestruct();
        }
        if (this.effect === 'Filter') {
            effectSelectionScreen.filterSelectionScreen();
        }
        if (this.effect === 'EQ') {
            fxSlots[slot - 1] = new EQSlot(slot - 1);
            effectSelectionScreen.selfDestruct();
            this.sendData(this.effect, slot);
        }
        if (this.effect === 'Delay') {
            fxSlots[slot - 1] = new DelaySlot(slot - 1);
            effectSelectionScreen.selfDestruct();
            this.sendData(this.effect, slot);
        }
        if (this.effect === 'Distortion') {
            fxSlots[slot - 1] = new DistortionSlot(slot - 1);
            effectSelectionScreen.selfDestruct();
            this.sendData(this.effect, slot);
        }
        if (this.effect === 'WaveShaper') {
            fxSlots[slot - 1] = new WaveShaperSlot(slot - 1);
            effectSelectionScreen.selfDestruct();
            this.sendData(this.effect, slot);
        }
        if (this.effect === 'LowPass') {
            fxSlots[slot - 1] = new FilterSlot(slot - 1, 'LowPass');
            effectSelectionScreen.selfDestruct();
            this.sendData(this.effect, slot);
        }
        if (this.effect === 'HighPass') {
            fxSlots[slot - 1] = new FilterSlot(slot - 1, 'HighPass');
            effectSelectionScreen.selfDestruct();
            this.sendData(this.effect, slot);
        }
        if (this.effect === 'NotchPass') {
            fxSlots[slot - 1] = new FilterSlot(slot - 1, 'NotchPass');
            effectSelectionScreen.selfDestruct();
            this.sendData(this.effect, slot);
        }
        if (this.effect === 'BandPass') {
            fxSlots[slot - 1] = new FilterSlot(slot - 1, 'BandPass');
            effectSelectionScreen.selfDestruct();
            this.sendData(this.effect, slot);
        }
    }

    sendData(effect, slot) {
        socket.emit('/newEffect', {effect: effect, slot: slot});
    }
}


class EffectSelectionScreen extends ChainBox {

    constructor(slot, effects) {
        super()
        this.currentSlot = slot;
        this.effects = effects;
        this.buttons = [];

        for (let i = 0; i < this.effects.length; i++) {
            this.buttons[i] = new EffectSelectionButton(i, this.effects[i], 600 / this.effects.length);
        }
    }

    show() {
        this.background();

        for (let i = 1; i < this.effects.length; i++) {
            let y = this.y - (this.height / 2) + (this.height / this.effects.length) * (i);
            push();
            translate(this.x, y);
            strokeWeight(2);
            stroke(this.color.line);
            line(0 - (this.width / 2), 0, this.width / 2, 0);
            pop();
        }

        this.stroke();

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].show();
        }
    }

    mouseReleased() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].mouseReleased(this.currentSlot);
        }
    }

    selfDestruct() {
        chainBox = new ChainBox();
        state = 0;
        effectSelectionScreen = undefined;
    }

    filterSelectionScreen() {
        effectSelectionScreen = new EffectSelectionScreen(this.currentSlot, ['LowPass', 'HighPass', 'NotchPass', 'BandPass', 'Return'])
    }
}
