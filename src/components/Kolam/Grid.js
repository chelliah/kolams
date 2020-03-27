const PI = Math.PI;
export default class Grid {
  constructor(ctx, n, gridItemSize, inputVal) {
    this.ctx = ctx;
    this.n = n;
    this.nGrid = n + 1;
    this.gridItemSize = gridItemSize;
    this.gridSlots = [];
    this.dots = [];
    this.inputVal = inputVal;


    this.setNumDots();

    for(let i = 0; i < this.nGrid*this.nGrid; i++) {
      let row = Math.floor(i/this.nGrid);
      let col = i % this.nGrid;
      this.gridSlots.push( new GridItem(
        this.ctx,
        col * (this.gridItemSize),
        row * (this.gridItemSize),
        this.gridItemSize
      ))

      if(row > 0 && row < this.nGrid && col > 0 && col < this.nGrid) {
        let addDot = (col % 2 == 1 && row % 2 == 1) || (col % 2 == 0 && row % 2 == 0)
        if(addDot) {
          this.dots.push(new Dot(
            this.ctx,
            col * (this.gridItemSize),
            row * (this.gridItemSize),
            this.gridItemSize,
            i - this.nGrid - 1,
            i - this.nGrid,
            i - 1,
            i,
            this.hasConnection.bind(this)
          ))
        }
      }
    }

    this.setGridConnections();
  }

  setGridConnections() {
    let letters = this.inputVal.split('');

    let binaryInputs = letters.reduce((string, currLetter) => {
      string += parseInt(currLetter, 16).toString(2);
      return string;
    }, "").split("")
    let binaryInputIndex = 0;
    console.log('hii', this.inputVal, binaryInputs)

    for(let i = 0; i < this.nGrid*this.nGrid; i++) {
      let row = Math.floor(i/this.nGrid);
      let col = i % this.nGrid;

      if(row > 0 && row < this.n && col > 0 && col < this.n) {
        this.gridSlots[i].setConnection(binaryInputs[binaryInputIndex]);
        binaryInputIndex += 1;
      }
    }
  }

  hasNeighbor(gridSlot, originQuadrant) {
    let quadrant =`${originQuadrant.indexOf('top') >= 0 ? 'top' : 'bottom'}${originQuadrant.indexOf('Left') >= 0 ? 'Left' : 'Right'}`

    this.dots.forEach(dot => {
      if(dot.quadrants[quadrant] == gridSlot) {
        console.log('hiiiii')
      }
    })
  }

  hasConnection(i) {
    return !!this.gridSlots[i].connection
  }

  setNumDots() {
    let dotsInCurrentRow = this.n;
    let numDots = dotsInCurrentRow;

    while(dotsInCurrentRow >= 1) {
      dotsInCurrentRow -= 2;
      numDots += dotsInCurrentRow*2;
    }

    this.numDots = numDots;
  }

  draw() {
    this.ctx.fillStyle = '#ff00ff55';
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#000';
    // this.gridSlots.forEach(gridItem  => gridItem.draw() )
    this.dots.forEach(dot => dot.draw())
  }
}

class GridItem {
  constructor(ctx, x, y, size) {
    this.ctx = ctx;
    this.x = Math.ceil(x);
    this.y = Math.ceil(y);
    this.size = Math.floor(size);
    this.connection = 0;
  }

  // 0 or 1 value to represent weather a connection takes place
  setConnection(isConnectedBin) {
    console.log('setting!', isConnectedBin)
    this.connection = isConnectedBin;
  }

  draw() {

    if(this.connection) {
      
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
    } else {

      this.ctx.strokeRect(this.x, this.y, this.size, this.size);
    }
  }

}

class Dot {
  constructor(ctx, x, y, size, topLeftIndex, topRightIndex, bottomLeftIndex, bottomRightIndex, hasConnection) {
    this.ctx = ctx;
    this.x = Math.ceil(x);
    this.y = Math.ceil(y);
    this.size = Math.floor(size);
    this.hasConnection = hasConnection;

    this.quadrants = {
      topLeft: topLeftIndex,
      topRight: topRightIndex,
      bottomLeft: bottomLeftIndex,
      bottomRight: bottomRightIndex
    }


  }

  draw() {

    this.ctx.beginPath();
    this.ctx.ellipse(this.x, this.y, 4, 4, 0, 0, PI * 2)
    this.ctx.stroke();

    let half = Math.ceil(this.size/2)


    if(!this.hasConnection(this.quadrants.bottomLeft)) {
      console.log('hii', this.x, this.y, this.hasConnection(this.quadrants.bottomRight))

    }

    // console.log('hiii', this.hasConnection(this.quadrants.topLeft))
    if(this.hasConnection(this.quadrants.topLeft)) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x - half, this.y);
      this.ctx.lineTo(this.x - half, this.y - half);
      this.ctx.lineTo(this.x, this.y - half);
      this.ctx.stroke()
    } else {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, half, PI, PI * 3/2);
      this.ctx.stroke()
    }

    // console.log('hiii', this.hasConnection(this.quadrants.topLeft))
    if(this.hasConnection(this.quadrants.topRight)) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x + half, this.y);
      this.ctx.lineTo(this.x + half, this.y - half);
      this.ctx.lineTo(this.x, this.y - half);
      this.ctx.stroke()
    } else {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, half, PI * 3/2, 0);
      this.ctx.stroke()
    }

    // console.log('hiii', this.hasConnection(this.quadrants.topLeft))
    if(this.hasConnection(this.quadrants.bottomLeft)) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x - half, this.y);
      this.ctx.lineTo(this.x - half, this.y + half);
      this.ctx.lineTo(this.x, this.y + half);
      this.ctx.stroke()
    } else {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, half, PI/2, PI);
      this.ctx.stroke()
    }


    if(this.hasConnection(this.quadrants.bottomRight)) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x + half, this.y);
      this.ctx.lineTo(this.x + half, this.y + half);
      this.ctx.lineTo(this.x, this.y + half);
      this.ctx.stroke()
    } else {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, half, 0, PI/2);
      this.ctx.stroke()
    }
  }
}