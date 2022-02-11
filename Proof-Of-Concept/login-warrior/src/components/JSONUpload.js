import React from "react";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { Check } from "@mui/icons-material";
import JsonReader from './JsonReader'

const JSONUpload = (props) =>{
    return(
        <div className={"drop-file rowFlex center ".concat((props.csvLoaded)? "green" : "")} >
            {props.csvLoaded ? <Check fontSize="large"/> :<AddCircleOutline fontSize="large"/>}
            <div className="columnFlex">
                { 
                    (props.csvLoaded)? 
                    ("File \""+props.csvFileName+"\" caricato correttamente."):
                    <JsonReader hooks={props.hooks} />
                }
            </div>
        </div>
    );
}

export default JSONUpload;