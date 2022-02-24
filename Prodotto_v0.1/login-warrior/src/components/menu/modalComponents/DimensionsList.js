import React from "react";
import { Form, FormLabel } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const DimensionsList = observer((props)=>{

    const{
        dimensions,
        selectAllDimensions,
        selectDimension,
    }=props;

    return(
        <Form>
            {
                dimensions.length !==0 ? 
                    <>
                        <FormLabel className="mt-1">Seleziona le dimensioni da utilizzare:</FormLabel>
                        <Form.Group>
                            <Form.Check custom="true" type="checkbox" checked={dimensions.length === dimensions.filter(d=>d.isChecked).length}
                                key="checkAll" value="checkAll" id="checkAll" label="Seleziona tutto" onChange={selectAllDimensions} />
                        </Form.Group>
                        <Form.Group>
                            {
                                dimensions.filter(dim => !dim.isReduced).map((dim)=>{
                                    return <Form.Check custom="true" inline type="checkbox" checked={dim.isChecked} key={dim.value} id={dim.value}
                                        label={dim.value} onChange={selectDimension}/>;
                                })
                            }
                        </Form.Group>
                    </> :
                    null
            }
        </Form>
    );
});

export default DimensionsList;