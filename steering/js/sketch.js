const WIDTH = 400;
const HEIGHT = 400;
const NUM_VEHICLES = 25;

let v;
let vehicles = [];
let mouse;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  mouse = new MouseTarget();

  for(let i = 0; i < NUM_VEHICLES; i++) {
    const v = new Vehicle(
      random(0, WIDTH),
      random(0, HEIGHT),
      random(4,7),
      random(10,20) / 100,
      random(2,10)
    );

   if(i < NUM_VEHICLES/2) {
      v.setBehavior('flee');
    }

    vehicles.push(v);
  } 
}

function draw() {
  background(50);

  vehicles.forEach((v => {

    // A random chance to check for switching behaviour
  //  if(prob(0.01))
      v.switchBehavior(mouse.getPosition());

    v.performBehavior(mouse.getPosition());
    v.update();
    v.checkEdges();
    v.render();
  }));

  mouse.update();
  mouse.render();  
}

function prob(chance) {
  const r = random(1);
  return r <= chance;
}