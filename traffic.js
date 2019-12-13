// Traffic light simulator
var frame_rate = 50;
var moving_car_x = 0;

function setup() {
    createCanvas(600, 500);
    frameRate(frame_rate);

    // create traffic light
    let tl0 = new TrafficLight(width / 2 - 75, 25);
    let tl1 = new TrafficLight(400, 275);
    let tl2 = new TrafficLight(500, 275);

    // create traffic controller and register the traffic lights
    let tc = new TrafficController(frame_rate);
    tc.register(tl0);
    tc.register(tl1);
    tc.register(tl2);
}

function draw() {
    background(130, 170, 130);
    text("Registered: " + tc.getRegisteredLights(), 20, 475);

    // create a road with moving objects //
    this.createRoad();
    this.createTraffic();

    tc.check();
}

function mousePressed() {
    tc.setQueueSize();
}

function createTraffic() {
    if (moving_car_x > width) {
        moving_car_x = 0;
    }

    if (tc.getQueueSizeFor(tl0) === 0) {
        moving_car_x++;
        if (moving_car_x === width / 2 - 80) {
            tc.setQueueSizeFor(tl0, "+")
        }
    }

    push();
    fill(150);
    rect(moving_car_x, height / 2, 15, 10);
    pop();
}

function createRoad() {
    push();
    fill(230);
    rect(0, height / 2 - 15, width, 30);
    pop();
}