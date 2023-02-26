import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../reducers/app/appReducer";
import "./Header.css";

function Header(props) {

  const dispatch = useDispatch();

  return (
   <header id="app-header">
     <div className="inner">
       <h1 className="logo">Weather App</h1>
       <button id="settings-btn" onClick={()=>dispatch(menuToggle())}>
         <i className="fa-solid fa-bars"></i>
       </button>
     </div>
   </header>
  ); 
}

export default Header;