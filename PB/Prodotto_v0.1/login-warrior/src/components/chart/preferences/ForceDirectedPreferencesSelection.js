import React from "react";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import { ForceDirectedPreferencesSelectionVM } from "./ForceDirectedPreferencesSelectionVM";
import { useInstance } from "../../../useInstance";
import NumericInput from "react-numeric-input";


const ForceDirectedPreferencesSelection = observer(() => {

	const {
		handleSelectChange,
		handleMinDistChange,
		handleMaxDistChange,
		//keys,
		matrixName,
		matrices,
		//color,
		roundNumber,
		max,
		min,
		distMax,
		distMin
	} = useInstance(new ForceDirectedPreferencesSelectionVM(useStore()));


    return (
		<Form className="chartPreferences">
			<Form.Group controlId="distanceMatrix">
				<Form.Label>Matrice delle distanze</Form.Label>
				<Form.Control
					custom
					as="select"
					value={matrixName}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noDistancematrix"}>Nessuna matrice</option>
					{matrices.map((d) => {
						return <option value={d} key={d}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>
			{/*<Form.Group controlId="color">
				<Form.Label>Colore</Form.Label>
				<Form.Control
					custom
					as="select"
					value={color}
					onChange={handleSelectChange}
				>
					<option value={"undefined"} key={"noColor"}>Nessun colore</option>
					{keys.map((d) => {
						return <option value={d} key={d}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>*/}
			<Form.Group controlId="distMax">
				<Form.Label>Distanza massima (max {max})</Form.Label>
				<NumericInput value={roundNumber(distMax,2)} min={Math.max(min, distMin)} max={max} step={roundNumber(max/10,2)} onChange={handleMaxDistChange}/>
			</Form.Group>
			<Form.Group controlId="distMin">
				<Form.Label>Distanza minima (min {min})</Form.Label>
				<NumericInput value={roundNumber(distMin,2)} min={min} max={Math.min(max,distMax)} step={roundNumber(max/10,2)} onChange={handleMinDistChange}/>
			</Form.Group>
		</Form>
	);
});

export default ForceDirectedPreferencesSelection;