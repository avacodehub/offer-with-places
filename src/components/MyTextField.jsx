import { useField } from "formik";
import React from 'react';
import { TextField } from "@material-ui/core"

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} variant="outlined" fullWidth={true} />
  )
}