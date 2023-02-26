import "./InputSelector.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { toggleMetric, setLocation } from "../../reducers/weather/weatherReducer";

function InputSelector() {

	const dispatch = useDispatch();
	
	// Places API
	const autoCompleteRef = useRef();
	const options = {
		componentRestrictions: { country: "ng" },
		fields: ["address_components", "geometry", "icon", "name"],
		types: ["establishment"]
	};
	
	const locationRef = useRef();
	const mTemp = useSelector((state) => state.weather.temp);
	const mPpt = useSelector((state) => state.weather.ppt);
	const mWs = useSelector((state) => state.weather.ws);
	const location = useSelector((state) => state.weather.location);
	const [timeRange, setTimeRange] = useState([]);

	const locationChange = (e) => {
		let geocoder = new window.google.maps.Geocoder();

		geocoder.geocode({
			'address': e.target.value
		}, function(results, status) {

			if (status == window.google.maps.GeocoderStatus.OK) {
				let latitude = results[0].geometry.location.lat();
				let longitude = results[0].geometry.location.lng();

				console.log(latitude, longitude);
				dispatch(setLocation(e.target.value, latitude, longitude));
			}
		});
	};

	useEffect(()=>{
		autoCompleteRef.current = new window.google.maps.places.Autocomplete(
			locationRef.current,
			options
		);
	}, []);

    return (
        <div className="input-selector">
            <div className="menu-items">
                <div className="group">
                    <div className="group-item">
						<p className="label">Location</p>
						<input type="text" ref={locationRef} value={location} 
						onInput={(e)=>{locationChange(e)}} 
						onBlur={(e)=>{locationChange(e)}}/>
					</div>

					<div className="group-item">
						<p className="label">Time Range</p>
						<div className="subgroup-item">
							<span className="subgroup-label">Start</span>
							<input type="time"/>
						</div>
						<div className="subgroup-item">
							<span className="subgroup-label">End</span>
							<input type="time"/>
						</div>
					</div>
                </div>

                <div className="group metrics">
					<p className="label">Metrics</p>
					<ul>
						<li><label><input type="checkbox" checked={mTemp} onChange={(e)=>{dispatch(toggleMetric("temp"))}}/> Temperature</label></li>
						<li><label><input type="checkbox" checked={mPpt} onChange={(e)=>{dispatch(toggleMetric("ppt"))}}/> Precipitation</label></li>
						<li><label><input type="checkbox" checked={mWs} onChange={(e)=>{dispatch(toggleMetric("ws"))}}/> Windspeed</label></li>
					</ul>
                </div>
            </div>
        </div>
    );
}

export default InputSelector;