import DistanceMatrix from "../../stores/data/DistanceMatrix";
import DistanceMatricesStore from "../../stores/DistanceMatricesStore";

let dmStore,
	distanceMatrix;

test("store should add new distance matrices and return them", () => {
	dmStore = new DistanceMatricesStore();
	distanceMatrix = new DistanceMatrix();
	dmStore.addDistanceMatrix(distanceMatrix);
	expect(dmStore.distanceMatrices).toStrictEqual([distanceMatrix]);
});
