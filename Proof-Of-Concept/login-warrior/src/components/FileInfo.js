import React from "react";
import {Feed, Edit, CloudDownloadOutlined, DeleteOutlined  } from "@mui/icons-material";
import SelectDimensions from "./SelectDimensions";

function SelectedDimsItem(props){
    return(
         <p className="selected-dim">{props.value}</p>
    );
}

function QuickActionButton (props){
    return(
        <button className={props.className} onClick={props.onClick}>
            {props.value}
            {props.icon}
        </button>
    )
}

const FileInfo = props => {
    return(
        <div id="file-info-wrapper">
            <h2 className="rowFlex center">
                <Feed fontSize="large" id="file-info-icon"/>
                Il tuo file
            </h2>
            <label>Nome del file:</label>
            <p><b>{props.fileName ? props.fileName : "log_febbraio.csv"}</b></p>
            <p>Dimensioni selezionate:</p>
            <div id="selected-dims-wrapper">
                <SelectedDimsItem value="dataOra"/>
                <SelectedDimsItem value="idUtente"/>
                <SelectedDimsItem value="ipAddress"/>
                <SelectedDimsItem value="dataOra"/>
                <SelectedDimsItem value="idUtente"/>
                <SelectedDimsItem value="ipAddress"/>
                <SelectedDimsItem value="dataOra"/>
                <SelectedDimsItem value="idUtente"/>
                <SelectedDimsItem value="ipAddress"/>
            </div>
            <p>Azioni rapide:</p>
            <div className="columnFlex">
                <QuickActionButton onClick={() => props.showSelectDims(true)} value="Modifica dimensioni" icon={<Edit sx={{fontSize: 30}}/>} className="green"/>
                <QuickActionButton onClick={() => props.showExportSession(true)} value="Esporta Sessione" icon={<CloudDownloadOutlined sx={{fontSize: 30}}/>} className="orange"/>
                <QuickActionButton onClick={() => props.showRemoveFile(true)} value="Rimuovi File" icon={<DeleteOutlined sx={{fontSize: 30}}/>} className="red"/>
            </div>
        </div>
    );
}

export default FileInfo;