import React from "react";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import { SankeyDiagramPreferencesSelectionVM } from "./SankeyDiagramPreferencesSelectionVM";
import { useInstance } from "../../../useInstance";

const SankeyDiagramPreferencesSelection = observer(() => {
	const {
        handleSelectChange,
        distanceMatricesNames,
		distanceMatrixName,
		linkColor,
		align
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
				<Form.Label className="labels">Colore degli archi</Form.Label>
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
        </Form>
	);
});

export default SankeyDiagramPreferencesSelection;