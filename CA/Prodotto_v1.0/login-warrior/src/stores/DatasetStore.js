import { makeObservable, observable, computed, action } from "mobx";
import Dimension from "./data/Dimension"

export default class DatasetStore {
    constructor(rootStore){
        this.dimensions=[];
        this.uploadedData=[];
        this.selectedData=[];
        this.casts=[];
        this.sampleSize = 0;
        this.fileName="";
        this.fileSize=0;
        this.rootStore= rootStore;
        makeObservable(this, {
            uploadedData : observable.shallow,
            selectedData : observable.shallow,
            dimensions : observable,
            casts: observable,
            fileName: observable,
            fileSize: observable,
            sampleSize: observable,
            checkedDimensions: computed,
            categoricCheckedDimensions: computed,
            numericDimensions: computed,
            selectedDimensions: computed,
            loadDimensions: action,
            updateSelectedData: action,
            loadData: action,
            loadFileName: action,
            loadFileSize:  action,
            loadCasts: action,
            loadSampleSize: action,
            sampleData: action,
            castData: action,
            deleteReduxedDimensions: action,
            addDimensionsToDataset: action,
            reset: action,
            fromJSON: action
        });
    };

    get canResample(){
        return this.sampleSize !== this.uploadedData.length
    }

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
        return this.dimensions.filter(dim => dim.isChecked && !dim.isRedux);
    };

    get notReducedDimensions(){
        return this.dimensions.filter(dim => !dim.isRedux)
    };

    loadSampleSize(value){
        this.sampleSize=value;
    }

    sampleData(){
        if(!this.canResample)
            this.selectedData.replace(this.uploadedData);
        else{
            let selectedRows = 0;
            let index = Math.random()*this.uploadedData.length;
            let next = 0;
            var arr = [...Array(this.uploadedData.length).keys()];
            var sampledData = [];
            while(selectedRows < this.sampleSize){
                next = Math.floor((index + Math.random()*arr.length) % arr.length);
                sampledData.push(this.uploadedData[arr[next]]);
                arr.splice(next,1);
                index = next;
                ++selectedRows;
            }
            this.selectedData.replace(sampledData);
        }
        
    }

    castData(){
        try{
            if(this.casts.length > 0){
                let expandedDimensions=[];
                this.casts.forEach(item =>{
                    if(item.value === "Data" && this.dimensions.find(dim => dim._value===item.id+"-year")===undefined){
                        let dYear = new Dimension(item.id+"-year");
                        let dMonth = new Dimension(item.id+"-month");
                        let dDay = new Dimension(item.id+"-day");
                        let dWeekday = new Dimension(item.id+"-weekday");
                        dYear.isNumeric = true; dMonth.isNumeric=true; dDay.isNumeric=true; dWeekday.isNumeric = true;
                        expandedDimensions.push(dYear);
                        expandedDimensions.push(dMonth);
                        expandedDimensions.push(dDay);
                        expandedDimensions.push(dWeekday);
                        this.dimensions.replace(this.dimensions.concat(expandedDimensions));
                    }
                })
                this.selectedData.forEach((rowObject,index)=>{
                    this.casts.forEach(item =>{
                        if(item.value === "Data"){
                            let date = new Date(rowObject[item.id]);
                            rowObject[item.id] = date;
                            rowObject[item.id.concat("-year")] = date.getFullYear();
                            rowObject[item.id.concat("-month")] = date.getMonth();
                            rowObject[item.id.concat("-day")]= date.getDate();
                            rowObject[item.id.concat("-weekday")] = date.getDay();
                        }
                    })
                })
            }
        }catch(e){
            console.log("Error: ",e);
        }
    }

    deleteReduxedDimensions(){
        this.dimensions.replace(this.notReducedDimensions);
    }

    isDataLoaded(){
        return this.dimensions.length===0;
    };

    loadData(data){
        this.uploadedData.replace(data);
        this.updateSelectedData();
    };

    loadDimensions(dimensions){
        this.dimensions.replace(dimensions);
    };

    loadCasts(casts){
        
        this.casts.replace(casts);
    }

    loadFileName(fileName){
        this.fileName=fileName;
    };

    loadFileSize(fileSize){
        this.fileSize=fileSize;
    }

    haveNotANumberValue(datasetRow){
        return !Object.values(datasetRow).some(value => Number.isNaN(value) || value === undefined || value === null)
    };

    updateSelectedData(){
        let data = this.uploadedData.map(d=>{
            return Object.fromEntries(this.selectedDimensions.map(dim=> [dim.value, d[dim.value]]));
        }).filter(this.haveNotANumberValue);
        this.selectedData.replace(data);
    };

    addDimensionsToDataset(moreDimensions){
        this.dimensions.replace(this.dimensions.concat(moreDimensions));
    };

    reset(){
        this.uploadedData.clear();
        this.selectedData.clear();
        this.dimensions.clear();
        this.casts.clear();
        this.fileName="";
        this.fileSize=0;
    };

    toJSON(){
        return {dimensions: this.dimensions, data: this.uploadedData, selected: this.selectedData, casts:this.casts, fileName : this.fileName, fileSize: this.fileSize};
    };

    fromJSON(store){
        this.dimensions.replace(store.dimensions.map(dim =>{
            return new Dimension(dim._value, dim._isChecked, dim._isNumeric, dim._isReduced)
        }));
        this.casts.replace(store.casts);
        this.uploadedData.replace(store.data);
        this.selectedData.replace(store.selected);
        this.fileName.replace(store.fileName);
        this.fileSize= store.fileSize;
    };

}