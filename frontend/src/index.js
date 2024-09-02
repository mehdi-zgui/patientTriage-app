import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user'


const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({ reducer: { user: userReducer } })

root.render(<>
  <Provider store={store}>
    <App />
  </Provider>
</>)


