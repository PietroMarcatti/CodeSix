import { computed, makeObservable } from "mobx";
import { useEffect } from "react";

export class ScatterplotPreferencesSelectionVM {
    
    constructor(rootStore){
        this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;

    	makeObservable(this,{
			dimensions : computed
    	});
	}

    checkExistence(identifier){
        if(this.dimensions.find(dim => dim === this.preferencesStore.scatterplotPreferences[identifier]) || this.preferencesStore.scatterplotPreferences[identifier]===undefined)
		    return this.preferencesStore.scatterplotPreferences[identifier];
        else{
            this.preferencesStore.scatterplotPreferences.setPreferenceById("SP"+identifier,undefined)
            return this.preferencesStore.scatterplotPreferences[identifier];
        }
    }

    get axisX(){
        return this.checkExistence("axisX");
	}

    get axisY(){
        return this.checkExistence("axisY");
    }

    get pointSize(){
        return this.checkExistence("pointSize");
    }
    
    get color(){
		return this.checkExistence("color");
	}

    get shape(){
        return this.checkExistence("shape");
    }
	
    handleSelectChange = e => {
		const identifier = e.target.id;
        const value = e.target.value==="undefined" ? undefined : e.target.value;
		this.preferencesStore.scatterplotPreferences.setPreferenceById(identifier, value);
	}

    get dimensions(){
		return this.datasetStore.numericDimensions.map(dim => dim.value).slice();
	}
}