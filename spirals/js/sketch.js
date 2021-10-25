const WP_WIDTH = 600;

let R,r,d;
let a = 0;
let speed = 0.05;
let cx, cy;

let spiral;

function setup() {
  createCanvas(WP_WIDTH, WP_WIDTH);   
  colorMode(HSB);

  cx = width/2;
  cy = height/2;

  console.log("R: " + R);
  console.log("r: " + r);

  spiral = createGraphics(WP_WIDTH, WP_WIDTH);
  spiral.colorMode(HSB);

   R = 300;
   r = 376;
   d = 150;
}

function draw() {
  for(let i = 0; i < 150; i++) {
    background(10);
    
    let [x,y] = generateHypotrochoid();
    //drawGeometry(x,y);
    a+=speed;

    // Draw the spiral
    let dToCenter = dist(cx,cy,x,y);
    let hue = map(dToCenter, 0, width, 0, 25);
    let brightness = map(dToCenter, 0, width/2, 100, 25);
    spiral.noStroke();
    spiral.fill(hue, 100, brightness);
    spiral.ellipse(x,y, 2, 2);
    image(spiral, 0, 0);
  }
}


function generateHypotrochoid() {
  let dR = R - r;
  let dA = (dR/r)*a;

  let x = cx + dR*cos(a) + d * cos(dA);
  let y = cy + dR*sin(a) - d * sin(dA);

  return [x,y];
}

function drawGeometry(pX, pY) {
  stroke(100);

  // Inner circle R
  noFill();
  ellipse(cx, cy, R * 2, R * 2);

  fill(100)
  ellipse(cy, cx, 5, 5);

  // Outer circle r
  let rX = cx + (R-r) * cos(a);
  let rY = cy + (R-r) * sin(a);
  noFill();
  ellipse(rX, rY, r * 2, r * 2);
  fill(100);
  ellipse(rX, rY, 5, 5);

  stroke(100, 1);
  if(pX && pY) {
    line(rX, rY, pX, pY);
  }

}

