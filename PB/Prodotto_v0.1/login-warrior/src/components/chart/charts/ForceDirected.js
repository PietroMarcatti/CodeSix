import React, {useEffect} from "react";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";
import { useInstance } from "../../../useInstance";
import {ForceDirectedVM} from "./ForceDirectedVM";

const ForceDirected = observer(()=>{
    const{
        renderChart,
        matrix,
    }=useInstance(new ForceDirectedVM(useStore()));

    useEffect(()=>{renderChart();},[matrix]);

    return(
        <div id="forceDirected" className="chart forceDirected">
            <canvas className="plot" id="fd-canvas"></canvas>
        </div>
    );
});

export default ForceDirected;