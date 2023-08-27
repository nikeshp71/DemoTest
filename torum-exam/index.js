import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';

import App from './src/App';

//! It will hide all warnings
LogBox.ignoreLogs([
    'Attempted to capture a commit phase error inside a detached tree',
]);
LogBox.ignoreAllLogs(true);

AppRegistry.registerComponent(appName, () => App);
