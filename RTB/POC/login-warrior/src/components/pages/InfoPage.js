import React from "react";
import {InfoOutlined} from "@mui/icons-material";

class InfoPage extends React.Component{
    render(){
        return(
            <div id="content">
                <h2 className="rowFlex center">
                    <InfoOutlined sx={{ fontSize: 40 }}/>
                    Informazioni
                </h2>
                <p>
                    Il prodotto presentato con il Capitolato d'Appalto C5 - Login Warrior è di realizzare un'applicazione che consenta la visualizzazione tramite grafici di dataset* contenenti molteplici dimensioni, al fine di consentirne l'analisi, utilizzando a supporto le tecnologie web.
                </p>
                <p>
                    L'applicazione si occupa di rendere disponibili per la visualizzazione di dataset contenenti dati multidimensionali dopo un'operazione algoritmica di riduzione dimensionale che ne facilita la comprensione e il riconoscimento di anomalie o difformità.
                    L'applicazione offre all'utilizzatore la possibilità di lavorare con dataset forniti in CSV* (o reperiti da un database). La funzionalità di visualizzazione è inoltre personalizzabile, prevedendo per i diversi grafici supportati delle opzioni di customizzazione. Infine è possibile memorizzare la sessione di lavoro per poter effettuare un ripristino in un secondo momento, permettendo anche di mantenere le scelte di personalizzazione effettuate.
                </p>

            </div>
        );
    }
}

export default InfoPage;