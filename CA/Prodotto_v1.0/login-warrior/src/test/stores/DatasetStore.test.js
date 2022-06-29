import Dimension from "../../stores/data/Dimension";
import DatasetStore from "../../stores/DatasetStore";

let store,
	dimension,
	dataset,
	dimension1,
	dimension2;

describe("Datasetstore", ()=>{
	beforeEach(() => {
		store = new DatasetStore();
		dimension = new Dimension("test");
		dataset = [{test: "test"}, {test: "test2"}];
	});

	test("Store should set and return the original data/dimensions", () => {
		store.loadData(dataset);
		store.loadDimensions([dimension]);
		store.updateSelectedData(dataset);
	
		expect(store.selectedData).toStrictEqual(dataset);
		expect(store.selectedDimensions).toStrictEqual([dimension]);
	});

	test("Store should add new dimensions from dimensionality reduction process", () => {
		store.addDimensionsToDataset(dimension);
		expect(store.selectedDimensions).toStrictEqual([dimension]);
	});

	test("Store should reset data", () => {
		store.addDimensionsToDataset(dimension);
		store.loadData(dataset);
		store.reset();
		expect(store.dimensions).toStrictEqual([]);
		expect(store.selectedData).toStrictEqual([]);
	});

	test("Store should resample data", () => {
		store.sampleSize = 1;
		
		expect(store.canResample).toBe(true);
	});
});

describe("Tests with different types of dimensions", ()=>{
	beforeEach(() => {
		dimension1 = new Dimension("testNum");
		dimension2 = new Dimension("testCat",true,false);
		dataset = [{testNum: "1", testCat: "test"}];
		store.loadData(dataset);
		store.loadDimensions([dimension1,dimension2]);
	});
	test("Checks that numeric dimensions are correctly selected", () => {
		expect(store.numericDimensions).toStrictEqual([dimension1]);
	});

	test("Checks that categorical dimensions are correctly selected", () => {
		expect(store.categoricCheckedDimensions).toStrictEqual([dimension2]);
	});
});