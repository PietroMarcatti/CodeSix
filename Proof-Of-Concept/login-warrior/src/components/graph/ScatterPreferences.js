import React, {useState} from "react";

const ScatterPreferences = (props) =>{
    var availableDimensions=["Asse X", "Asse Y", "Forma", "Colore", "Grandezza"];
    

    function handleSelectChange(e){
        var availIndex = e.target.id;
        var dimChosen = e.target.value;
        var help = availableDimensions[availIndex]
        var temp = {...props.hooks[0][0],[help]:dimChosen}
        props.hooks[0][1](temp);
    }

    return(
            props.selectedDims.length >1 ? 
            <div id="graph-pref-wrapper">
            <ul id="dimension-list">
            {
                props.selectedDims.map((value,key) =>{
                    return (
                    <li className="dimension-pref" id={"d"+key} key={value}>
                        <div className="columnFlex">
                            <p className="dimension-name">{availableDimensions[key]}</p>
                            <div className="rowFlex">
                                <select name={key} id={key} value={props.hooks[0][0][availableDimensions[key]]} onChange={handleSelectChange}>
                                    {
                                        props.selectedDims.map((v)=>{
                                            return(
                                                    <option key={v[0]} value={v[0]}>{v[1]}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </li>)
                })
            }
            </ul>
            <button onClick={props.onConfirm}>Applica modifiche</button>
            </div>: 
            "Per visualizzare uno scatter plot sono necessarie almeno due dimensioni. Selezionale."
        
    )
}

export default ScatterPreferences;