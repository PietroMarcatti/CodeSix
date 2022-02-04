import { useState } from 'react'

export default function JsonReader(){
    const [jsonFile, setJSONFile] = useState();

    const submit = () => {
        const file = jsonFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
        }
        reader.readAsText(file);
    }

    return(
        <form id='json-form'> 
            <input
                type='file'
                accept='.json'
                id='jsonFile' 
                onChange={(e) => {
                    setJSONFile(e.target.files[0])
                }}
            >
            </input>
            <br/>
            <button
                id="load_btn"
                onClick={(e) => {
                    e.preventDefault()
                    if(jsonFile)submit()
                }}>
                Conferma
            </button>

        </form>
    );

}