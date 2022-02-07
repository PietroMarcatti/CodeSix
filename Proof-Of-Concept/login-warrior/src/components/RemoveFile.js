import React from "react";
import { ArrowBack } from "@mui/icons-material";

function RemoveFile(props){
    if(!props.show)
        return null;

    return(
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="rowFlex center"><ArrowBack onClick={props.onClose}/>Vuoi rimuovere il file corrente?</h3>
                </div>
                <div className="modal-body">
                    Rimuovi il file correntemenre caricato, così da poterne caricare e visualizzare un altro. Ricorda di esportare la sessione corrente se hai intenzione di riprenderla in un secondo momento.
                </div>
                <div className="modal-footer">
                    <button className="red" onClick={props.onClose}>Annulla</button>
                    <button className="green" onClick={props.onDelete}>Rimuovi il file</button>
                </div>
            </div>
        </div>
    )
}

export default RemoveFile;