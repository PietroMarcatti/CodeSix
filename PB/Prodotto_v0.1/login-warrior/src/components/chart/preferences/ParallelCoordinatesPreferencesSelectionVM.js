import { computed, makeObservable, observable} from "mobx";

export class ParallelCoordinatesPreferencesSelectionVM {
    
    constructor(rootStore){
        this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;
        this.parallelStore = this.preferencesStore.parallelCoordinatesPreferences;

    	makeObservable(this,{
            parallelStore:observable,
            axes: computed,
            color: computed,
			optionList : computed,
    	});
	}

    checkExistence(identifier){
        if(this.dimensions.find(dim => dim === this.preferencesStore.parallelCoordinatesPreferences[identifier]) || this.preferencesStore.parallelCoordinatesPreferences[identifier]===undefined)
		    return this.preferencesStore.parallelCoordinatesPreferences[identifier];
        else{
            this.preferencesStore.parallelCoordinatesPreferences.setPreferenceById("PC"+identifier,undefined)
            return this.preferencesStore.parallelCoordinatesPreferences[identifier];
        }
    }

    checkAxisExistence(){
        let ax = this.preferencesStore.parallelCoordinatesPreferences.axes.slice().filter(dim => this.dimensions.find(d => dim === d))
        this.preferencesStore.parallelCoordinatesPreferences.setPreferenceById("PCaxes", ax);
    }

    get axes(){
        //this.checkAxisExistence();
		return this.parallelStore.axes.slice().filter(dim => this.dimensions.slice().find(d => dim.value == d));
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