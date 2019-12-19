class Vehicle {
    x_location;
    y_location;
    id = Math.floor(Math.random() * 10);

    /**
     * @param {TrafficController} tc
     * @param {number} x
     * @param {number} y
     */
    constructor(tc, x, y) {
        this.trafficController = tc;
        this.x_location = x;
        this.y_location = y;
    }

    update() {
        if (this.x_location === 200) {
            this.trafficController.isGreen() ? this.move() : this.stop();
        } else {
            this.move();
        }

        this.show();
    }

    move() {
        if (this.x_location > width) {
            this.x_location = 0;
        }

        this.x_location++;
    }

    stop() {}

    getId() {

    }

    getXPostion() {
        return this.x_location;
    }

    getYPostion() {
        return this.y_location;
    }

    show() {
        push();
        if (debug_mode) {
            text("" + this.x_location, this.x_location, this.y_location - 2);
        }
        fill(150);
        rect(this.x_location, this.y_location, 15, 10);
        pop();
    }
}