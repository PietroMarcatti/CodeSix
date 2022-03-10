import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import { useStore} from "../../../../ContextProvider";
import {useInstance} from "../../../../useInstance";
import {Modal, ModalBody, ModalFooter, Spinner, Alert, FormCheck} from "react-bootstrap";
import { AlgorithmTypes } from "../../../../utils";
import { DimensionalReductionVM } from "./DimensionalReductionVM";
import { Form } from "react-bootstrap";
import Slider from "@mui/material/Slider";
import Select from "react-select";
import makeAnimated from "react-select/animated"

const DimensionalReduction = observer((props)=>{
    const {
        modalIsOpen,
        closeModal
    }= props;
    const{
        handleSubmit,
        dimensionsToRedux,
        optionList,
        algorithmType,
        handleChangeDimensionsToRedux,
        handleChangeAlgorithmType,
        newDimensionsName,
        handleChangeNewDimensionsName,
        nameError,
        newDimensionsNumber,
        handleChangeNewDimensionsNumber,
        perplexity,
        handleChangePerplexity,
        epsilon,
        handleChangeEpsilon,
        neighbours,
        handleChangeNeighbours,
        localConnection,
        handleChangeLocalConnection,
        minDistance,
        handleChangeMinDist,
        setIsLoading,
        isLoading,
        showSuccess,
        setShowSuccess,
        showDanger,
        setShowDanger,
        toggleNormalize
    }= useInstance(new DimensionalReductionVM(useStore(), closeModal));

    function renderParams(){
        switch(algorithmType){
            case AlgorithmTypes.Tsne: 
                return(
                    <>
                        <Form.Group>
                            <Form.Label>Perplessità: {perplexity}</Form.Label>
                            <Slider  value={perplexity} min={20} max={200} onChange={handleChangePerplexity}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Epsilon: {epsilon}</Form.Label>
                            <Slider  value={epsilon} min={5} max={100} onChange={handleChangeEpsilon}/>
                        </Form.Group>
                    </>
                );
            case AlgorithmTypes.Umap: 
                return(
                    <>
                        <Form.Group>
                            <Form.Label>Local Connection: {localConnection}</Form.Label>
                            <Slider value={localConnection} min={1} max={100} onChange={handleChangeLocalConnection}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Distanze Minima: {minDistance}</Form.Label>
                            <Slider value={minDistance} min={0.05} max={1.5} step={0.05} onChange={handleChangeMinDist}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Neighbours: {neighbours}</Form.Label>
                            <Slider value={neighbours} min={20} max={200} onChange={handleChangeNeighbours}/>
                        </Form.Group>
                    </>
                );
            default:break;
        }
    };

    useEffect(() => {
		const time = 4000;
		let timer = setTimeout(() => setShowSuccess(false), time);
		return () => clearTimeout(timer);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[showSuccess]);
	
	useEffect(() => {
		const time = 4000;
		let timer = setTimeout(() => setShowDanger(false), time);
		return () => clearTimeout(timer);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[showDanger]);

    useEffect(()=>{	
        
		async function start(){
			await handleSubmit();
		}
		if(isLoading){
			start();
			setIsLoading(false);
		}
	},[isLoading]);

    return(
        <>
            <Modal show={modalIsOpen} onHide={closeModal}>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    setIsLoading(true);
                }} noValidate>
                    <Modal.Header closeButton>
                        <Modal.Title>Riduzione Dimensionale</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        <FormCheck className="mb-2" custom="true" type="checkbox" key="normalize" value="normalize" id="normalize" label="Normalizza i dati" onChange={toggleNormalize}/>
                        <Form.Group controlId="dimensionsToRedux">
                            <Form.Label>Seleziona dimensioni da utilizzare</Form.Label>
                            <Select value={dimensionsToRedux} options={optionList} isMulti name="toReduxDimensionsList"
                            className="basic-multi-select" classNamePrefix="select" components={makeAnimated()} closeMenuOnSelect={false} onChange={handleChangeDimensionsToRedux}/>
                        </Form.Group>
                        <Form.Group controlId="algorithmType" id="alg">
                            <Form.Label>Algoritmo: </Form.Label>
                            <Form.Control as="select" custom="true" value={algorithmType} onChange={handleChangeAlgorithmType}>
                                <option value={AlgorithmTypes.Tsne}>t-SNE</option>
                                <option value={AlgorithmTypes.Umap}>UMAP</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="newDimensionsName">
                            <Form.Label>Nome nuove dimensioni: </Form.Label>
                            <Form.Control required type="text" value={newDimensionsName} onChange={handleChangeNewDimensionsName} isInvalid={nameError}/>
                        </Form.Group>
                        <Form.Group controlId="newDimensionsNumber">
                            <Form.Label>Numero di nuove dimensioni: {newDimensionsNumber}</Form.Label>
                            <Slider value={newDimensionsNumber} onChange={handleChangeNewDimensionsNumber} min={2} max={8}/>
                        </Form.Group>
                        {renderParams()}
                    </ModalBody>
                    <ModalFooter>
                        <button  onClick={closeModal} className="red">Torna al menù</button>
						<button type="submit" className="green" >
							{isLoading? <><Spinner animation="border" size="sm"></Spinner><span>Riduzione in corso...</span></> : <span>Esegui riduzione</span>}
						</button>
                    </ModalFooter>
                </Form>
            </Modal>
            <Alert show={showSuccess} variant="success" className="alert" dismissible onClose={setShowSuccess.bind(null,false)}>
				<Alert.Heading>Operazione completata con successo</Alert.Heading>
				<p>
					La riduzione dimensionale è avvenuta con successo. Puoi ora visualizzare le tue nuove dimensioni.
				</p>
			</Alert>
			<Alert show={showDanger} variant="danger" className="alert" dismissible onClose={setShowDanger.bind(null,false)}>
				<Alert.Heading>Avviso</Alert.Heading>
				<p>
					La riduzione dimensionale è fallita. Controlla di avere un dataset ben formattato.
				</p>
			</Alert> 
        </>
    );
});

export default DimensionalReduction;