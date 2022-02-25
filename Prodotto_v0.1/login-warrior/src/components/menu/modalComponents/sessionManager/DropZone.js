import React, {useCallback} from "react";
import { useDropzone } from "react-dropzone";

function DropZone(props){

    const loadSession = props.loadSession;

    const onDrop = useCallback((acceptedFiles)=>{
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log("File reading was aborted");
            reader.onerror = () => console.log("File reading failed");
            reader.onload = () =>{
                loadSession(reader.result);
            };
            reader.readAsText(file);
        });
    },[loadSession]);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return(
        <div {...getRootProps()} id="drop-zone">
            <input data-testid="drop-input" {...getInputProps()} />
            <p>Rilascia qui il tuo file o clicca per caricare la sessione</p>
        </div>
    );
};

export default DropZone;