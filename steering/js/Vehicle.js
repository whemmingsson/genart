class Vehicle {
	constructor(x, y, mS, mF, r) {
        this.maxSpeed = mS;
        this.maxForce = mF;
        this.r = r;
        this.position = createVector(x,y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0,0);
        this.setBehavior('seek');
	}

  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  _calcSeekForce(target) {
    const desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxSpeed);

    // Steering = Desired minus velocity
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce); // Limit to maximum steering force

    return steer;
  }

  setBehavior(behavior) {
      this.behavior = behavior;
      this.setColor();
  }
  
  setColor() {
    if(this.behavior === 'seek') {
        this.color = color(50, random(150,255), 70);
    }
    else if(this.behavior === 'flee') {
        this.color = color(random(150,255), 20 , 30);
    }
  }

  performBehavior(target) {
      if(this.behavior === 'seek')
        this.seek(target);
      else if(this.behavior === 'flee')
        this.flee(target);
  }

  seek(target) {
    const force = this._calcSeekForce(target);
    this.applyForce(force);
  }

  flee(target) {
    const force = this._calcSeekForce(target).mult(-1);
    this.applyForce(force);
  }

  switchBehavior(target) {
      const distance = dist(this.position.x, this.position.y, target.x, target.y);

     // console.log(distance);

      if(this.behavior === 'seek' && distance < 20) {
        this.setBehavior('flee');
        this.velocity.mult(-1);
      }
      else if(this.behavior === 'flee' && distance > 300) {
        this.setBehavior('seek');
      }
  }

  applyForce(force){
    this.acceleration.add(force);
  }

  checkEdges() {
    if(this.position.x > WIDTH) {
      this.position.x = 0;
    }

    if(this.position.x  < 0) {
      this.position.x = WIDTH;
    }

    if(this.position.y > HEIGHT) {
      this.position.y = 0;
    }

    if(this.position.y < 0) {
      this.position.y = HEIGHT;
    }
  }
  
  render() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading() + PI / 2);
    this.drawTriangle(this.r);  
    pop();
  }

  drawTriangle(r) {
    const xOver2  = Math.cos(PI/6) * r;
    const y = Math.sin(PI/6) * r;

    noStroke();
    fill(this.color);

    beginShape();
    vertex(0, -r*1.3);
    vertex(-xOver2, y);
    vertex(xOver2, y);
    endShape(CLOSE);
  } 	
}