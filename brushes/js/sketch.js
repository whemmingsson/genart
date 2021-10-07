
let angle = 0;
let xPos = 0;
let xPosVel = 1;
let running = true;

const variation = 20;
function setup() {
  createCanvas(600, 600);   
  colorMode(HSB);
  noFill();
  background(0);

}

function draw() {
  
  if(!running)
    return;
 

  
  for(let i = 0; i < 10; i++) {
    if(percentChance(15))
       stroke(200, 100, 100, 0.09);
    else if(percentChance(5))
       stroke(210, 100, 100, 0.1);
    else if(percentChance(5))
       stroke(220, 100, 100, 0.1);
    else if(percentChance(5))
       stroke(230, 100, 100, 0.1);
    else
      stroke(0, 0, 100, 0.1);

    const strokeWidth = map(noise(angle/100), 0, 1, 1,5);
    strokeWeight(strokeWidth);

    push();
    translate(width/2 + random(-variation,variation), height/2+ random(-variation, variation));
    rotate(angle);

    //const lineStartPos = 0;
    lineStartPos = map(noise(angle/10), 0, 1, 95, 100);
    const lineStopPos = map(noise(angle/10), 0, 1, 250, 300);

    line(0,lineStartPos, 0, lineStopPos);
    pop();

    angle += random()/2;

    if(xPos >  width - 50 ) {
      xPos -= 1;
      xPosVel = -1;
    }
    if(xPos < 50) {
      xPos += 1;
      xPosVel = 1;
    }

    xPos += xPosVel;
  }
}

function keyTyped() {
  if(key == 'p' ) {
   running =! running;
  }
}

function randomInt (min, max) {
  return Math.round(random(min, max));
}


function percentChance(percent) {
  return randomInt(0,100) < percent;
}


