import React from "react";
import { HomeOutlined } from "@mui/icons-material";
import GraphCard from "../GraphCard";
import FileInfo from "../FileInfo"
import { NavLink } from "react-router-dom";


const HomePage = (props) => {
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
                    <NavLink to="/scatter" className={(graph) => (graph.isActive ? 'graph_select' : '')}>
                        <GraphCard value={graphTypes[0]} img='scatter.png' />
                    </NavLink>
                    <NavLink to="/sankey" className={(graph) => (graph.isActive ? 'graph_select' : '')}>
                        <GraphCard value={graphTypes[1]} img='sankey.png' />
                    </NavLink>
                    </div>
                    <div className="rowFlex">

                    <NavLink to="/force" className={(graph) => (graph.isActive ? 'graph_select' : '')}>
                        <GraphCard value={graphTypes[2]} img='force.png'/>
                    </NavLink>

                    <NavLink to="/parallel" className={(graph) => (graph.isActive ? 'graph_select' : '')}>
                        <GraphCard value={graphTypes[3]} img='parallel.png'/>
                    </NavLink>
                    </div>
                </div>
                {props.fileInfo}
            </div>
        </div>
    );
}

export default HomePage;