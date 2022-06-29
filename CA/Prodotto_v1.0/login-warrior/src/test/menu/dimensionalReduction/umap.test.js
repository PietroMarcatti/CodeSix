import UmapParameters from "../../../components/menu/modalComponents/dimensionalReductionManager/parameters/UmapParameters"
import UmapAlgorithm from "../../../components/menu/modalComponents/dimensionalReductionManager/algorithms/UmapAlgorithm";
import DimensionalReductor from "../../../components/menu/modalComponents/dimensionalReductionManager/DimensionalReductor";

let parameters;

describe("Test - UMAP dimensional reduction", () => {
    beforeEach(()=>{
        parameters = {dimensionsNumber: 3, neighbours: 11, localConnection: 18, minDist: 10};
    });

    test("Check that the parameters of the algorithms are set correctly", () => {
        let	umapParams = new UmapParameters(parameters);
        
        expect(umapParams.getDimensionsNumber()).toStrictEqual(3);
        expect(umapParams.getNeighbours()).toStrictEqual(11);
        expect(umapParams.getLocalConnection()).toStrictEqual(18);
        expect(umapParams.getMinDist()).toStrictEqual(10);
    });
    
    test("Check that the algorithm is set correctly in the dimensional reduction Algorithm", () => {
        
        let drAlgorithm = new DimensionalReductor(),
            algorithm = new UmapAlgorithm(),
            parameter = new UmapParameters(parameters),
            reduct;
        
        drAlgorithm.setAlgorithm(algorithm);
        expect(drAlgorithm.algorithm).toBe(algorithm);

        reduct = drAlgorithm.executeAlgorithm(parameter, [[1,2],[3,4]]);
        expect(reduct._cols).toBe(3);
    });
});