import React from "react";
import { useStore } from "../../../ContextProvider";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import { ScatterplotPreferencesSelectionVM } from "./ScatterplotPreferencesSelectionVM";
import { useInstance } from "../../../useInstance";

const ScatterplotPreferencesSelection = observer(() => {

	const {
		handleSelectChange,
		axisX,
		axisY,
		pointSize,
		color,
		shape,
		dimensions
	} = useInstance(new ScatterplotPreferencesSelectionVM(useStore()));

    return (
		<Form className="chartPreferences">
			<Form.Group controlId="SPaxisX" key={"SPaxisX"}>
				<Form.Label className="labels">Asse X</Form.Label>
				<Form.Control
					as="select"
					value={axisX}
					onChange={handleSelectChange.bind(null)}
				>
					<option value={"undefined"} key={"noDimensionsAxisX"}>Nessuna dimensione asse X</option>
					{dimensions.map((d) => {
						return <option value={d} key={d+"AxisX"}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>

			<Form.Group controlId="SPaxisY" key={"SPaxisY"}>
				<Form.Label className="labels">Asse Y</Form.Label>
				<Form.Control
					as="select"
					value={axisY}
					onChange={handleSelectChange.bind(null)}
				>
					<option value={"undefined"} key={"noDimensionsAxisY"}>Nessuna dimensione asse Y</option>
					{dimensions.map((d) => {
						return <option value={d} key={d+"AxisY"}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>

			<Form.Group controlId="SPpointSize" key={"SPpointSize"}>
				<Form.Label className="labels">Grandezza del punto</Form.Label>
				<Form.Control
					as="select"
					value={pointSize}
					onChange={handleSelectChange.bind(null)}
				>
					<option value={"undefined"} key={"noDimensionsPointSize"}>Nessuna grandezza</option>
					{dimensions.map((d) => {
						return <option value={d} key={d+"PointSize"}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>

			<Form.Group controlId="SPcolor" key={"SPcolor"}>
				<Form.Label className="labels">Colore del punto</Form.Label>
				<Form.Control
					as="select"
					value={color}
					onChange={handleSelectChange.bind(null)}
				>
					<option value={"undefined"} key={"noDimensionsColor"}>Nessun colore</option>
					{dimensions.map((d) => {
						return <option value={d} key={d+"Color"}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>

			<Form.Group controlId="SPshape" key={"SPshape"}>
				<Form.Label className="labels">Forma del punto</Form.Label>
				<Form.Control
					as="select"
					value={shape}
					onChange={handleSelectChange.bind(null)}
				>
					<option value={"undefined"} key={"noDimensionsShape"}>Nessuna forma</option>
					{dimensions.map((d) => {
						return <option value={d} key={d+"Shape"}>{d}</option>;
					})}
				</Form.Control>
			</Form.Group>
		</Form>
	);
});

export default ScatterplotPreferencesSelection;