import React from "react";

function RemoveFile(props){
    if(!props.show)
        return null;

    return(
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Rimuovi File</h3>
                </div>
                <div className="modal-body">
                    Sei sicuro di voler eliminare il file di lavoro corrente?
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose}>Annulla</button>
                    <button onClick={props.onDelete}>Conferma</button>
                </div>
            </div>
        </div>
    )
}

export default RemoveFile;