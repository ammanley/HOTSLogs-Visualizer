
// ### Setting up canvas ###
var margin = {top: 20, right: 10, bottom: 20, left: 10};
// Set desired margin vars
var width = 800 - margin.left - margin.right;
var height = 800 - margin.top - margin.bottom;
// Set H and W vars to be desired values that respect the margins placed 
// in the margin object
var svg = d3.select('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
// Sets SVG "canvas" to be W/H enough to hold W/H + margins
var padding = 50

var hots;
d3.csv('/hotslogs.csv', function(d) {
	 hots = d;



// ### Setting up scaling ###
var xMin = d3.min(hots, d => d.winPercent)
var xMax = d3.max(hots, d => d.winPercent)
var yMin = d3.min(hots, d => d.popPercent)
var yMax = d3.max(hots, d => d.popPercent)
var cBScale = d3.max(hots, d => d.gamesBanned)
var cPScale = d3.max(hots, d => d.gamesPlayed)


var xScale = d3.scaleLinear()
				.domain([xMin, xMax])
				.range([ padding, width - padding]);
var yScale = d3.scaleLinear()
				.domain([yMin, yMax])
				// .range([padding,height - padding]) //This is the default//
				.range([height - padding, padding]) //this is for human reading//
var colorBanScale = d3.scaleLinear()
				.domain([0, cBScale])
				.range(['green','red']);
var playScale = d3.scaleLinear()
				.domain([0, cPScale])
				.range([4, 10])
// ### CIRCLES ###
svg.selectAll('circle')
	.data(hots)
	.enter()
	.append('circle')
	.attr('cx', d =>  xScale(d.winPercent)   )
	.attr('cy', d => yScale(d.popPercent)   )
	// .attr('r' , d => colorPlayScale(d.gamesPlayed))
	.attr('r', d => playScale(d.gamesPlayed))
	.attr('fill', d => colorBanScale(d.gamesBanned) )
	.attr('name', d => d.Name)
	
});
//### Axis ###

// var bottomScale = d3.scaleLinear()
//                         .domain([xMin,xMax])
//                         .range([padding,width + padding]);

// var leftScale = d3.scaleLinear()
// 						.domain([yMax, yMin])
// 						.range([0, height - 20])

// var xAxis = d3.axisBottom()
//                   .scale(bottomScale)

// var yAxis = d3.axisLeft()
// 					.scale(leftScale)

// svg.append("g")
// 	.attr("transform", `translate(0, ${height})`)
//     .call(xAxis);
                  
// svg.append('g')
// 	.attr('transform',`translate(35,0)`)
// 	.call(yAxis)

// //### Hover Tooltip ###

$('circle').on('click', function(e) {
	console.log($(e.target).attr('name'))
})
