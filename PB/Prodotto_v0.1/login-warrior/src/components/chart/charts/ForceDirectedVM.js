import {makeAutoObservable} from "mobx";
import * as d3 from "d3";

export class ForceDirectedVM{
    constructor(rootStore){
        this.preferencesStore = rootStore.preferencesStore;
        this.distanceMatricesStore = rootStore.distanceMatricesStore;
        makeAutoObservable(this,{preferencesStore: false, distanceMatricesStore: false}, {autoBind: true});
    }

  get matrices(){
    return this.distanceMatricesStore.distanceMatrices.slice();
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

  get selectedLinks(){
      return this.distanceMatrix.links.filter((element) => { return element.value >= this.distMin && element.value <= this.distMax ? element : null} );
  }

  get dataVisualizationDiv(){
      return document.getElementById("forceDirected");
  }

  ForceGraph({
      nodes, // an iterable of node objects (typically [{id}, …])
      links // an iterable of link objects (typically [{source, target}, …])
    }, {
      nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
      nodeGroup, // given d in nodes, returns an (ordinal) value for color
      nodeGroups, // an array of ordinal values representing the node groups
      nodeTitle = d=> d, // given d in nodes, a title string
      nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
      nodeStroke = "#fff", // node stroke color
      nodeStrokeWidth = 1.5, // node stroke width, in pixels
      nodeStrokeOpacity = 1, // node stroke opacity
      nodeRadius = 5, // node radius, in pixels
      nodeStrength,
      linkSource = ({source}) => source, // given d in links, returns a node identifier string
      linkTarget = ({target}) => target, // given d in links, returns a node identifier string
      linkStroke = "#999", // link stroke color
      linkStrokeOpacity = 0.6, // link stroke opacity
      linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
      linkStrokeLinecap = "round", // link stroke linecap
      linkStrength,
      colors = d3.schemeTableau10, // an array of color strings, for the node groups
      width = 1300, // outer width, in pixels
      height = 950, // outer height, in pixels
      invalidation // when this promise resolves, stop the simulation
    } = {}) {
      var dimRed = this.distanceMatrix.dimensionsToRedux.slice().map(d => d.value);

      // Compute values.
      const N = d3.map(nodes, nodeId).map(intern);
      const LS = d3.map(links, linkSource).map(intern);
      const LT = d3.map(links, linkTarget).map(intern);
      if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
      const T = nodeTitle == null ? null : d3.map(nodes, function(d){return d});
      const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
      const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);
      const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);
    
    
      // Replace the input nodes and links with mutable objects for the simulation.
      nodes = d3.map(nodes, (_, i) => ({id: N[i]}));
      links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i]}));
    
      // Compute default domains.
      if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);
    
      // Construct the scales.
      const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);
    
      // Construct the forces.
      const forceNode = d3.forceManyBody();
      const forceLink = d3.forceLink(links).id(({index: i}) => N[i]);
      if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
      if (linkStrength !== undefined) forceLink.strength(linkStrength);
    
      const simulation = d3.forceSimulation(nodes)
          .force("link", forceLink)
          .force("charge", forceNode)
          .force("center",  d3.forceCenter())
          .on("tick", ticked);
    
      const svg = d3.select("#forceDirected")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [-width / 2, -height / 2, width, height])
          .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    
      const link = svg.append("g")
          .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
          .attr("stroke-opacity", linkStrokeOpacity)
          .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
          .attr("stroke-linecap", linkStrokeLinecap)
        .selectAll("line")
        .data(links)
        .join("line");
    
      const node = svg.append("g")
          .attr("fill", nodeFill)
          .attr("stroke", nodeStroke)
          .attr("stroke-opacity", nodeStrokeOpacity)
          .attr("stroke-width", nodeStrokeWidth)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
          .attr("r", nodeRadius)
          .call(drag(simulation));
    
      console.log(T)
      if (W) link.attr("stroke-width", ({index: i}) => W[i]);
      if (L) link.attr("stroke", ({index: i}) => L[i]);
      if (G) node.attr("fill", ({index: i}) => color(G[i]));
      if (T) node.append("title").text(function(d,i){
        var tit =T[i]['id'];
        dimRed.forEach(dim => (tit+="\n"+dim+": "+T[i][dim]))
        return tit;
      }
      );
      if (invalidation != null) invalidation.then(() => simulation.stop());
    
      function intern(value) {
        return value !== null && typeof value === "object" ? value.valueOf() : value;
      }
    
      function ticked() {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
    
        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
      }
    
      function drag(simulation) {    
        function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }
        
        function dragged(event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }
        
        function dragended(event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }
        
        return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      }
    
      return Object.assign(svg.node(), {scales: {color}});
    }

  renderChart(){
      if(this.dataVisualizationDiv.firstChild !== null)
          this.dataVisualizationDiv.firstChild.remove();

      if(this.matrix === undefined){
          this.dataVisualizationDiv.append(document.createElement("div"));
          this.dataVisualizationDiv.firstChild.innerHTML= "Il Force Directed verrà visualizzato quando avrai scelto una matrice delle distanze.";
          this.dataVisualizationDiv.firstChild.setAttribute("id", "data-visualization");
          return null;
      }
      
      this.ForceGraph({
        nodes: this.distanceMatrix.nodes,
        links: this.selectedLinks
        }, {
          nodeGroup: d => d.id.split(/\W/)[0], // take first word for color
          nodeTitle: d => `${d.id}`,
          linkStrokeWidth: l => Math.sqrt(l.value),
          format: (f => d => `${f(d)}`)(d3.format(",.1~f")),
          width: 1210,
          height: 950,
      })
  }
}