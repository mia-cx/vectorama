let screen = {
    width: 1000,
    height: 700,
    color: 120
}

let chainBox;
let effectSelectionScreen;
let fxSlots = [];
let state = 0;

let mouseLock = false;

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
        effectSelectionScreen.show();
    }
}

function mousePressed() {
    if (state === 0 && mouseLock === false) {
        for(let i = 0; i < fxSlots.length; i++) {
            fxSlots[i].mousePressed();
        }
        return
    }
}

function mouseReleased() {
    if (state === 0 && mouseLock === false) {
        for (let i = 0; i < fxSlots.length; i++) {
            fxSlots[i].mouseReleased();
        }
        return
    }

    if (state === 1 && mouseLock === false) {
        effectSelectionScreen.mouseReleased();
        return
    }
}

function rectHitbox(x, y, w, h) {
    let xPos = x - (w / 2);
    let yPos = y - (h / 2);

    return mouseX > xPos && mouseX < xPos + w && mouseY > yPos && mouseY < yPos + h;
}

function circleHitbox(x, y, r) {
    let dx = x - mouseX;
    let dy = y - mouseY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < r / 2) {
        return true;
    }
}
