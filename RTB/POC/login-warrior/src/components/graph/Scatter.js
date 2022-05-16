import React, {useEffect, useState} from "react";
import { ArrowBackRounded } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import ScatterPreferences from "./ScatterPreferences";
import DownloadGraphButton from "../DownloadGraphButton";
import * as d3 from "d3";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from "@mui/material";

const Scatter = (props) => {

	function findMinAndMax(data, dim){
		var min= +Infinity;
		var max= -Infinity;

		data.forEach(element => {
			max= max < parseFloat(element[dim]) ? parseFloat(element[dim]) : max;
			min= min > parseFloat(element[dim]) ? parseFloat(element[dim]) : min;
		});

		return {"min" : min, "max" : max};
	}

	function showScatterPlot(data, dimensionX, dimensionY, dimensionSize){		
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
		var dimensionXMinMax= findMinAndMax(data, dimensionX);

		var x = d3.scaleLinear()
	    	.domain([dimensionXMinMax["min"], dimensionXMinMax["max"]])
	    	.range([ 0, width ]);
	  	
	  	svg.append("g")
	    	.attr("transform", "translate(0," + height + ")")
			.style("font-size", "14px")
			.call(d3.axisBottom(x));

	  	// Add Y axis
		var dimensionYMinMax= findMinAndMax(data, dimensionY);

		var y = d3.scaleLinear()
	    	.domain([dimensionYMinMax["min"], dimensionYMinMax["max"]])
	    	.range([ height, 0]);
	  	
	  	svg.append("g")
		  	.style("font-size", "14px")
	    	.call(d3.axisLeft(y));

		if(dimensionSize !== undefined){
			var dimensionSizeMinMax= findMinAndMax(data, dimensionSize);

			var size = d3.scaleLinear()
			.domain([dimensionSizeMinMax["min"], dimensionSizeMinMax["max"]])
			.range([0, 5]);
		}		

	  	// Add dots
	  	svg.append('g')
	    	.selectAll("dot")
	    	.data(data)
	    	.enter()
	    	.append("circle")
	      	.attr("cx", function (d) { return x(d[dimensionX]); } )
	      	.attr("cy", function (d) { return y(d[dimensionY]); } )
	      	.attr("r", function (d) { return size === undefined ? 2.5 : size(d[dimensionSize]);})
	}

	const [mappedDimensions,setMappedDimensions] = useState(()=>{
		const saved = localStorage.getItem("mappedDimensions");
        const initial = JSON.parse(saved);
		
		if(initial !== null)
        	return initial;
		
		console.log(props.selectedDims);

		if(props.selectedDims.size == 0 || props.selectedDims.length == 0)
			return null;

		var initJson= {"Asse X": props.selectedDims[0][0], "Asse Y": props.selectedDims[1][0]};
		
		console.log(props.selectedDims.length);

		if(props.selectedDims.length > 2){
			var availableDimensions=["Asse X", "Asse Y", "Grandezza", "Forma", "Colore"];
			
			for(var i=2; i<props.selectedDims.length; i++){
				initJson[availableDimensions[i]] = props.selectedDims[i][0];
			}
		}
		return initJson;
	});

	useEffect(() => {
		console.log(mappedDimensions)
		localStorage.setItem("mappedDimensions",JSON.stringify(mappedDimensions))
	}, [mappedDimensions]);

	function removeScatter(){
		var div = document.getElementById("data-visualization");
		if(div.children.length >0 ){
			div.removeChild(div.firstChild)
		}
	}

	function applyChangesAndPlot() {
		removeScatter();
		showScatterPlot(props.data.data, mappedDimensions["Asse X"], mappedDimensions["Asse Y"], mappedDimensions["Grandezza"]);
	}

    
    const [showPreference, setShowPreference] = useState(true);
    const onChange = () => setShowPreference(!showPreference);

    const ShowPreference = () => {
        return (
          <div>
           <Button onClick={onChange} id="show-hide-pref">
                Azioni Rapide
                {showPreference ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </Button>

            { showPreference ? <ScatterPreferences selectedDims={props.selectedDims} hooks={[[mappedDimensions,setMappedDimensions]]} onConfirm={applyChangesAndPlot} /> : null }
          </div>
        );
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

				{	
					props.selectedDims.length >0 ? 
					<>
						<ShowPreference />
					</>:
					""
				}

				{
					props.selectedDims.length >1? <><div id="data-visualization" className="graph-visualization"></div><DownloadGraphButton /></> : <p className="graph-message">Carica un file per visualizzare o seleziona correttamente le dimensioni</p>
				}
                
        </div>
    );
}

export default Scatter;