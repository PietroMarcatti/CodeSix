import React from "react";
import { ArrowBack } from "@mui/icons-material";

function ExportSession(props){
    if(!props.show)
        return null;

    return(
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="rowFlex center"><ArrowBack onClick={props.onClose}/>Vuoi esportare la sessione corrente?</h3>
                </div>
                <div className="modal-body">
                    Esporta la sessione corrente sotto forma di file .JSON così da poter continuare l’analisi dei dati in un altro momento.
                </div>
                <div className="modal-footer">
                    <button className="red" onClick={props.onClose}>Annulla</button>
                    <button className="green" onClick={props.onSave}>Salva file</button>
                </div>
            </div>
        </div>
    )
}

export default ExportSession;