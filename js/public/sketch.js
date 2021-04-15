let screen = {
    width: 1000,
    height: 700,
    color: 120
}

let chainBox;
let selectionScreen;
let fxSlots = [];
let state = 0;

function setup() {

    socket = io.connect('http://localhost:3000');
    createCanvas(screen.width, screen.height);

    chainBox = new ChainBox();

    for (let i = 0; i < 4; i++) {
        fxSlots[i] = new EmptySlot(i);
    }
}

function draw() {
    background(screen.color);

    if (state === 0) {
        chainBox.show();
    }
    if (state === 1) {
        selectionScreen.show();
    }
}

function mouseReleased() {
    if (state === 0) {
        for (let i = 0; i < fxSlots.length; i++) {
            fxSlots[i].mouseReleased();
        }
        return
    }

    if (state === 1) {
        selectionScreen.mouseReleased();
        return
    }
}

function rectHitbox(x, y, w, h) {
    let xPos = x - (w / 2);
    let yPos = y - (h / 2);

    return mouseX > xPos && mouseX < xPos + w && mouseY > yPos && mouseY < yPos + h;
}
