import React from 'react'

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const TextFieldGray = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "gray"
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "gray"
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "red"
        },
        "&:hover fieldset": {
          borderColor: "yellow"
        },
        "&.Mui-focused fieldset": {
          borderColor: "gray"
        }
      }
    }
  })(TextField);

export default function Label(props) {
    return(   
      <>
      {props.type === "password" 
      ? <TextFieldGray onChange={props.onChange} id={props.id} label={props.label} value={props.value} type="password" ></TextFieldGray> 
      : <TextFieldGray onChange={props.onChange} id={props.id} label={props.label} value={props.value} ></TextFieldGray>}        
      </>
        
    )
}