import React from "react";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { Check } from "@mui/icons-material";
import CsvReader from './CsvReader'

const CSVUpload = (props) =>{
    return(
        <div className={"drop-file rowFlex center ".concat((props.csvLoaded && !props.inputAllowed)? "green" : "")} >
            {props.csvLoaded ? <Check fontSize="large"/> :<AddCircleOutline fontSize="large"/>}
            <div className="columnFlex">
                { 
                    (props.csvLoaded && !props.inputAllowed)? 
                    ("File \""+props.csvFileName+"\" caricato correttamente."):
                    <CsvReader hooks={props.hooks} />
                }
            </div>
        </div>
    );
}

export default CSVUpload;