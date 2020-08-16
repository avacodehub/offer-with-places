import React from 'react';
import './App.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete"

function App() {

  const [address, setAddress] = React.useState("")
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  })
  const handleSelect = async (value) => { 
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);

  }

  const handleGetClick = () => {
    fetch('https://reqres.in/api/users?page=2')
    //fetch('http://82.140.219.8:13254')
    .then(res => {
      if (res.ok) {
        console.log("Success")
      } else {
        console.log("Not Successful")
      }
      res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }

  const handleConfirmClick = () => {
    fetch('https://reqres.in/api/users', {
      //fetch('http://82.140.219.8:13254', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'user1',
        lat: coordinates.lat,
        lng: coordinates.lng
      })
    }).then(res => {
      return res.json()
    })
    .then(data => console.log(data))
  }

  return (
    <div>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>

            <input {...getInputProps({ placeholder: "Type address" })} />
            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                }
                return <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <br></br>
      <button onClick={handleConfirmClick}>Confirm</button>
      <button onClick={handleGetClick}>Get Some</button>
    </div>
  );
}

export default App;
