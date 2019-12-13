class TrafficController {
	next_id = 0;
	registered_lights = []; 
	queue_sizes = [];

	register(trafficLight) {
		trafficLight.setId(this.next_id);
		this.registered_lights.push(trafficLight);
		this.queue_sizes.push(0);
		this.next_id++;
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
			this.queue_sizes[i] += Math.floor(Math.random() * 10) +1;
 		}
	}
}


class TrafficLightData {
	currentTrafficLight;
	dependentOn = [];
	queueSize = 0;

	constructor(tl) {
		this.currentTrafficLight = tl;
	}

	setQueueSize(size) {
		this.queueSize = size;
	}

	setDependentOn(id) {
		this.dependentOn.push(id);
	}
}