class TrafficController {
    next_id = 0;
    registered_lights = [];
    queue_sizes = [];
    frame_rate;

    /**
     * @param {Number} frame_rate
     */
    constructor(frame_rate) {
    	this.frame_rate = frame_rate;
	}

    /**
     * @param {TrafficLight} trafficLight
     */
    register(trafficLight) {
        trafficLight.setId(this.next_id);
        this.registered_lights.push(trafficLight);
        this.queue_sizes.push(0);
        this.determaineDependentTrafficLights(trafficLight);
        this.next_id++;
    }

    determaineDependentTrafficLights(tl) {
        if (tl.getId() > 0) {
            tl.pushDependentOn(tl.getId() - 1);
        }
        tl.pushDependentOn(tl.getId() + 1);
    }

    update() {
        for (let i = 0; i < this.registered_lights.length; i++) {
            let tl = this.registered_lights[i];

            // actions
            this.showQueueSize(tl);
            this.setState(tl, this.determaineState(tl));
        }
        this.showRegisteredLights();
    }

    /**
     * @param {TrafficLight} tl
     * @param {Number} state
     */
    setState(tl, state) {
        tl.setState(state);
        tl.show();
    }

    /**
     * @param {TrafficLight} tl
     */
    determaineState(tl) {
        const red = 0x1;
        const yellow = 0x2;
        const green = 0x4;

        // update state traffic light per second.
		if (frameCount % frame_rate !== 0) {
			return tl.getState();
		}

        if (this.isDependentOnTrafficLights(tl)) {
            // return red light when one of the dependent
            // traffic lights' state is green.
            return red;
        }

        let queueSize = this.getQueueSizeFor(tl);

        if (queueSize > 0) {
            this.decreaseQueueSizeFor(tl);
            return green;
        } else if (tl.getState() === green) {
            return yellow;
        }

        return red;
    }

    /**
     * @param {TrafficLight} tl
     */
    isDependentOnTrafficLights(tl) {
        let dep = tl.getDependentOn();

        for (var i = 0; i < dep.length; i++) {
            let dtl = this.registered_lights[dep[i]];
            if (dtl && dtl.getState() === 0x4) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {TrafficLight} tl
     */
    showQueueSize(tl) {
        if (debug_mode) {
            text(tl.getId() + ": " + this.queue_sizes[tl.getId()], 20, 15 + (20 * tl.getId()));
        }
    }

    showRegisteredLights() {
        if (debug_mode) {
            text("Registered: " + this.next_id, 20, 475);
        }
    }

    getQueueSizeFor(tl) {
        // TODO: determaine if there is traffic waiting
        return this.queue_sizes[tl.getId()];
    }

    /**
     * @param {TrafficLight} tl
     */
    increaseQueueSizeFor(tl) {
        this.queue_sizes[tl.getId()]++;
    }

    /**
     * @param {TrafficLight} tl
     */
    decreaseQueueSizeFor(tl) {
        this.queue_sizes[tl.getId()]--;
    }

    setQueueSize() {
        for (var i = 1; i < this.queue_sizes.length; i++) {
            this.queue_sizes[i] += Math.floor(Math.random() * 11);
        }
    }

    // methods for vehicles
    registrateVehicle() {
        let tl = this.registered_lights[0];
        this.increaseQueueSizeFor(tl);
    }

    isGreen() {
        let tl = this.registered_lights[0];
        return tl.getState() === 0x4;
    }
}
