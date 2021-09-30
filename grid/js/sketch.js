let xOffSlider;
let xOff = 0;

let yOffSlider;
let yOff = 0;

let radius = 200;
let count = 10;
let shrinkStepSize = (radius*2)/count;

function setup() {
  createCanvas(500, 500);   
  colorMode(HSB);
  noFill();

  xOffSlider = createSlider(-radius*2 / count, 0, 0, 1);
  yOffSlider = createSlider(-radius*2 / count, 0, (-radius*2 / count) / 2, 1);
}

function draw() {
  background(255);

  xOff = xOffSlider.value();
  yOff = yOffSlider.value();

  drawHelperLines();
  drawShape(width/2, height/2);

 // noLoop();
}

function drawHelperLines(){
  stroke(255, 0, 0);
  line(0, height/2, width, height/2);
  line(width/2, 0, width/2, height);
}

function drawShape(x,y) {
  //stroke(0);
  noStroke();
  push();
  translate(x,y);

  let brightnessStep = 100 / count;
  for(let i = 0; i < count; i++){
    let w = radius * 2 - i * shrinkStepSize;

    // Color
    fill(20,100, brightnessStep * i +5);

    // Animated method
    let x = i * shrinkStepSize / 2 + map(cos(frameCount/25), -1, 1, -radius * 2 / count, 0) * i;
    let y = i * shrinkStepSize / 2 + map(sin(frameCount/25), -1, 1, -radius * 2 / count, 0) * i;
    
    // Slider method
    //let x = i*shrinkStepSize/2 + xOff * i;
    //let x = i*shrinkStepSize/2 + yOff * i;

    ellipse(x, y, w);
  }
  
  pop();
}

function generateRandom(min, max) {
 const baseValue =  random(min, max);
 return baseValue * (random(1,2) === 1 ? 1 : -1);
}

