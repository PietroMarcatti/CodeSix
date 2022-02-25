import ReductionAlgorithm from "./ReductionAlgorithm";
const druid = require("@saehrimnir/druidjs")

class TsneAlgorithm extends ReductionAlgorithm{

    startDimensionalReduction(parameters, data){
        const matrix = new druid.Matrix.from(data);
        let alg = new druid.TSNE(matrix, parameters.getPerplexity(), parameters.getEpsilon(), parameters.getDimensionsNumber());
        return alg.transform();
    };
};

export default TsneAlgorithm;