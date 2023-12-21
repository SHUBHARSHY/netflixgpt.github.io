
import { Provider } from 'react-redux';
import './App.css';
import Body from './components.js/Body';
import appStore from './components.js/utils/appStore';

function App() {
  return (
    <Provider store={appStore}>
    
    <Body/>
    </Provider>
  );
}

export default App;
