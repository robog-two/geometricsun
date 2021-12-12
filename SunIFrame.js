let positions = [];
let invert = [];

let radius;
let flareRad;
let repel;
let smallest = 0;

let colors;

function setup() {
  let hwidth = window.location.hash?.split("#")[1]?.split(",")[0];
  let hheight = window.location.hash?.split("#")[1]?.split(",")[1];
  createCanvas(hwidth ?? document.documentElement.clientWidth, hheight ?? document.documentElement.clientHeight);
  
  if (width > height) {
    smallest = height;
  } else {
    smallest = width;
  }
  
  radius = 0.35 * smallest;
  flareRad = 0.50 * smallest;
  repel = 10;
  
  colors = [
    color(255, 139, 0),
    color(255, 128, 0),
    color(255, 153, 0),
  ]
  
  for (let i = 0; i < 11; i++) {
    positions.push(map(i, 0, 10, 1, 360));
    invert.push(false);
  }
}

function draw() {
  clear();
  translate(width/2, height/2);
  
  noStroke();
  
  fill(colors[0]);
  beginShape();
  radial(positions[0], flareRad);
  radial(positions[5], flareRad);
  radial(positions[2], flareRad);
  endShape(CLOSE);
  
  fill(colors[1]);
  quadtri(
    positions[3],
    positions[9],
    positions[1],
    positions[6],
  );
  
  fill(colors[2]);
  quadtri(
    positions[7],
    positions[8],
    positions[4],
    positions[10],
  );
  
  for (let i = 0; i < 11; i++)  {
    let vel = (0.5 * sin(millis()/(1500 + (100 * i)))) + 0.3;
    if (invert[i]) {
      positions[i] += vel;
    } else {
      positions[i] -= vel;
    }
    
    for (let i2 = 0; i2 < 11; i2++) {
      if (
        i != i2 &&
        positions[i] > positions[i2] - repel &&
        positions[i] < positions[i2] + repel
      ) {
        if (positions[i] < positions[i2]) {
          positions[i] = positions[i2] - repel;
        } else {
          positions[i] = positions[i2] + repel;
        }
        invert[i] = !invert[i];
      }
    }
    
    if (positions[i] >= 360) { positions[i] -= 360; }
    if (positions[i] < 0) { positions[i] += 360; }
  }
  
  fill(255, 255, 162);
  circle(0, 0, radius * 2);
}

function radial(angle, radius) {
  vertex(
    cos(radians(angle)) * radius,
    sin(radians(angle)) * radius,
  );
}

function quadtri(one, two, three, four) {
  beginShape();
  radial(one, flareRad);
  radial(two, flareRad);
  radial(three, flareRad);
  endShape(CLOSE);
  beginShape();
  radial(one, flareRad);
  radial(two, flareRad);
  radial(four, flareRad);
  endShape(CLOSE);
  beginShape();
  radial(two, flareRad);
  radial(three, flareRad);
  radial(four, flareRad);
  endShape(CLOSE);
  beginShape();
  radial(one, flareRad);
  radial(three, flareRad);
  radial(four, flareRad);
  endShape(CLOSE);
}
