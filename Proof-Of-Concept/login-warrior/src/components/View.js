import React, {useState, useEffect, useRef} from "react";
import { HomeOutlined, UploadFile, Cached, InfoOutlined, ContactSupportOutlined, PinDropSharp } from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadFilePage from "./pages/UploadFilePage"
import ReloadSessionPage from "./pages/ReloadSessionPage";
import DocsPage from "./pages/DocsPage";
import InfoPage from "./pages/InfoPage";
import Scatter from "./graph/Scatter"
import Sankey from "./graph/Sankey";
import Parallel from "./graph/Parallel";
import Force from "./graph/Force";
import SelectDimensions from "./SelectDimensions";
import ExportSession from "./ExportSession";
import RemoveFile from "./RemoveFile";
import Papa from "papaparse";

const View = () =>{

    let menuItems= ["Homepage", "Carica file", "Ricarica Sessione", "Informazioni", "Manuale" ];
    let menuIcons= [<HomeOutlined fontSize='large'/>, <UploadFile fontSize='large'/>, <Cached fontSize='large'/>, <InfoOutlined fontSize='large'/>, <ContactSupportOutlined fontSize='large'/>];
    
    const [showSelectDims, setShowSelectDims] = useState(false);
    const [showExportSession, setShowExportSession] = useState(false);
    const [showRemoveFile, setShowRemoveFile] = useState(false);
    const [showFileInfo, setShowFileInfo]= useState(false);
    const [showOverwriteCsvAlert, setShowOverwriteCsvAlert]= useState(false);
    const [showConfigurationCsvAlert, setShowConfigurationCsvAlert]= useState(false);
    const quickActionButtonHandlers = [() => setShowSelectDims(true), () => setShowExportSession(true), ()=> setShowRemoveFile(true)];

    const [disableDimensionSelection, setDisableDimensionSelection] = useState(false);
    const [headersToggle, setHeadersToggle] = useState(() =>{
        const saved = localStorage.getItem("headersToggle");
        const initial = JSON.parse(saved);
        return initial || false;
    });
    let option = {header: headersToggle, complete: (results) => {setCsvData(results); setDisableDimensionSelection(false);}}
    
    const [selectedDims, setSelectedDims] = useState(()=>{
        const saved = localStorage.getItem("selectedDims");
        const initial = JSON.parse(saved);
        return initial || [];
    })
    
    const [csvFile, setCsvFile] = useState(()=>{
        const saved = localStorage.getItem("csvFile");
        const initial = JSON.parse(saved);
        return initial || null;
    })
    const [csvLoaded, setCsvLoaded] = useState(()=>{
        const saved = localStorage.getItem("csvLoaded");
        const initial = JSON.parse(saved);
        return initial || false;
    })
    const [csvData, setCsvData] = useState(()=>{
        const saved = localStorage.getItem("csvData");
        const initial = JSON.parse(saved);
        return initial || [];
    })
    const [csvFileName, setCsvFileName]= useState(()=>{
        const saved = localStorage.getItem("csvFileName");
        const initial = JSON.parse(saved);
        return initial || "";
    })


    useEffect(() => {
        if(csvFile){
            console.log(option);
            setCsvFileName(csvFile.name);
            setDisableDimensionSelection(false);
            localStorage.setItem("csvFileName", JSON.stringify(csvFile.name));
            localStorage.setItem("csvLoaded", JSON.stringify(csvLoaded));
            setShowConfigurationCsvAlert(true);
            setShowOverwriteCsvAlert(false);
            Papa.parse(csvFile, option);
        }
    }, [csvFile]);

    useEffect(()=>{
        if(csvLoaded)
            localStorage.setItem("csvData", JSON.stringify(csvData));
    },[csvData]);

    useEffect(() =>{
        console.log("sono stato chiamato io")
        localStorage.setItem("headersToggle", headersToggle);
    }, [headersToggle])

    function removeCsvFile(){
        localStorage.removeItem("csvFile");
        localStorage.removeItem("csvLoaded");
        localStorage.removeItem("csvFileName");
        localStorage.removeItem("selectedDims");
        localStorage.removeItem("headersToggle");
        localStorage.removeItem("csvData");
        setShowRemoveFile(false);
        setShowOverwriteCsvAlert(false);
        setShowConfigurationCsvAlert(false);
        setCsvLoaded(false);
        setCsvData([]);
        setCsvFile(null);
        setCsvFileName("");
        setDisableDimensionSelection(true);
        handleDimensionsHeadersToggle(false);
    }

    function csvConfigurationComplete(){
        console.log("Show configuration Csv Alert :"+showConfigurationCsvAlert);
        setShowConfigurationCsvAlert(false);
        setShowOverwriteCsvAlert(true);
        setShowSelectDims(false);
    }

    function handleDimensionSelectionConfirm(dims){
        console.log(dims);
        setShowSelectDims(false);
        setSelectedDims(dims);
        localStorage.setItem("selectedDims", JSON.stringify(dims))
    }

    function handleDimensionsHeadersToggle(){
        console.log("sono stato chiamato anche io")
        setHeadersToggle(!headersToggle)
        console.log(headersToggle)
        localStorage.setItem("headersToggle", headersToggle);
    }

    return(
        <Router>
            <div id="page-wrapper">
                <div id="menu-wrapper">
                    <h1 id='menu-title'><b>Login</b> Warrior</h1>
                    <nav id="menu">
                        <menu>
                        <li className="menu-item">
                                <NavLink to="/" className={(navData) => (navData.isActive ? 'selected' : '')}>
                                    {menuIcons[0]}
                                    {menuItems[0]}
                                </NavLink>
                            </li>
                            <li className="menu-item" >
                                <NavLink to="/uploadFile" className={(navData) => (navData.isActive ? 'selected' : '')}>
                                    {menuIcons[1]}
                                    {menuItems[1]}
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink to="/reloadSession" className={(navData) => (navData.isActive ? 'selected' : '')}>
                                    {menuIcons[2]}
                                    {menuItems[2]}
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink to="/info" className={(navData) => (navData.isActive ? 'selected' : '')}>
                                    {menuIcons[3]}
                                    {menuItems[3]}
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink to="/docs" className={(navData) => (navData.isActive ? 'selected' : '')}>
                                    {menuIcons[4]}
                                    {menuItems[4]}
                                </NavLink>
                            </li>
                        </menu>
                    </nav>
                    <span id="menu-footer">Realizzato da CodeSix per il progetto di Ingegneria del Software A.A. 2021-2022</span>
                </div>
                <div id="content-wrapper">
                    <Routes>
                        <Route path="/" element={<HomePage handles={quickActionButtonHandlers} dims={csvLoaded ? csvData : []} csvFileName = {csvFileName}/>}/>
                        <Route path="/uploadFile" 
                            element={<UploadFilePage 
                                        handles={quickActionButtonHandlers}
                                        hooks={{"csvFile":[csvFile,(file) => setCsvFile(file)], "csvLoaded":[csvLoaded,() =>setCsvLoaded(true)], "headersToggle":[headersToggle,() =>handleDimensionsHeadersToggle()]}}
                                        selectedDims={selectedDims}
                                        showFileInfo={showFileInfo}
                                        showOverwriteCsvAlert={showOverwriteCsvAlert}
                                        showConfigurationCsvAlert={showConfigurationCsvAlert}
                                        csvLoaded = {csvLoaded}
                                        csvFileName = {csvFileName}
                                        disableDimensionSelection={disableDimensionSelection}
                                    />
                            }  
                        />
                        <Route path="/reloadSession"
                            element={<ReloadSessionPage 
                                handles={quickActionButtonHandlers} 
                                dims={csvLoaded ? csvData : []} csvFileName = {csvFileName}/>}
                        />
                        <Route path="/info" element={<InfoPage/>}/>
                        <Route path="/docs" element={<DocsPage />}/>
                        <Route path="/scatter" element={<Scatter data={csvData}/>}/>
                        <Route path="/sankey" element={<Sankey />}/>
                        <Route path="/force" element={<Force />}/>
                        <Route path="/parallel" element={<Parallel />}/>
                    </Routes>
                    {showSelectDims ? <SelectDimensions data={csvLoaded ? csvData : []} headersToggle={headersToggle} onClose={()=>setShowSelectDims(false)} onConfirm={(value) => handleDimensionSelectionConfirm(value)} selectedDims={selectedDims} />: ""}
                    <ExportSession show={showExportSession} onClose={()=>setShowExportSession(false)}/>
                    <RemoveFile show={showRemoveFile} onClose={()=>setShowRemoveFile(false)} onDelete={() => removeCsvFile()}/>
                </div>
            </div>
        </Router>
    );
}

export default View;