import React, { useState, useRef } from "react";
import { Formik, Field, Form } from "formik";
import {
  Button,
  Checkbox,
  Container,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import TextFormField from "./components/TextFormField";
import * as yup from "yup";
import MapComponent from "./components/MapComponent";
import { LocationField } from "./components/LocationField";
import Notification from "./components/Notification";

const validationSchema = yup.object({
  recruter: yup.string().required().max(20),
  payment: yup.string().required(),
  address: yup.string().required(),
});

function App() {
  const today = new Date().toISOString().substr(0, 10);
  const now = "13:00";

  const initialValues = {
    recruter: "",
    offerDate: today,
    startTime: now,
    endTime: "14:00",
    needPassport: false,
    needDocuments: false,
    needCostume: false,
    payment: "",
    comment: "",
    address: "",
    lat: 55.822348,
    lng: 37.6416,
  };

  const [notify, setNotify] = useState(false);

  //required to clear field, used in LocationField->Geosuggest component
  const locationfieldRef = useRef(null);

  return (
    <Container>
      <Typography variant="h3">Новый оффер</Typography>
      <Formik
        validateOnChange={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          fetch("https://reqres.in/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: JSON.stringify({
              ...data,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
              setNotify(true);
            })
            .catch((error) => console.log(error));
          console.log("submit: ", data);
          setSubmitting(false);
          resetForm();
          locationfieldRef.current.clear();
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Notification notify={notify} setNotify={setNotify} />
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
              <Box width="400px" justifySelf="flex-start">
                <Grid container spacing={4}>
                  <Grid item xs={7}>
                    <Field
                      label="Дата"
                      name="offerDate"
                      type="date"
                      component={TextFormField}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      label="С"
                      name="startTime"
                      type="time"
                      component={TextFormField}
                      InputLabelProps={{ shrink: true }}
                    />
                    <Field
                      label="До"
                      name="endTime"
                      type="time"
                      component={TextFormField}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
                <Field
                  label="Оплата"
                  name="payment"
                  component={TextFormField}
                />
                <Field
                  label="Название Организации"
                  name="recruter"
                  component={TextFormField}
                />
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={8}>
                    <Typography variant="h6"> Требуется паспорт:</Typography>
                  </Grid>
                  <Field name="needPassport" type="checkbox" as={Checkbox} />
                </Grid>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={8}>
                    <Typography variant="h6"> Другие документы:</Typography>
                  </Grid>
                  <Field name="needDocuments" type="checkbox" as={Checkbox} />
                </Grid>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={8}>
                    <Typography variant="h6">Особый внешний вид:</Typography>
                  </Grid>
                  <Field name="needCostume" type="checkbox" as={Checkbox} />
                </Grid>
                <Field
                  label="Комментарий"
                  name="comment"
                  multiline
                  rowsMax={4}
                  component={TextFormField}
                />
              </Box>
              <Box display="flex" justifyContent="center" m={3}>
                <Box width="500px">
                  <Field
                    name="address"
                    locationfieldRef={locationfieldRef}
                    component={LocationField}
                  />
                  <Field name="map" component={MapComponent} />
                </Box>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-around">
              <Box display="flex" m="auto">
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Создать
                </Button>
                <Button
                  type="reset"
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: 10 }}
                >
                  Очистить
                </Button>
              </Box>
              <Box width="500px"></Box>
            </Box>
            {/* <pre>{JSON.stringify({ ...values }, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default App;
