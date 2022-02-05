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

    const [csvFile, setCsvFile] = useState(()=>{
        const saved = localStorage.getItem("csvFile");
        const initial = JSON.parse(saved);
        return initial;
    })
    const [csvLoaded, setCsvLoaded] = useState(()=>{
        const saved = localStorage.getItem("csvLoaded");
        const initial = JSON.parse(saved);
        return initial;
    })
    const [csvData, setCsvData] = useState(()=>{
        const saved = localStorage.getItem("csvData");
        const initial = JSON.parse(saved);
        return initial || [];
    })
    const [fileName, setFileName]= useState(()=>{
        const saved = localStorage.getItem("fileName");
        const initial = JSON.parse(saved);
        return initial;
    })

    useEffect(() => {
        if(csvFile){
            Papa.parse(csvFile, {header:true, complete: function(results){
                setCsvData(results);
            }});
            setFileName(csvFile != undefined ? csvFile.name : "");
            localStorage.setItem("fileName", JSON.stringify(fileName));
            localStorage.setItem("csvLoaded", csvLoaded);
            setShowConfigurationCsvAlert(true);
            setShowOverwriteCsvAlert(false);
        }
        setShowFileInfo(true);
    }, [csvFile]);

    useEffect(()=>{
        if(csvLoaded)
            localStorage.setItem("csvData", JSON.stringify(csvData));
    },[csvData]);

    function removeCsvFile(){
        localStorage.removeItem("csvData");
        localStorage.removeItem("csvLoaded");
        localStorage.removeItem("fileName");
        setShowRemoveFile(false);
        setShowOverwriteCsvAlert(false);
        setCsvLoaded(false);
        setCsvData([]);
        setCsvFile(0);
        setFileName("");
    }

    function csvConfigurationComplete(){
        console.log("Show configuratino Csv Alert :"+showConfigurationCsvAlert);
        setShowConfigurationCsvAlert(false);
        setShowOverwriteCsvAlert(true);
        setShowSelectDims(false);
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
                        <Route path="/" element={<HomePage handles={quickActionButtonHandlers} dims={csvLoaded ? csvData : []} fileName = {fileName}/>}/>
                        <Route path="/uploadFile" 
                            element={<UploadFilePage 
                                        handles={quickActionButtonHandlers}
                                        hooks={{"csvFile":[csvFile,(file) => setCsvFile(file)], "csvLoaded":[csvLoaded,() =>setCsvLoaded(true)]}}
                                        dims={csvLoaded ? csvData : []}
                                        showFileInfo={showFileInfo}
                                        showOverwriteCsvAlert={showOverwriteCsvAlert}
                                        showConfigurationCsvAlert={showConfigurationCsvAlert}
                                        csvLoaded = {csvLoaded}
                                        fileName = {fileName}
                                    />
                            }  
                        />
                        <Route path="/reloadSession"
                            element={<ReloadSessionPage handles={quickActionButtonHandlers} dims={csvLoaded ? csvData : []} fileName = {fileName}/>}
                        />
                        <Route path="/info" element={<InfoPage/>}/>
                        <Route path="/docs" element={<DocsPage />}/>
                        <Route path="/scatter" element={<Scatter />}/>
                        <Route path="/sankey" element={<Sankey />}/>
                    </Routes>
                    <SelectDimensions show={showSelectDims} onClose={()=>setShowSelectDims(false)} onConfirm={() => csvConfigurationComplete()} />
                    <ExportSession show={showExportSession} onClose={()=>setShowExportSession(false)}/>
                    <RemoveFile show={showRemoveFile} onClose={()=>setShowRemoveFile(false)} onDelete={() => removeCsvFile()}/>
                </div>
            </div>
        </Router>
    );
}

export default View;