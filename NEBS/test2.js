
class NEB {
    constructor(name, diameter, missDistance) {
        this.diameter = diameter
        this.radius = diameter/2;
        this.missDistance = missDistance;
        this.name = name;
        this.over = false;
    }
  
    //check for mouse rollover
    rollover(px, py) {
        let d = dist(px, py, this.x, this.y);
        this.over = d < this.radius;
    }
  
    //display the neb
    display(){
        stroke(0);
        strokeWeight(0.8);
        fill(255);
        ellipse(this.x, this.y, this.diameter, this.diameter);
        if(this.over){
            fill(255)
            textAlign(CENTER);
            text(this.name, this.diameter, this.missDistance)
        }
    }
  }
  
  let data = {};
  let nebos = [];
  let interval;
  
  function preload(){
    data = loadJSON("https://api.nasa.gov/neo/rest/v1/feed?start_date=2011-01-01&end_date=2011-01-01&detailed=true&api_key=OPrjZnv566eCEAqdOqUYER75BZS7SHrigPdb4GTE")
  }
  
  function loadData(){
    for (let i in data.near_earth_objects["2011-01-01"]){
        let goodData = data.near_earth_objects["2011-01-01"][i];
        let name = goodData['name'];
        let diameter = goodData['estimated_diameter']['meters']['estimated_diameter_max'];
        let missDistance = goodData['close_approach_data'][0]['miss_distance']['kilometers'];
        //console.log(`NEB name ${name}, diameter ${diameter}, missDist: ${missDist}`);
        if(!nebos.includes(nebos[i])){
          nebos.push(new NEB(name, diameter, missDistance));
  
        }
    }
  }
  
  function mousePressed(){
    noLoop()
  }
  
  function setup() {
      createCanvas(600, 600, WEBGL);
      loadData();
      interval = setInterval(makeNEBS, 500)
  }
  
  
  function makeNEBS(){
    for(let i = 0; i < nebos.length; i++){
      ellipse(random(-nebos[i]['missDistance']/1000, nebos[i]['missDistance']/1000), random(0, nebos[i]['missDistance']/1000), nebos[i]['diameter']/10, nebos[i]['diameter']/10)
      fill(255)
      nebos[i].rollover(mouseX, mouseY)
    }
  }
  
  function draw() {
    background(0);
    sphere(65);
  
    for(let i = 0; i < nebos.length; i++){
      ellipse(random(-nebos[i]['missDistance']/100000, nebos[i]['missDistance']/100000), random(-nebos[i]['missDistance']/100000, nebos[i]['missDistance']/100000), nebos[i]['diameter']/10, nebos[i]['diameter']/10)
      fill(255)
      nebos[i].rollover(mouseX, mouseY)
    }
  }
  
  
  
  console.log(nebos);
  
  
  
  
  
  
  