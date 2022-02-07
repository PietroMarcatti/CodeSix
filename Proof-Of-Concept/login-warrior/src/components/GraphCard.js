import React from "react";
import { Landscape, ArrowForwardRounded } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

class GraphCard extends React.Component{
    render() {
        return(
            <div className="card-wrapper">
                <div className="card-icon-wrapper">
                    <Landscape sx={{ fontSize: 48 }}/>
                </div>
                <div className="card-link rowFlex center">
                    <span>{this.props.value}</span>
                    <ArrowForwardRounded className="end-row-icon"/>
                </div>
            </div>
        );
    }
}

export default GraphCard