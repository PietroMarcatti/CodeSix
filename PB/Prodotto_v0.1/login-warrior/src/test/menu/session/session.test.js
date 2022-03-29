import React from "react";
import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import RootStore from "../../../stores/RootStore";
import {AppContextProvider} from "../../../ContextProvider";
import Menu from "../../../components/menu/Menu";
import Dimension from "../../../stores/data/Dimension";

const json = {
	"preferencesStore":{
		"chart":"undefined",
		"scatterplotPreferences":{"SPaxisX":"undefined","SPaxisY":"undefined","SPpointSize":"undefined","SPcolor":"undefined","SPshape":"undefined"},
		"sankeyDiagramPreferences":{"SDdistanceMatrixName":"undefined","SDlinkColor":"grey","SDalign":"justify","SDdistMax":null,"SDdistMin":"undefined"},
		"parallelCoordinatesPreferences":{"PCaxes":[],"PCcolor":"undefined"},
		"forceDirectedPreferences":{"FDmatrix":"undefined","FDcolor":"undefined","FDdistMax":null,"FDdistMin":"undefined"}
	},
	"datasetStore":{
		"dimensions":[
			{"_value":"A","_isChecked":true,"_isNumeric":true,"_isRedux":false},
			{"_value":"B","_isChecked":true,"_isNumeric":true,"_isRedux":false},
			{"_value":"C","_isChecked":true,"_isNumeric":true,"_isRedux":false}
		],
		"data":[
			{"A":10,"B":20,"C":10},
			{"A":30,"B":10,"C":10}
		],
		"selected":[
			{"A":10,"B":20,"C":10},
			{"A":30,"B":10,"C":10}
		],
		"casts":[],
		"fileName":"",
		"fileSize":0
	},
	"distanceMatricesStore":[]
};

const wrongJson = {
	"preferencesStore":{
		"chart":"undefined",
		"scatterplotPreferences":{"SPaxisX":"undefined","SPaxisY":"undefined","SPpointSize":"undefined","SPcolor":"undefined","SPshape":"undefined"},
		"sankeyDiagramPreferences":{"SDdistanceMatrixName":"undefined","SDlinkColor":"grey","SDalign":"justify","SDdistMax":null,"SDdistMin":"undefined"},
		"parallelCoordinatesPreferences":{"PCaxes":[],"PCcolor":"undefined"},
		"forceDirectedPreferences":{"FDmatrix":"undefined","FDcolor":"undefined","FDdistMax":null,"FDdistMin":"undefined"}
	},
	"datasetStore":{
		"data":[
			{"A":10,"B":20,"C":10},
			{"A":30,"B":10,"C":10}
		],
		"selected":[
			{"A":10,"B":20,"C":10},
			{"A":30,"B":10,"C":10}
		]
	},
	"distanceMatricesStore":[]
};

let dataset = [{"A":10,"B":20,"C":10},{"A":30,"B":10,"C":10}];
let dimension1 = new Dimension("A");
let dimension2 = new Dimension("B");
let dimension3 = new Dimension("C");
let rootStore = new RootStore();
let datasetStore = rootStore.datasetStore;
let preferencesStore = rootStore.preferencesStore;
let distanceMatricesStore = rootStore.distanceMatricesStore;

describe("View session", ()=>{
	beforeEach(()=>{
		datasetStore.reset();
		preferencesStore.reset();
		distanceMatricesStore.reset();
		
        render(
			<AppContextProvider value={rootStore}>
				<Menu/>
			</AppContextProvider>
		);
		fireEvent.click(screen.getByRole("button",{name: "Gestisci Sessione"}));
	});

	test("load session success", async () =>{
		const file = new File([JSON.stringify(json)], "test.json", { type: "application/json" });
		const data = mockData([file]);

		function dispatchEvt(node, type, data) {
			const event = new Event(type, { bubbles: true });
			Object.assign(event, data);
			fireEvent.drop(node, event);
		}

		function mockData(files) {
			return {
				dataTransfer: {
					files,
					items: files.map(file => ({
						kind: "file",
						type: file.type,
						getAsFile: () => file,
					})),
					types: ["Files"],
				},
			};
		}
		const inputEl = screen.getByTestId("drop-input");
		dispatchEvt(inputEl, "dragenter", data);
		
        await waitFor(() => {	
			expect(screen.getByRole("alert", "Sessione ripristinata correttamente")).toBeInTheDocument();
		});

		expect(datasetStore.selectedData).toStrictEqual(dataset);
		expect(datasetStore.dimensions).toStrictEqual([dimension1, dimension2, dimension3]);
		expect(preferencesStore.chart).toStrictEqual(undefined);
	});

	test("load session fail", async () =>{
		const file = new File([wrongJson], "wrong.json", { type: "application/json" });
		const data = mockData([file]);

		function dispatchEvt(node, type, data) {
			const event = new Event(type, { bubbles: true });
			Object.assign(event, data);
			fireEvent.drop(node, event);
		}

		function mockData(files) {
			return {
				dataTransfer: {
					files,
					items: files.map(file => ({
						kind: "file",
						type: file.type,
						getAsFile: () => file,
					})),
					types: ["Files"],
				},
			};
		}
		const inputEl = screen.getByTestId("drop-input");
		dispatchEvt(inputEl, "dragenter", data);
		await waitFor(() => {
			expect(screen.getByText("Avviso")).toBeInTheDocument();
		});
	});
	
    test("export session", () => {
		datasetStore.loadData(dataset);
		datasetStore.loadDimensions([dimension1,dimension2,dimension3]);
		datasetStore.updateSelectedData();
		let text = JSON.stringify(rootStore);
		expect(text).toMatch(JSON.stringify(json));
	});

	test("change name", () => {
		const namebox = screen.getByRole("textbox");
		fireEvent.change(namebox,{target:{value: "prova"}});
		expect(namebox.value).toBe("prova");
	});
});