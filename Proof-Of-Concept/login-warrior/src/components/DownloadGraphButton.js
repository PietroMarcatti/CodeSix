import { useState } from 'react'

const DownloadGraphButton= (props) =>{
    function saveSvg(svgEl, name) {
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
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
                var svgElement = document.getElementById("data-visualization").children[0];
                saveSvg(svgElement, "grafico");
            }}
        >Scarica in formato .svg</button>
    );
}

export default DownloadGraphButton;