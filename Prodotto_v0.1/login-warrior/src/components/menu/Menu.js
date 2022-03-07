import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../ContextProvider';
import { OverlayTrigger, Popover, PopoverHeader, PopoverBody } from 'react-bootstrap';
import LoadCsv from './modalComponents/csvUploadManager/LoadCsv';
import { MenuVM } from './MenuVM';
import { useInstance } from '../../useInstance';
import SessionManager from './modalComponents/sessionManager/SessionManager';
import DimensionalReduction from './modalComponents/dimensionalReductionManager/DimensionalReduction';
import DistanceCalculation from "./modalComponents/distanceCalculationManager/DistanceCalculation";

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
            case 3:
                return <DistanceCalculation modalIsOpen={modalIsOpen} closeModal={closeModal.bind(null)}/>;
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
                <nav className='navbar' id='navigation'>
                    <ul className='navbar-nav'>
                        {names.map((name, index)=>{
                            return(
                                <li className='nav-item my-2 ' key={name} id={"nav-item-"+index}>
                                    {checkToDisabled(index) ?
                                        <OverlayTrigger
                                            overlay={popover}
                                            delay={{show:200, hide:0}}>
                                                <span className='d-inline-block'>
                                                    <button className='nav-link border-0 disabled  px-3 bg-transparent ' disabled aria-disabled="true" style={{pointerEvents: "none"}}>
                                                        {icons[index]}
                                                        <span className='link-text'>{name}</span>
                                                    </button>
                                                </span>
                                        </OverlayTrigger>:
                                        <button className={'nav-link rounded-pill border-0 px-3 text-light '+ (index === id ? 'bg-primary bg-gradient fw-bold' : 'bg-transparent ')} onClick={index < 4 ? openModal.bind(null, index): showChart.bind(null,index)}>
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