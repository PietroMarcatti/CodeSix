import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../ContextProvider";
import { ChartVM } from "./ChartVM";
import { useInstance } from "../../useInstance";
import {ChartType} from "../../utils";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Scatterplot from "./charts/Scatterplot";
import ScatterplotPreferencesSelection from "./preferences/ScatterplotPreferencesSelection";
import ParallelCoordinates from "./charts/ParallelCoordinates";
import ParallelCoordinatesPreferencesSelection from "./preferences/ParallelCoordinatesPreferencesSelection";
import ForceDirected from "./charts/ForceDirected";
import ForceDirectedPreferencesSelection from "./preferences/ForceDirectedPreferencesSelection";
import Draggable from "react-draggable"

const Chart = observer(()=>{
    const {
        togglePref,
        showPref,
        fileName,
        fileSize,
        chartToShow
    } = useInstance(new ChartVM(useStore()));

    function prefBtnText(){
        return showPref ? <>Nascondi opzioni<MdVisibility size={18}/> </> : <>Mostra opzioni <MdVisibilityOff size={18}/></>;
    }

    function renderPreferences(){
        switch(chartToShow){
            case ChartType.Scatterplot:
                return <ScatterplotPreferencesSelection/>;
            case ChartType.ParallelCoordinates:
                return <ParallelCoordinatesPreferencesSelection/>;
            case ChartType.ForceDirected:
                return <ForceDirectedPreferencesSelection/>;
            default:
                return null;
        }
    };

    function renderCharts(){
        console.log("Chart to show: ", chartToShow);
        switch(chartToShow){
            case ChartType.Scatterplot:
                return <Scatterplot/>;
            case ChartType.ParallelCoordinates:
                return <ParallelCoordinates/>;
            case ChartType.ForceDirected:
                    return <ForceDirected />
            default:
                return null;
        }
    }

    return(
        <div className="content">
            <Draggable cancel="button .pref-field">
                <div className="pref-container">
                    <div className={showPref ? "show-pref": "hide-pref"}>
                        <p className="pref-title">Opzioni</p>
                        <p>{fileSize === 0 ? "Nessun dataset caricato." : fileName+"  "+fileSize}</p>
                        {chartToShow ? renderPreferences() : "Nessuna opzione disponibile. Scegli una visualizzazione"}
                    </div>
                    <button className="btn-pref" onClick={togglePref.bind(null)}>{prefBtnText()}</button>
                </div>
            </Draggable>
            <div className={chartToShow!== undefined ? "center-graph" : ""}>
                {renderCharts()}
            </div>
        </div>
    );
});

export default Chart;