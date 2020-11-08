import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FlightsContext} from './context'
import data from './flights.json'


ReactDOM.render(
  <React.StrictMode>
    <FlightsContext.Provider value={data.result.flights}>
    <App />
    </FlightsContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
