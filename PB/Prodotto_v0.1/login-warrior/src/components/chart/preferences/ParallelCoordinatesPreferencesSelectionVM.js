import { computed, makeObservable } from "mobx";

export class ParallelCoordinatesPreferencesSelectionVM {
    
    constructor(rootStore){
        this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;

    	makeObservable(this,{
			optionList : computed
    	});
	}

    checkExistence(identifier){
        if(this.dimensions.find(dim => dim === this.preferencesStore.scatterplotPreferences[identifier]) || this.preferencesStore.scatterplotPreferences[identifier]===undefined)
		    return this.preferencesStore.scatterplotPreferences[identifier];
        else{
            this.preferencesStore.scatterplotPreferences.setPreferenceById("PC"+identifier,undefined)
            return this.preferencesStore.scatterplotPreferences[identifier];
        }
    }

    checkAxisExistence(){
        console.log("Axes before: ", this.preferencesStore.parallelCoordinatesPreferences.axes.slice());
        let axes = this.preferencesStore.parallelCoordinatesPreferences.axes.filter(dim => this.dimensions.find(d => dim === d))
        this.preferencesStore.parallelCoordinatesPreferences.setPreferenceById("PCaxes", axes);
        console.log("Axes after: ", axes);
    }

    get axes(){
        this.checkAxisExistence();
		return this.preferencesStore.parallelCoordinatesPreferences.axes;
	}

    get color(){
        return this.checkExistence("color");
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

    get dimensions(){
		return this.datasetStore.numericDimensions.map(dim => dim.value).slice();
	}

    get optionList(){
        return this.datasetStore.numericDimensions.map(d=>{return {value:d.value, label: d.value}});
    }

    
}