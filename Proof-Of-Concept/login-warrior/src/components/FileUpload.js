import React from "react";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

class FileUpload extends React.Component{

    render(){
        return(
            <div id="drop-file" className="rowFlex center">
                <AddCircleOutline fontSize="large"/>
                <div className="columnFlex">
                    <span className="option">{this.props.options[0]}</span>
                    <span>oppure</span>
                    <span className="option">{this.props.options[1]}</span>
                </div>
            </div>
        );
    }

}

export default FileUpload;