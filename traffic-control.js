class TrafficController {
    next_id = 0;
    registered_lights = [];
    queue_sizes = [];
    frame_rate;

    constructor(frame_rate) {
    	this.frame_rate = frame_rate;
	}

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

    check() {
        for (var i = 0; i < this.registered_lights.length; i++) {
            let tl = this.registered_lights[i];

            // actions
            this.showQueueSize(tl);
            this.setState(tl, this.determaineState(tl));
        }
    }

    setState(tl, state) {
        tl.setState(state);
        tl.update();
    }

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

    showQueueSize(tl) {
        text(tl.getId() + ": " + this.queue_sizes[tl.getId()], 20, 15 + (20 * tl.getId()));
    }

    getRegisteredLights() {
        return "{" + this.next_id + "}";
    }

    getQueueSizeFor(tl) {
        return this.queue_sizes[tl.getId()];
    }

    increaseQueueSizeFor(tl) {
        this.queue_sizes[tl.getId()]++;
    }

    decreaseQueueSizeFor(tl) {
        this.queue_sizes[tl.getId()]--;
    }

    setQueueSize() {
        for (var i = 1; i < this.queue_sizes.length; i++) {
            this.queue_sizes[i] += Math.floor(Math.random() * 11);
        }
    }
}
