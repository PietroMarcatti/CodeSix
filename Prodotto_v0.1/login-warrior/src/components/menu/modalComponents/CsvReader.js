import React from 'react';
import { useCSVReader, formatFileSize } from 'react-papaparse';
import { useInstance } from '../../../useInstance';
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
                    <div {...getRootProps()}>
                        {acceptedFile ? (
                            <>
                                <div >
                                <div >
                                    <span >
                                    {formatFileSize(acceptedFile.size)}
                                    </span>
                                    <span >{acceptedFile.name}</span>
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
                        'Drop CSV file here or click to upload'
                        )}
                    </div>
                    </>
                )}
            </CSVReader>
        </>
    )
};

export default CsvReader;