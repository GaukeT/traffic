// Traffic light simulator
var frame_rate = 2;
var tls = [];

function setup() {
  createCanvas(800, 500);
  frameRate(frame_rate);

  // create traffic lights
  tls.push(new TrafficLight(100, 100));
  tls.push(new TrafficLight(250, 100));
  tls.push(new TrafficLight(400, 100));
  tls.push(new TrafficLight(550, 100));

  // create traffic controller and register the traffic lights
  tc = new TrafficController();
  for (var i = 0; i < tls.length; i++) {
    tc.register(tls[i]);
  }
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
