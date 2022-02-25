import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../ContextProvider";
import { ChartVM } from "./ChartVM";
import { useInstance } from "../../useInstance";
import {ChartType} from "../../utils";
import ScatterplotMatrix from "./charts";
import ScatterplotMatrixPreferences from "./preferences";

const Chart = observer(()=>{
    const {
        togglePref,
        showChart,
        chartToShow
    } = useInstance(new ChartVM(useStore()));

    function prefBtnText(){
        return showChart ? "Nascondi opzioni" : "Mostra opzioni";
    }

    function renderPreferences(){
        switch(chartToShow){
            case ChartType.ScatterplotMatrix:
                return <ScatterplotMatrixPreferences/>;
            default:
                return null;
        }
    };

    function renderCharts(){
        switch(chartToShow){
            case ChartType.ScatterplotMatrix:
                return <ScatterplotMatrix/>;
            default:
                return null;
        }
    }

    return(
        <div className="content">
            <div className="pref-container">
                <>
                    {chartToShow !== undefined ? <button className="btn-pref" onClick={togglePref.bind(null)}>{prefBtnText()}</button> : <></>}
                    <div className={showChart ? "show-pref": "hide-pref"}>
                        {renderPreferences()}
                    </div>
                </>
            </div>
            <div className={showChart ? null : "center-graph"}>
                {renderCharts()}
            </div>
        </div>
    );
});

export default Chart;