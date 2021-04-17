
class SelectionButton {

    constructor(i, effect) {
        this.x = 800;
        this.y = (screen.height / 2) - 300 + 100 * (i + 1) - 50;
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
        if (mouseIsPressed && rectHitbox(this.x, this.y, 300, 100)) {
            fill(this.text.color.fillPressed);
        } else if (rectHitbox(this.x, this.y, 300, 100)) {
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
        if (rectHitbox(this.x, this.y, 300, 100)) {
            this.addEffect(slot);
        }
    }

    addEffect(slot) {
        if (this.effect === 'Return') {
            selectionScreen.selfDestruct();
        }
        if (this.effect === 'Filter') {
            fxSlots[slot - 1] = new FilterSlot(slot - 1);
            selectionScreen.selfDestruct();
        }
    }
}


class SelectionScreen extends ChainBox {

    constructor(slot) {
        super()
        this.currentSlot = slot;
        this.effects = ['Filter', 'EQ', 'Delay', 'Distortion', 'WaveShaper', 'Return']
        this.buttons = [];

        for (let i = 0; i < this.effects.length; i++) {
            this.buttons[i] = new SelectionButton(i, this.effects[i]);
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
        selectionScreen = undefined;
    }
}
