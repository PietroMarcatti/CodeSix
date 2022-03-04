import { makeAutoObservable } from "mobx";
import * as d3 from "d3";

export class ParallelCoordinatesVM{
    constructor(rootStore){
        this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;
        makeAutoObservable(this, {datasetStore: false, preferencesStore:false}, {autoBind: true});
    }

    get data(){
		return this.datasetStore.selectedData.slice(0,1000);
	};

    get axes(){
        return this.preferencesStore.parallelCoordinatesPreferences.axes.map(axis => axis.value).slice();
    };

    get color(){
        return this.preferencesStore.parallelCoordinatesPreferences.color;
    }

    get dataVisualizationDiv(){
        return document.getElementById("parallel");
    };

    removeParallel(){
        if(this.dataVisualizationDiv.children.length >0 ){
            this.dataVisualizationDiv.removeChild(this.dataVisualizationDiv.firstChild);
        }
    };

    drawLegend(colorFunction){
        if(colorFunction !== undefined)
            this.drawColorLegend(colorFunction);    
    }

    drawColorLegend(colorFunction){
        var colorLegend= d3.select("#data-visualization")
            .append("g")
            .attr("id", "color-legend");

        colorLegend.append("text")
            .attr("x", 600)
            .attr("y", 15)
            .style("fill", "white")
            .text(this.color+" - colore dei punti:");
          
        colorLegend.selectAll("dots")
            .data(colorFunction.domain())
            .enter()
            .append("circle")
              .attr("cx", 620)
              .attr("cy", (d,i) => {return 35 + i*25;})
              .attr("r", 6)
              .style("fill", d => {return colorFunction(d);});
            
        // Add one dot in the legend for each name
        colorLegend.selectAll("labels")
            .data(colorFunction.domain())
            .enter()
            .append("text")
              .attr("x", 630)
              .attr("y", (d,i) => {return 40 + i*25;})
              .style("fill", d => {return colorFunction(d);})
              .text(d => {return d;});
    }

    drawParallel(){
        var axesT = this.axes;
        var color = this.color;

        var margin = {top: 30, right: 10, bottom: 10, left: 0},
        width = 500 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#parallel")
        .append("svg")
        .attr("id", "data-visualization")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        // For each dimension, I build a linear scale. I store all in a y object
        var y = {}
        for (let i in axesT) {
            var name = axesT[i]
            y[name] = d3.scaleLinear()
            .domain( d3.extent(this.data, function(d) { return +d[name]; }) )
            .range([height, 0])
        }

        // Build the X scale -> it find the best position for each Y axis
        var x = d3.scalePoint()
            .range([0, width])
            .padding(1)
            .domain(axesT);
        
        let colorDomain = d3.extent(this.data, (d) => {return +d[color]; });
        var palette = undefined;
        if(Math.abs(colorDomain[1]-colorDomain[0])>10)
            palette =  d3.scaleLinear().domain(colorDomain).range(["yellow", "blue"]);//
        else{
            palette = d3.scaleOrdinal(d3.schemeCategory10);
        }

        var tooltip = d3.select("#data-visualization")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .attr("z-index", 2)
        

        var highlight = function(event, d){
            var selected_specie = d[color];
            // first every group turns grey
            d3.selectAll(".line")
                .transition().duration(200)
                .style("stroke", "lightgrey")
                .style("opacity", "0.2")
            // Second the hovered specie takes its color
            d3.selectAll('[data-color = \"'+d[color]+'\"]')
                .transition().duration(200)
                .style("stroke", palette(selected_specie))
                .style("opacity", "1")
            tooltip.style("opacity", 1)
            console.log("Valore: ",selected_specie, "Colore: ",palette(selected_specie));
        }
        
        // Unhighlight
        var doNotHighlight = function(event, d){
            d3.selectAll(".line")
                .transition().duration(200).delay(1000)
                .style("stroke", function(d){ return( palette(d[color]))} )
                .style("opacity", "1")
            tooltip.style("opacity", 0)
        }

        var mousemove = function(event, d) {
            tooltip
              .html(color+" is: " + d[color])
              .style("left", (d3.pointer(event)[0]+70) + "px")
              .style("top", (d3.pointer(event)[1]) + "px")
        }

        // Draw the lines
        svg
            .selectAll("myPath")
            .data(this.data)
            .enter().append("path")
            .attr("class", function (d) { return "line" } )
            .attr("data-color", function (d){ return d[color]})
            .attr("d",  function(d) { return d3.line()( axesT.map( function (p) { return [x(p),y[p](d[p])]; } )) })
            .style("fill", "none")
            .style("stroke", function(d){ return( palette(d[color]))} )
            .style("opacity", 0.5)
            .on("mouseover", highlight)
            .on("mousemove", mousemove)
            .on("mouseleave", doNotHighlight )

        // Draw the axis:
        svg.selectAll("myAxis")
            // For each dimension of the dataset I add a 'g' element:
            .data(axesT).enter()
            .append("g")
            .attr("class", "axis")
            // I translate this element to its right position on the x axis
            .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
            // And I build the axis with the call function
            .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
            // Add axis title
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function(d) { return d; })
            .style("fill", "#fdfdfd")
        
        this.drawLegend(palette);
    }

    renderChart(){
        this.removeParallel();

        if(this.axes.length< 2){
            this.dataVisualizationDiv.append(document.createElement("div"));
            this.dataVisualizationDiv.firstChild.innerHTML= "Il Parallel Coordinates verrà visualizzato appena avrai selezionato almeno due assi.";
            this.dataVisualizationDiv.firstChild.setAttribute("id", "data-visualization");
            return null;
        }

        this.drawParallel();
        
    }
}