import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import accountReducer from "./accountReducer";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const adminPersistConfig = {
    ...persistCommonConfig,
    key: 'admin',
    whitelist: ['isLoggedIn', 'adminInfo']
};

const accountPersistConfig = {
    ...persistCommonConfig,
    key: 'account',
    whitelist: ['isLoggedIn', 'accountInfo']
};


export default (history) => combineReducers({
    router: connectRouter(history),
    account: persistReducer(accountPersistConfig, accountReducer),
    user: userReducer,
    app: appReducer
})