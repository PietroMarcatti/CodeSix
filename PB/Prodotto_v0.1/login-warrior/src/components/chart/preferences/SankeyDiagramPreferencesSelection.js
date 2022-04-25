import React from "react";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import { SankeyDiagramPreferencesSelectionVM } from "./SankeyDiagramPreferencesSelectionVM";
import { useInstance } from "../../../useInstance";
import NumericInput from "react-numeric-input";

const SankeyDiagramPreferencesSelection = observer(() => {
	const {
        handleSelectChange,
        distanceMatricesNames,
		distanceMatrixName,
		linkColor,
		align,
		handleMinDistChange,
		handleMaxDistChange,
		roundNumber,
		distMin,
		distMax,
		max,
		min,
	} = useInstance(new SankeyDiagramPreferencesSelectionVM(useStore()));


    return (
		<Form className="chartPreferences">
            <Form.Group controlId="SDdistanceMatrixName" key={"SDdistanceMatrixName"} className="pref-field">
				<Form.Label className="labels">Matrice delle distanze</Form.Label>
				<div className="select-wrapper">
					<Form.Control
						as="select"
						value={distanceMatrixName}
						onChange={handleSelectChange.bind(null)}
					>
						<option value={"undefined"} key={"noDistanceMatrixName"}>Nessuna</option>
						{distanceMatricesNames.map((d) => {
							return <option value={d} key={d+"distanceMatrixName"}>{d}</option>;
						})}
					</Form.Control>
				</div>
			</Form.Group>
			<Form.Group controlId="SDlinkColor" key={"SDlinkColor"} className="pref-field">
				<Form.Label className="labels">Colore degli archi</Form.Label>
				<div className="select-wrapper">
					<Form.Control
						as="select"
						value={linkColor}
						onChange={handleSelectChange.bind(null)}
					>
						<option value={"grey"} key={"static"}>Statico</option>
						<option value={"source"} key={"source"}>Sorgente</option>
						<option value={"target"} key={"target"}>Destinazione</option>
						<option value={"source-target"} key={"source-target"}>Sorgente-Destinazione</option>
					</Form.Control>
				</div>
			</Form.Group>
			<Form.Group controlId="SDalign" key={"SDalign"} className="pref-field">
				<Form.Label className="labels">Allineamento nodi</Form.Label>
				<div className="select-wrapper">
					<Form.Control
						as="select"
						value={align}
						onChange={handleSelectChange.bind(null)}
					>
						<option value={"justify"} key={"justify"}>Giustificato</option>
						<option value={"left"} key={"left"}>Sinistra</option>
						<option value={"right"} key={"right"}>Destra</option>
						<option value={"center"} key={"center"}>Centro</option>
					</Form.Control>
				</div>
			</Form.Group>

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

export default SankeyDiagramPreferencesSelection;