import { useState } from 'react'

const CsvReader = (props) =>{
    return(
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                disabled={props.disabled}
                onChange={(e) => {
                    props.hooks["csvLoaded"][1](true)
                    props.hooks["csvFile"][1](e.target.files[0])
                }}
            />
        </form>
    );

}

export default CsvReader;