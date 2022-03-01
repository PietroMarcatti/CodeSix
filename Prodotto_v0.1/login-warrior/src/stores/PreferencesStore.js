import {makeAutoObservable} from "mobx";
import ScatterplotPreferences from "./preferences/ScatterplotPreferences";
import ParallelCoordinatesPreferences from "./preferences/ParallelCoordinatesPreferences";

class PreferencesStore {
	constructor(rootStore){
		this.rootStore = rootStore;
		this.chart = undefined;
        this.scatterplotPreferences = new ScatterplotPreferences();
		this.parallelCoordinatesPreferences = new ParallelCoordinatesPreferences();

		/*this.preferencesAm = new PreferencesAM();
		this.preferencesHm = new PreferencesHM();
		
		this.preferencesPlma = new PreferencesPLMA();
		this.preferencesFf = new PreferencesFF();*/
		makeAutoObservable(this, {rootStore: false});
	}
	
    toJSON(){
		return {
			chart: this.chart ? this.chart : "undefined",
			scatterplotPreferences: this.scatterplotPreferences,
			parallelCoordinatesPreferences: this.parallelCoordinatesPreferences,

            /*preferencesAm: this.preferencesAm,
			preferencesFf: this.preferencesFf,
			preferencesHm: this.preferencesHm,
			preferencesPlma: this.preferencesPlma*/
		};
	}

	fromJSON(store){
		this.chart = store.chart!== "undefined" ? store.chart : undefined;
		this.scatterplotPreferences.fromJSON(store.scatterplotPreferences);
		this.parallelCoordinatesPreferences.fromJSON(store.parallelCoordinatesPreferences);
        /*this.preferencesAm.fromJSON(store.preferencesAm);
		this.preferencesFf.fromJSON(store.preferencesFf);
		this.preferencesHm.fromJSON(store.preferencesHm);
		this.preferencesPlma.fromJSON(store.preferencesPlma);*/
	}

	reset(){
		this.chart = undefined;
        this.scatterplotPreferences = new ScatterplotPreferences();
		this.parallelCoordinatesPreferences = new ParallelCoordinatesPreferences();

		/*this.preferencesAm = new PreferencesAM();
		this.preferencesHm = new PreferencesHM();
		this.preferencesSpm = new PreferencesSPM();
		this.preferencesFf = new PreferencesFF();*/
	}
}

export default PreferencesStore;