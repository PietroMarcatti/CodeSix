import React, { useState } from "react";
import {ArrowBack} from '@mui/icons-material';

function SelectDimensions(props){
    
    return(
        props.show ?
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="rowFlex center"><ArrowBack onClick={props.onClose}/>Selezione dimensioni</h3>
                </div>
                <br/>
                <div className="rowFlex center">
                    {   
                        (props.headersToggle && props.data.length >0) ?
                        props.data.meta.fields.map((value, key) =>
                            { 
                                return <>
                                    <label for={"dim"+key} key={"l"+value}>{value}</label>
                                    <input type="checkbox" name={"dim"+key} id={key}/>
                                </>
                            }
                        ) :
                        props.data.data[0].map((value,key) =>
                            {
                                return <>
                                    <label for={"dim"+key} key={"l"+value}>{"Colonna "+ key}</label>
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