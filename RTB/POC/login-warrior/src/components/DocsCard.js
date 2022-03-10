import React from "react";
import { CloudDownloadOutlined } from "@mui/icons-material";

class DocsCard extends React.Component{

    render() {
        return(
            <div className="docs-card">
                <h3 className="docs-title">
                    {this.props.title}
                </h3>
                <div id="last-update">
                    <span>Ultimo aggiornamento:</span> <b>02/03/2022</b>
                </div>
                <div id="direct-link" className="rowFlex center">
                    <a>Download diretto</a><CloudDownloadOutlined/>
                </div>
            </div>
        );
    }

}

export default DocsCard;