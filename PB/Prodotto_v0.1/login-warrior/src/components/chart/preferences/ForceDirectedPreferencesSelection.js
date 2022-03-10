import React from "react";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import { ForceDirectedPreferencesSelectionVM } from "./ForceDirectedPreferencesSelectionVM";
import { useInstance } from "../../../useInstance";


const ForceDirectedPreferencesSelection = observer(() => {

	const {
		handleSelectChange,
		keys,
		matrixName,
		matrices,
		color,
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
			<Form.Group controlId="color">
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
			</Form.Group>
			<Form.Group controlId="distMax">
				<Form.Label>Distanza massima</Form.Label>
				<p>{max}</p>
				<Form.Control
					as="input"
					value={distMax}
					onChange={handleSelectChange}
				>
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="distMin">
				<Form.Label>Distanza minima</Form.Label>
				<p>{min}</p>
				<Form.Control
					as="input"
					value={distMin}
					onChange={handleSelectChange}
				>
				</Form.Control>
			</Form.Group>
		</Form>
	);
});

export default ForceDirectedPreferencesSelection;