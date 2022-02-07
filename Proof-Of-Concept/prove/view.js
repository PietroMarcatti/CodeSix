class View{
	constructor(){
		this.inputDiv= document.getElementById('inputData');
		this.loadFileInput= document.getElementById('csv-data');
		this.loadFileButton= document.getElementById('load-data');

		this.dataVizDiv= document.getElementById('data-visualization');
	}

	getInputDiv(){
		return this.inputDiv;
	}

	getLoadFileInput(){
		return this.loadFileInput;
	}

	getLoadFileButton(){
		return this.loadFileButton;
	}

	getDataVizDiv(){
		return this.dataVizDiv;
	}

	removeChart(){
		if(this.dataVizDiv.children.length > 0){
    		this.dataVizDiv.removeChild(this.dataVizDiv.firstChild);
    	}
	}

	showScatterPlot(data, dimensionX, dimensionY){
		this.removeChart();

		var margin = {top: 10, right: 30, bottom: 30, left: 60},
			width = 460 - margin.left - margin.right,
		    height = 400 - margin.top - margin.bottom;

		// append the svg object to the body of the page
		var svg = d3.select("#data-visualization")
		  	.append("svg")
		  	.attr("width", width + margin.left + margin.right)
		  	.attr("height", height + margin.top + margin.bottom)
		  	.append("g")
		  	.attr("transform",
		        "translate(" + margin.left + "," + margin.top + ")");

		// Add X axis
		var x = d3.scaleLinear()
	    	.domain([0, 70])
	    	.range([ 0, width ]);
	  	
	  	svg.append("g")
	    	.attr("transform", "translate(0," + height + ")")
	    	.call(d3.axisBottom(x));

	  	// Add Y axis
	  	var y = d3.scaleLinear()
	    	.domain([0, 70])
	    	.range([ height, 0]);
	  	
	  	svg.append("g")
	    	.call(d3.axisLeft(y));

	  	// Add dots
	  	svg.append('g')
	    	.selectAll("dot")
	    	.data(data)
	    	.enter()
	    	.append("circle")
	      	.attr("cx", function (d) { return x(d[dimensionX]); } )
	      	.attr("cy", function (d) { return y(d[dimensionY]); } )
	      	.attr("r", 2.5)
	      	.style("fill", "#69b3a2");
	}
}