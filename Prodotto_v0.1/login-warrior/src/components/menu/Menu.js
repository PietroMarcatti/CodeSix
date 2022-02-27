import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../ContextProvider';
import { OverlayTrigger, Popover, PopoverHeader, PopoverBody } from 'react-bootstrap';
import LoadCsv from './modalComponents/csvUploadManager/LoadCsv';
import { MenuVM } from './MenuVM';
import { useInstance } from '../../useInstance';
import SessionManager from './modalComponents/sessionManager/SessionManager';
import DimensionalReduction from './modalComponents/dimensionalReductionManager/DimensionalReduction';

const Menu = observer(() =>{
    const{
        modalIsOpen,
        id,
        names,
        icons,
        fileName,
        closeModal,
        openModal,
        showChart,
        isDataLoaded,
        checkToDisabled,
    } = useInstance(new MenuVM(useStore()));

    function handleContent(index){
        switch(index){
            case 0: 
                return <LoadCsv modalIsOpen ={modalIsOpen} closeModal={closeModal.bind(null)}/>;
            case 1:
                return <SessionManager modalIsOpen={modalIsOpen} closeModal={closeModal.bind(null)}/>;
            case 2:
                return <DimensionalReduction modalIsOpen={modalIsOpen} closeModal={closeModal.bind(null)}/>;
            default:
                break;
        }
    }

    const popover = 
        <Popover id="popover-basic">
            <PopoverHeader >Voce Disabilitata</PopoverHeader>
            <PopoverBody>
                {isDataLoaded ? "Prima devi aver caricato i dati e selezionato almeno due dimensioni" : "Prima devi aver calcolato una matrice delle distanze"}
            </PopoverBody>
        </Popover>;
    
    return(
        <>
            <div id='menu-wrapper'>
                <h1 id='menu-title'><b>Login</b> Warrior</h1>
                <nav className='navbar'>
                    <ul className='navbar-nav'>
                        {names.map((name, index)=>{
                            return(
                                <li className='nav-item' key={name}>
                                    {checkToDisabled(index) ?
                                        <OverlayTrigger
                                            overlay={popover}
                                            delay={{show:200, hide:0}}>
                                                <span className='d-inline-block'>
                                                    <button className='nav-link' disabled aria-disabled="true" style={{pointerEvents: "none"}}>
                                                        {icons[index]}
                                                        <span className='link-text'>{name}</span>
                                                    </button>
                                                </span>
                                        </OverlayTrigger>:
                                        <button className='nav-link' onClick={index < 3 ? openModal.bind(null, index): showChart.bind(null,index)}>
                                            {icons[index]}
                                            <span className='link-text'>{name}</span>
                                        </button>
                                    }
                                </li>
                            );
                        })}
                        <li key={"fileName"}>
                            {fileName}
                        </li>
                    </ul>
                </nav>
            </div>
            {handleContent(id)}
        </>
    )
});

export default Menu;