import { computed, makeObservable, observable, action } from "mobx";

export class ChartVM{
    constructor(rootStore){
        this.showPref = true;
        //this.preferencesStore = rootStore.preferencesStore;
        this.datasetStore = rootStore.datasetStore;
        makeObservable(this,{
            showPref: observable,
            //chartToShow: computed,
            //showChart: computed,
            togglePref: action,
        });
    };

    togglePref=() =>{
        this.showPref = !this.showPref;
    };

    /*get chartToShow(){
        return this.preferencesStore.chart;
    };*/

    get showChart(){
        return this.show;
    };
}