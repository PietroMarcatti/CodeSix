import React, {useEffect} from "react";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../useInstance";
import {SankeyDiagramVM} from "./SankeyDiagramVM";

const SankeyDiagram = observer(()=>{
    const{
        renderChart,
        distanceMatrixName,
        linkColor,
        distMin,
        distMax,
        align
    }=useInstance(new SankeyDiagramVM(useStore()));

    useEffect(()=>{renderChart();},[distanceMatrixName, linkColor, align,distMin,distMax]);

    return(
        <div id="sankeyDiagram" className="chart"></div>
    );
});

export default SankeyDiagram;