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
        distMax,
        matrices
    }=useInstance(new ForceDirectedVM(useStore()));

    useEffect(()=>{renderChart();},[distanceMatrix, distMax, distMin,matrices]);

    return(
        <div id="forceDirected" className="chart"></div>
    );
});

export default ForceDirected;