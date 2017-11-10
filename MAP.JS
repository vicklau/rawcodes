var d3;

var data = d3.json("dcca2015.geojson").features

var svg = d3.select("#map").append("svg"),
    boundary = svg.selectAll("path")
    .data(data).enter()
    .append("path")
    .attr("d", path)
    .style("stroke-width", 2)