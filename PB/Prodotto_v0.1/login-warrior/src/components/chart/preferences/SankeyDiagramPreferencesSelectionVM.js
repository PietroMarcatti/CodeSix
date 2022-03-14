import { computed, makeAutoObservable } from "mobx";

export class SankeyDiagramPreferencesSelectionVM {
    constructor(rootStore){
        this.distanceMatricesStore = rootStore.distanceMatricesStore;
        this.preferencesStore = rootStore.preferencesStore;
		this.datasetStore = rootStore.datasetStore;

        makeAutoObservable(this,{
            distanceMatricesStore : false,
			preferencesStore : false,
			datasetStore : false
        }, {autoBind: true});
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

    get distMax(){
		return this.preferencesStore.sankeyDiagramPreferences.distMax;
	}

	get distMin(){
		return this.preferencesStore.sankeyDiagramPreferences.distMin;
	}

    get min(){
		const matrix = this.getDistanceMatricesByName(this.distanceMatrixName);
		return matrix ? this.roundNumber(Math.min.apply(Math, matrix.links.map(link =>link.value)),2) : undefined;
	} 

	get max(){
		const matrix = this.getDistanceMatricesByName(this.distanceMatrixName);
		return matrix ? this.roundNumber(Math.max.apply(Math, matrix.links.map(link =>link.value)),2) : undefined;
	}

	roundNumber(value, precision){
        return Math.round((value + Number.EPSILON) * Math.pow(10,precision)) / Math.pow(10,precision);
    }

    getDistanceMatricesByName(matrixName){
		return this.distanceMatricesStore.getDistanceMatrixByName(matrixName);
	}

    handleSelectChange = e => {
		const identifier = e.target.id;
        const value = e.target.value==="undefined" ? undefined : e.target.value;
		this.preferencesStore.sankeyDiagramPreferences.setPreferenceById(identifier, value);
	}

    handleMinDistChange = (value) =>{
		if(value){
			this.preferencesStore.sankeyDiagramPreferences.distMin = value;
			if(this.preferencesStore.sankeyDiagramPreferences.distMax < value){
				this.preferencesStore.sankeyDiagramPreferences.distMax = value;
			}
		}
	}

	handleMaxDistChange = (value) =>{
		if(value){
			this.preferencesStore.sankeyDiagramPreferences.distMax = value;
			if(this.preferencesStore.sankeyDiagramPreferences.distMin > value){
				this.preferencesStore.sankeyDiagramPreferences.distMin = value;
			}
		}
	}
}