import React from "react";
import { HomeOutlined } from "@mui/icons-material";
import GraphCard from "../GraphCard";
import FileInfo from "../FileInfo"

class HomePage extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            graphTypes: ["Scatter Plot Matrix", "Sankey Diagram", "Force Directed Graph", "Parallel Coordinates"],
        }
        
    }
    
    render() {
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
                            <GraphCard value={this.state.graphTypes[0]}/>
                            <GraphCard value={this.state.graphTypes[1]}/>
                        </div>
                        <div className="rowFlex">
                            <GraphCard value={this.state.graphTypes[2]}/>
                            <GraphCard value={this.state.graphTypes[3]}/>
                        </div>
                        
                    </div>
                    <FileInfo/>
                </div>
            </div>
        );
    }
}

export default HomePage;