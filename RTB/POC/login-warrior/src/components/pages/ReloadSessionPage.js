import React from "react";
import {Cached } from "@mui/icons-material";
import FileInfo from "../FileInfo";
import JSONUpload from "../JSONUpload";
import Alert from "../Alert";
import { NavLink } from "react-router-dom";

function DocsLink(props){
    return(
        <span id="docs-link">Hai bisogno di aiuto? <NavLink to="/docs" >Consulta il manuale</NavLink></span>
    );
}

const ReloadSessionPage = (props) => {
    
    return(
        <div id="content">
            <h2 className="rowFlex center">
                <Cached sx={{ fontSize: 40 }}/>
                Ricarica Sessione
            </h2>
            <p>
                Da questa pagina puoi ricaricare una sessione precedentemente esportata in formato .JSON. Carica il file della sessione qui sotto per iniziare.
            </p>
            <div className="rowFlex" id="grid-wrapper">
                <div className="columnFlex" id="file-upload-wrapper">
                    <div className="columnFlex">
                    {props.csvLoaded && props.csvFileName.slice(-4) !=="json" ? <Alert message="Caricando un file .JSON perderai quanto fatto nella sessione corrente! Ti consigliamo di esportarla prima di proseguire con il caricamento."/> : ""}
                        <JSONUpload 
                            hooks={props.hooks}
                            csvLoaded ={props.csvLoaded} 
                            csvFileName={props.csvFileName}
                        />
                    
                    </div>
                    <DocsLink/>
                </div>
                {props.fileInfo}
                
            </div>
        </div>
    );
}

export default ReloadSessionPage;