import DistanceMatrix from "../../stores/data/DistanceMatrix";
import DistanceMatricesStore from "../../stores/DistanceMatricesStore";
import RootStore from "../../stores/RootStore";

let dmStore,
	distanceMatrix,
	rootStore;

test("store should add new distance matrices and return them", () => {
	rootStore = new RootStore();
	dmStore = new DistanceMatricesStore(rootStore);
	distanceMatrix = new DistanceMatrix();
	dmStore.addDistanceMatrix(distanceMatrix);
	expect(dmStore.distanceMatrices).toStrictEqual([distanceMatrix]);
});
