
/* Collection of drawing functions that draws a shape on position x,y
   Requires: P5.js base script */
const SHAPES = {

    drawConeShape : (x,y,w,h) => {
        const radius = w/2;
        const count = 7;
        const shrinkStepSize = (radius*2)/count;
        const angle = generateRandom(-TWO_PI, TWO_PI);
        const xOff = map(cos(angle), -1, 1, -radius  / count, radius/count) * random(0.7,0.9);
        const yOff = map(sin(angle), -1, 1, -radius  / count, radius/count) * random(0.7,0.9);
      
        translate(x, y);
      
        stroke(0);
        //const randomHue = random(360);
        for(let i = 0; i < count; i++){
          const w = radius * 2 - i * shrinkStepSize;
      
          // Determine color
          //fill(randomHue, 75, 10 + i * ((100-10)/count ));
          
          // Determine cone "offset"
          const x = i * shrinkStepSize/2 + xOff * i;
          const y = i * shrinkStepSize/2 + yOff * i;
           
          ellipse(x, y, w);
        } 
      },

      drawDiagonalLine : (x,y,w,h) => {
        translate(x, y);
      
        const fatLine = SHAPES.helpers.coinFlip(-0.15);
      
        strokeWeight(fatLine ? 10 : 5);
      
        if(fatLine) {
          stroke(150,80,80);
          strokeCap(ROUND);
        }
        else {
          stroke(25);
          strokeCap(SQUARE);
        }
      
        if(SHAPES.helpers.coinFlip()) {
          line(0,0, w,h);
        }else {
          line(w,0,0,h);
        }
      },
      
      drawDiagonalLine0 : (x,y,w,h) => {
        translate(x, y);
      
        const fatLine = SHAPES.helpers.coinFlip(-0.25);
      
        strokeWeight(fatLine ? 6 : 3);
      
        if(fatLine) {
          stroke(150,80,35);
          strokeCap(ROUND);
        }
        else {
          stroke(10);
          strokeCap(SQUARE);
        }
      
        if(SHAPES.helpers.coinFlip()) {
          line(0,0, w,h);
        }else {
          line(w,0,0,h);
        }
      },

      drawDiagonalLines : (x,y,w,h) => {
          const count = 4;
          const stepSizeX = (w) / count;
          const stepSizeY = (h) / count;

          translate(x, y);
          stroke(100);
          strokeWeight(2);
          strokeCap(PROJECT);

          const maybeColorLine = () => {
            if(SHAPES.helpers.percentChance(10)) {
                stroke(0,100,100);
            }
            else {
                stroke(100);
            }
          }

          const loop = (drawFunc) => {
            for(let i = 0; i < count; i++){
                maybeColorLine();
                drawFunc(i);
            }
          }

          switch(SHAPES.helpers.randomInt(1,4)) {
            // Top-left
            case 1: loop((i) => line(w - i * stepSizeX, 0, 0 , h - i * stepSizeY)); break;

            // Top-right
            case 2: loop((i) => line(0 + i * stepSizeX, 0, w, h - i * stepSizeY)); break;

            // Bottom-left
            case 3: loop((i) => line(0, i * stepSizeY, w - i * stepSizeX, h)); break;

            // Bottom-right
            case 4: loop((i) => line(w, 0 + i * stepSizeY, 0 + i*stepSizeX , h)); break;           
          }
      },

      drawDiagonalLines0 : (x,y,w,h) => {
        const count = 5;
        const stepSizeX = (w) / count;
        const stepSizeY = (h) / count;

        translate(x, y);

        const fatLine = SHAPES.helpers.coinFlip(-0.45);
    
        strokeWeight(fatLine ? 2 : 1);
        strokeCap(PROJECT);
        stroke(75);

        const quadrant = SHAPES.helpers.randomInt(1,4);
        switch(quadrant) {
            // Top-left
            case 1:
              for(let i = 0; i < count; i++){
                  line(w - i * stepSizeX, 0, 0 , h - i*stepSizeY);
              }
              break;

            // Top-right
            case 2:
              for(let i = 0; i < count; i++){
                  line(0 + i * stepSizeX, 0, w, h - i * stepSizeY);
              }
              break;

             // Bottom-left
             case 3:
              for(let i = 0; i < count; i++){
                  line(0, i*stepSizeY, w - i * stepSizeX, h);
              }
              break;

             // Bottom-right
             case 4:
              for(let i = 0; i < count; i++){
                  line(w, 0 + i * stepSizeY, 0 + i*stepSizeX , h);
              }
              break;
          
        }
    },

      helpers : {
         coinFlip : (bias) => {
            if(!bias) bias = 0;
            return random(1,2) < 1.5 + bias;
          },

          randomInt : (min, max) => {
            return Math.round(random(min, max));
          },

          percentChance : (percent) => {
              return SHAPES.helpers.randomInt(0,100) < percent;
          }
      }
}