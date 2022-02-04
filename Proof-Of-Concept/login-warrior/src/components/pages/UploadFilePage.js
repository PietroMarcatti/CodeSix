import React from "react";
import {ConstructionOutlined, UploadFile } from "@mui/icons-material";
import FileInfo from "../FileInfo";
import FileUpload from "../FileUpload";
import Alert from "../Alert";
import { NavLink } from "react-router-dom";




function DocsLink(props){
    return(
        <span id="docs-link">Hai bisogno di aiuto? <NavLink to="/docs" >Consulta il manuale</NavLink></span>
    );
}

class UploadFilePage extends React.Component {

    
    render() {
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
                            <Alert message="Caricando un nuovo fils .csv perderai tutti i progessi nella sessione attuale. Ti consigliamo di esportare la sessione corrente prima di procedere"/>
                            {/*<FileUpload onClick={() => this.handleQuickButtonClick()} 
                            options={["Trascina qui il file della sessione precedente", "Sceglilo dal tuo dispositivo"]}/>
                            */}

                            <FileUpload type="csv"/>
                            
                        </div>


                        <DocsLink/>
                    </div>
                    <FileInfo />
                    
                </div>
            </div>
        );
    }
}

export default UploadFilePage;