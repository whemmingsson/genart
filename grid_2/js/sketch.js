let grid, grid0;

function setup() {
  createCanvas(701, 701);   
  colorMode(HSB);
  ellipseMode(CORNER);

  //Cones
  //grid = new Grid(10,10, SHAPES.drawConeShape);

  //One diagonal line per cell, with two layers
  //grid0 = new Grid(50,50, SHAPES.drawDiagonalLine0);
  //grid = new Grid(25,25, SHAPES.drawDiagonalLine);

  //Multiple diagonal lines per cell
  grid = new Grid(2,2);
}

function draw() {
  background(255);
  
  /*
  grid0.draw();
  grid.draw();
  */

  grid.draw();



  noLoop();
}