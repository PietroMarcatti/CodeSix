import {makeAutoObservable} from "mobx";
import DistanceMatrix from "../../../../stores/data/DistanceMatrix";
import {DistanceType} from "../../../../utils";


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
        this.normalize = true;
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

    setIsLoading(value){
        this.isLoading = value;
    }

    handleSubmit = () =>{
        try{
            
            if(this.distanceMatricesStore.getDistanceMatrixByName(this.newDistanceMatrixName) || this.newDistanceMatrixName === ""){
                let e = new Error("Il nome è già utilizzato o vuoto. Per favore scegline un altro.");
                e.name = "nameError";
                throw e;
            }
            let matrix = new DistanceMatrix();
            matrix.distanceType=this.distanceType;
            matrix.dimensionsToRedux = this.dimensionsToRedux;
            matrix.name = this.newDistanceMatrixName;
            matrix.normalize = this.normalize;
            let result = this.distanceMatricesStore.calculateDistanceMatrix(matrix);
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