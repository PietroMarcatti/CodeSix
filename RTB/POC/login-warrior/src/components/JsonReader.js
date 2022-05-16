import { useState } from 'react'

const JsonReader= (props) =>{
    return(
        <form id='json-form'> 
            <input
                type='file'
                accept='.json'
                id='jsonFile' 
                onChange={(e) => {                    
                    const sessionFile= e.target.files[0];
                    const fileReader = new FileReader();
                    fileReader.readAsText(sessionFile, "UTF-8");
        
                    fileReader.onload = e => {
                        const jsonFile= JSON.parse(e.target.result);
                        jsonFile.name= sessionFile.name;
                        jsonFile.type= sessionFile.type;

                        console.log("contenuto jsonFile", jsonFile);
                        
                        props.hooks["csvLoaded"][1](true);
                        props.hooks["csvData"][1](jsonFile["csvData"]);
                        props.hooks["csvFile"][1](jsonFile);
                    };
                }}
            />
        </form>
    );
}

export default JsonReader;