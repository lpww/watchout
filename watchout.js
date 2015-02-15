//settings
var color;
var difficulty = 20;
var coords = [];
var circles = 0;
var count = 1;
var high = 0;
var current =0;
var collisions = 0;

//slider variables
var slider = d3.slider(25).axis(false).min(5).max(40);
var value = d3.select('.slider').call(slider);

//player
var drag = d3.behavior.drag()
    .on('dragstart', function() { player.style('fill', 'white'); })
    .on('drag', function() {
      if (d3.event.x < 10) {
        player.attr('cx', 10);
      } else if (d3.event.x > 690) {
        player.attr('cx', 690);
      } else {
        player.attr('cx', d3.event.x);
      }
      if (d3.event.y < 10) {
        player.attr('cy', 10);
      } else if (d3.event.y > 490) {
        player.attr('cy', 490);
      } else {
        player.attr('cy', d3.event.y);
      }
    })
    .on('dragend', function() { player.style('fill', 'black'); });

var player = d3.select('.gameboard').append('circle')
    .attr('cx', 350)
    .attr('cy', 250)
    .attr('class', 'player')
    .attr('r', 10)
    .call(drag);

//add enemies
var addCircle = function(x, y) {
  d3.select('.gameboard').append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('class', 'enemy')
    .attr('r', 10);
}

//initialise
var update = function(){
  while(circles < difficulty){
    coords.push([(Math.random()*750)-25, (Math.random()*550)-25])
    addCircle(Math.random()*750, Math.random()*550);
    circles++;
  }
};

//scoreboard
var score = function(){
  d3.select('.current').select('span').text(current++);
  if(current > high){
    high++;
  d3.select('.high').select('span').text(current);
  }
  if(collision()){
    current = 0;
    collisions++;
    d3.select('.collisions').select('span').text(collisions);
  }
}

//Collision
var collision = function(){
  var enemies = d3.selectAll('.enemy');
  var player = d3.select('.player');

  for(var i = 0; i < enemies[0].length; i++){

    if(Math.abs(enemies[0][i].cx.animVal.value - player[0][0].cx.animVal.value) < 19.5 && Math.abs(enemies[0][i].cy.animVal.value - player[0][0].cy.animVal.value) < 19.5){

      d3.selectAll('.scoreboard').style('color', color);
      player.style('fill', 'black');

      setTimeout(function(){
        d3.selectAll('.scoreboard').style('color', 'white');
        player.style('fill', 'white');
      }, 50);

      return true;
    }
  }

  return false;
}

//Animations
var shuffle = function(array){
  coords = [];
  for(var i = 0; i < difficulty; i++){
    coords[i] = [(Math.random()*750)-25, (Math.random()*550)+25];
  }
};

var animate = function(element) {
  if (count === 1) {
    color = "orange";
  }
  else if (count === 2) {
    color = "red";
  }
  else {
    color = "yellow";
  }

  element.data(coords).transition()
    .attr("cx", function(d) {return d[0];})
    .attr("cy", function(d) {return d[1];})
    .style('fill', color)
    .duration(1000)
    .each('end', function(){
      animate(d3.select(this));
  });

  shuffle(coords);

  if (count < 3) {
    count++;
  } else {
    count = 1;
  }
}


  update();
  animate(d3.selectAll('.enemy'));
  d3.timer(score);



