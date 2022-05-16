import { observable, makeAutoObservable,} from "mobx";
import Dimension from "../../../../stores/data/Dimension";

export default class LoadCsvVM {
    castChoices = ["Data"];
    constructor(rootStore, closeModal){
        this.datasetStore = rootStore.datasetStore;
        this.distanceMatricesStore = rootStore.distanceMatricesStore;
    	this.preferencesStore = rootStore.preferencesStore;
        this.localData = [];
        this.fileName = "";
        this.fileSize = 0;
        this.sampleSize = 0; 
        this.showSuccess = false;
        this.showDanger = false;
        this.localDimensions = [];
        this.casts = [];
        this.closeModal = closeModal.bind(null);
        
        makeAutoObservable(this,{
            datasetStore: false,
            casts: false,
            distanceMatricesStore: false,
            preferencesStore: false,
            localData: observable.shallow,
        }, {autoBind: true});
    }


    castData(){
        try{
            if(this.casts.length > 0){
                let expandedDimensions=[];
                this.casts.forEach(item =>{
                    if(item.value === "Data"){
                        let dYear = new Dimension(item.id+"-year");
                        let dMonth = new Dimension(item.id+"-month");
                        let dDay = new Dimension(item.id+"-day");
                        let dWeekday = new Dimension(item.id+"-weekday");
                        dYear.isNumeric = true; dMonth.isNumeric=true; dDay.isNumeric=true; dWeekday.isNumeric = true;
                        expandedDimensions.push(dYear);
                        expandedDimensions.push(dMonth);
                        expandedDimensions.push(dDay);
                        expandedDimensions.push(dWeekday);
                        this.localDimensions.replace(this.localDimensions.concat(expandedDimensions));
                    }
                })
                this.localData.forEach((rowObject,index)=>{
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

    loadDataAndDims=()=>{
        if(this.localData.length > 0){
            this.datasetStore.reset();
            this.distanceMatricesStore.reset();
            this.preferencesStore.reset();
            this.sampleData();
            this.castData();
            this.datasetStore.loadCasts([...this.localCasts]);
            this.datasetStore.loadData([...this.localData]);
            this.datasetStore.loadDimensions([...this.localDimensions]);
            this.datasetStore.loadFileName(this.fileName);
            this.datasetStore.loadFileSize(this.fileSize);
            this.datasetStore.updateSelectedData();
        }else{
            this.preferencesStore.reset();
            this.datasetStore.loadDimensions([...this.localDimensions]);
            this.datasetStore.updateSelectedData();
        }
    };

    sampleData(){
        if(this.sampleSize === this.datasetLength)
            return null;

        let selectedRows = 0;
        let index = Math.random()*this.datasetLength;
        let next = 0;
        var arr = [...Array(this.datasetLength).keys()];
        var sampledData = [];
        while(selectedRows < this.sampleSize){
            next = Math.floor((index + Math.random()*arr.length) % arr.length);
            sampledData.push(this.localData[arr[next]]);
            arr.pop(next);
            index = next;
            ++selectedRows;
        }
        this.localData.replace(sampledData);
    }

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

    get datasetLength(){
        return this.localData.length;
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
        this.sampleSize = newData.length;
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

    handleSampleSizeChange = (value) =>{
        this.sampleSize = value;
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