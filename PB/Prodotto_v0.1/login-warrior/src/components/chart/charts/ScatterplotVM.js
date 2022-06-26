import { makeAutoObservable } from "mobx";
import * as d3 from "d3";

export class ScatterplotVM{

    constructor(rootStore){
        this.scaleType={
            ORDINAL: "ORDINAL",
            QUANTILE: "QUANTILE"
        };
        this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;
        makeAutoObservable(this, {datasetStore: false, preferencesStore:false}, {autoBind: true});
    }

    get data(){
		return this.datasetStore.selectedData.slice();
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

    get scatterPlotDiv(){
        return document.getElementById("scatterplot");
    }

    get dataVisualization(){
        return document.getElementById("data-visualization");
    }

    removeScatter(){
        if(this.dataVisualization !== null)
            this.dataVisualization.remove();
    }

    drawScatterPlot(){
        var margin = {top: 10, right: 320, bottom: 70, left: 100},
			width = 1080 - margin.left - margin.right,
		    height = 580 - margin.top - margin.bottom;

        // append the svg object to the body of the page
		var svg = d3.select("#scatterplot")
            .append("svg")
            .attr("id", "data-visualization")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis
        var x = d3.scaleLinear()
            .domain(d3.extent(this.data, (d) => {return +d[this.axisX];}))
            .range([0, width]);
            
            svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .style("font-size", "14px")
              .style("color", "white")
              .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain(d3.extent(this.data, (d) => {return +d[this.axisY];}))
            .range([height, 0]);
            
            svg.append("g")
              .style("font-size", "14px")
              .style("color", "white")
              .call(d3.axisLeft(y));

        // Check pointSize
        if(this.pointSize !== undefined){
            var size_f = d3.scaleLinear()
			  .domain(d3.extent(this.data, (d) => {return +d[this.pointSize];}))
			  .range([10, 100]);
		}

        // Check color
        if(this.color !== undefined){
            let colorDomain = d3.extent(this.data, (d) => {return +d[this.color]; });
            const distinctValues = [...new Set(this.data.map((d) => d[this.color]))];
            var color_f = undefined;
            console.log("Dominio colore: ", colorDomain)
            if(distinctValues.length > 10)
                color_f =  d3.scaleLinear().domain(colorDomain).range(["yellow", "blue"]);//
            else{
                color_f = d3.scaleOrdinal(d3.schemeCategory10).domain(distinctValues.sort());
            }            
        }

        // Check shape
        if(this.shape !== undefined){
            let shapeDomain = d3.extent(this.data, (d) => {return +d[this.shape]; });
            let uniqueValues = [...new Set(this.data.map(d => d[this.shape]))];
            
            var shape_f=d3.scaleOrdinal()
            .domain(uniqueValues)
            .range([...Array(uniqueValues.length).keys()]);
            shape_f.type=this.scaleType.ORDINAL;

            if(uniqueValues.length > 7){
                shape_f = d3.scaleQuantile()
                .domain(shapeDomain)
                .range(d3.range(7));
                shape_f.type=this.scaleType.QUANTILE;
            }
            
        }
        
        // Add dots
        let axX= this.axisX;
        let axY= this.axisY;
        let ptSz= this.pointSize;
        let clr= this.color;
        let shp= this.shape;

        svg.append('g')
          .selectAll("path")
          .data(this.data)
          .join("path")
            .attr("transform", d => {return "translate("+x(d[axX])+","+y(d[axY])+")";})
            .attr("fill", d => {return color_f === undefined ? "white" : color_f(d[clr]);})
            .attr("d", d => {
                let sz= size_f === undefined ? 40 : size_f(d[ptSz]);     
                return shape_f === undefined ? d3.symbol().type(d3.symbolCircle).size(sz)() : d3.symbol().type(d3.symbols[shape_f(d[shp])]).size(sz)();
            });
        
        // Add legend
        this.drawLegend(color_f, shape_f, size_f);
    }

    drawColorLegend(colorFunction){
        var colorLegend= d3.select("#data-visualization")
            .append("g")
            .attr("id", "color-legend");

        colorLegend.append("text")
            .attr("x", 850)
            .attr("y", 210)
            .style("fill", "white")
            .text(this.color+" - colore:");
          
        colorLegend.selectAll("dots")
            .data(colorFunction.domain())
            .enter()
            .append("circle")
              .attr("cx", 870)
              .attr("cy", (d,i) => {return 235 + i*25;})
              .attr("r", 6)
              .style("fill", d => {return colorFunction(d);});
            
        // Add one dot in the legend for each name
        colorLegend.selectAll("labels")
            .data(colorFunction.domain())
            .enter()
            .append("text")
              .attr("x", 885)
              .attr("y", (d,i) => {return 240 + i*25;})
              .style("fill", d => {return colorFunction(d);})
              .text(d => {return d;});
    }

    roundNumber(value, precision){
        return Math.round((value + Number.EPSILON) * Math.pow(10,precision)) / Math.pow(10,precision);
    }

    drawShapeLegend(shapeFunction){
        var shapeLegend= d3.select("#data-visualization")
            .append("g")
            .attr("id", "shape-legend");
          
        shapeLegend.append("text")
            .attr("x", 850)
            .attr("y", 15)
            .style("fill", "white")
            .text(this.shape+" - forma:");
          
        
        if(shapeFunction.type === this.scaleType.ORDINAL){
            shapeLegend.selectAll("shape")
            .data(shapeFunction.domain().sort((a,b)=>a-b))
            .join("path")
            .attr("transform", (d,i) => {return "translate(870,"+(35 + i*25)+")";})
              .style("fill", "white")
              .attr("d", d => {return d3.symbol().type(d3.symbols[shapeFunction(d)]).size(100)();});
        }else if(shapeFunction.type === this.scaleType.QUANTILE) {
            
            shapeLegend.selectAll("shape")
            .data(shapeFunction.quantiles())
            .join("path")
            .attr("transform", (d,i) => {return "translate(870,"+(35 + i*25)+")";})
              .style("fill", "white")
              .attr("d", d => {return d3.symbol().type(d3.symbols[shapeFunction(d)]).size(100)();});
        }
        
        if(shapeFunction.type === this.scaleType.ORDINAL){
            shapeLegend.selectAll("labels")
            .data(shapeFunction.domain().sort((a,b)=>a-b))
            .enter()
            .append("text")
            .attr("x", 880)
            .attr("y", (d,i) => {return 40 + i*25;})
            .style("fill", "white")
            .text((d, i) => {
                return d;
            });
        }else if( shapeFunction.type === this.scaleType.QUANTILE){
            // Add one dot in the legend for each name
            shapeLegend.selectAll("labels")
            .data(shapeFunction.quantiles())
            .enter()
            .append("text")
            .attr("x", 880)
            .attr("y", (d,i) => {return 40 + i*25;})
            .style("fill", "white")
            .text((d, i) => {
                if(i===0){
                    return this.roundNumber(shapeFunction.domain()[0],3)+" <= x < "+this.roundNumber(d,3);
                }else if (i< (shapeFunction.quantiles().length-1)){
                    return this.roundNumber(shapeFunction.quantiles()[i-1],3)+ " <= x < "+this.roundNumber(d,3);
                }else{
                    return this.roundNumber(d,3)+" <= x <= "+this.roundNumber(shapeFunction.domain()[1],3);
                }
            });
        }
        
    }

    drawAxisLegend(){
        var axisXLegend= d3.select("#data-visualization")
            .append("g")
            .attr("id", "axisX-legend");
        
        axisXLegend.append("text")
            .attr("x",400)
            .attr("y", 560)
            .style("fill", "white")
            .text(this.axisX);

        var axisYLegend= d3.select("#data-visualization")
            .append("g")
            .attr("id", "axisY-legend");
        
        axisYLegend.append("text")
            .attr("x", -270)
            .attr("y", 15)
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text(this.axisY);       
    }

    drawPointSizeLegend(size_f){
        var sizeLegend= d3.select("#data-visualization")
            .append("g")
            .attr("id", "size-legend");
        
        sizeLegend.append("text")
            .attr("x", 850)
            .attr("y", 500)
            .style("fill", "white")
            .text(this.pointSize+" - grandezza dei punti");
        
        sizeLegend.selectAll("dots")
            .data(size_f.domain())
            .enter()
            .append("circle")
              .attr("cx", 870)
              .attr("cy", (d,i) => {return 520 + i*25;})
              .attr("r", (d,i)=>{return size_f(d)/10+(-i+1)*3;})
              .style("fill", "white")
            
        // Add one dot in the legend for each name
        sizeLegend.selectAll("labels")
            .data(size_f.domain())
            .enter()
            .append("text")
              .attr("x", 885)
              .attr("y", (d,i) => {return 525 + i*25;})
              .style("fill", "white")
              .text(d => {return d;});
    }

    drawLegend(colorFunction, shapeFunction, pointSizeFunction){
        this.drawAxisLegend();
        if(colorFunction !== undefined)
            this.drawColorLegend(colorFunction);    

        if(shapeFunction !== undefined)
            this.drawShapeLegend(shapeFunction);
        
        if(pointSizeFunction !== undefined)
            this.drawPointSizeLegend(pointSizeFunction);
    }

    renderChart(){
        this.removeScatter();

        if(this.axisX === undefined || this.axisY === undefined){
            this.scatterPlotDiv.append(document.createElement("div"));
            this.scatterPlotDiv.firstChild.innerHTML= "Lo Scatterplot verrà visualizzato appena verranno selezionate le dimensioni per asse X e asse Y";
            this.scatterPlotDiv.firstChild.setAttribute("id", "data-visualization");
            document.getElementById("downloadSvgGraph").style.display="none";
            return null;
        }

        this.drawScatterPlot();
        document.getElementById("downloadSvgGraph").style.display="block";
    }
}