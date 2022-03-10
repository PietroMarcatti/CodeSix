import {makeAutoObservable} from "mobx";
import * as d3 from "d3";
import { color } from "d3";

export class ForceDirectedVM{
    constructor(rootStore){
        this.preferencesStore = rootStore.preferencesStore;
        this.distanceMatricesStore = rootStore.distanceMatricesStore;
        makeAutoObservable(this,{preferencesStore: false}, {autoBind: true});
    }

    get matrices(){
        return this.distanceMatricesStore.distMatrices;
    }

    get distMin(){
    	return this.preferencesStore.forceDirectedPreferences.distMin;
	}
	get distMax(){
    	return this.preferencesStore.forceDirectedPreferences.distMax;
	}

	get color(){
		return this.preferencesStore.forceDirectedPreferences.color;
	}

	get distanceMatrix(){
    	return this.distanceMatricesStore.getDistanceMatrixByName(this.matrix);
	}

	get matrix(){
		return this.preferencesStore.forceDirectedPreferences.matrix;
	}

    get dataVisualizationDiv(){
        return document.getElementById("forceDirected");
    }

    get canvas(){
        return(document.getElementById("fd-canvas"));
	}

    removeForceDirected(){
        if(this.canvas.children.length > 0){
            this.canvas.removeChild(this.canvas.firstChild);
        }
    }

    drawForceDirected(){
        const parent = this;
        var matrix = this.distanceMatrix;
        var canvas = this.canvas;
        
        var margin = {top: 30, right: 10, bottom: 10, left: 0},
        width = 1080 - margin.left - margin.right,
        height = 580 - margin.top - margin.bottom;

    
        canvas.attr("width", this.width)
        .attr("height", this.height);

        let links = matrix.links.filter(link => link.value < this.distMax && link.value > this.distMin).map(link => {return {...link};});

		let nodes = matrix.nodes.map(node => {return {...node};});
        console.log("Canvas: ", canvas);
        let context = canvas.getContext("2d");

        var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links)
            .id(function(d){return d.id;})
            .distance(function(d) {return d.value;}))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width/2, height/2));

        simulation.tick(40).on("tick", ticked)

        var dragSubject = function(event) {	
			return simulation.find(event.x, event.y);   
		}

        var dragStarted = function(e) {
            if (!e.active) simulation.alphaTarget(0.3).restart();
            e.subject.fx = e.subject.x;
            e.subject.fy = e.subject.y;
          }
          
        var dragged = function(e) {
            e.subject.fx = e.x;
			e.subject.fy = e.y;
          }
          
        var dragEnded = function(e) {
            if (!e.active) simulation.alphaTarget(0);
            e.subject.fx = null;
            e.subject.fy = null;
        }

        canvas.call(
            d3.drag()
            .container(canvas.node())
            .subject(dragSubject)
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded)
        )
        
        function ticked(){
            context.clearRect(0, 0, parent.width, parent.height);
            context.beginPath();
            links.forEach(drawLink);
            context.strokeStyle = "#aaa";
            context.stroke();
            nodes.forEach(drawNode);
        }

        function drawLink(d){
			context.moveTo(d.source.x, d.source.y);
			context.lineTo(d.target.x, d.target.y);
		}

		function drawNode(d){
			context.beginPath();
			d.x = Math.max(parent.radius, Math.min(parent.width - parent.radius, d.x));
			d.y = Math.max(parent.radius, Math.min(parent.height - parent.radius, d.y));
			context.moveTo(d.x + 3, d.y);
			context.arc(d.x, d.y, parent.radius, 0,2 * Math.PI);
			context.fillStyle = parent.myColor(d[parent.color]);
			context.strokeStyle = parent.myColor(d[parent.color]);
			context.fill();
			context.stroke();
		}
    }

    renderChart(){
        console.log("Matrix: ", this.matrix)
        this.removeForceDirected();
        if(this.matrix === undefined){
            this.dataVisualizationDiv.append(document.createElement("div"));
            this.dataVisualizationDiv.firstChild.innerHTML= "Il Force Directed verrà visualizzato quando avrai scelto una matrice delle distanze.";
            this.dataVisualizationDiv.firstChild.setAttribute("id", "data-visualization");
            return null;
        }
        this.drawForceDirected();
    }
}