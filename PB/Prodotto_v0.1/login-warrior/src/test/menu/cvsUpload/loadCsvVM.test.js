import RootStore from "../../../stores/RootStore";
import LoadCsvVM from "../../../components/menu/modalComponents/csvUploadManager/LoadCsvVM";
import Dimension from "../../../stores/data/Dimension";

let rootStore;
let loadCsv;
let dim1;
let dim2;
let dataset;

describe("Save data and dims in store", () => {
	beforeEach(()=>{
        rootStore = new RootStore();
        loadCsv = new LoadCsvVM(rootStore, function(){});
        dim1 = new Dimension("A");
        dim2 = new Dimension("B");
        dataset = [{"A": 5.1, "B": 3.5},{"A": 4.9, "B": 3.1}];
    });
	
    test("Load data and dims", () => {
		loadCsv.setLocalStates(dataset, [dim1, dim2]);
		loadCsv.loadDataAndDims();
		
		expect(loadCsv.dimensions).toStrictEqual([dim1, dim2]);
		expect(rootStore.datasetStore.selectedDimensions).toStrictEqual([dim1, dim2]);
		//expect(rootStore.datasetStore.selectedData).toStrictEqual(dataset);
	});

	test("Update dims", () => {
		dim1.isChecked = false;
		loadCsv.setLocalStates(dataset, [dim1, dim2]);
		loadCsv.loadDataAndDims();

		expect(loadCsv.dimensions).toStrictEqual([dim1, dim2]);
		expect(rootStore.datasetStore.selectedDimensions).toStrictEqual([dim2]);
		//expect(rootStore.datasetStore.selectedData).toStrictEqual([{"B": 3.5},{"B": 3.1}]);
	});
});