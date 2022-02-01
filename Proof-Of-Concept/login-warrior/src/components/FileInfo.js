import React from "react";
import {Feed, Edit, CloudDownloadOutlined, DeleteOutlined  } from "@mui/icons-material";

function SelectedDimsItem(props){
    return(
         <p className="selected-dim">{props.value}</p>
    );
}

function QuickActionButton (props){
    return(
        <button onClick={props.onClick ? props.onClick : null} className={props.className}>
            {props.value}
            {props.icon}
        </button>
    )
}

class FileInfo extends React.Component {
    render() {
        return(
            <div id="file-info-wrapper">
                <h2 className="rowFlex center">
                    <Feed fontSize="large" id="file-info-icon"/>
                    Il tuo file
                </h2>
                <label>Nome del file:</label>
                <p><b>{this.props.fileName ? this.props.fileName : "log_febbraio.csv"}</b></p>
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
                    <QuickActionButton onClick={this.props.onClick} value="Modifica dimensioni" icon={<Edit sx={{fontSize: 30}}/>} className="green"/>
                    <QuickActionButton value="Esporta Sessione" icon={<CloudDownloadOutlined sx={{fontSize: 30}}/>} className="orange"/>
                    <QuickActionButton value="Rimuovi File" icon={<DeleteOutlined sx={{fontSize: 30}}/>} className="red"/>
                </div>
            </div>
        );
    }
}

export default FileInfo;