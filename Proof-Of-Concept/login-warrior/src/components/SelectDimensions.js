import React from "react";

function SelectDimensions(props){
    if(!props.show)
        return null;

    return(
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Selezione dimensioni</h3>
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