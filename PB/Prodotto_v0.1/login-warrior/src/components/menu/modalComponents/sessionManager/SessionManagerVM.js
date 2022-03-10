import { makeAutoObservable } from "mobx";

export class SessionManagerVM{
    constructor(rootStore, closeModal){
        this.rootStore = rootStore;
		this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;
		this.distanceMatricesStore = rootStore.distanceMatricesStore;
		this.showDanger = false;
		this.showSuccess = false;
		this.closeModal = closeModal.bind(null);
        this.fileName = "sessione";
		makeAutoObservable(this, {rootStore: false, preferencesStore: false, datasetStore: false, distanceMatricesStore: false}, {autoBind: true});
    };

    handleExport=()=>{
        let text = JSON.stringify(this.rootStore);
        if(this.fileName.length === 0)
            this.fileName = "session";
        const file = new File([text], this.fileName+".json", {type:"text/json;charset=utf-8"});
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.download = file.name;
        link.href = url;
        link.click();
    };

    handleFileNameChange= e =>{
        this.fileName = e.target.value;
    };

    loadSession= (json) =>{
        
        try{
            this.datasetStore.fromJSON(JSON.parse(json).datasetStore);
            this.preferencesStore.fromJSON(JSON.parse(json).preferencesStore);
            this.distanceMatricesStore.fromJSON(JSON.parse(json).distanceMatricesStore);
            this.openAlertSuccess();
        }catch(e){
            this.datasetStore.reset();
            this.preferencesStore.reset();
            this.distanceMatricesStore.reset();
            console.log(e);
            this.openAlertDanger();
        }finally{
            this.closeModal();
        }
    };

    handleDismiss = () =>{
        this.closeModal();
    };

    openAlertSuccess = () =>{
        this.setShowSuccess(true);
    };

    openAlertDanger = () =>{
        this.setShowDanger(true);
    };

    setShowSuccess = bool => {
        this.showSuccess = bool;
    }

    setShowDanger = bool => {
        this.showDanger = bool;
    }
}