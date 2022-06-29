class ReductionAlgorithm{
    constructor(){
        if(this.constructor === ReductionAlgorithm){
            throw new TypeError("Abstract class ReductionAlgorithm can't be instantiated");
        }
    }

    startDimensionalReduction(){
        throw new TypeError("startDimensionalReduction method must be implemented");
    }
};

export default ReductionAlgorithm;