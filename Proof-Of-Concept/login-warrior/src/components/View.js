import React from "react";
import { HomeOutlined, UploadFile, Cached, InfoOutlined, ContactSupportOutlined, ArrowBack } from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadFilePage from "./pages/UploadFilePage"
import ReloadSessionPage from "./pages/ReloadSessionPage";
import DocsPage from "./pages/DocsPage";
import InfoPage from "./pages/InfoPage";

import Scatter from "./Graph/Scatter"
import Sankey from "./Graph/Sankey";

class View extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            menuItems: ["Homepage", "Carica file", "Ricarica Sessione", "Informazioni", "Manuale" ],
            menuIcons: [<HomeOutlined fontSize='large'/>, <UploadFile fontSize='large'/>, <Cached fontSize='large'/>, <InfoOutlined fontSize='large'/>, <ContactSupportOutlined fontSize='large'/>],
            activeMenuItem: 0,
            menuCollapsed: 0,
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    handleClick(i){
        this.setState({
                activeMenuItem:i,
        })
        console.log(i);
    }

    toggleMenu(){
        this.state.menuCollapsed = !this.state.menuCollapsed;
    }

    render(){
        return(
            <Router>
                <div id="page-wrapper">
                    <div id="menu-wrapper">
                        <h1 id='menu-title'><b>Login</b> Warrior</h1>
                        <nav id="menu">
                            <menu>
                            <li className="menu-item">
                                    <NavLink to="/" className={(navData) => (navData.isActive ? 'selected' : '')}>
                                        {this.state.menuIcons[0]}
                                        {this.state.menuItems[0]}
                                    </NavLink>
                                </li>
                                <li className="menu-item" >
                                    <NavLink to="/uploadFile" className={(navData) => (navData.isActive ? 'selected' : '')}>
                                        {this.state.menuIcons[1]}
                                        {this.state.menuItems[1]}
                                    </NavLink>
                                </li>
                                <li className="menu-item">
                                    <NavLink to="/reloadSession" className={(navData) => (navData.isActive ? 'selected' : '')}>
                                        {this.state.menuIcons[2]}
                                        {this.state.menuItems[2]}
                                    </NavLink>
                                </li>
                                <li className="menu-item">
                                    <NavLink to="/info" className={(navData) => (navData.isActive ? 'selected' : '')}>
                                        {this.state.menuIcons[3]}
                                        {this.state.menuItems[3]}
                                    </NavLink>
                                </li>
                                <li className="menu-item">
                                    <NavLink to="/docs" className={(navData) => (navData.isActive ? 'selected' : '')}>
                                        {this.state.menuIcons[4]}
                                        {this.state.menuItems[4]}
                                    </NavLink>
                                </li>
                            </menu>
                        </nav>
                        <span id="menu-footer">Realizzato da CodeSix per il progetto di Ingegneria del Software A.A. 2021-2022</span>
                    </div>
                    <div id="content-wrapper">
                        <Routes>
                            <Route path="/" element={<HomePage />}/>
                            <Route path="/uploadFile" element={<UploadFilePage/>}/>
                            <Route path="/reloadSession" element={<ReloadSessionPage />}/>
                            <Route path="/info" element={<InfoPage/>}/>
                            <Route path="/docs" element={<DocsPage />}/>
                            <Route path="/scatter" element={<Scatter />}/>
                            <Route path="/sankey" element={<Sankey />}/>
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default View;