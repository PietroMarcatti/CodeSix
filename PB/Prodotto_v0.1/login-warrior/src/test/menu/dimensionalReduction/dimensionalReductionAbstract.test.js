import ReductionAlgorithm from "../../../components/menu/modalComponents/dimensionalReductionManager/algorithms/ReductionAlgorithm";
import ReductionParameters from "../../../components/menu/modalComponents/dimensionalReductionManager/parameters/ReductionParameters";

describe("Test - Abstract implementation errors", () => {
    test("Check error if abstract ReductionParameters is initialized", () => {
        let parameter = new ReductionParameters({dimensionsNumber: 2});
        
        const eps = () => parameter.getEpsilon();
        const per = () => parameter.getPerplexity();
        const nei = () => parameter.getNeighbours();
        const conn = () => parameter.getLocalConnection();
        const dist = () => parameter.getMinDist();

        expect(eps).toThrow("getEpsilon method must be implemented");
        expect(per).toThrow("getPerplexity method must be implemented");
        expect(nei).toThrow("getNeighbours method must be implemented");
        expect(conn).toThrow("getLocalConnection method must be implemented");
        expect(dist).toThrow("getMinDist method must be implemented");
    });

    test("Check error in initialized ReductionAlgorithm", () => {
        const create = () => new ReductionAlgorithm();

        expect(create).toThrow("Abstract class ReductionAlgorithm can't be instantiated");
    });
});