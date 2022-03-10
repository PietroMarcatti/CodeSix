import {createContext, useContext} from 'react';
import RootStore from './stores/RootStore';

export const AppContext = createContext(RootStore);
export const AppContextProvider = AppContext.Provider;
export const useStore = () => useContext(AppContext);