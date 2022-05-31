import { observable, makeAutoObservable,} from "mobx";

export default class LoadCsvVM {
    castChoices = ["Data"];
    constructor(rootStore, closeModal){
        this.datasetStore = rootStore.datasetStore;
        this.distanceMatricesStore = rootStore.distanceMatricesStore;
    	this.preferencesStore = rootStore.preferencesStore;
        this.localData = [];
        this.localCasts = [];
        this.showSuccess = false;
        this.showDanger = false;
        this.localDimensions = [];
        this.closeModal = closeModal.bind(null);
        
        makeAutoObservable(this,{
            datasetStore: false,
            distanceMatricesStore: false,
            preferencesStore: false,
            localData: observable.shallow,
        }, {autoBind: true});
    }


    loadDataAndDims=()=>{
        if(this.localData.length > 0){
            this.datasetStore.reset();
            this.distanceMatricesStore.reset();
            this.preferencesStore.reset();
            this.datasetStore.loadData([...this.localData]);
            this.datasetStore.loadDimensions([...this.localDimensions]);
            this.datasetStore.loadFileName(this.fileName);
            this.datasetStore.loadFileSize(this.fileSize);
            this.datasetStore.loadCasts([...this.localCasts]);
            this.datasetStore.sampleData();
            this.datasetStore.castData();
        }else{
            this.preferencesStore.reset();
            this.datasetStore.loadDimensions([...this.localDimensions]);
            this.datasetStore.updateSelectedData();
        }
    };

    get isDataLoaded() {
        return this.datasetStore.dimensions.length>0 || this.localDimensions.length >0;
    }

    get dimensions(){
        if(this.localDimensions.length >0 )
            return this.localDimensions;
        else 
            return this.datasetStore.dimensions;
        
    }

    get sampleSize(){
        return this.datasetStore.sampleSize;
    }

    get datasetLength(){
        return this.localData.length;
    }

    get casts(){
        return this.datasetStore.casts.slice();
    }

    resetAndClose=()=>{
        this.localData.clear();
        this.localDimensions.clear();
        this.closeModal();
    };

    setLocalStates = (newData, newDims, fileName, fileSize) => {
        newData = newData.slice(0,newData.length-1);
        console.log("Ultima riga: ", newData[newData.length-1])
        this.localData.replace(newData);
        this.localDimensions.replace(newDims);
        this.datasetStore.loadFileName(fileName);
        this.datasetStore.loadFileSize(fileSize);
        this.datasetStore.loadSampleSize(Math.round(newData.length/10));
    };

    selectAllDimensions=event=>{
        this.localDimensions.forEach(dimension =>{
            dimension.isChecked = event.target.checked;
        });
    };

    selectDimension=event=>{
        this.localDimensions.forEach(dimension =>{
            if(dimension.value === event.target.id)
                dimension.isChecked = event.target.checked;
        });
    };

    handleSelectChangeCast = event =>{
        let dim = event.target.options[0].id.split('-')[0];
        if(this.localCasts >0 && this.localCasts.find((value) => value.id === dim)){
            this.localCasts = this.localCasts.map((value)=> value.id === dim ? {value: event.target.value, id: dim} : value);
        }else{
            this.localCasts.push({value:event.target.value, id: dim});
        }
    }

    handleSampleSizeChange = (value) =>{
        this.datasetStore.loadSampleSize(value);
    }

    handleConfirm=()=>{
        this.loadDataAndDims();
        this.resetAndClose();
        this.openAlertSuccess();
    };

    handleDismiss=()=>{
        this.resetAndClose();
    };

    openAlertSuccess=()=>{
        return this.datasetStore.checkedDimensions.length !== 0?
            this.showSuccess = true : this.showDanger=true;
    };

    openAlertDanger = () =>{
        this.setShowDanger(true);
    };

    setShowDanger = bool =>{
        this.showDanger = bool;
    };

    setShowSuccess = bool =>{
        this.showSuccess = bool;
    };
}