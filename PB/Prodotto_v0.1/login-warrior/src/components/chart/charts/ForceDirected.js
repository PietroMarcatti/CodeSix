import React, {useEffect} from "react";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../useInstance";
import {ForceDirectedVM} from "./ForceDirectedVM";

const ForceDirected = observer(()=>{
    const{
        renderChart,
        distanceMatrix,
        distMin,
        distMax
    }=useInstance(new ForceDirectedVM(useStore()));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{renderChart();},[distanceMatrix, distMax, distMin]);

    return(
        <div id="forceDirected" className="chart"></div>
    );
});

export default ForceDirected;