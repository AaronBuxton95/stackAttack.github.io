
class NEB2 {
    constructor(name, diameter, missDistance) {
        this.diameter = diameter
        this.radius = diameter/2;
        this.missDistance = missDistance;
        this.name = name;
    }
};

let d = new Date();
let year = d.getFullYear();
let month = d.getMonth();
let day = d.getDate();
let date = year +"-0" +month +"-" +day; 
let myKey = "OPrjZnv566eCEAqdOqUYER75BZS7SHrigPdb4GTE";
let request =
    "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + 
    date + 
    "&end_date=" +
    date + 
    "&detailed=true&api_key=" +
    myKey;
//let request2 = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&detailed=true&api_key=OPrjZnv566eCEAqdOqUYER75BZS7SHrigPdb4GTE`;

console.log(request);

let nebos2 = [];

fetch(request)
    .then(function (response){
    return response.json();
})
.then(function(data){
    
    for (let i in data.near_earth_objects[date]){
        goodData = data.near_earth_objects[date][i];
        name = goodData['name'];
        diameter = goodData['estimated_diameter']['meters']['estimated_diameter_max'];
        missDistance = goodData['close_approach_data'][0]['miss_distance']['kilometers'];
        //console.log(`NEB name ${name}, diameter ${diameter}, missDist: ${missDist}`);
        //console.log(`name: ${name}, diameter: ${diameter}, Miss distance: ${missDistance}`);
        if(!nebos2.includes(nebos[i])){
            nebos2.push(new NEB2(name, diameter, missDistance));
        }
    }
})
.then(function makeTable(){
    let make_table = document.createElement("TABLE");
    make_table.setAttribute("id", "myTable");
    document.body.appendChild(make_table);
})
.then(function fillTable(){
    // if no NEOs are found, show that no data was found
    if (nebos.length === 0){
        para = document.createElement("p");
        text = document.createTextNode("No Data Found :(");
        para.appendChild(text);
        document.body.appendChild(para);
        para.style.fontSize = "50px";
        para.style.color = "white";
        para.style.textAlign = "center";
    }else{
        // if table does not exist, make one
        if (document.getElementById("myTable") === null){
            makeTable();
        }
        
       let table = document.getElementById("myTable");
       rowOfKeys = table.insertRow(0);
       for (key in nebos[0]){
           num = 0;
           cell = rowOfKeys.insertCell(num);
           if (key !== "name"){
               cell.innerHTML = `${key} (km)`;
           }else{
               cell.innerHTML = key;
           }
           cell.style.color = "white";
           cell.style.background = "black";
           cell.style.padding = "10px";
           cell.style.textAlign = "center";
           num++;
       }
    
       for (let i=1;i<nebos.length+1;i++){
            let row = table.insertRow(i);
            if (i%2 === 0){
                row.style.background = "gray";
            }else{
                row.style.background = "beige";
            }
            for (key in nebos[i]){
                let num = 0;
                let cell = row.insertCell(num);
                cell.innerHTML = nebos[i][key];
                cell.style.padding = "5px";
                cell.style.textAlign = "center";
                num++;
            }
       }

       table.style.width = "100%";
       table.style.borderCollapse = "collapse";
       
    }
});