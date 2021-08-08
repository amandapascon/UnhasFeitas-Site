import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SelectLabel(props) {
    return(
        <FormControl variant="filled" className="">
            <InputLabel id="">{props.children}</InputLabel>
            <Select
                labelId=""
                id=""
                value=""
                onChange="">
            <MenuItem value="">
            </MenuItem>
            <MenuItem value={1}>Bla</MenuItem>
            </Select>
        </FormControl>
    )
}