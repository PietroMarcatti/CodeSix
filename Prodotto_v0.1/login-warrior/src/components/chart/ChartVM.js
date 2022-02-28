import { computed, makeObservable, observable, action } from "mobx";

export class ChartVM{
    constructor(rootStore){
        this.showPreferences = true;
        this.preferencesStore = rootStore.preferencesStore;
        this.datasetStore = rootStore.datasetStore;
        
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