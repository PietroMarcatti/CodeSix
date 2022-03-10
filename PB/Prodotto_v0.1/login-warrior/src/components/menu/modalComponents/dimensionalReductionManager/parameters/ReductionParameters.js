export default class ReductionParameters{
    dimensionsNumber;
    constructor(parameters){
        this.dimensionsNumber = parameters.dimensionsNumber;
    }

    getDimensionsNumber(){
        return this.dimensionsNumber;
    };

    getEpsilon(){
        throw new TypeError("getEpsilon method must be implemented");
    };

    getPerplexity(){
        throw new TypeError("getPerplexity method must be implemented");
    };

    getNeighbours(){
        throw new TypeError("getNeighbours method must be implemented");
    };

    getLocalConnection(){
        throw new TypeError("getLocalConnection method must be implemented");
    };

    getMinDist(){
        throw new TypeError("getMinDist method must be implemented");
    };
}