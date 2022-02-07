import React from "react";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { Check } from "@mui/icons-material";

import CsvReader from './CsvReader'
import JsonReader from './JsonReader'

const FileUpload = (props) =>{
    return(
        <div className={"drop-file rowFlex center ".concat((props.csvLoaded || !props.inputAllowed)? "green" : "")} >
            {props.csvLoaded ? <Check fontSize="large"/> :<AddCircleOutline fontSize="large"/>}
            <div className="columnFlex">
                { 
                    (props.csvLoaded || !props.inputAllowed)? 
                    ("File \""+props.fileName+"\" caricato correttamente."):
                    (props.type == 'csv' ? <CsvReader hooks={props.hooks} /> : <JsonReader />)
                }
            </div>
        </div>
    );
}

export default FileUpload;