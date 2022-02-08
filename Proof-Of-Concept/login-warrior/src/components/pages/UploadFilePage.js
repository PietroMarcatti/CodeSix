import React, {useEffect, useRef, useState} from "react";
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

    const [ disabledUpload, setDisabledUpload] =useState(true);
    function handleChange(value){
        props.hooks["headersToggle"][1](value);
        setDisabledUpload(false);
    }

    useEffect (()=>{
        if(!props.hooks["csvLoaded"][0]){
            document.getElementById("headersForm").reset()
        }
    }, [props.hooks["csvLoaded"][0]])

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
                        <div show={!props.disableDimensionSelection} className="rowFlex center ">
                            <form id="headersForm" className="columnFlex"   >
                                <div className="rowFlex center" >
                                    <label>Il file contiene gli header</label>
                                    <input type="radio" name="headers"  required onChange={() => handleChange(true)}/>
                                </div>
                                <div className={"rowFlex center"}>
                                    <label>Il file NON contiene gli header</label>
                                    <input type="radio" name="headers"  onChange={() => handleChange(false)} />
                                </div>
                            </form>
                            
                        </div>
                        <CSVUpload disabled={disabledUpload} hooks={props.hooks} csvLoaded ={props.csvLoaded} csvFileName={props.csvFileName} inputAllowed={props.showOverwriteCsvAlert}/>
                        {props.showConfigurationCsvAlert ? <Alert message="Il tuo file è stato caricato correttamente ma va inizializzato. Per poterlo usare configuralo."/> :""}
                    </div>

                    <DocsLink/>
                </div>
                <FileInfo disableDimensionSelection={props.disableDimensionSelection} disableFileRemoval={props.disableFileRemoval} show={props.showFileInfo} handles={props.handles} selectedDims={props.selectedDims} csvFileName={props.csvFileName}/>
                
            </div>
        </div>
    );
}

export default UploadFilePage;