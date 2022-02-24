import React, {useEffect} from "react";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../useInstance";
import {ScatterplotMatrixVM} from "./ScatterplotMatrixVM";

const ScatterPlotMatrix = observer(()=>{
    const{
        renderChart,
        size,
        color,
        shape,
        traits
    }=useInstance(new ScatterplotMatrixVM(useStore()));

    useEffect(()=>{renderChart();},[size,color,shape,traits]);

    return(
        <div className="scatterplotmatrix">
            <svg className="plot" id="spm-svg"><g></g></svg>
			<svg className="plot" id="spm-cell"><g></g></svg>
			<canvas className="plot" id="spm-canvas"></canvas>
        </div>
    );
});

export default ScatterPlotMatrix;