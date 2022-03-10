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
        align
    }=useInstance(new SankeyDiagramVM(useStore()));

    useEffect(()=>{renderChart();},[distanceMatrixName, linkColor, align]);

    return(
        <div id="sankeyDiagram" className="chart"></div>
    );
});

export default SankeyDiagram;