import RootStore from "./../../stores/RootStore";

let rootStore;

describe("Check that the user's preferences are correctly saved in the system", ()=>{
	beforeEach(() => {
		rootStore = new RootStore();		
	});

	test("ScatterPlot preferences", () => {
        rootStore.preferencesStore.scatterplotPreferences.setPreferenceById("SPaxisX", "x");
        rootStore.preferencesStore.scatterplotPreferences.setPreferenceById("SPaxisY", "y");
        rootStore.preferencesStore.scatterplotPreferences.setPreferenceById("SPpointSize", "p");
        rootStore.preferencesStore.scatterplotPreferences.setPreferenceById("SPcolor", "c");
        rootStore.preferencesStore.scatterplotPreferences.setPreferenceById("SPshape", "s");     

		expect(rootStore.preferencesStore.scatterplotPreferences.axisX).toStrictEqual("x");
        expect(rootStore.preferencesStore.scatterplotPreferences.axisY).toStrictEqual("y");
        expect(rootStore.preferencesStore.scatterplotPreferences.pointSize).toStrictEqual("p");
        expect(rootStore.preferencesStore.scatterplotPreferences.color).toStrictEqual("c");
        expect(rootStore.preferencesStore.scatterplotPreferences.shape).toStrictEqual("s");
	});

	test("SankeyDiagram preferences", () => {
		rootStore.preferencesStore.sankeyDiagramPreferences.setPreferenceById("SDdistanceMatrixName", "matrix");
        rootStore.preferencesStore.sankeyDiagramPreferences.setPreferenceById("SDlinkColor", "red");
        rootStore.preferencesStore.sankeyDiagramPreferences.setPreferenceById("SDalign", "center");
        rootStore.preferencesStore.sankeyDiagramPreferences.setPreferenceById("SDdistMax", 1000);
        rootStore.preferencesStore.sankeyDiagramPreferences.setPreferenceById("SDdistMin", 0);

        expect(rootStore.preferencesStore.sankeyDiagramPreferences.distanceMatrixName).toStrictEqual("matrix");
        expect(rootStore.preferencesStore.sankeyDiagramPreferences.linkColor).toStrictEqual("red");
        expect(rootStore.preferencesStore.sankeyDiagramPreferences.align).toStrictEqual("center");
        expect(rootStore.preferencesStore.sankeyDiagramPreferences.distMax).toStrictEqual(1000);
        expect(rootStore.preferencesStore.sankeyDiagramPreferences.distMin).toStrictEqual(0);    
	});

    test("ParallelCoordinates preferences", () => {
		rootStore.preferencesStore.parallelCoordinatesPreferences.setPreferenceById("PCaxes", ["dim1", "dim2"]);
        rootStore.preferencesStore.parallelCoordinatesPreferences.setPreferenceById("PCcolor", "dim3");

        expect(rootStore.preferencesStore.parallelCoordinatesPreferences.axes).toStrictEqual(["dim1", "dim2"]);
        expect(rootStore.preferencesStore.parallelCoordinatesPreferences.color).toStrictEqual("dim3");
	});

	test("ForceDirected preferences", () => {
		rootStore.preferencesStore.forceDirectedPreferences.color= "dim1";
        rootStore.preferencesStore.forceDirectedPreferences.distMin= 0;
        rootStore.preferencesStore.forceDirectedPreferences.distMax= 10;
        rootStore.preferencesStore.forceDirectedPreferences.matrix= "matrix";

        expect(rootStore.preferencesStore.forceDirectedPreferences.color).toStrictEqual("dim1");
        expect(rootStore.preferencesStore.forceDirectedPreferences.distMin).toStrictEqual(0);
        expect(rootStore.preferencesStore.forceDirectedPreferences.distMax).toStrictEqual(10);
        expect(rootStore.preferencesStore.forceDirectedPreferences.matrix).toStrictEqual("matrix");
	}); 
});
