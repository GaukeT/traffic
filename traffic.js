// Traffic light simulator
const frame_rate = 50;
let debug_mode = true;

function setup() {
    createCanvas(600, 500);
    frameRate(frame_rate);

    // create traffic lights
    tl0 = new TrafficLight(200, 25);
    tl1 = new TrafficLight(400, 275);
    tl2 = new TrafficLight(500, 275);

    // create traffic controller and register the traffic lights
    tc = new TrafficController(frame_rate);
    tc.register(tl0);
    tc.register(tl1);
    tc.register(tl2);

    // create traffic
    car0 = new Vehicle(tc,20, height / 2);
    car1 = new Vehicle(tc,70, height / 2);

    // create road
    road1 = new Road(tc,0, height / 2 - 15);
    road1.addVehicle(car0);
    road1.addVehicle(car1);
}

function draw() {
    background(130, 170, 130);

    road1.update();
    tc.update();
}

// helper for random queue sizes
function mousePressed() {
    tc.setQueueSize();
}

// helper for disable or enable debug mode
function keyTyped() {
    if (key === "d") {
        debug_mode = !debug_mode;
    }
    return false;
}