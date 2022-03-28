import React from "react";
import { action, computed, makeObservable, observable } from "mobx";
import {MdUploadFile} from 'react-icons/md';
import {AiOutlineCloudSync} from "react-icons/ai"
import {MdScatterPlot} from "react-icons/md"
import {SiRedux} from "react-icons/si"
import {TiFlowSwitch} from "react-icons/ti";
import {SiGraphql} from "react-icons/si"
import {ChartType} from "../../utils";
import {AiOutlineBranches} from "react-icons/ai"
import {FaSquareRootAlt} from "react-icons/fa"

export class MenuVM{

    modalIsOpen = false;
    id=-1;
    names=["Carica dati da CSV", "Gestisci Sessione", "Riduzione Dimensionale","Calcolo delle distanze", "Scatterplot","Parallell Coordinates", "Force Directed Field", "Sankey Diagram",];
    icons=[<MdUploadFile size={32} className="icons"/>, 
        <AiOutlineCloudSync size={32} className="icons"/>,
        <SiRedux size={30}/>,
        <FaSquareRootAlt size={32} className="icons"/>,
        <MdScatterPlot size={32} className="icons" />,
        <AiOutlineBranches size={32} className="icons"/>,
        <SiGraphql size={32} className="icons"/>,
        <TiFlowSwitch size={32} className="icons" />
    ];
    fileName = "";

    constructor(rootStore){
        this.preferencesStore= rootStore.preferencesStore;
        this.datasetStore = rootStore.datasetStore;
        
        this.distanceMatricesStore = rootStore.distanceMatricesStore;
        this.checkToDisabled = this.checkToDisabled.bind(this);
        this.fileName= this.datasetStore.fileName;

        makeObservable(this,{
            modalIsOpen : observable,
            id: observable,
            fileName: observable,
            openModal: action,
            closeModal: action,
            showChart: action,
            distanceMatricesNumber: computed,
            isDataLoaded: computed,
        });
    }

    openModal = index => {
        this.modalIsOpen = true;
        this.id = index;
    };

    closeModal = () => {
        console.log("SOno stato chiamato");
        this.modalIsOpen = false;
    }

    showChart = index =>{
        this.id = index;
        switch(index) {
    	case 4:
    		this.preferencesStore.chart = ChartType.Scatterplot;
    		break;
        case 5:
            this.preferencesStore.chart = ChartType.ParallelCoordinates;
                break;
        case 6:
            this.preferencesStore.chart = ChartType.ForceDirected;
            break;
        case 7:
    		this.preferencesStore.chart = ChartType.SankeyDiagram;
    		break;
    	
    	default: 
            break;
    	}
    };

    get isDataLoaded(){
        return this.datasetStore.checkedDimensions.length < 2;
    }

    get distanceMatricesNumber(){
        return this.distanceMatricesStore.distanceMatricesNames.length < 1;
    }

    checkToDisabled = index =>{
        return (index >=2 && index <6 && this.isDataLoaded) || ((index === 6|| index ===7) && this.distanceMatricesNumber);
    }
}