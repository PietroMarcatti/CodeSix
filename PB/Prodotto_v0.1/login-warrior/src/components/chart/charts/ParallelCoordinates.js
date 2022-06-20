import React, {useEffect} from "react";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../useInstance";
import {ParallelCoordinatesVM} from "./ParallelCoordinatesVM";

const ParallelCoordinates = observer(()=>{
    const{
        renderChart,
        axes,
        color,
    }=useInstance(new ParallelCoordinatesVM(useStore()));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{console.log(axes);renderChart();},[axes,color]);

    return(
        <div id="parallel" className="chart"></div>
    );
});

export default ParallelCoordinates;