import "./InputSelector.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { toggleMetric, setLocation, setLocationAndCoords, updateTime, setRtlUpdate, setRealtime } from "../../reducers/weather/weatherReducer";
import { store } from "../../app/store";
import { pushNotification } from "../../reducers/app/appReducer";
import Button from "../Button/Button";
import { REALTIME_INTERVAL } from "../../api/api";

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
  const rtlEnabled = useSelector(state => state.weather.realtime);
  
	const mTemp = useSelector(state => state.weather.temp);
	const mPpt = useSelector(state => state.weather.ppt);
	const mWs = useSelector(state => state.weather.ws);
	const location = useSelector(state => state.weather.location);

	const locationChange = (e) => {
		let geocoder = new window.google.maps.Geocoder();
		let pos = [0, 0];

		geocoder.geocode({
			'address': e.target.value
		}, function(results, status) {

			if (status == window.google.maps.GeocoderStatus.OK) {
				pos[0] = results[0].geometry.location.lat();
				pos[1] = results[0].geometry.location.lng();
			} 

			dispatch(setLocationAndCoords({location: e.target.value, pos}));
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

  const setCurrentLocation = (e, cb) => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

			navigator.geolocation.getCurrentPosition((p) => {
        console.log("Using current location.");
        let pos = [p.coords.latitude, p.coords.longitude];
        console.log(pos);

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos[0]},${pos[1]}&key=AIzaSyDqDdw4CN92p9gwujRO56GHA61OrQ-d6p8`)
        .then(res => res.json())
        .then(json => {
          dispatch(setLocationAndCoords({location: json.plus_code.compound_code, pos}));
          cb();
        }).catch((err) => { cb(); });

      }, (err) => { console.log("Failed to fetch current location."); cb(); }, options);
		} else {
			pushNotification({id: "002", type: "warn", content: "Failed to get current location. Please search a location from the menu."});
      cb();
		}
  };

  return (
    <div className="input-selector">
      <div className="menu-items">
        <div className="group">
          <div className="group-item">
			      <p className="label">Location</p>
			      <input type="text" ref={locationRef} value={location} 
            onChange={(e)=>{dispatch(setLocation(e.target.value))}} 
            onBlur={(e)=>{locationChange(e)}}/>
            <Button icon="fa-location" preloader={true} click={setCurrentLocation}>
              Use Current Location
            </Button>
			    </div>
        </div>

        <div className="group">
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
          <p className="label">Select weather metrics</p>
          <ul>
            <li><label><input type="checkbox" checked={mTemp} onChange={(e)=>{dispatch(toggleMetric("temp"))}}/> Temperature</label></li>
            <li><label><input type="checkbox" checked={mPpt} onChange={(e)=>{dispatch(toggleMetric("ppt"))}}/> Precipitation</label></li>
            <li><label><input type="checkbox" checked={mWs} onChange={(e)=>{dispatch(toggleMetric("ws"))}}/> Windspeed</label></li>
          </ul>
        </div>

        <div className="group metrics">
          <p className="label">More settings</p>
          <ul>
            <li><label><input type="checkbox" checked={rtlEnabled} onChange={(e)=>{dispatch(setRealtime(e.target.checked))}}/> Enable realtime updates (every {REALTIME_INTERVAL}s)</label></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InputSelector;