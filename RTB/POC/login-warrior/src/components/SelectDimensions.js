import React from "react";
import {ArrowBack} from '@mui/icons-material';

function DimensionCheckBox (props){
    function handleChange(){
        props.onChange(props.index)
    }
    return(
        <li key={props.value} className="rowFlex center">
            <label key={"l"+props.value}>{props.value}</label>
            <input type="checkbox" name={"dim"+props.index} id={props.index} onChange={handleChange} defaultChecked={props.checked}/>
        </li>
    );
}

function SelectDimensions(props){

    var selectedDims = new Map(props.selectedDims);
    function toggleDimension(key){
        if(props.headersToggle){
            if(selectedDims.has(key))
                selectedDims.delete(key)
            else
                selectedDims.set(key,props.data.meta.fields[key] )
        }else{
            if(selectedDims.has(key))
                selectedDims.delete(key);
            else
                selectedDims.set(key,"Colonna "+key);
        }
    }

    function handleOnConfirm(){
        var dims = [...selectedDims]
        props.onConfirm(dims)
    }

    return(
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="rowFlex center"><ArrowBack onClick={props.onClose}/>Selezione dimensioni</h3>
                </div>
                <br/>
                <div className="rowFlex center">
                    <ul className="">
                        {   
                            (props.headersToggle && Object.keys(props.data).length > 0 ) ?
                            props.data.meta.fields.map((value, key) =>
                                { 
                                    return <DimensionCheckBox onChange={toggleDimension} value={value} index={key} key={value} checked={selectedDims.has(key)}/>
                                }
                            ) :
                            props.data.data[0].map((value,key) =>
                                {
                                    return <DimensionCheckBox onChange={toggleDimension} value={"Colonna "+ key} index={key} key={value} checked={selectedDims.has(key)}/>
                                }
                            )
                        }
                    </ul>
                </div>

                <div className="modal-footer">
                    <button className="red" onClick={props.onClose}>Annulla</button>
                    <button className="green" onClick={handleOnConfirm}>Conferma</button>
                </div>
            </div>
        </div>
    )
}

export default SelectDimensions;