import React from "react";
import { Landscape, ArrowForwardRounded,ArrowBackRounded } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

class Scatter extends React.Component{
    render() {
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

                <div className="card-icon-wrapper">
                    <Landscape sx={{ fontSize: 48 }}/>
                </div>

            </div>
        );
    }
}

export default Scatter