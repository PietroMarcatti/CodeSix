import {makeObservable, observable, computed, action} from "mobx";
import DistanceMatrix from "./data/DistanceMatrix";

class DistanceMatricesStore {
    constructor(rootStore){
        this.distanceMatrices = [];
        this.rootStore = rootStore;
        makeObservable(this,{
            distanceMatrices: observable.shallow,
            distanceMatricesNames: computed,
            addDistanceMatrix: action
        });
    }

    get distMatrices(){
        return this.distanceMatrices;
    };

    addDistanceMatrix(matrix){
        this.distanceMatrices.push(matrix);
    };

    getDistanceMatrixByName = (name) =>{
        return this.distanceMatrices.filter(matrix => matrix.name === name)[0];
    };

    get distanceMatricesNames(){
        return this.distanceMatrices.map(matrix => matrix.name);
    };

    reset(){
        this.distanceMatrices.clear();
    }

    toJSON(){
        return this.distanceMatrices;
    }

    fromJSON(store){
        store.forEach(matrix => {
            let temp = new DistanceMatrix();
            temp.fromJSON(matrix);
            this.addDistanceMatrix(temp);
        });
    };
}

export default DistanceMatricesStore;