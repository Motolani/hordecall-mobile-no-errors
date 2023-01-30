/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AuthProvider } from './src/context/AuthContext';
import { TransactionsProvider } from './src/context/TransactionsContext';
import { FileProvider } from './src/context/FileContext';

AppRegistry.registerComponent(appName, () => () => (

<AuthProvider>
<TransactionsProvider >
<FileProvider>

<App></App>

</FileProvider>
</TransactionsProvider>
</AuthProvider>

), () => App );
