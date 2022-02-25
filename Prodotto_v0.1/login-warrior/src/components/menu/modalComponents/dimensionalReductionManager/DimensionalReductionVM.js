import { makeAutoObservable } from "mobx";
import { AlgorithmTypes } from "../../../../utils";
import Dimension from "../../../../stores/data/Dimension";
import DimensionalReductor from "./DimensionalReductor";
import TsneAlgorithm from "./algorithms/TsneAlgorithm";
import UmapAlgorithm from "./algorithms/UmapAlgorithm";
import TsneParameters from "./parameters/TsneParameters";
import UmapParameters from "./parameters/UmapParameters";
import * as d3 from "d3";

export class DimensionalReductionVM{
    constructor(rootStore, closeModal){
        this.datasetStore = rootStore.datasetStore;
        this._dimensionsToRedux = [];
        this.algorithmType = AlgorithmTypes.Tsne;
        this.newDimensionsName = AlgorithmTypes.Tsne;
        this.newDimensionsNumber = 2;
        this.neighbours = 30;
        this.localConnection = 5;
        this.minDistance = 0.5;
        this.perplexity = 30;
        this.epsilon = 10;
        this.nameError = false;
        this.closeModal = closeModal.bind(null);
        this.isLoading = false;
        this.showDanger = false;
        this.showSuccess = false;
        this.normalize = false;
        makeAutoObservable(this,{datasetStore: false}, {autoBind:true});
    };

    get optionList(){
        this.dimensionsToRedux =[];
        return this.datasetStore.numericDimensions.map(d=>{return {value:d.value, label: d.value}});
    }

    get dimensionsToRedux() {
        if(this._dimensionsToRedux.length === 0){
            this.dimensionsToRedux = this.datasetStore.numericDimensions.map(d=> {return {value: d.value, label: d.value};}).slice(0,2);
        }
        return this._dimensionsToRedux;
    }

    set dimensionsToRedux(value){
        this._dimensionsToRedux = value;
    }

    toggleNormalize = () =>{
        this.normalize = !this.normalize;
    }

    normalizeData(data){
        const maxes = this.dimensionsToRedux.map((dim, i)=>{
            return d3.max(data, obj => obj[i]);
        });
        return data.map(obj => this.dimensionsToRedux.map((dim, j)=>obj[j]/maxes[j]))
    }

    setIsLoading(value){
        this.isLoading = value;
    }

    setShowDanger = bool =>{
        this.showDanger = bool;
    }

    setShowSuccess = bool =>{
        this.showSuccess = bool;
    }

    handleSubmit = () =>{
        try{
            let data = this.datasetStore.selectedData.map(obj => this.dimensionsToRedux.map((dim)=> obj[dim.value]));
            
            if(this.normalize){
                data = this.normalizeData(data);
                this.normalize = false;
            }
            const parameters = {
                name: this.newDimensionsName,
                dimensionsNumber : this.newDimensionsNumber,
                neighbours : this.neighbours,
                perplexity : this.perplexity,
                epsilon : this.epsilon,
                localConnection : this.localConnection,
                minDistance : this.minDistance
            };
            
            if(this.datasetStore.dimensions.some(dim => dim.value.slice(0, -1) === parameters.name) || this.newDimensionsName === ""){
                
                let e = new Error("The name is already in use. Please choose a different one")
                e.name = "nameError";
                throw e;
            }

            const dimReductor = new DimensionalReductor();
            let params;
            switch(this.algorithmType){
                case AlgorithmTypes.Tsne: 
                    dimReductor.setAlgorithm(new TsneAlgorithm());
                    params = new TsneParameters(parameters);break;
                case AlgorithmTypes.Umap: 
                    dimReductor.setAlgorithm(new UmapAlgorithm());
                    params = new UmapParameters(parameters);break;
                default: dimReductor.setAlgorithm(new TsneAlgorithm());
                    params = new TsneParameters(parameters); break;
            }
            console.log("Provo ad eseguire l'algoritmo ")
            const reduction = dimReductor.executeAlgorithm(params, data);
            console.log("Risultato ", reduction)
            let newDimsFromReduction = [];
            for(let i = 1; i<reduction._cols; i++){
                let d = new Dimension(parameters.name+i);
                d.isRedux= true;
                newDimsFromReduction.push(d);
            }
            let newDataFromReduction = this.datasetStore.selectedData;
            for(let i=0; i<newDataFromReduction.length; i++){
                let d = newDataFromReduction[i];
                let j=0;
                newDimsFromReduction.forEach(dim =>{
                    d[dim.value] = reduction.to2dArray[i][j];
                    j++;
                });
            }
            this.datasetStore.addDimensionsToDataset(newDimsFromReduction);
            this.setShowSuccess(true);
            this.closeModal();
        }catch(e){
            if(e.name === "nameError"){
                this.nameError = true;
            }else{
                console.log(e);
                this.setShowDanger(true);
                this.closeModal();
            }
        }
    }

    handleChangeNeighbours = (e) =>{
        this.neighbours = e.target.value;
    }

    handleChangeAlgorithmType = (e) =>{
        this.newDimensionsName = e.target.value;
        this.algorithmType = e.target.value;
        this.neighbours = 30;
        this.newDimensionsNumber = 2;
        this.epsilon = 10;
        this.perplexity = 30;
        this.nameError = false;
    }

    handleChangeNewDimensionsName = (e) =>{
		this.nameError = false;
		this.newDimensionsName = e.target.value;
	};

	handleChangeNewDimensionsNumber = (e) =>{
		this.newDimensionsNumber = e.target.value;
	};

	handleChangePerplexity = (e) =>{
		this.perplexity = e.target.value;
	};

	handleChangeEpsilon = (e) =>{
		this.epsilon = e.target.value;
	};

	handleChangeLocalConnection = (e) =>{
		this.localConnection = e.target.value;
	};

	handleChangeMinDist = (e) =>{
		this.minDistance = e.target.value;
	};

    handleChangeDimensionsToRedux(value,handler){
        switch(handler.action){
            case "select-option":
                this.dimensionsToRedux = value; break;
            case "remove-value":
                if(value.length >=2)
                    this.dimensionsToRedux = value;
                break;
            case "clear":
                this.dimensionsToRedux = this.dimensionsToRedux.slice(0,2);
                break;
            default: break;
        }
    }
};