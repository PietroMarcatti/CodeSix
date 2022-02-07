import React from "react";
import {Feed, Edit, CloudDownloadOutlined, DeleteOutlined  } from "@mui/icons-material";

function SelectedDimsItem(props){
    return(
         <p className="selected-dim">{props.value}</p>
    );
}

function QuickActionButton (props){
    return(
        <button onClick={props.onClick} className={props.className}>
            {props.value}
            {props.icon}
        </button>
    )
}

const FileInfo =(props) => {
    return(
        <div id="file-info-wrapper">
            <h2 className="rowFlex center">
                <Feed fontSize="large" id="file-info-icon"/>
                Il tuo file
            </h2>
            <label>Nome del file:</label>
            <p>{props.csvFileName ? props.csvFileName : "Nessun file caricato."}</p>
            <p>Dimensioni selezionate:</p>
            <div id="selected-dims-wrapper">
                {
                    ( props.showOverwriteCsvAlert || props.dims && props.dims.length ===0)  ? "Non hai ancora caricato nessun file." :
                    props.dims.meta.fields.map((value)=>{ return <SelectedDimsItem value={value} key={value}/>})
                }
            </div>
            <p>Azioni rapide:</p>
            <div className="columnFlex">
                <QuickActionButton onClick={props.handles[0]}
                     value={props.showOverwriteCsvAlert ? "Modifica dimensioni" : "Configura dimensioni"} icon={<Edit sx={{fontSize: 30}}/>} className="green"/>
                <QuickActionButton onClick={props.handles[1]} value="Esporta Sessione" icon={<CloudDownloadOutlined sx={{fontSize: 30}}/>} className="orange"/>
                <QuickActionButton onClick={props.handles[2]} value="Rimuovi File" icon={<DeleteOutlined sx={{fontSize: 30}}/>} className="red"/>
            </div>
        </div>
    );
}

export default FileInfo;