class Road {
    x_location;
    y_location;
    trafficController;

    vehicles = [];

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

    /**
     * @param {Vehicle} vehicle
     */
    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
    }

    update() {
        this.show();
        this.showVehicles();

        for (let i = 0; i < this.vehicles.length; i++) {
            let curVehicle = this.vehicles[i];

            // actions
            this.showVehiclesPosition(curVehicle);
            if (curVehicle.getXPostion() === 195) {
                this.trafficController.registrateVehicle();
            }

            // update vehicles on this road
            curVehicle.update();
        }
    }

    registrateVehicle() {
        this.trafficController.registrateVehicle();
    }

    /**
     * @param {Vehicle} v
     */
    showVehiclesPosition(v) {
        if (debug_mode) {
            text("car" + v.getId() + ": " + v.getXPostion(), 20, 300 + (20 * v.getId()));
        }
    }

    showVehicles() {
        if (debug_mode) {
            text("total vehicles: " + this.vehicles.length, 20, 455);
        }
    }

    show() {
        push();
        fill(230);
        rect(this.x_location, this.y_location, width, 30);
        pop();
    }
}