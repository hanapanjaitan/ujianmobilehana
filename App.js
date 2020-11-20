import 'react-native-gesture-handler'
import React from 'react';
import AppMain from './AppMain'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Reducers from './src/redux/reducers'

const store = createStore(Reducers)


const App = () => {
  return (
    <Provider store={store}>
      <AppMain/>
    </Provider>
  );
};


export default App;
