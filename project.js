//data for 20 teams
var data = [47,51,36,67,67,63,76,76,61,53,38,54,66,66,81,101,101,98,155,73]


//margins
var margin = {top: 10, right: 30, bottom: 30, left: 40},
	
//graph dimensions
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

//Box Chart stats
var data_sorted = data.sort(d3.ascending)
var q1 = d3.quantile(data_sorted, .25)
var median = d3.quantile(data_sorted, .5)
var q3 = d3.quantile(data_sorted, .75)
var interQuantileRange = q3 - q1
var min = q1 - 1.5 * interQuantileRange
var max = q1 + 1.5 * interQuantileRange


//append SVG
var svg = d3.select("#graph")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


//Y Scale
var y = d3.scaleLinear()
  .domain([0,175])
  .range([height, 0]);
svg.call(d3.axisLeft(y))

//where to put on graph
var center = 200
var width = 100

//vertical line
svg
.append("line")
  .attr("x1", center)
  .attr("x2", center)
  .attr("y1", y(min) )
  .attr("y2", y(max) )
  .attr("stroke", "black")

// box
svg
.append("rect")
  .attr("x", center - width/2)
  .attr("y", y(q3) )
  .attr("height", (y(q1)-y(q3)) )
  .attr("width", width )
  .attr("stroke", "black")
  .style("fill", "red")

//3 horizontal lines
svg
.selectAll("toto")
.data([min, median, max])
.enter()
.append("line")
  .attr("x1", center-width/2)
  .attr("x2", center+width/2)
  .attr("y1", function(d){ return(y(d))} )
  .attr("y2", function(d){ return(y(d))} )
  .attr("stroke", "black")








