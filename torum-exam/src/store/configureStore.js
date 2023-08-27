import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'

import articleListReducer from '@store/articleListReducer';

import { reduxStorage } from '@storage/persist';

const rootReducer = combineReducers(
    { articleStore: articleListReducer }
);

const persistConfig = {
    key: '_ipap',
    storage: reduxStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor }
}