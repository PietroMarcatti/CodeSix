import React from 'react';
import Menu from './menu/Menu';
import RootStore from '../stores/RootStore';
import { AppContextProvider } from '../ContextProvider';
import Chart from './chart/Chart';

const View = () =>{
    const rootStore = new RootStore();
    return(
        console.log(rootStore.datasetStore.fileName),
        <AppContextProvider value={rootStore}>
            <div id='page-wrapper'>
                <Menu/>
                <Chart/>
            </div>
        </AppContextProvider>
    )
};

export default View;
