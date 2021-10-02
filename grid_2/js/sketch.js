
let grid;

function setup() {
  createCanvas(701, 701);   
  colorMode(HSB);
  ellipseMode(CORNER);
  //grid = new Grid(10,10, drawConeShape);
  grid = new Grid(25,25, drawDiagonalLine);
}

function draw() {
  background(0);
  grid.draw();
  noLoop();
}

function drawConeShape(x,y,w,h) {
  let radius = w/2;
  let count = 7;
  let shrinkStepSize = (radius*2)/count;
  const angle = generateRandom(-TWO_PI, TWO_PI);
  const xOff = map(cos(angle), -1, 1, -radius  / count, radius/count) * random(0.7,0.9);
  const yOff = map(sin(angle), -1, 1, -radius  / count, radius/count) * random(0.7,0.9);

  translate(x, y);

  stroke(0);
  //const randomHue = random(360);
  for(let i = 0; i < count; i++){
    let w = radius * 2 - i * shrinkStepSize;

    // Determine color
    //fill(randomHue, 75, 10 + i * ((100-10)/count ));
    
    // Determine cone "offset"
    let x = i * shrinkStepSize/2 + xOff * i;
    let y = i * shrinkStepSize/2 + yOff * i;
     
    ellipse(x, y, w);
  } 
}

function drawDiagonalLine(x,y,w,h) {
  translate(x, y);

  let fatLine = coinFlip(-0.15);

  strokeWeight(fatLine ? 10 : 5);

  if(fatLine) {
    stroke(150,80,70);
    strokeCap(ROUND);
  }
  else {
    stroke(20);
    strokeCap(SQUARE);
  }

  if(coinFlip()) {
    line(0,0, w,h);
  }else {
    line(w,0,0,h);
  }

}

function coinFlip(bias) {
  if(!bias) bias = 0;

  let r =  random(1,2);
  return r < 1.5 + bias;
}
