import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { menuToggle } from './reducers/app/appReducer';

import DataDashboard from './components/DataDashboard/DataDashboard';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {

  const dispatch = useDispatch();

  return (
    <div id="app">
      <div className="app-inner">
        <Header/>

        <main>
          <DataDashboard/>
        </main>

        <Footer/>
      </div>
    </div>
  );
}

export default App;
