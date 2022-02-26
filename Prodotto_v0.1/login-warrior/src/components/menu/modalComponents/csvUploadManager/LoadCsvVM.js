import { observable, makeAutoObservable } from "mobx";

export class LoadCsvVM {
    castChoices = ["Data"];
    constructor(rootStore, closeModal){
        this.datasetStore = rootStore.datasetStore;
        //this.distanceMatricesStore = rootStore.distanceMatricesStore;
    	//this.preferencesStore = rootStore.preferencesStore;
        this.localData = [];
        this.fileName = "";
        this.fileSize = 0;
        this.showSuccess = false;
        this.showDanger = false;
        this.localDimensions = [];
        this.casts = [];
        this.closeModal = closeModal.bind(null);
        makeAutoObservable(this,{
            datasetStore: false,
            casts: false,
            //distanceMatricesStore: false,
            //preferencesStore: false,
            localData: observable.shallow,
        }, {autoBind: true});
    }

    loadDataAndDims=()=>{
        if(this.localData.length > 0){
            this.datasetStore.reset();
            //this.distanceMatricesStore.reset();
            //this.preferencesStore.reset();
            console.log(this.localData.slice());
            this.datasetStore.loadCasts([...this.localCasts]);
            this.datasetStore.loadData([...this.localData]);
            this.datasetStore.loadDimensions([...this.localDimensions]);
            this.datasetStore.loadFileName(this.fileName);
            this.datasetStore.loadFileSize(this.fileSize);
            this.datasetStore.updateSelectedData();
        }else{
            //this.preferencesStore.reset();
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

    get localCasts(){
        if(this.datasetStore.casts.length > 0)
            return this.datasetStore.casts.slice().sort((a,b)=>a.id-b.id);
        else
            return this.casts.slice().sort((a,b)=> a.id-b.id);
    }

    resetAndClose=()=>{
        this.localData.clear();
        this.localDimensions.clear();
        this.closeModal();
    };

    setLocalStates = (newData, newDims, fileName, fileSize) => {
        this.localData.replace(newData);
        this.localDimensions.replace(newDims);
        this.fileName=fileName;
        this.fileSize=fileSize;
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
        if(this.localCasts.length >0 && this.localCasts.find((value) => value.id === dim)){
            this.casts.replace(this.localCasts.map((value)=> value.id === dim ? {value: event.target.value, id: dim} : value));
        }else{
            this.casts.push({value:event.target.value, id: dim});
        }
        
    }

    handleConfirm=()=>{
        this.loadDataAndDims();
        this.resetAndClose();
        this.openAlertSuccess();
    };

    handleDismiss=()=>{
        this.resetAndClose();
        this.openAlertDanger();
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