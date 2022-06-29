import React from "react";
import { observer } from "mobx-react-lite";
import { Form, FormLabel} from "react-bootstrap";
import NumericInput from "react-numeric-input";
import {AiOutlineInfoCircle} from "react-icons/ai"

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
                <div className="sampleSelector">
                    <div className="close">
                        <FormLabel className="mt-1">Seleziona il numero di righe da campionare (max {datasetLength})</FormLabel>
                        <div class="tooltip">
                                <AiOutlineInfoCircle/>
                                <span class="tooltiptext">Utilizzare un numero elevato di righe ( &gt;200 ) comporta seri problemi di performance</span>
                        </div>
                    </div>
                    <Form.Group className="row close">
                        <NumericInput step={Math.round(datasetLength/10)} min={1} max={datasetLength} value={sampleSize} onChange={(value) => handleSampleSizeChange(value)}/>
                    </Form.Group> 
                </div>
                : 
                ""
            }
        </>
    )
    
});

export default SampleSelector;