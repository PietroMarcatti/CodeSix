import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function SelectedDimsItem(props){
    return(
        <div>
        <p className="selected-dim" id={props.key}>{props.value}</p>
        </div>
    );
}

function SelectDimensions(props){
    if(!props.show)
        return null;

    return(
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Selezione dimensioni</h3>
                </div>

                <div id="selected-dims-wrapper">
                {
                    (props.dims && props.dims.length ===0)  ? "Non hai ancora caricato nessun file." :
                    props.dims.meta.fields.map((value)=>{ return <SelectedDimsItem value={value} key={value}/>})
                }
                </div>

                <div className="modal-body">
                    Questo è un componente modale
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose}>Annulla</button>
                    <button onClick={props.onConfirm}>Conferma</button>
                </div>
            </div>
        </div>
    )
}

export default SelectDimensions;