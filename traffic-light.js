class TrafficLight {
	x_location;
	y_location;
	state;

	id;

	dependentOn = [];

	constructor(x_location, y_location) {
		this.x_location = x_location;
		this.y_location = y_location;
		this.state = 0x1;
	}

	setId(id) {
		this.id = id;
	}

	getId(id) {
		return this.id;
	}

	setState(state) {
		this.state = state;
	}

	getState() {
		return this.state;
	}

	setQueueSize(size) {
		this.queueSize = size;
	}

	getQueueSize() {
		return this.queueSize;
	}

	pushDependentOn(id) {
		this.dependentOn.push(id);
	}

	getDependentOn() {
		return this.dependentOn;
	}

	update() {
		push();
		noStroke();
		noFill();

		// board
		fill(0)
		rect(this.x_location,this.y_location,75,200,100,100,100,100);

		// red
		fill(255,0,0, this.isOn(this.state , 0));
		circle(this.x_location + 75/2, this.y_location+45, 25);
		// yellow
		fill(255,204,50, this.isOn(this.state, 1));
		circle(this.x_location + 75/2, this.y_location+100, 25);
		// green
		fill(0,255,0, this.isOn(this.state, 2));
		circle(this.x_location + 75/2, this.y_location+155, 25);

		pop();
	}

	isOn(val, shift) {
		return 80 + 255 * ((val >> shift) & 1);
	}
}