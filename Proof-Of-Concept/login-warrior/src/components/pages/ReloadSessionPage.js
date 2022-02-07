import React from "react";
import {Cached } from "@mui/icons-material";
import FileInfo from "../FileInfo";
import FileUpload from "../FileUpload";
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
                        <Alert message="Caricando un file .JSON perderai quanto fatto nella sessione corrente! Ti consigliamo di esportarla prima di proseguire con il caricamento."/>
                        {/*
                        <FileUpload options={["Trascina qui il file da analizzare", "Sceglilo dal tuo dispositivo"]}/>
                        */}

                        <FileUpload type="json"/>
                    
                    </div>
                    <DocsLink/>
                </div>
                <FileInfo handles={props.handles} dims={props.dims} fileName={props.fileName}/>
                
            </div>
        </div>
    );
}

export default ReloadSessionPage;