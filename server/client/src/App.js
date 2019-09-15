import React from 'react';
import { Provider } from 'react-redux';
import store from 'redux/index';
import Home from 'components/pages/Home';
import 'antd/dist/antd.css';

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
