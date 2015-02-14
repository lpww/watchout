var difficulty = 30;
var coords = [];
var circles = 0;
var count = 1;

var drag = d3.behavior.drag()
    .on('dragstart', function() { player.style('fill', 'red'); })
    .on('drag', function() { player.attr('cx', d3.event.x)
    .attr('cy', d3.event.y); })
    .on('dragend', function() { player.style('fill', 'white'); });

var player = d3.select('svg').append('circle')
    .attr('cx', 350)
    .attr('cy', 250)
    .attr('class', 'player')
    .attr('r', 10)
    .call(drag);

var addCircle = function(x, y) {
  d3.select('svg').append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('class', 'enemy')
    .attr('r', 10);
}


var collision = function(){
  var enemies = d3.selectAll('.enemy');
  var target = d3.select('.player');
  for(var i = 0; i < enemies.length; i++){
  console.log(target[i][0].cx.animVal.value);

    if(Math.abs(enemies[i][0].cx.animVal.value - target[i][0].cx.animVal.value) < 20 && Math.abs(enemies[i][0].cy.animVal.value - target[i][0].cy.animVal.value) < 20){
  console.log('fdg');
target.style('fill', 'orange');
    }
  }
}

var animate = function() {
  var color;
  if (count %2===0) {
    color = "purple";
  }
  else {
    color = "blue";
  }

  d3.selectAll('.enemy').data(coords).transition()
  .attr("cx", function(d) {return d[0];})
  .attr("cy", function(d) {return d[1];})
  .style('fill', color)
  .duration(1000);
  shuffle(coords);
  count++;
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

while(circles < difficulty){
 coords.push([Math.random()*750, Math.random()*550])
  addCircle(Math.random()*750, Math.random()*550);
  circles++;
}

setInterval(animate, 2000);
setInterval(collision, 10);



