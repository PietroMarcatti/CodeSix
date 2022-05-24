import React, {useEffect} from "react";
import {observer} from 'mobx-react-lite';
import CsvReader from './CsvReader';
import DimensionsList from './DimensionsList';
import SampleSelector from './SampleSelector';
import { useStore } from "../../../../ContextProvider";
import { useInstance } from "../../../../useInstance";
import { Modal, ModalBody, ModalFooter, Alert} from "react-bootstrap";
import LoadCsvVM from './LoadCsvVM';
import { MdUploadFile } from "react-icons/md";

const LoadCsv = observer((props) =>{
    const {
        modalIsOpen,
        closeModal
    } = props;
    const {
        dimensions,
        sampleSize,
        datasetLength,
        showSuccess,
        setShowSuccess,
        showDanger,
        setShowDanger,
        setLocalStates,
        selectAllDimensions,
        selectDimension,
        castChoices,
        casts,
        handleSelectChangeCast,
        handleSampleSizeChange,
        handleConfirm,
        handleDismiss,
        isDataLoaded,
    } = useInstance(new LoadCsvVM(useStore(), closeModal));

    useEffect(()=>{
        const time = 4000;
        let timer = setTimeout(()=>setShowSuccess(false),time);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showSuccess]);

    useEffect(()=>{
        const time = 4000;
        let timer = setTimeout(()=>setShowDanger(false),time);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showDanger]);

    return(
        
        <>
            <Modal show={modalIsOpen} onHide={handleDismiss} centered>
                <Modal.Header closeButton closeLabel="Chiudi">
                    <Modal.Title><MdUploadFile size={32}/>Carica i dati</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <div>
                        <CsvReader setLocalStates = {setLocalStates.bind(null)}/>
                        <SampleSelector isDataLoaded={isDataLoaded} sampleSize={sampleSize} datasetLength={datasetLength} handleSampleSizeChange={handleSampleSizeChange.bind(null)} />
                        <DimensionsList datasetLength={datasetLength} isDataLoaded={isDataLoaded} dimensions = {dimensions} selectAllDimensions={selectAllDimensions.bind(null)} selectDimension={selectDimension.bind(null)} handleSelectChangeCast={handleSelectChangeCast.bind(null)} castChoices={castChoices} casts={casts}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="red"  onClick={handleDismiss}>Torna al menù</button>
                    <button className="green"  onClick={handleConfirm}>Conferma selezione</button>
                </ModalFooter>
            </Modal>
            <Alert show={showSuccess} variant="success" className="alert success" dismissible onClose={setShowSuccess.bind(null,false)}>
                <Alert.Heading>Avviso</Alert.Heading>
                <p>
                    Ora puoi applicare una riduzione dimensionale ai tuoi dati o scegliere subito la visualizzazione che più preferisci
                </p>
            </Alert>
            <Alert show={showDanger} variant="danger" className="alert danger" dismissible onClose={setShowDanger.bind(null,false)}>
                <Alert.Heading>Avviso</Alert.Heading>
                <p>
                    Nessun dato è stato caricato. Assicurati di aver inserito il file e premuto il tasto "<strong>Conferma selezione</strong>"
                </p>
            </Alert>
        </>
    )
});

export default LoadCsv;