import React, {useEffect} from "react";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../useInstance";
import {ScatterplotVM} from "./ScatterplotVM";

const ScatterPlot = observer(()=>{
    const{
        renderChart,
        axisX,
        axisY,
        pointSize,
        color,
        shape
    }=useInstance(new ScatterplotVM(useStore()));

    useEffect(()=>{renderChart();},[axisX,axisY,pointSize,color,shape]);

    return(
        <div id="scatterplot" className="chart"></div>
    );
});

export default ScatterPlot;