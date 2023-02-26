import "./InputSelector.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { toggleMetric, setLocation, setLocationAndCoords, updateTime } from "../../reducers/weather/weatherReducer";
import { store } from "../../app/store";

function InputSelector() {

	const dispatch = useDispatch();
	const timeRange = useSelector(state => state.weather.timeRange);
	
	// Places API
	const autoCompleteRef = useRef();
	const options = {
		fields: ["address_components", "geometry", "icon"],
		types: ["establishment"]
	};
	
	const locationRef = useRef();
	const mTemp = useSelector(state => state.weather.temp);
	const mPpt = useSelector(state => state.weather.ppt);
	const mWs = useSelector(state => state.weather.ws);
	const location = useSelector(state => state.weather.location);

	const locationChange = (e) => {
		let geocoder = new window.google.maps.Geocoder();
		let lat = 0;
		let long = 0;

		geocoder.geocode({
			'address': e.target.value
		}, function(results, status) {

			if (status == window.google.maps.GeocoderStatus.OK) {
				lat = results[0].geometry.location.lat();
				long = results[0].geometry.location.lng();
			} 

			dispatch(setLocationAndCoords({location: e.target.value, lat, long}));
		});
	};

	const timeRangeChange = (e, type) => {

		let t = [...store.getState().weather.timeRange];

		if(type == "start")
			t[0] = e.target.value;
		else if(type == "end")
			t[1] = e.target.value;


		dispatch(updateTime(t));
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
						onChange={(e)=>{dispatch(setLocation(e.target.value))}} 
						onBlur={(e)=>{locationChange(e)}}/>
					</div>

					<div className="group-item">
						<p className="label">Time Range</p>
						<div className="d-flex-50">
							<div className="subgroup-item">
								<span className="subgroup-label">Start Hour</span>
								<input type="number" value={timeRange[0]} min="0" max="24" onChange={(e) => {timeRangeChange(e, "start")}}/>
							</div>
							<div className="subgroup-item">
								<span className="subgroup-label">End Hour</span>
								<input type="number" value={timeRange[1]} min="0" max="24" onChange={(e) => {timeRangeChange(e, "end")}}/>
							</div>
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