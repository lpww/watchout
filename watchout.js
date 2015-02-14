var difficulty = 30;
var coords = [];
var circles = 0;

var selectedElement = 0;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;


var addCircle = function(x, y) {
d3.select('svg').append('circle')
  .attr('cx', x)
  .attr('cy', y)
  .attr('class', 'enemy')
  .attr('r', 10);
}

var animate = function() {
  d3.selectAll('.enemy').data(coords).transition()
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

var moveElement = function(evt){
  // if(evt.clientX < 0) currentX = 0;
  // if(evt.clientX > 700) currentX = evt.clientX;
  dx = evt.clientX - currentX;
  dy = evt.clientY - currentY;
  currentMatrix[4] += dx;
  currentMatrix[5] += dy;
  newMatrix = "matrix(" + currentMatrix.join(' ') + ")";

  selectedElement.setAttributeNS(null, "transform", newMatrix);
  currentX = evt.clientX;
  currentY = evt.clientY;
}

var selectPlayer = function(evt){
  d3.select('.gameboard').attr('cursor', 'none');

  selectedElement = evt.target;
  currentX = evt.clientX;
  currentY = evt.clientY;
  currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');

  for(var i=0; i<currentMatrix.length; i++) {
    currentMatrix[i] = parseFloat(currentMatrix[i]);
  }

  document.onmousemove = moveElement;
  // d3.select('player').attr('onmousemove', 'moveElement');
}

d3.select('svg').append('circle')
    .attr('cx', 350)
    .attr('cy', 250)
    .attr('class', 'player')
    .attr('r', 10)
    .attr('onmousedown', 'selectPlayer(evt)')
    .attr('transform', 'matrix(1 0 0 1 0 0)');

while(circles < difficulty){
 coords.push([Math.random()*750, Math.random()*550])
  addCircle(Math.random()*750, Math.random()*550);
  circles++;
}

setInterval(animate, 1000);
