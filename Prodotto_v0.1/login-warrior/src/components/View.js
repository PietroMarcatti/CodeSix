import React from 'react';
import Menu from './menu/Menu';
import RootStore from '../stores/RootStore';
import { AppContextProvider } from '../ContextProvider';

const View = () =>{
    const rootStore = new RootStore();
    return(
        console.log(rootStore.datasetStore.fileName),
        <AppContextProvider value={rootStore}>
            <div id='page-wrapper'>
                <Menu/>
            </div>
        </AppContextProvider>
    )
};

export default View;
