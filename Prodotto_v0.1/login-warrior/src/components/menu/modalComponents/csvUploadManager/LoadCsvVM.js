import { observable, makeAutoObservable } from "mobx";

export class LoadCsvVM {
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
        this.closeModal = closeModal.bind(null);
        makeAutoObservable(this,{
            datasetStore: false,
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
            this.datasetStore.loadData([...this.localData]);
            this.datasetStore.loadDimensions([...this.localDimensions]);
            console.log("Caricamento",this.fileName);
            this.datasetStore.loadFileName(this.fileName);
            this.datasetStore.loadFileSize(this.fileSize);
            this.datasetStore.updateSelectedData();
        }else{
            //this.preferencesStore.reset();
            this.datasetStore.loadDimensions([...this.localDimensions]);
            this.datasetStore.updateSelectedData();
        }
    };

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
        console.log("Filename: ",this.fileName);
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

    handleConfirm=()=>{
        console.log("Conferma");
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