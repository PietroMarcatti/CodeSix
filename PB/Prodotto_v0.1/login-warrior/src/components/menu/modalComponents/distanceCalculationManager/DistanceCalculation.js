import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../../ContextProvider";
import {useInstance} from "../../../../useInstance";
import Modal  from "react-bootstrap/Modal";
import { ModalBody, ModalFooter, Spinner, Alert } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Form from "react-bootstrap/Form";
import { DistanceType } from "../../../../utils";
import { distanceCalculationVM } from "./DistanceCalculationVM";

const DistanceCalculation = observer((props)=>{
    const{
        modalIsOpen,
        closeModal,
    } = props;
    const {
        dimensionsToRedux,
        handleSubmit,
        optionList,
        handleChangeDimensionsToRedux,
        distanceType,
        handleChangeDistanceType,
        newDistanceMatrixName,
        handleChangeNewDistanceMatrixName,
        nameError,
        setIsLoading,
        isLoading,
        handleNormalize,
        showSuccess,
        setShowSuccess,
        showDanger,
        setShowDanger,
    } = useInstance(new distanceCalculationVM(useStore(),closeModal));

    useEffect(()=>{	
		async function start(){
			await handleSubmit();
		}
		if(isLoading){
			start();
			setIsLoading(false);
		}
    // eslint-disable-next-line react-hooks/exhaustive-deps
	},[isLoading]);

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

    return(
        <>
            <Modal show = {modalIsOpen} onHide={closeModal}>
                <Form onSubmit={(e) => {e.preventDefault();setIsLoading(true);}} noValidate>
                    <Modal.Header closeButton>
                        <Modal.Title>Riduzione dimensionale tramite calcolo delle distanze</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <Form.Check custom="true" type="checkbox" key="normalize" value="normalize" id="normalize" label="Normalizza i dati" onChange={handleNormalize}/>
                        <Form.Group controlId="dimensionsToRedux">
                            <Form.Label>Seleziona dimensioni da utilizzare</Form.Label>
                            <Select classname="basic-multi-select" value={dimensionsToRedux} options={optionList} isMulti name="toReduxDimensionsList" classNamePrefix="select" components={makeAnimated()}
                            closeMenuOnSelect={false} onChange={handleChangeDimensionsToRedux} />
                        </Form.Group>
                        <Form.Group controlId="distanceType">
                            <Form.Label>Tipo di distanza</Form.Label>
                            <Form.Control as="select" custom="true" value={distanceType} onChange={handleChangeDistanceType}>
                                <option value={DistanceType.Euclidean}>Euclidea</option>
                                <option value={DistanceType.Manhattan}>Taxicab</option>
                                <option value={DistanceType.Chebyshev}>Chebyshev</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="newDistanceMatrixName">
                            <Form.Label>Nome matrice delle distanze</Form.Label>
                            <Form.Control required type="text" value={newDistanceMatrixName} onChange={handleChangeNewDistanceMatrixName} isInvalid={nameError}/>
                            {/*<Form.Control.Feedback type="invalid">Nome invalido o già utilizzato.</Form.Control.Feedback>*/}
                        </Form.Group>
                    </ModalBody>
                    <ModalFooter>
						<button className="red" onClick={closeModal}>Torna al menù</button>
						<button type="submit" className="green" >
							{isLoading? <><Spinner animation="border" ></Spinner><span>Riduzione in corso...</span></> : <span>Esegui riduzione</span>}
						</button>
					</ModalFooter>
                </Form>
            </Modal>
            <Alert show={showSuccess} variant="success" className="alert success" dismissible onClose={setShowSuccess.bind(null,false)}>
				<Alert.Heading>Operazione completata con successo</Alert.Heading>
				<p>
                    La matrice delle distanze è stata calcolata con successo. Puoi ora visualizzarla nei grafici.
				</p>
			</Alert>
			<Alert show={showDanger} variant="danger" className="alert danger" dismissible onClose={setShowDanger.bind(null,false)}>
				<Alert.Heading>Avviso</Alert.Heading>
				<p>
                    Il calcolo della matrice delle distanze è fallito. Controlla di avere un dataset ben formattato.
				</p>
			</Alert> 
        </>
    );
});

export default DistanceCalculation;
