import { computed, makeAutoObservable } from "mobx";

export class ForceDirectedPreferencesSelectionVM {
    
    constructor(rootStore){
        this.distanceMatricesStore = rootStore.distanceMatricesStore;
		this.preferencesStore = rootStore.preferencesStore;
		this.datasetStore = rootStore.datasetStore;

    	makeAutoObservable(this,{
			preferencesStore : false,
			datasetStore : false,
			distanceMatricesStore : false,
    	}, {autoBind : true});
	}

    get keys(){
		return this.datasetStore.checkedDimensions.map(d => d.value);
	}
  
	get color(){
		return this.preferencesStore.forceDirectedPreferences.color;
	}

	get matrices(){
		return this.distanceMatricesStore.distanceMatricesNames;
	}
	
	get matrixName(){
		return this.preferencesStore.forceDirectedPreferences.matrix;
	}

	get distMax(){
		return this.preferencesStore.forceDirectedPreferences.distMax;
	}

	get distMin(){
		return this.preferencesStore.forceDirectedPreferences.distMin;
	}

	getDistanceMatricesByName(matrixName){
		return this.distanceMatricesStore.getDistanceMatrixByName(matrixName);
	}

	get min(){
		const matrix = this.getDistanceMatricesByName(this.matrixName);
		return matrix ? Math.min.apply(Math, matrix.links.map(link =>link.value)) : undefined;
	} 

	get max(){
		const matrix = this.getDistanceMatricesByName(this.matrixName);
		return matrix ? Math.max.apply(Math, matrix.links.map(link =>link.value)) : undefined;
	}

    setForceDirectedPreferences(identifier, value){
		switch(identifier){
		case "distanceMatrix":
			this.preferencesStore.forceDirectedPreferences.matrix = value;
			break;
		case "color":
			this.preferencesStore.forceDirectedPreferences.color = value;
			break;
		case "distMax":
			this.preferencesStore.forceDirectedPreferences.distMax = value;
			break;
		case "distMin":
			this.preferencesStore.forceDirectedPreferences.distMin = value;
			break;
		default:
		}
	}

	handleSelectChange = (e) => {
		console.log("Identifier: ", e.target.id);
		const value = e.target.value==="undefined" ? undefined : e.target.value,
			identifier = e.target.id;
		this.setForceDirectedPreferences(identifier, value);
	}
}