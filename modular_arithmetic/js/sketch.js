
let mod;
let w;
let WP_WIDTH = 600;
let fontSize = 6;
let modSlider;
let colorMinSlider, colorMaxSlider;

function setup() {
  createCanvas(WP_WIDTH, WP_WIDTH);   
  colorMode(HSB);

  modSlider = createSlider(4, 180, 64, 1);
  colorMinSlider = createSlider(0, 360, 0, 5);
  colorMaxSlider = createSlider(0, 360, 20, 5);
}

function draw() {
  mod = modSlider.value();
  w = WP_WIDTH / (mod-1);
  background(0);

  textSize(fontSize);
  textAlign(CENTER);
  noStroke();

  for(let i = 1; i < mod;i++) {
    for(let j = 1; j < mod;j++) {
      const v = getValue(i,j);
      const hue = getHue(v);
      fill(hue, 100,100);
      rect((i-1)*w, (j-1)*w, w, w);
     
      fill(0);
       //text(v, (i-1)*w + w/2, (j-1)*w + w/2 + fontSize/2);
    }    
    
}

function getValue(i,j) { 
  //return (i + j) % mod;
  return (Math.pow(i, 2) + Math.pow(j, 2)) % mod;
}

function getHue(v) {
  let min = colorMinSlider.value();
  let max = colorMaxSlider.value();

  if(max < min) {
    let t = min;
    min = max;
    max = t;
  }

  return map(v, 1, mod-1, min, max);
}