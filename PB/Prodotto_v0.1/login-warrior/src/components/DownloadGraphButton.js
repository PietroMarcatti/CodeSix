import React from "react";

const DownloadGraphButton= (props) =>{
    function saveSvg(svgEl, name) {
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgEl.setAttribute("style", "background-color:#121317");
        var svgData = svgEl.outerHTML;
        var preface = '<?xml version="1.0" standalone="no"?>\r\n';
        var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    return(
        <button
            id= "downloadSvgGraph"
            onClick={(e) => {
                if(document.getElementById("scatterplot") !== null){
                    var svgElement = document.getElementById("scatterplot").children[0];
                }
                else if(document.getElementById("forceDirected") !== null){
                    var svgElement = document.getElementById("forceDirected").children[0];
                }
                else if(document.getElementById("sankeyDiagram") !== null){
                    var svgElement = document.getElementById("sankeyDiagram").children[0];
                }
                else if(document.getElementById("parallel")){
                    var svgElement = document.getElementById("sankeyDiagram").children[0];
                }

                saveSvg(svgElement, "grafico");
            }}
        >Scarica in formato .svg</button>
    );
}

export default DownloadGraphButton;