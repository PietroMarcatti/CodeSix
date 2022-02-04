import { useState } from 'react'

export default function CsvReader(){
    const [csvFile, setCsvFile] = useState();

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
        }
        reader.readAsText(file);
    }

    return(
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
            >
            </input>
            <br/>
            <button
                id="load_btn"
                onClick={(e) => {
                    e.preventDefault()
                    if(csvFile)submit()
                }}>
                Conferma
            </button>

        </form>


    );

}