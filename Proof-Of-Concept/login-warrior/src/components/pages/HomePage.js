import React from "react";
import { HomeOutlined } from "@mui/icons-material";
import GraphCard from "../GraphCard";
import FileInfo from "../FileInfo"

export default function HomePage(props){
    let graphTypes= ["Scatter Plot Matrix", "Sankey Diagram", "Force Directed Graph", "Parallel Coordinates"];
    return(
        <div id="content">
            <h2 className="rowFlex center">
                <HomeOutlined sx={{ fontSize: 40 }}/>
                Benvenuto su LoginWarrior
            </h2>
            <p>
                Questa è la tua homepage. Da qui puoi decidere come visualizzare i dati contenuti nel file attualmente caricato.
            </p>
            <div className="rowFlex" id="grid-wrapper">
                <div className="columnFlex" id="card-grid">
                    <div className="rowFlex">
                        <GraphCard value={graphTypes[0]}/>
                        <GraphCard value={graphTypes[1]}/>
                    </div>
                    <div className="rowFlex">
                        <GraphCard value={graphTypes[2]}/>
                        <GraphCard value={graphTypes[3]}/>
                    </div>
                    
                </div>
                <FileInfo showSelectDims={() => props.showSelectDims(true)}  showExportSession={() => props.showExportSession(true)} showRemoveFile={() => props.showRemoveFile(true)}/>
            </div>
        </div>
    );
}
