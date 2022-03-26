import React from "react";
import {AppContextProvider} from "./../../ContextProvider";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dimension from "../../stores/data/Dimension";
import RootStore from "../../stores/RootStore";
import {ChartType} from "../../utils";
import Chart from "../../components/chart/Chart";
import DistanceMatrix from "../../stores/data/DistanceMatrix";

let store,
    dim1,
    dim2,
    dataset,
    matrix;

describe("chart rendering", () => {
    beforeEach(() => {
		store = new RootStore();
		
        dim1 = new Dimension("dim1");
        dim2= new Dimension("dim2");
		dataset = [{dim1: 10, dim2: 4}, {dim1: 12, dim2: 20}];

        store.datasetStore.loadData(dataset);
		store.datasetStore.loadDimensions([dim1,dim2]);
	});

    test("Scatterplot render", () => {
        store.preferencesStore.chart= ChartType.Scatterplot;
        store.preferencesStore.scatterplotPreferences.setPreferenceById("SPaxisX", "dim1");
        store.preferencesStore.scatterplotPreferences.setPreferenceById("SPaxisY", "dim2");

        render(
			<AppContextProvider value={store}>
				<Chart/>
			</AppContextProvider>
		);

        const scatterplot= document.getElementById("scatterplot");
        expect(scatterplot).toBeInTheDocument();
    });

    test("Parallel coordinates render", () => {
        store.preferencesStore.chart= ChartType.ParallelCoordinates;
        store.preferencesStore.parallelCoordinatesPreferences.setPreferenceById("PCaxes", [dim1,dim2]);

        render(
			<AppContextProvider value={store}>
				<Chart/>
			</AppContextProvider>
		);

        const parallel= document.getElementById("parallel");
        expect(parallel).toBeInTheDocument();
    });
});

describe("distance matrix based charts rendering", () => {
    beforeEach(() => {
		store = new RootStore();
		
        dim1 = new Dimension("dim1");
        dim2= new Dimension("dim2");
		dataset = [{dim1: 10, dim2: 4}, {dim1: 12, dim2: 20}];

        store.datasetStore.loadData(dataset);
		store.datasetStore.loadDimensions([dim1,dim2]);

        matrix= new DistanceMatrix();
        matrix.name= "matrix";
        matrix.pushNode({id:"n1", dim1: 10, dim2: 4});
        matrix.pushNode({id:"n2", dim1: 12, dim2: 20});
        matrix.pushLink({source: "n1", target: "n2", value: 0.5385164807134502});
        store.distanceMatricesStore.addDistanceMatrix(matrix);
	});

    test("Sankey Diagram render", () => {
        store.preferencesStore.chart= ChartType.SankeyDiagram;
        store.preferencesStore.sankeyDiagramPreferences.setPreferenceById("SDdistanceMatrixName","matrix");

        render(
			<AppContextProvider value={store}>
				<Chart/>
			</AppContextProvider>
		);

        const sankey= document.getElementById("sankeyDiagram");
        expect(sankey).toBeInTheDocument();
    });

    test("Force Directed Graph render", () => {
        store.preferencesStore.chart= ChartType.ForceDirected;
        store.preferencesStore.forceDirectedPreferences.matrix="matrix";

        render(
			<AppContextProvider value={store}>
				<Chart/>
			</AppContextProvider>
		);

        const sankey= document.getElementById("forceDirected");
        expect(sankey).toBeInTheDocument();
    });
});
