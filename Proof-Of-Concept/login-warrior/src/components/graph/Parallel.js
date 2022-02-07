import React from "react";
import { Landscape, ArrowForwardRounded,ArrowBackRounded } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

class Parallel extends React.Component{
    render() {
        return(
            <div className="graph-text">
            <NavLink to="/" >
                <ArrowBackRounded className="graph-back-icon"/>
            </NavLink>
                <p className="graph_title">Parallel Coordinates</p>
                <p className="graph_description">
                Il Parallel Coordinates è un sistema comunemente utilizzato per visualizzare spazi n-dimensionali e analizzare dati multivariati. 
                Per mostrare un insieme di punti in uno spazio a n dimensioni, 
                vengono disegnate n linee parallele, solitamente verticali e poste a uguale distanza l'una dall'altra.
                </p>

                <div className="card-icon-wrapper">
                    <Landscape sx={{ fontSize: 48 }}/>
                </div>

            </div>
        );
    }
}

export default Parallel