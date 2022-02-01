import React from "react";
import {ContactSupportOutlined} from '@mui/icons-material';
import DocsCard from "../DocsCard";

class DocsPage extends React.Component{

    render(){
        return(
            <div id="content">
                <h2 className="rowFlex center">
                    <ContactSupportOutlined sx={{ fontSize: 40 }}/>
                    Manuali
                </h2>
                <p>
                    Inserisci qui sotto il tuo file in formato .csv per proseguire con la selezione delle dimensioni e la visualizzazione dei grafici.
                </p>
                <div className="columnFlex" id="docs-wrapper">
                    <DocsCard title="Manuale Utente (v1.3.5)"/>
                    <DocsCard title="Manuale Sviluppatore (v1.1.3)"/>
                </div>
            </div>
        );
    }
}

export default DocsPage;