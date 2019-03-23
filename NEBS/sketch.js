
class NEB {
  constructor(name, diameter, missDistance) {
      this.diameter = diameter
      this.radius = diameter/2;
      this.missDistance = missDistance;
      this.name = name;
  }
  //display the neb
  display(){
      stroke(0);
      strokeWeight(0.8);
      fill(255);
      ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

let data = {};
let nebos = [];
let interval;
let newDate = "2015-01-01" //Add user input

function preload(){
  data = loadJSON(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${newDate}&end_date=${newDate}&detailed=true&api_key=OPrjZnv566eCEAqdOqUYER75BZS7SHrigPdb4GTE`)
}

function loadData(){
  for (let i in data.near_earth_objects[newDate]){
      let goodData = data.near_earth_objects[newDate][i];
      let name = goodData['name'];
      let diameter = goodData['estimated_diameter']['meters']['estimated_diameter_max'];
      let missDistance = goodData['close_approach_data'][0]['miss_distance']['kilometers'];
      if(!nebos.includes(nebos[i])){
        nebos.push(new NEB(name, diameter, missDistance));

      }
  }
}

function mousePressed(){
  noLoop()
}

function setup() {
    let mycanvas = createCanvas(600, 600, WEBGL);
    mycanvas.parent('animation');
    loadData();
    interval = setInterval(makeNEBS, 200)
}

function makeNEBS(){
  for(let i = 0; i < nebos.length; i++){
    ellipse(random(-nebos[i]['missDistance']/1000, nebos[i]['missDistance']/1000), random(0, nebos[i]['missDistance']/1000), nebos[i]['diameter']/10, nebos[i]['diameter']/10)
    fill(255)
  }
}

function draw() {
  background(0);
  sphere(65);
  
  for(let i = 0; i < nebos.length; i++){
    ellipse(random(-nebos[i]['missDistance']/100000, nebos[i]['missDistance']/100000), random(-nebos[i]['missDistance']/100000, nebos[i]['missDistance']/100000), nebos[i]['diameter']/130, nebos[i]['diameter']/130)
    fill(255)
  }
}

console.log(`This dates near misses: ${newDate}`)
console.log(nebos);






