import React, { useState } from 'react';

import DataDashboard from './components/DataDashboard/DataDashboard';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { setMenuOpen, setMenuState } from './reducers/app/appReducer';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  // Touch logic for menu toggle
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) {
      if(isLeftSwipe) 
        dispatch(setMenuOpen(true));
      else
        dispatch(setMenuOpen(false));
    }
  }

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
