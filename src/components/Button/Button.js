import "./Button.css";

function Button(props) {
    return (
        <>
            <button id={props.id} className="button" onClick={(e) => { if(props.click) props.click(e); }}>{props.text}</button>
        </>
    );
}

export default Button;