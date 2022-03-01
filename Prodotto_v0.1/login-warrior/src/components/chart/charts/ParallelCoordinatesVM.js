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

    renderChart(){
        this.removeParallel();

        var axesT = this.axes;
        var color = this.color;
        console.log("Color: ",color)

        if(this.axes.length< 2){
            this.dataVisualizationDiv.append(document.createElement("div"));
            this.dataVisualizationDiv.firstChild.innerHTML= "Il Parallel Coordinates verrà visualizzato appena avrai selezionato almeno due assi.";
            return null;
        }

        var margin = {top: 30, right: 10, bottom: 10, left: 0},
        width = 500 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#parallel")
        .append("svg")
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
        var palette;
        if(colorDomain[0] || colorDomain[0] === 0)
            palette =  d3.scaleLinear().domain(colorDomain).range(["yellow", "blue"]);//
        else{
            palette = d3.scaleOrdinal(d3.schemeCategory10);
        }
        

        var highlight = function(event, d){
            var selected_specie = d[color];
            // first every group turns grey
            d3.selectAll(".line")
                .transition().duration(200)
                .style("stroke", "lightgrey")
                .style("opacity", "0.2")
            // Second the hovered specie takes its color
            var uri = encodeURIComponent(color)
            d3.selectAll("." + uri)
                .transition().duration(200)
                .style("stroke", palette(selected_specie))
                .style("opacity", "1")
            console.log("Valore: ",selected_specie, "Colore: ",palette(selected_specie));
        }
        
            // Unhighlight
        var doNotHighlight = function(event, d){
            d3.selectAll(".line")
                .transition().duration(200).delay(1000)
                .style("stroke", function(d){ return( palette(d[color]))} )
                .style("opacity", "1")
        }

        // Draw the lines
        svg
            .selectAll("myPath")
            .data(this.data)
            .enter().append("path")
            .attr("class", function (d) { return "line " + color } )
            .attr("d",  function(d) { return d3.line()( axesT.map( function (p) { return [x(p),y[p](d[p])]; } )) })
            .style("fill", "none")
            .style("stroke", function(d){ return( palette(d[color]))} )
            .style("opacity", 0.5)
            .on("mouseover", highlight)
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

    
    }
}