import React, {useState} from "react";
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import UploadFile from '@mui/icons-material/UploadFile';
import Cached from '@mui/icons-material/Cached';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import ContactSupportOutlined from '@mui/icons-material/ContactSupportOutlined';
import { BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadFilePage from "./pages/UploadFilePage"
import ReloadSessionPage from "./pages/ReloadSessionPage";
import DocsPage from "./pages/DocsPage";
import InfoPage from "./pages/InfoPage";
import SelectDimensions from "./SelectDimensions";
import ExportSession from "./ExportSession";
import RemoveFile from "./RemoveFile";


const View = () => {

    let menuItems= ["Homepage", "Carica file", "Ricarica Sessione", "Informazioni", "Manuale" ];
    let menuIcons= [<HomeOutlined fontSize='large'/>, <UploadFile fontSize='large'/>, <Cached fontSize='large'/>, <InfoOutlined fontSize='large'/>, <ContactSupportOutlined fontSize='large'/>];

    const [showSelectDims, setShowSelectDims] = useState(false);
    const [showExportSession, setShowExportSession] = useState(false);
    const [showRemoveFile, setShowRemoveFile] = useState(false);

    return(
        <Router >
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
                        <Route 
                            path="/" 
                            element={
                                <HomePage 
                                    showSelectDims={() => setShowSelectDims(true)} 
                                    showExportSession={() => setShowExportSession(true)}
                                    showRemoveFile={() => setShowRemoveFile(true)}
                                    />
                                }/>
                        <Route path="/uploadFile" element={<UploadFilePage/>}/>
                        <Route path="/reloadSession" element={<ReloadSessionPage />}/>
                        <Route path="/info" element={<InfoPage/>}/>
                        <Route path="/docs" element={<DocsPage />}/>
                    </Routes>
                    <SelectDimensions show={showSelectDims} onClose={()=>setShowSelectDims(false)} />
                    <ExportSession show={showExportSession} onClose={()=>setShowExportSession(false)}/>
                    <RemoveFile show={showRemoveFile} onClose={()=>setShowRemoveFile(false)}/>
                </div>
            </div>
        </Router>
    );
    
}

export default View;