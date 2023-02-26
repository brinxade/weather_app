import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { menuToggle } from './reducers/app/appReducer';

import DataDashboard from './components/DataDashboard/DataDashboard';

function App() {

  const dispatch = useDispatch();

  return (
    <div id="app">
      <div className="app-inner">
        <header id="app-header">
          <div className="inner">
            <h1 className="logo">Weather App</h1>
            <button id="settings-btn" onClick={()=>dispatch(menuToggle())}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </header>

        <main>
          <DataDashboard/>
        </main>

        <footer id="app-footer">
          <p>&copy; Gurparsad Bajwa</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
