class Grid {

    constructor(xTileCount, yTilesCount, tileDrawFunc){
        this.w = xTileCount;
        this.h = yTilesCount;
        this.tileSizeWidth = (width) / this.w;
        this.tileSizeHeight = (height) / this.h;
        this.tileDrawFunc = tileDrawFunc || this._getDefaultTileDrawFunc();
    }

    _getDefaultTileDrawFunc() {
        return (x,y,w,h) => {
            translate(x, y);
            noFill();
            stroke(0);
            strokeWeight(2)
            rect(0, 0, w, h);
        }
    }

    draw() {
        for(let i = 0; i < this.h; i++) {
            for(let j = 0; j < this.w; j++) {
                push();
               
                this.tileDrawFunc(
                    this.tileSizeWidth * i, 
                    this.tileSizeHeight * j ,
                    this.tileSizeWidth, 
                    this.tileSizeHeight);

                pop();
            }
        }
    }
}