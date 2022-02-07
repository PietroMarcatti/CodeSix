import React, {useState} from "react";
import {ConstructionOutlined, UploadFile } from "@mui/icons-material";
import FileInfo from "../FileInfo";
import CSVUpload from "../CSVUpload";
import Alert from "../Alert";
import { NavLink } from "react-router-dom";

function DocsLink(props){
    return(
        <span id="docs-link">Hai bisogno di aiuto? <NavLink to="/docs" >Consulta il manuale</NavLink></span>
    );
}

const UploadFilePage = (props) => {

    console.log(props.headersToggle);
    return(
        <div id="content">
            <h2 className="rowFlex center">
                <UploadFile sx={{ fontSize: 40 }}/>
                Carica il file da analizzare
            </h2>
            <p>
                Inserisci qui sotto il tuo file in formato .csv per proseguire con la selezione delle dimensioni e la visualizzazione dei grafici.
            </p>
            <div className="rowFlex" id="grid-wrapper">
                <div className="columnFlex" id="file-upload-wrapper">
                    <div className="columnFlex">
                        {props.showOverwriteCsvAlert ? <Alert message="Caricando un nuovo fils .csv perderai tutti i progessi nella sessione attuale. Ti consigliamo di esportare la sessione corrente prima di procedere"/> :""}
                        <div className="rowFlex center">
                            <label>Il file contiene gli header</label>
                            <input type="checkbox" id="headers" name="headers" onChange={props.hooks["headersToggle"][1]} />
                        </div>
                        <CSVUpload hooks={props.hooks} csvLoaded ={props.csvLoaded} csvFileName={props.csvFileName} inputAllowed={props.showOverwriteCsvAlert}/>
                        {props.showConfigurationCsvAlert ? <Alert message="Il tuo file è stato caricato correttamente ma va inizializzato. Per poterlo usare configuralo."/> :""}
                    </div>

                    <DocsLink/>
                </div>
                <FileInfo showTest={props.showTest} show={props.showFileInfo} handles={props.handles} data={props.data} csvFileName={props.csvFileName}/>
                
            </div>
        </div>
    );
}

export default UploadFilePage;