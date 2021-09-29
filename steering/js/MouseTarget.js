class MouseTarget {
    constructor() {
        this.position = createVector(mouseX, mouseY);
    }

    getPosition() {
        return this.position;
    }

    update() {
        this.position.x = mouseX;
        this.position.y = mouseY;
    }

    render() {
        fill(127);
        stroke(200);
        strokeWeight(2);
        ellipse(this.position.x, this.position.y, 20, 20);
    }
}