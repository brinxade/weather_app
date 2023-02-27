import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle, setMenuOpen } from "../../reducers/app/appReducer";
import InputSelector from "../InputSelector/InputSelector";
import "./AppMenu.css";

function AppMenu(props) {

  const dispatch = useDispatch();
  const menuCollapse = useSelector((state) => state.app.menuCollapse);

  /* Touch menu control */
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
    <div className={`app-menu ${menuCollapse?"hide":"show"}`} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className="app-menu-inner">
        <div className="menu-header">
          <h2 className="no-margin">Settings </h2>
          <button className="app-menu-close" onClick={()=>dispatch(menuToggle())}><i className="fa-solid fa-times"></i></button>
        </div>

        <InputSelector/>
      </div>
    </div>
  );
}

export default AppMenu;