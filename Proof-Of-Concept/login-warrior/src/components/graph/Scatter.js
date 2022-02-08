import React, {useEffect, useState} from "react";
import { ArrowBackRounded } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import ScatterPreferences from "./ScatterPreferences";
import * as d3 from "d3";

const Scatter = (props) => {

    

	function showScatterPlot(data, dimensionX, dimensionY){
		if(props.headers){
			var temp = [];
			data.forEach((element, index) => {
				temp[index]=Object.values(element)
			});
			data = temp
		}

		var margin = {top: 10, right: 30, bottom: 30, left: 60},
			width = 700 - margin.left - margin.right,
		    height = 650 - margin.top - margin.bottom;

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
	      	.style("fill", "#fdfdfd");
	}

	const [mappedDimensions,setMappedDimensions] = useState(()=>{
		const saved = localStorage.getItem("mappedDimensions");
        const initial = JSON.parse(saved);
        return initial || {"Asse X":0,"Asse Y":1};
	});

	useEffect(() => {
		localStorage.setItem("mappedDimensions",JSON.stringify(mappedDimensions))
	}, [mappedDimensions]);

	function removeScatter(){
		var div = document.getElementById("data-visualization");
		if(div.children.length >0 ){
			div.removeChild(div.firstChild)
		}
	}

	function applyChangesAndPlot() {
		removeScatter()
		showScatterPlot(props.data.data, mappedDimensions["Asse X"], mappedDimensions["Asse Y"]);
	}
    
	
    return(
        <div className="graph-text">
            <NavLink to="/" >
                <ArrowBackRounded className="graph-back-icon"/>
            </NavLink>
                <p className="graph_title">ScatterPlot Matrix</p>
                <p className="graph_description">
                    Il grafico di dispersione ScatterPlot o scatter graph è un tipo di grafico in cui due variabili di un set di dati 
                    sono riportate in un piano cartesiano.
                </p>
				<ScatterPreferences selectedDims={props.selectedDims} hooks={[[mappedDimensions,setMappedDimensions]]} onConfirm={applyChangesAndPlot}/>
                <div id="data-visualization"></div>
        </div>
    );
}

export default Scatter;