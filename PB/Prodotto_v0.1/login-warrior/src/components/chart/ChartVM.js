import { computed, makeObservable, observable, action } from "mobx";

export class ChartVM{
    constructor(rootStore){
        this.showPreferences = true;
        this.preferencesStore = rootStore.preferencesStore;
        this.datasetStore = rootStore.datasetStore;
        this.distanceMatricesStore = rootStore.distanceMatricesStore;
        
        makeObservable(this,{
            showPreferences: observable,
            chartToShow: computed,
            showPref: computed,
            togglePref: action,
            fileName: computed,
            fileSize: computed,
        });
    };

    togglePref=() =>{
        this.showPreferences = !this.showPreferences;
    };

    changeSample=()=>{
        this.datasetStore.deleteReduxedDimensions();
        this.datasetStore.sampleData();
        this.datasetStore.castData();
        this.distanceMatricesStore.reEvalueDistanceMatrices();
    }

    get chartToShow(){
        return this.preferencesStore.chart;
    };

    get showPref(){
        return this.showPreferences;
    };

    get fileName(){
        return this.datasetStore.fileName;
    }

    get fileSize(){
        return this.datasetStore.fileSize;
    }
}