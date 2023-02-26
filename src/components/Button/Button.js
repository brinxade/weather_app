import { useState } from "react";
import "./Button.css";
import preloaderImg from "../../images/pl-black-round.svg";

function Button(props) {

    const [isLoading, setIsLoading] = useState(false);

    return (
      <>
        <button id={props.id} className="button" 
          onClick={(e) => { 
            if(props.click) { 
                props.click(e, () => { setIsLoading(false); }); 
                if(props.preloader) setIsLoading(true); 
            } 
          }
        }>
          {isLoading && <span className="preloader-inline"><img src={preloaderImg}/></span>}
          {(props.icon && !isLoading) && <i className={`fas ${props.icon}`}></i>}
          {props.children}
        </button>
      </>
    );
}

export default Button;