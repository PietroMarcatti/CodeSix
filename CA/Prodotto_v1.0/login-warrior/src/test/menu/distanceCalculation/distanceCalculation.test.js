import React from "react";
import {AppContextProvider} from "../../../ContextProvider";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dimension from "../../../stores/data/Dimension";
import RootStore from "../../../stores/RootStore";
import Menu from "../../../components/menu/Menu";

let store,
    dim1,
    dim2,
    dataset;

describe("dimensional reduction through distance calculation", () => {
	beforeEach(()=>{
		store = new RootStore();
        dim1 = new Dimension("sepal");
        dim2 = new Dimension("petal");
        dataset = [{sepal: 10.1, petal: 4.5},{sepal: 2.9, petal: 7.0}];

        store.datasetStore.loadData(dataset);
		store.datasetStore.loadDimensions([dim1,dim2]);
		store.datasetStore.updateSelectedData();
		
		render(
			<AppContextProvider value={store}>
				<Menu/>
			</AppContextProvider>
		);
		fireEvent.click(screen.getByRole("button",{name: "Calcolo delle distanze" }));	
	});

    test("Euclidean distance", () => {
		fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "matrix"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione"}));
		
		let matrix = store.distanceMatricesStore.getDistanceMatrixByName("matrix");
		expect(matrix.links).toStrictEqual([{source: "node0", target: "node1", value: 0.7973308550537292}]);
    });

    test("Taxicab distance", () => {
        fireEvent.change(screen.getByRole("combobox",{name:"Tipo di distanza"}),{target:{value:"manhattan"}});
        fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "matrix"}}); 
        fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione" }));	

		let matrix = store.distanceMatricesStore.getDistanceMatrixByName("matrix");
		expect(matrix.links).toStrictEqual([{source: "node0", target: "node1", value: 1.0700141442715698}]); 
	});

    test("Chebyshev distance", () => {		
        fireEvent.change(screen.getByRole("combobox",{name:"Tipo di distanza"}),{target:{value:"chebyshev"}});
        fireEvent.change(screen.getByRole("textbox",{name:"Nome matrice delle distanze"}),{target:{value: "matrix"}});
		fireEvent.click(screen.getByRole("button",{name: "Esegui riduzione" }));	

		let matrix = store.distanceMatricesStore.getDistanceMatrixByName("matrix");
		expect(matrix.links).toStrictEqual([{source: "node0", target: "node1", value: 0.7128712871287128}]); 
	});
});