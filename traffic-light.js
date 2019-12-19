class TrafficLight {
    x_location;
    y_location;
    state;

    id;

    dependentOn = [];

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x_location = x;
        this.y_location = y;
        this.state = 0x1;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setState(state) {
        this.state = state;
    }

    getState() {
        return this.state;
    }

    pushDependentOn(id) {
        this.dependentOn.push(id);
    }

    getDependentOn() {
        return this.dependentOn;
    }

    getXPostion() {
        return this.x_location;
    }

    getYPostion() {
        return this.y_location;
    }

    show() {
        push();
        noStroke();
        noFill();

        // board
        fill(0);
        rect(this.x_location, this.y_location, 75, 200, 100, 100, 100, 100);

        // red
        fill(255, 0, 0, this.isOn(this.state, 0));
        circle(this.x_location + 75 / 2, this.y_location + 45, 50);
        // yellow
        fill(255, 204, 50, this.isOn(this.state, 1));
        circle(this.x_location + 75 / 2, this.y_location + 100, 50);
        // green
        fill(0, 255, 0, this.isOn(this.state, 2));
        circle(this.x_location + 75 / 2, this.y_location + 155, 50);

        pop();
    }

    isOn(val, shift) {
        return 80 + 255 * ((val >> shift) & 1);
    }
}