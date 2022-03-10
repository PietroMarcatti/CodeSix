import React from "react";
import { Landscape, ArrowForwardRounded,ArrowBackRounded } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

class Sankey extends React.Component{
    render() {
        return(
            <div className="graph-text">
            <NavLink to="/" >
                <ArrowBackRounded className="graph-back-icon"/>
            </NavLink>
                <p className="graph_title">Sankey Diagram</p>
                <p className="graph_description">
                Il Sankey Diagram è un particolare tipo di diagramma di flusso in cui l'ampiezza delle frecce è disegnata in maniera proporzionale alla quantità di flusso. 
                Esso è usualmente utilizzato per indicare trasferimenti di energia, materiali, costi o dati in un processo.
                </p>

                <div className="card-icon-wrapper">
                    <Landscape sx={{ fontSize: 48 }}/>
                </div>

            </div>
        );
    }
}

export default Sankey