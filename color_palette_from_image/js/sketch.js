let img;
let colors = [];
let cellSize;
let sortMode = null;
let sortModeMap = null;

const CELL_COUNT = 50;

function preload() {
  img = loadImage("../img/monalisa.png")
}

function setup() {
  createCanvas(700, 700);  
  ellipseMode(CORNER);

  initDefaultValues();
  createColorArrayFromImage(); 
}

function draw() {
  background(0);
  sortColors();
  renderCells(cellSize);
}

function createColorArrayFromImage() {
  img.loadPixels();

  for (let y = 0; y < CELL_COUNT; y++) {
    for (let x = 0; x < CELL_COUNT; x++) {
      colors.push(createColor(x, y, cellSize));
    }
  }
}

function initDefaultValues() {
  sortModeMap = { h: hue, s: saturation, b:brightness, 1: red, 2: green, 3: blue };
  cellSize = width / CELL_COUNT;
  sortMode = hue;
}

function keyTyped() {
  if(sortModeMap[key])
    sortMode = sortModeMap[key];
  return false;
}

function renderCells(cellSize) {
  noStroke();
  let i = 0;
  for (let y = 0; y < CELL_COUNT; y++) {
    for (let x = 0; x < CELL_COUNT; x++) {
      fill(colors[i]);
      ellipse(x * cellSize, y * cellSize,cellSize, cellSize)
      // rect(x * cellSize, y * cellSize, cellSize, cellSize);
      i++;
    }
  }
}

function createColor(x, y, cellSize){
  const index = (int(y*cellSize) * img.width + int(x*cellSize)) * 4;
  return color(img.pixels[index], img.pixels[index+1], img.pixels[index+2], 255);
}

function sortColors(){
  colors.sort((a,b) => colorCompare(a,b, sortMode));
}

function colorCompare(a,b, method) {
  return method(a) - method(b);
}