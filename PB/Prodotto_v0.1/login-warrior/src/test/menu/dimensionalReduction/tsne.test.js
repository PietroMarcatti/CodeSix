import TsneParameters from "../../../components/menu/modalComponents/dimensionalReductionManager/parameters/TsneParameters"
import TsneAlgorithm from "../../../components/menu/modalComponents/dimensionalReductionManager/algorithms/TsneAlgorithm";
import DimensionalReductor from "../../../components/menu/modalComponents/dimensionalReductionManager/DimensionalReductor";

let parameters;

describe("Test - tSNE dimensional reduction", () => {
    beforeEach(()=>{
        parameters = {dimensionsNumber: 3, perplexity: 12, epsilon: 18};
    });

    test("Check that the parameters of the algorithms are set correctly", () => {
        let	tSneParams = new TsneParameters(parameters);
        
        expect(tSneParams.getDimensionsNumber()).toStrictEqual(3);
        expect(tSneParams.getEpsilon()).toStrictEqual(18);
        expect(tSneParams.getPerplexity()).toStrictEqual(12);
    });
    
    test("Check that the algorithm is set correctly in the dimensional reduction Algorithm", () => {
        
        let drAlgorithm = new DimensionalReductor(),
            algorithm = new TsneAlgorithm(),
            parameter = new TsneParameters(parameters),
            reduct;
        
        drAlgorithm.setAlgorithm(algorithm);
        expect(drAlgorithm.algorithm).toBe(algorithm);

        reduct = drAlgorithm.executeAlgorithm(parameter, [[1,2],[3,4]]);
        expect(reduct._cols).toBe(3);
    });
});