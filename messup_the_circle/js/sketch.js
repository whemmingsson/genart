let WP_WIDTH = 600;

// Spikyness - higher value, more spikes
const maxNoise = 50;
let dimOffset;


// Variation
let variation = 250;
let minRadius = 150;
let maxRadius = minRadius + variation;
const defMinRadius = minRadius;
const defMaxRadius = maxRadius;

// Animation speed
let t = 0;
let tOff = 0.001;

// Number of circles
let numCircles = 5;
let minRadiusOff = minRadius / (numCircles);
let maxRadiusOff = maxRadius / numCircles;

function setup() {
  createCanvas(WP_WIDTH, WP_WIDTH);   
  colorMode(HSB);
  background(0);

  noFill();
  stroke(100, 0.005);
  strokeWeight(1);
  //fill(100, 0.01);
}

function draw() {
  //background(0)

    translate(width/2, height/2);
    rotate(t*1.5);

    let hue = map(random(), 0,1, 0,20); 
    for(let i = 0; i < numCircles; i++) { 
     
      stroke(hue,100,90, 0.01);
       dimOffset = i * 1000;
       drawShape();
       minRadius-=minRadiusOff;
       maxRadius-=maxRadiusOff;
    }

    minRadius = defMinRadius;
    maxRadius = defMaxRadius;
    
    t+=tOff;
}
function drawShape() {
  beginShape();
  for (let i = 0; i < TWO_PI; i += TWO_PI / 6) {
    let radius = getRandomRadius(i);
    let x = cos(i) * radius;
    let y = sin(i) * radius;

    vertex(x, y);
  }
  endShape(CLOSE);
}

function getRandomRadius(i) {
  let xOff = map(cos(i), -1, 1, dimOffset, dimOffset + maxNoise);
  let yOff = map(sin(i), -1, 1, dimOffset, dimOffset + maxNoise);

  return  map(noise(xOff, yOff, t), 0, 1, minRadius, maxRadius);
}

