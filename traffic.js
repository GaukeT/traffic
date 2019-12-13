// Traffic light simulator
var frame_rate = 50;
var moving_car_x = 0;

function setup() {
    createCanvas(600, 500);
    frameRate(frame_rate);

    // create traffic light
    tl = new TrafficLight(width / 2, 25);

    // create traffic controller and register the traffic lights
    tc = new TrafficController(frame_rate);
    tc.register(tl);
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

    if (tc.getQueueSizeFor(tl) === 0) {
        moving_car_x++;
        if (moving_car_x === width / 2 - 5) {
            tc.setQueueSizeFor(tl, "+")
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