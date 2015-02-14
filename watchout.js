var difficulty = 30;
var coords = [];
var circles = 0;

var addCircle = function(x, y) {
d3.select('svg').append('circle')
  .attr('cx', x)
    .attr('cy', y)
    .attr('class', 'enemy')
    .attr('r', 10);
}

while(circles < difficulty){
 coords.push([Math.random()*750, Math.random()*550])
  addCircle(Math.random()*750, Math.random()*550);
  circles++;
}

var animate = function() {
  d3.selectAll('circle').data(coords).transition()
  .attr("cx", function(d) {return d[0];})
  .attr("cy", function(d) {return d[1];})
  .duration(1000);
  shuffle(coords);
}

var shuffle = function(array){
var temp;
var temp2;
var newIndex

for(var i = 0; i < array.length; i++){
  newIndex = Math.floor(Math.random()*array.length);
  temp = array[i];
  temp2 = array[newIndex];
  array[i] = temp2;
  array[newIndex] = temp;
}
};

setInterval(animate, 1000);
