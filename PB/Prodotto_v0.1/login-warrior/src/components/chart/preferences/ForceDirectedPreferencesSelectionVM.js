import {makeAutoObservable } from "mobx";
import { InputGroup } from "react-bootstrap";

export class ForceDirectedPreferencesSelectionVM {
    
    constructor(rootStore){
        this.distanceMatricesStore = rootStore.distanceMatricesStore;
		this.preferencesStore = rootStore.preferencesStore;
		this.datasetStore = rootStore.datasetStore;

		this.timeoutMin = null;
		this.timeoutMax = null;

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

	roundNumber(value, precision){
        return Math.round((value + Number.EPSILON) * Math.pow(10,precision)) / Math.pow(10,precision);
    }

	getDistanceMatricesByName(matrixName){
		return this.distanceMatricesStore.getDistanceMatrixByName(matrixName);
	}

	get min(){
		const matrix = this.getDistanceMatricesByName(this.matrixName);
		return matrix ? this.roundNumber(Math.min.apply(Math, matrix.links.map(link =>link.value)),2) : undefined;
	} 

	get max(){
		const matrix = this.getDistanceMatricesByName(this.matrixName);
		return matrix ? this.roundNumber(Math.max.apply(Math, matrix.links.map(link =>link.value)),2) : undefined;
	}

    setForceDirectedPreferences(identifier, value){
		switch(identifier){
		case "distanceMatrix":
			this.preferencesStore.forceDirectedPreferences.matrix = value;
			this.preferencesStore.forceDirectedPreferences.distMax = 0.52*this.max;
			this.preferencesStore.forceDirectedPreferences.distMin = 0.48*this.max;
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

	handleMinDistChange = (value) =>{
		if(this.timeoutMin)
			clearTimeout(this.timeoutMin);
			
		this.timeoutMin = setTimeout(() => {
			if(value){
				this.preferencesStore.forceDirectedPreferences.distMin = value;
			}
		}, 2000)
	}

	handleMaxDistChange = (value) =>{
		if(this.timeoutMax)
			clearTimeout(this.timeoutMax);

		this.timeoutMax = setTimeout(() => {
			if(value){
				this.preferencesStore.forceDirectedPreferences.distMax = value;
			}
		}, 2000)		
	}
}