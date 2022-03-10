export default class DimensionalReductor{

    constructor(){
        this.algorithm = null;
    };

    setAlgorithm(algorithm){
        this.algorithm = algorithm;
    };

    executeAlgorithm(parameters, data){
        return this.algorithm.startDimensionalReduction(parameters,data);
    };
};