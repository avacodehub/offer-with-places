import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "500px",
  height: "400px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true
}

function MyComponent(props) {
  const [map, setMap] = React.useState(null);

  const {form: { values}} = props
  // console.log({"map says: ": props})

  const center = {
    lat: values.lat,
    lng: values.lng,
  };

  const onLoad = React.useCallback(function callback(map) {
    map.setCenter(center);
    map.zoom=15
    map.disableDefaultUI=true
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
        
      >
        {<Marker position={center} />}
        <></>
      </GoogleMap>
  );
}

export default React.memo(MyComponent);
