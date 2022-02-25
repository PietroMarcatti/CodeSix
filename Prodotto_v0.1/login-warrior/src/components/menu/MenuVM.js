import React from "react";
import { action, computed, makeObservable, observable } from "mobx";
import {MdUploadFile} from 'react-icons/md';
import {AiOutlineCloudSync} from "react-icons/ai"

export class MenuVM{

    modalIsOpen = false;
    id=-1;
    names=["Carica dati da CSV", "Salva o Ricarica Sessione", "Riduzione Dimensionale"];
    icons=[<MdUploadFile size={32} className="icons"/>, <AiOutlineCloudSync size={32} className="icons"/>, <AiOutlineCloudSync size={32} className="icons"/>];
    fileName = "";

    constructor(rootStore){
        //this.preferenceStore= rootStore.preferenceStore;
        this.datasetStore = rootStore.datasetStore;
        //this.distanceMatricesStore = rootStore.distanceMatricesStore;
        this.checkToDisabled = this.checkToDisabled.bind(this);
        this.fileName= this.datasetStore.fileName;

        makeObservable(this,{
            modalIsOpen : observable,
            id: observable,
            fileName: observable,
            openModal: action,
            closeModal: action,
            //showChart: action,
            //distanceMatricesNumber: computed,
            isDataLoaded: computed,
        });
    }

    openModal = index => {
        this.modalIsOpen = true;
        this.id = index;
    };

    closeModal = () => {
        this.modalIsOpen = false;
    }

    /*showChart = index =>{
        switch(index) {
    	case 5:
    		this.preferencesStore.chart = VisualizationType.ScatterPlotMatrix;
    		break;
    	case 6:
    		this.preferencesStore.chart = VisualizationType.SankeyDiagram;
    		break;
    	case 7:
    		this.preferencesStore.chart = VisualizationType.ParallelCoordinates;
    		break;
    	case 8:
    		this.preferencesStore.chart = VisualizationType.ForceField;
    		break;
    	default: 
            break;
    	}
    };*/

    get isDataLoaded(){
        return this.datasetStore.checkedDimensions.length < 2;
    }

    /*get distanceMatricesNumber(){
        return this.distanceMatricesStore.distanceMatricesNames.length < 1;
    }*/

    checkToDisabled = index =>{
        return (index >=2 && this.isDataLoaded) || (index === 8 && this.distanceMatricesNumber);
    }
}