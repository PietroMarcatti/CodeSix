import React from "react";
import {WarningOutlined} from '@mui/icons-material';

class Alert extends React.Component{

    render(){
        return(
            <div id="alert" className="rowFlex center">
                <WarningOutlined fontSize="large"/>
                <div className="columnFlex">
                    <span className="option"> Attenzione! </span>
                    <span>{this.props.message}</span>
                </div>
            </div>
        );
    }
}

export default Alert;