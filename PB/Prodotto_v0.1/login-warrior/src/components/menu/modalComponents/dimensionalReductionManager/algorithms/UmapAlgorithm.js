import ReductionAlgorithm from "./ReductionAlgorithm";
const druid = require("@saehrimnir/druidjs");

class UmapAlgorithm extends ReductionAlgorithm {
    startDimensionalReduction(parameters, data){
        const matrix = druid.Matrix.from(data);
        let alg = new druid.UMAP(matrix, parameters.getNeighbours(), parameters.getLocalConnection(), parameters.getMinDist(), parameters.getDimensionsNumber());
        return alg.transform();
    }
};

export default UmapAlgorithm;