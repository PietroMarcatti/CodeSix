import { computed, makeObservable } from "mobx";

export class ParallelCoordinatesPreferencesSelectionVM {
    
    constructor(rootStore){
        this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;

    	makeObservable(this,{
			optionList : computed
    	});
	}

    get axes(){
		return this.preferencesStore.parallelCoordinatesPreferences.axes;
	}

    get color(){
        return this.preferencesStore.parallelCoordinatesPreferences.color;
    }

    
	
    handleSelectChangeDimensions = (value,handler) => {
        switch(handler.action){
            case "select-option":
                this.preferencesStore.parallelCoordinatesPreferences.setPreferenceById("PCaxes",value);break;
            case "remove-value":
                if(value.length >=2){
                    this.preferencesStore.parallelCoordinatesPreferences.setPreferenceById("PCaxes",value);
                }
                break;
            case "clear":
                this.preferencesStore.parallelCoordinatesPreferences.setPreferenceById("PCaxes",this.axes.slice(0,2));
                break;
            default: break;
        }
	}

    handleSelectChangeColor = e => {
        
		const identifier = e.target.id;
        const value = e.target.value==="undefined" ? undefined : e.target.value;
        console.log("Identifier: ",identifier," Value: ",value);
		this.preferencesStore.parallelCoordinatesPreferences.setPreferenceById(identifier, value);
	}

    get optionList(){
        return this.datasetStore.numericDimensions.map(d=>{return {value:d.value, label: d.value}});
    }

    
}