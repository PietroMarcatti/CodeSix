import React from "react";
import { Landscape, ArrowForwardRounded } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { style } from "@mui/system";


class GraphCard extends React.Component{

    render() {
        return(
            <div className="card-wrapper">
                <div className="card-icon-wrapper">
                    <img src={"images/" + this.props.img} className="home-images"></img>
                </div>
                <div className="card-link rowFlex center">
                    <span>{this.props.value}</span>
                    <ArrowForwardRounded className="end-row-icon"/>
                </div>
            </div>
        );
    }
}

export default GraphCard;
