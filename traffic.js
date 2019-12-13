// Traffic light simulator
var frame_rate = 2;

function setup() {
  createCanvas(800, 500);
  frameRate(frame_rate);

  // create traffic lights
  tl1 = new TrafficLight(100, 100);
  tl2 = new TrafficLight(250, 100);
  tl3 = new TrafficLight(400, 100);

  // create traffic controller and register the traffic lights
  tc = new TrafficController();
  tc.register(tl1);
  tc.register(tl2);
  tc.register(tl3);
}

function draw() {
	if (frameCount % frame_rate !== 0) {
		return;
	}

	background(230);
	text("Registered: " + tc.getRegisteredLights(), 20, 475);

	tc.check();
}

function mousePressed() {
	tc.setQueueSize();
}
