import {makeAutoObservable} from "mobx";
import ScatterplotPreferences from "./preferences/ScatterplotPreferences";
import ParallelCoordinatesPreferences from "./preferences/ParallelCoordinatesPreferences";
import ForceDirectedPreferences from "./preferences/ForceDirectedPreferences";

class PreferencesStore {
	constructor(rootStore){
		this.rootStore = rootStore;
		this.chart = undefined;
        this.scatterplotPreferences = new ScatterplotPreferences();
		this.parallelCoordinatesPreferences = new ParallelCoordinatesPreferences();
		this.forceDirectedPreferences = new ForceDirectedPreferences();
		makeAutoObservable(this, {rootStore: false});
	}
	
    toJSON(){
		return {
			chart: this.chart ? this.chart : "undefined",
			scatterplotPreferences: this.scatterplotPreferences,
			parallelCoordinatesPreferences: this.parallelCoordinatesPreferences,
			forceDirectedPreferences : this.forceDirectedPreferences,
		};
	}

	fromJSON(store){
		this.chart = store.chart!== "undefined" ? store.chart : undefined;
		this.scatterplotPreferences.fromJSON(store.scatterplotPreferences);
		this.parallelCoordinatesPreferences.fromJSON(store.parallelCoordinatesPreferences);
		this.forceDirectedPreferences.fromJSON(store.forceDirectedPreferences);
	}

	reset(){
		this.chart = undefined;
        this.scatterplotPreferences = new ScatterplotPreferences();
		this.parallelCoordinatesPreferences = new ParallelCoordinatesPreferences();
		this.forceDirectedPreferences = new ForceDirectedPreferences();
	}
}

export default PreferencesStore;