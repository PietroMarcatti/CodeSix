import {makeAutoObservable} from "mobx";
import {DistanceType} from "../../../../utils";
import DistanceMatrix from "../../../../stores/data/DistanceMatrix";
import * as distanceCalculation from "ml-distance";
import * as d3 from "d3";

export class distanceCalculationVM{
    constructor(rootStore, closeModal){
        this.datasetStore = rootStore.datasetStore;
        this.distanceMatricesStore = rootStore.distanceMatricesStore;
        this._dimensionsToRedux = [];
        this.distanceType = DistanceType.Euclidean;
        this.newDistanceMatrixName = DistanceType.Euclidean;
        this.nameError = false;
        this.isLoading = false;
        this.closeModal = closeModal.bind(null);
        this.normalize = false;
        this.showSuccess = false;
        this.showDanger = false;
        makeAutoObservable(this, {datasetStore : false, distanceMatricesStore : false, }, {autoBind: true});
    };

    get optionList(){
        this.dimensionsToRedux = [];
        return this.datasetStore.numericDimensions.map(d => {return {value: d.value, label: d.value};});
    }

    get dimensionsToRedux(){
        if(this._dimensionsToRedux.length ===0 ){
            this.dimensionsToRedux = this.datasetStore.numericDimensions.map(d => {return {value: d.value, label: d.value};}).slice(0,2);
        }
        return this._dimensionsToRedux;
    };

    set dimensionsToRedux(list){
        this._dimensionsToRedux = list;
    }

    handleNormalize = () =>{
        this.normalize = !this.normalize;
    }

    normalizeData(data){
        const maxes = this.dimensionsToRedux.map((dim, i)=>{
            return d3.max(data, obj => obj[i]);
        });
        return data.map(obj => this.dimensionsToRedux.map((dim, j) => obj[j]/maxes[j]));
    }

    setIsLoading(value){
        this.isLoading = value;
    }

    handleSubmit = () =>{
        try{
            let data = this.datasetStore.selectedData.map(obj => this.dimensionsToRedux.map((dim) => obj[dim.value]));
            if(this.normalize){
                data = this.normalizeData(data);
                this.normalize = false;
            }

            if(this.distanceMatricesStore.getDistanceMatrixByName(this.newDistanceMatrixName) || this.newDistanceMatrixName === ""){
                let e = new Error("Il nome è già utilizzato o vuoto. Per favore scegline un altro.");
                e.name = "nameError";
                throw e;
            }

            let matrix = new DistanceMatrix();
            matrix.name = this.newDistanceMatrixName;
            for(let i = 0; i<data.length; i++){
                for(let j = i+1; j<data.length; j++){
                    let link = {
                        source: "node"+i,
                        target: "node"+j,
                        value: distanceCalculation.distance[this.distanceType](data[i],data[j]),
                    };
                    matrix.pushLink(link);
                }
                let node = {...this.datasetStore.selectedData[i]};
                node.id ="node"+i;
                matrix.pushNode(node);
            }

            this.distanceMatricesStore.addDistanceMatrix(matrix);
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
    };

    setShowDanger = bool =>{
    	this.showDanger = bool;
	};
	setShowSuccess= bool =>{
    	this.showSuccess = bool;
	};

    handleChangeDistanceType = e =>{
        this.newDistanceMatrixName = e.target.value;
        this.distanceType = e.target.value;
        this.nameError = false;
    };

    handleChangeNewDistanceMatrixName = e =>{
        this.nameError = false;
        this.newDistanceMatrixName = e.target.value;
    }

    handleChangeDimensionsToRedux = (value, handler) =>{
		switch(handler.action){
		case "select-option":
			this.dimensionsToRedux = value;
			return;
		case "remove-value":
			if(value.length >= 2)
				this.dimensionsToRedux = value;
			return;
		case "clear":
			this.dimensionsToRedux = this.dimensionsToRedux.slice(0,2);
			return;
		default:
			return;
		}
	};
}