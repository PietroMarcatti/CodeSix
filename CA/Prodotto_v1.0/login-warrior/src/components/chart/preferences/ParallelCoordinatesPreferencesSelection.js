import React from "react";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import { ParallelCoordinatesPreferencesSelectionVM } from "./ParallelCoordinatesPreferencesSelectionVM";
import { useInstance } from "../../../useInstance";
import Select from "react-select";
import makeAnimated from "react-select/animated";


const ParallelCoordinatesPreferencesSelection = observer(() => {

	const {
		handleSelectChangeDimensions,
		handleSelectChangeColor,
		axes,
		color,
		optionList
	} = useInstance(new ParallelCoordinatesPreferencesSelectionVM(useStore()));


    return (
		console.log(axes),
		<Form className="chartPreferences">
			<Form.Label>Seleziona dimensioni da utilizzare</Form.Label>
            <Select value={axes} options={optionList} isMulti id="selectParallelPref" name="parallelCoordinatesAxes"
                className="basic-multi-select" classNamePrefix="select" components={makeAnimated()} closeMenuOnSelect={false} onChange={handleSelectChangeDimensions}/>
			<Form.Group controlId="PCcolor" key={"PCcolor"} className="pref-field">
				<Form.Label className="labels">Colore del gruppo</Form.Label>
				<Form.Control
					as="select"
					value={color}
					onChange={handleSelectChangeColor.bind(null)}
				>
					<option value={"undefined"} key={"noDimensionsColor"}>Nessuna</option>
					{optionList.map((d) => {
						return <option value={d.value} key={d.value+"Color"}>{d.value}</option>;
					})}
				</Form.Control>
			</Form.Group>
			
		</Form>
	);
});

export default ParallelCoordinatesPreferencesSelection;