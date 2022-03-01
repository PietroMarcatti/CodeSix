import React from "react";
import { Form, FormLabel, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const DimensionsList = observer((props)=>{

    const{
        dimensions,
        selectAllDimensions,
        selectDimension,
        castChoices,
        localCasts,
        handleSelectChangeCast,
        isDataLoaded,
    }=props;

    return(
        <Form>
            {
                isDataLoaded ? 
                    <>
                        { dimensions.length > 0 ? 
                        <>
                            <FormLabel className="mt-1">Seleziona le dimensioni da utilizzare:</FormLabel>
                            <Form.Group>
                                <Form.Check custom="true" type="checkbox" checked={dimensions.length === dimensions.filter(d=>d.isChecked).length}
                                    key="checkAll" value="checkAll" id="checkAll" label="Seleziona tutto" onChange={selectAllDimensions} />
                            </Form.Group>
                        </> : 
                        <></> 
                        }
                        <Form.Group id="form-dimensions-names">
                            {
                                dimensions.filter(dim => !dim.isReduced).map((dim,dimId)=>{
                                    
                                    return (
                                        <> <Row key={"r"+dimId}>
                                                <Col key={dim.value}>
                                                    <Form.Check custom="true" inline type="checkbox" checked={dim.isChecked} id={dim.value}
                                                    label={dim.value} onChange={selectDimension}/>
                                                </Col>
                                                <Col key={dimId}>
                                                    <Form.Label>Interpreta come:</Form.Label>
                                                    <Form.Control  label="Intepreta come:" custom="true" as="select" value={localCasts[dimId]} onChange={handleSelectChangeCast.bind(null)}>
                                                        <option id={dimId+"-"+0} value={"auto"} key={"noCast"}>Auto</option>
                                                        {castChoices.map((d,i) => {
                                                            return <option id={dimId+"-"+(i+1)} value={d} key={d+i+1}>{d}</option>
                                                        })}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </>
                                        
                                    );
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