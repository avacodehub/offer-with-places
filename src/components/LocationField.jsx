/* eslint-disable no-undef */
import React from "react";
import Geosuggest from "react-geosuggest";
import "./geo.css";

export class LocationField extends React.PureComponent {
  onSuggestSelect = (place) => {
    const {
      location: { lat, lng },
      label,
    } = place;
    const {
      form: { setValues, values },
    } = this.props;

    setValues({
      ...values,
      lat: lat,
      lng: lng,
      address: label,
    });
  };

  render() {
    const locationfieldRef = this.props.locationfieldRef;
    return (
      <Geosuggest
        ref={locationfieldRef}
        placeholder="Метро ВДНХ"
        onSuggestSelect={this.onSuggestSelect}
        location={new google.maps.LatLng(55.822311, 37.641621)}
        radius="20"
      />
    );
  }
}
