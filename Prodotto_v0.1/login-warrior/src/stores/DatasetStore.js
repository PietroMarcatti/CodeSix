import { makeObservable, observable, computed, action } from "mobx";
import Dimension from "./data/Dimension"

export default class DatasetStore {
    constructor(rootStore){
        this.dimensions=[];
        this.uploadedData=[];
        this.selectedData=[];
        this.rootStore= rootStore;
        makeObservable(this, {
            uploadedData : observable.shallow,
            selectedData : observable.shallow,
            dimensions : observable,
            checkedDimensions: computed,
            categoricCheckedDimensions: computed,
            numericDimensions: computed,
            selectedDimensions: computed,
            loadDimensions: action,
            updateSelectedData: action,
            loadData: action,
            addDimensionsToDataset: action,
            reset: action,
            fromJSON: action
        });
    };

    get checkedDimensions(){
        return this.dimensions.filter(dim => dim.isChecked);
    };

    get categoricCheckedDimensions(){
        return this.dimensions.filter(dim => dim.isChecked && !dim.isNumeric)
    };

    get numericDimensions(){
        return this.dimensions.filter(dim => dim.isChecked && dim.isNumeric);
    };

    get selectedDimensions(){
        return this.dimensions.filter(dim => dim.isChecked && !dim.isReduced);
    };

    get notReducedDimensions(){
        return this.dimensions.filter(dim => !dim.isReduced)
    };

    isDataLoaded(){
        return this.dimensions.length===0;
    };

    loadData(data){
        this.uploadedData.replace(data);
    };

    loadDimensions(dimensions){
        this.dimensions.replace(dimensions);
    };

    haveNotANumberValue(datasetRow){
        return !Object.values(datasetRow).some(value => Number.isNaN(value) || value === undefined || value === null)
    };

    updateSelectedData(){
        let selectedData = this.uploadedData.map(d=>{
            return Object.fromEntries(this.selectedDimensions.map(dim=> [dim.value, d[dim.value]]));
        }).filter(this.haveNotANumberValue);
        this.loadDimensions(this.notReducedDimensions);
        this.selectedData.replace(selectedData);
    };

    addDimensionsToDataset(moreDimensions){
        this.dimensions.replace(this.dimensions.concat(moreDimensions));
    };

    reset(){
        this.uploadedData.clear();
        this.selectedData.clear();
        this.dimensions.clear();
    };

    toJSON(){
        return {dimensions: this.dimensions, data: this.uploadedData, selected: this.selectedData};
    };

    fromJSON(store){
        this.dimensions.replace(store.dimensions.map(dim =>{
            return new Dimension(dim._value, dim._isChecked, dim._isNumeric, dim._isReduced)
        }));
        this.uploadedData.replace(store.data);
        this.selectedData.replace(store.selected);
    };

}