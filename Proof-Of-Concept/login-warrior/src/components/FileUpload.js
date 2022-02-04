import React from "react";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

import CsvReader from './CsvReader'
import JsonReader from './JsonReader'

class FileUpload extends React.Component{
    render(){

            return(
                <div id="drop-file" className="rowFlex center">
                    <AddCircleOutline fontSize="large"/>
                    <div className="columnFlex">
                    {
                        this.props.type == 'csv' ? <CsvReader /> : <JsonReader />
                    }
        
                    </div>
                </div>
            );
        
        
    }

}

export default FileUpload;