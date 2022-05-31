import React from 'react';
import { useCSVReader, formatFileSize } from 'react-papaparse';
import { useInstance } from '../../../../useInstance';
import { CsvReaderVM } from './CsvReaderVM';

function CsvReader(props){
    const { CSVReader } = useCSVReader();
    const{
        setLocalStates,
    }=props;

    const{
        handleOnDrop,
        handleOnError,
    }=useInstance(new CsvReaderVM(setLocalStates));

    return(
        <>
            <CSVReader onUploadAccepted={handleOnDrop.bind(null)} onUploadRejected={handleOnError.bind(null)} accept={".csv"}  config={{headers:false}}>
                {({
                    getRootProps,
                    acceptedFile,
                    ProgressBar,
                    getRemoveFileProps,
                }) => (
                    <>
                    <div {...getRootProps()} className="drop-zone">
                        {acceptedFile ? (
                            <>
                                <div >
                                <div className='row loaderFileNameSize'>
                                    <span >{acceptedFile.name + "\t"}</span>
                                    <span >{formatFileSize(acceptedFile.size)}</span>
                                </div>
                                <div >
                                    <ProgressBar />
                                </div>
                                <div
                                    {...getRemoveFileProps()}
                                    onMouseOver={(event) => {
                                    event.preventDefault();
                                    }}
                                    onMouseOut={(event) => {
                                    event.preventDefault();
                                    }}
                                >
                                </div>
                                </div>
                            </>
                        ) : (
                        'Rilascia qui il tuo dataset CSV in alternativa clicca e selezionalo'
                        )}
                    </div>
                    </>
                )}
            </CSVReader>
        </>
    )
};

export default CsvReader;