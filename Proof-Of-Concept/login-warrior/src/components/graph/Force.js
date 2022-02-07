import React from "react";
import { Landscape,ArrowBackRounded } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

class Force extends React.Component{
    render() {
        return(
            <div className="graph-text">
            <NavLink to="/">
                <ArrowBackRounded className="graph-back-icon"/>
            </NavLink>
                <p className="graph_title">Force Direct Graph</p>
                <p className="graph_description">
                Il loro scopo è posizionare i nodi di un grafo nello spazio bidimensionale o tridimensionale 
                in modo che tutti gli spigoli siano di lunghezza più o meno uguale 
                e vi siano il minor numero possibile di archi di attraversamento, assegnando forze tra l'insieme degli spigoli e l'insieme dei nodi, 
                in base alle loro posizioni relative, e quindi utilizzare queste forze per simulare il movimento dei bordi 
                e dei nodi o per ridurre al minimo la loro energia.
                </p>

                <div className="card-icon-wrapper">
                    <Landscape sx={{ fontSize: 48 }}/>
                </div>

            </div>
        );
    }
}

export default Force