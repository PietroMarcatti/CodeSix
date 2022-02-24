//import PreferencesStore from './PreferenceStore';
import DatasetStore from './DatasetStore';
//import DistanceMatricesStore from './DistanceMatricesStore';

export default class RootStore{
    constructor(){
        //this.preferenceStore = new PreferencesStore(this);
        this.datasetStore = new DatasetStore(this);
        //this.distanceMatricesStore = new DistanceMatricesStore(this);
    }
}