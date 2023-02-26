import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../reducers/app/appReducer";
import InputSelector from "../InputSelector/InputSelector";
import "./AppMenu.css";

function AppMenu(props) {

    const dispatch = useDispatch();
    const menuCollapse = useSelector((state) => state.app.menuCollapse);

    return (
        <div className={`app-menu ${menuCollapse?"hide":"show"}`}>
            <div className="app-menu-inner">
                <div className="app-menu-inner">
                
                <div className="menu-header">
                    <h2 className="no-margin">Settings </h2>
                    <button className="app-menu-close" onClick={()=>dispatch(menuToggle())}><i className="fa-solid fa-times"></i></button>
                </div>

                <InputSelector/>
                </div>
            </div>
        </div>
    );
}

export default AppMenu;