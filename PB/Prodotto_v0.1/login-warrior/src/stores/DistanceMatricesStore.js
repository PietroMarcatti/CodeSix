import {makeObservable, observable, computed, action} from "mobx";
import DistanceMatrix from "./data/DistanceMatrix";
import * as distanceCalculation from "ml-distance";
import * as d3 from "d3";

class DistanceMatricesStore {
    constructor(rootStore){
        this.distanceMatrices = [];
        this.datasetStore = rootStore.datasetStore;
        makeObservable(this,{
            distanceMatrices: observable.deep,
            distanceMatricesNames: computed,
            addDistanceMatrix: action,
            calculateDistanceMatrix: action,
            reEvalueDistanceMatrices: action,
        });
    }

    addDistanceMatrix(matrix){
        this.distanceMatrices.push(matrix);
    };

    normalizeData(data,matrix){
        const maxes = matrix.dimensionsToRedux.map((dim, i)=>{
            return d3.max(data, obj => obj[i]);
        });
        return data.map(obj => matrix.dimensionsToRedux.map((dim, j) => obj[j]/maxes[j]));
    }

    calculateDistanceMatrix(matrix){
        console.log("Inizio il calcolo della matrice: ", matrix)
        let data = this.datasetStore.selectedData.map(obj => matrix.dimensionsToRedux.map((dim) => obj[dim.value]));
        if(matrix.normalize){
            data = this.normalizeData(data,matrix);
        }
        matrix.clearNodes();
        matrix.clearLinks();
        for(let i = 0; i<data.length; i++){
            for(let j = i+1; j<data.length; j++){
                let link = {
                    source: "node"+i,
                    target: "node"+j,
                    value: distanceCalculation.distance[matrix.distanceType](data[i],data[j]),
                };
                matrix.pushLink(link);
            }
            let node = {...this.datasetStore.selectedData[i]};
            node.id ="node"+i;
            matrix.pushNode(node);
        }
        this.replaceMatrix(matrix);
        return true;
    }

    getDistanceMatrixByName = (name) =>{
        return this.distanceMatrices.filter(matrix => matrix.name === name)[0];
    };

    replaceMatrix = (matrix) =>{
        let index = this.distanceMatrices.findIndex(m => m.name === matrix.name)
        if( index!== -1){
            let temp = this.distanceMatrices;
            temp[index]=matrix;
            this.distanceMatrices.replace(temp);
        }else{
            this.addDistanceMatrix(matrix);
        }
    }

    reEvalueDistanceMatrices=()=>{
        let matrices = this.distanceMatrices.slice();
        matrices.forEach(matrix => {
            this.calculateDistanceMatrix(matrix);
        });
    }

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