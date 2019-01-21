//Width and height
    var w = 1800;
    var h = 1350;


    var canvas = d3.select("body").append("svg")
      .attr("width", w)
      .attr("height", h)

     d3.json("france.json", function(data) {

      var group = canvas.selectAll("g")
        .data(data.features)
        .enter()
        .append("g")

      //Define map projection
      var projection = d3.geo.mercator()
        .translate([400, 1200])
        .scale([1100]);

      //Define path generator
      var path = d3.geo.path()
        .projection(projection);

      var areas = group.append("path")
        .attr("d", path)
        .attr("class", "area")
        .attr("fill", "orange");


      //Load in cities data
      d3.csv("smellycheese.csv", function(data) {

        canvas.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
          })
          .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
          })
          .attr("r", function(d){
            return (d.rank);
          })
          .style("fill", "white")
          //.style("stroke", "black")
          .style("opacity", 1);
      });
    });
