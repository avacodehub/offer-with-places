import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Formik, Field, Form, useField } from "formik";
import { TextField, Button, Checkbox, ButtonGroup, Container, Typography, Grid } from "@material-ui/core"
import TextFormField from "./components/TextFormField"
import * as yup from 'yup';

const validationSchema = yup.object({
  recruter: yup.string().required().max(20)
})

function App() {

  const initialValues =
    { recruter: "", offerDate: "", startTime: "", endTime: "", needDocuments: false }

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
    fetch(process.env.REACT_APP_SERVER_GET)
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
    fetch(process.env.REACT_APP_SERVER_POST, {
      //fetch('http://82.140.219.8:25499/', {
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

  const today = new Date().toISOString().substr(0, 10);

  return (
    <Container>
      <Typography variant="h3">Новый оффер</Typography>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        <div className="form-left">
          <Formik
            validateOnChange={true}
            initialValues={initialValues}

            validationSchema={validationSchema}

            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);


              console.log("submit: ", data);
              setSubmitting(false);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Field label="Когда" value={today} name="offerDate" type="date" component={TextFormField} />

                <div>
                  <Field label="С" value="12:30" name="startTime" type="time" component={TextFormField} />
                  <Field label="До" value="13:30" name="endTime" type="time" component={TextFormField} />
                </div>

                <Field label="Название Организации" name="recruter" component={TextFormField} />
                <Grid container direction="row" justify="flex-start" alignItems="center">
                  <Typography variant="h6"> Требуется паспорт:</Typography>
                  <Field name="needDocuments" type="checkbox" text="Требуются документы?" as={Checkbox} />
                </Grid>
                <br></br>
                <Grid container justify="flex-end">
                <Button disabled={isSubmitting} onClick={handleConfirmClick} variant="contained" color="primary">Confirm</Button>
                <Button onClick={handleGetClick} variant="contained" color="secondary">Reset</Button>
                </Grid>
                <pre>
                  {JSON.stringify({ ...values, coordinates }, null, 2)}
                </pre>
              </Form>
            )}</Formik>
        </div>
        <div className="form-right">

          <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} className="map-input">
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input {...getInputProps({ placeholder: "Адрес.." })} className="map-input" />
                <div>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    return <div {...getSuggestionItemProps(suggestion, {
                      className
                    })}>
                      {suggestion.description}
                    </div>
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      </Grid>
    </Container>
  );
}

export default App;
