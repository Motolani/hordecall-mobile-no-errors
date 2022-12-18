/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AuthProvider } from './src/context/AuthContext';
import { TransactionsProvider } from './src/context/TransactionsContext';

AppRegistry.registerComponent(appName, () => () => (

<AuthProvider>
<TransactionsProvider >

<App></App>
</TransactionsProvider>

</AuthProvider>

), () => App );
