import React from "react";
import { observer } from "mobx-react-lite";
import { Form, FormLabel} from "react-bootstrap";
import NumericInput from "react-numeric-input";

const SampleSelector = observer((props) =>{
    const{
        datasetLength,
        isDataLoaded,
        sampleSize,
        handleSampleSizeChange,
    } = props;

    return(
        <>
            {isDataLoaded ? 
                <>
                    <FormLabel className="mt-1">Seleziona il numero di righe da campionare (max {datasetLength})</FormLabel>
                    <Form.Group>
                        <NumericInput step={Math.round(datasetLength/10)} min={1} max={datasetLength} value={sampleSize} onChange={(value) => handleSampleSizeChange(value)}/>
                    </Form.Group> 
                </>
                : 
                ""
            }
        </>
    )
    
});

export default SampleSelector;