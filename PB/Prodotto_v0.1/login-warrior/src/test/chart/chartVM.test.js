import RootStore from "../../stores/RootStore";
import {ChartVM} from "../../components/chart/ChartVM"
import { ChartType } from "../../utils";

let store, 
    chartVMinstance;

describe("chartVM test", () => {
    beforeEach(() => {
        store = new RootStore();

        store.datasetStore.fileName = "fileName";
        store.datasetStore.fileSize = "1MB";
        store.preferencesStore.chart = ChartType.Scatterplot;

        chartVMinstance = new ChartVM(store);
    });

    test("chartVM getter test", () => {
        expect(chartVMinstance.chartToShow).toStrictEqual(ChartType.Scatterplot);
        expect(chartVMinstance.fileName).toStrictEqual("fileName");
        expect(chartVMinstance.fileSize).toStrictEqual("1MB");
    });
});