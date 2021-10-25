const WP_WIDTH = 700;
const WP_HEIGHT = 400;
const NUM_POINTS = 300;

let amplitude = 75;
let freq = 3.1;
let phase = 0;
let t = 0;
const tOff = 0.001;

let minY, maxY;


function setup() {
  createCanvas(WP_WIDTH, WP_WIDTH);   
  colorMode(HSB);
  background(0);

  noFill();
  stroke(100,1);
  strokeWeight(1);
  //fill(100, 0.01);

  minY = 10000;
  maxY = 0;

  for(let i = 0; i < NUM_POINTS+1; i++) {
    let amp = amplitude;    
    const y = fSin(i, amp);

    if(y < minY)
      minY = y;

    if(y > maxY)
      maxY = y;   
  }

  console.log(minY, maxY);
}

function draw() {
  background(0)

  const distance = WP_WIDTH/NUM_POINTS;
  beginShape();
  for(let i = -100; i < NUM_POINTS+100; i++) {   
    const x = i*distance + cos(i/3-phase/2)*75;
    const y = fSin(i, amplitude);
    vertex(x, y); 
    if(i%25 == 0) {
      //fill(map(y,minY, maxY, 0, 360), 100,100);
      ellipse(x,y,y/10);
    }
    noFill();

  }
  endShape();

  phase+=0.01;
  t+=tOff;

}

function fSin(x, amp) {
  let a = map(x, 0, NUM_POINTS+1, 0, TWO_PI);
  return amp*sin(a*freq + phase) + 
  amp*2*sin(a*freq/10 + phase) - 
  amp*1.3*cos(a*freq/2+ phase+100) + 
  height/2;
}


