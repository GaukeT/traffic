class TrafficController {
	next_id = 0;
	registered_lights = []; 
	queue_sizes = [];

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
			tl.pushDependentOn(tl.getId() + 1);
		}
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
		// green, yellow, red
		// state = [0x4, 0x2, 0x1];

		if (this.isDependentOnTrafficLights(tl)) {
			// return red light when one of the dependent 
			// traffic lights' state is green.
			return 0x1;
		}

		let queueSize = this.getQueueSizeFor(tl);

		if (queueSize > 0) {
			this.setQueueSizeFor(tl);
			return 0x4;
		} else {
			if (tl.getState() === 0x4) {
				return 0x2;
			}
		}

		return 0x1;
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
		return this.queue_sizes[tl.getId(0)];
	}

	setQueueSizeFor(tl) {
		return this.queue_sizes[tl.getId(0)]--;
	}

	setQueueSize() {
		for (var i = 0; i < this.queue_sizes.length; i++) {		
			this.queue_sizes[i] += Math.floor(Math.random() * 11);
 		}
	}
}
