import { computed, makeObservable } from "mobx";

export class SankeyDiagramPreferencesSelectionVM {
    constructor(rootStore){
        this.distanceMatricesStore = rootStore.distanceMatricesStore;
        this.preferencesStore = rootStore.preferencesStore;

        makeObservable(this,{
            distanceMatrixName : computed
        });
    }

    get distanceMatrixName(){
        return this.preferencesStore.sankeyDiagramPreferences.distanceMatrixName;
    }

    get linkColor(){
        return this.preferencesStore.sankeyDiagramPreferences.linkColor;
    }

    get align(){
        return this.preferencesStore.sankeyDiagramPreferences.align;
    }

    get distanceMatricesNames(){
        return this.distanceMatricesStore.distanceMatricesNames;
    }

    handleSelectChange = e => {
		const identifier = e.target.id;
        const value = e.target.value==="undefined" ? undefined : e.target.value;
		this.preferencesStore.sankeyDiagramPreferences.setPreferenceById(identifier, value);
	}
}