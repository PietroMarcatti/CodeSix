import { computed, makeObservable } from "mobx";

export class ScatterplotPreferencesSelectionVM {
    
    constructor(rootStore){
        this.datasetStore = rootStore.datasetStore;
		this.preferencesStore = rootStore.preferencesStore;

    	makeObservable(this,{
			dimensions : computed
    	});
	}

    get axisX(){
		return this.preferencesStore.scatterplotPreferences.axisX;
	}

    get axisY(){
        return this.preferencesStore.scatterplotPreferences.axisY;
    }

    get pointSize(){
        return this.preferencesStore.scatterplotPreferences.pointSize;
    }
    
    get color(){
		return this.preferencesStore.scatterplotPreferences.color;
	}

    get shape(){
        return this.preferencesStore.scatterplotPreferences.shape;
    }
	
    handleSelectChange = e => {
		const identifier = e.target.id;
        const value = e.target.value==="undefined" ? undefined : e.target.value;
		this.preferencesStore.scatterplotPreferences.setPreferenceById(identifier, value);
	}

    get dimensions(){
		return this.datasetStore.numericDimensions.map(dim => dim.value);
	}
}