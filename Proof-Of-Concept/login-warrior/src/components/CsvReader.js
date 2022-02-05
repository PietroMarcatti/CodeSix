import { useState } from 'react'

const CsvReader = (props) =>{

    return(
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    console.log(typeof e.target.files[0]);
                    props.hooks["csvLoaded"][1](true)
                    props.hooks["csvFile"][1](e.target.files[0])
                }}
            >
            </input>
        </form>


    );

}

export default CsvReader;