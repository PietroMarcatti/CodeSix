import React, { useState } from "react";
import {ArrowBack} from '@mui/icons-material';
import Papa from "papaparse";

function SelectDimensions(props){
    
    const [headersToggle, setHeadersToggle] = useState(false);
    const [csvData, setCsvData] = useState([]);

    function parse(){
        Papa.parse(props.csvFile, {header:headersToggle, complete: (results) =>{ parseComplete(results)} })
    }
    
    function toggleHeaders(){
        setHeadersToggle(!headersToggle);
        parse();
    }

    function parseComplete(results){
        setCsvData(results);
        console.log(csvData);
    }

    return(
        props.show ?
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="rowFlex center"><ArrowBack onClick={props.onClose}/>Selezione dimensioni</h3>
                </div>
                <div className="rowFlex center">
                    <label for="headers">Il file contiene gli headers</label>
                    <input type="checkbox" name="headers" onChange={()=>toggleHeaders(!headersToggle)}/>
                </div>
                <br/>
                <div className="rowFlex center">
                    {headersToggle ?
                        csvData.meta.fields.map((value, key) =>
                            { 
                                return <>
                                    <label for={"dim"+key} key={"l"+value}>{value}</label>
                                    <input type="checkbox" name={"dim"+key} id={key}/>
                                </>
                            }
                        ) :
                        csvData.data[0].map((value,key) =>
                            {
                                return <>
                                    <label for={"dim"+key} key={"l"+value}>{value}</label>
                                    <input type="checkbox" name={"dim"+key} id={key}/>
                                </>
                            }
                        )
                    }
                </div>

                <div className="modal-footer">
                    <button className="red" onClick={props.onClose}>Annulla</button>
                    <button className="green" onClick={props.onConfirm}>Conferma</button>
                </div>
            </div>
        </div> : 
        ""
    )
}

export default SelectDimensions;