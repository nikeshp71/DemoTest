import React from 'react';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react'

import ReduxStore from '@store/configureStore';

import Routes from '@route/index';

const App = () => {
    return (
        <Provider store={ReduxStore().store}>
            <PersistGate loading={null} persistor={ReduxStore().persistor}>
                <NativeBaseProvider>
                    <Routes />
                </NativeBaseProvider>
            </PersistGate>
        </Provider>
    )
}

export default App