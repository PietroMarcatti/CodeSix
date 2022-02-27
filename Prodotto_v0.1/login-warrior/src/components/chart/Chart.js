import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../ContextProvider";
import { ChartVM } from "./ChartVM";
import { useInstance } from "../../useInstance";
import {ChartType} from "../../utils";
import Scatterplot from "./charts/Scatterplot";
import ScatterplotPreferencesSelection from "./preferences/ScatterplotPreferencesSelection";

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
        console.log(chartToShow, "renderPreferences");
        switch(chartToShow){
            case ChartType.Scatterplot:
                return <ScatterplotPreferencesSelection/>;
            default:
                return null;
        }
    };

    function renderCharts(){
        switch(chartToShow){
            case ChartType.Scatterplot:
                return <Scatterplot/>;
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