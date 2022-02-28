import { makeAutoObservable } from "mobx";
import * as d3 from "d3";

export class ScatterplotVM{
    constructor(rootStore){
        this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;
        makeAutoObservable(this, {datasetStore: false, preferencesStore:false}, {autoBind: true});
    }

    get data(){
        this.datasetStore.selectedData.slice(0,3).forEach(element =>{
            console.log(Object.entries(element));
        })
		return this.datasetStore.selectedData.slice(0,1000);
        
	}

    get axisX(){
        return this.preferencesStore.scatterplotPreferences.axisX;
    }

    get axisY(){
        return this.preferencesStore.scatterplotPreferences.axisY;
    }

    get pointSize(){
        return this.preferencesStore.scatterplotPreferences.pointSize;
    }

    get color(){
        return this.preferencesStore.scatterplotPreferences.color;
    }

    get shape(){
        return this.preferencesStore.scatterplotPreferences.shape;
    }

    get dataVisualizationDiv(){
        return document.getElementById("scatterplot");
    }

    removeScatter(){
        if(this.dataVisualizationDiv.children.length >0 ){
            this.dataVisualizationDiv.removeChild(this.dataVisualizationDiv.firstChild);
        }
    }

    renderChart(){
        this.removeScatter();

        if(this.axisX === undefined || this.axisY === undefined){
            this.dataVisualizationDiv.append(document.createElement("div"));
            this.dataVisualizationDiv.firstChild.innerHTML= "Lo Scatterplot verrà visualizzato appena verranno selezionate le dimensioni per asse X e asse Y";
            return null;
        }

        var margin = {top: 10, right: 30, bottom: 30, left: 60},
			width = 700 - margin.left - margin.right,
		    height = 650 - margin.top - margin.bottom;

        // append the svg object to the body of the page
		var svg = d3.select("#scatterplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis
        var x = d3.scaleLinear()
            .domain(d3.extent(this.data, (d) => {return +d[this.axisX];}))
            .range([ 0, width ]);
            
            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .style("font-size", "14px")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain(d3.extent(this.data, (d) => {return +d[this.axisY];}))
            .range([ height, 0]);
            
            svg.append("g")
                .style("font-size", "14px")
            .call(d3.axisLeft(y));

        // Check pointSize

        if(this.pointSize !== undefined){
            var s = d3.scaleLinear()
			  .domain(d3.extent(this.data, (d) => {return +d[this.pointSize];}))
			  .range([1, 5]);
		}
        
        // Add dots
        let axX= this.axisX;
        let axY= this.axisY;
        let ptSz= this.pointSize;

	  	svg.append('g')
          .selectAll("dot")
          .data(this.data)
          .enter()
          .append("circle")
            .attr("cx", function (d) {return x(d[axX]);})
            .attr("cy", function (d) {return y(d[axY]);})
            .attr("r", function (d) {return s === undefined ? 2.5 : s(d[ptSz]);});
    }
}