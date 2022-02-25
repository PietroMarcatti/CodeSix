import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../../ContextProvider";
import { useInstance } from "../../../../useInstance";
import { Modal, ModalBody, ModalFooter, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {SessionManagerVM} from "./SessionManagerVM";
import DropZone from "./DropZone";
import {AiOutlineCloudSync} from "react-icons/ai"

const SessionManager = observer((props) =>{

    const {
        modalIsOpen,
        closeModal
    }=props;

    const {
        showSuccess,
        setShowSuccess,
        showDanger,
        setShowDanger,
        fileName,
        handleExport,
        loadSession,
        handleDismiss,
        handleFileNameChange
    } = useInstance(new SessionManagerVM(useStore(),closeModal));

    useEffect(()=>{
        const time = 4000;
        let timer = setTimeout(() => setShowSuccess(false), time);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showSuccess]);

    useEffect(()=>{
        const time = 4000;
        let timer = setTimeout(() => setShowDanger(false), time);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showDanger]);

    return(
        <>
            <Modal show={modalIsOpen} onHide={handleDismiss}>
                <Modal.Header closeButton>
                    <Modal.Title><AiOutlineCloudSync size={32}/>Carica/Esporta sessione</Modal.Title>
                </Modal.Header>
                <ModalBody id="drop-zone-wrapper">
                    <DropZone loadSession={loadSession}></DropZone>
                    <p>In alternativa, esporta la tua sessione di lavoro specificando il nome e premendo il tasto dedicato:</p>
                    <Form.Control id="input-session" required type="text" value={fileName} onChange={handleFileNameChange}/>
                    <button id="export-btn" className="blue" onClick={handleExport}>Esporta</button>
                </ModalBody>
                <ModalFooter>
                    <button className="red" onClick={handleDismiss}>Torna al menù</button>
                </ModalFooter>
            </Modal>
            <Alert show={showSuccess} variant="success" className="alert" dismissible onClose={setShowSuccess.bind(null,false)}>
                <Alert.Heading>Sessione ripristinata correttamente</Alert.Heading>
                <p>
                    Ora puoi continuare con il tuo lavoro.
                </p>
            </Alert>
            <Alert show={showDanger} variant="danger" className="alert" dismissible onClose={setShowDanger.bind(null,false)}>
                <Alert.Heading>Avviso</Alert.Heading>
                <p>
                    La sessione non è stata ripristinata. Assicurati di aver inserito un file ben formattato.
                </p>
            </Alert>
        </>
    );
});

export default SessionManager;