import React, { Fragment } from 'react'
import { TextField } from '@mui/material'
import { AiOutlineArrowRight,AiOutlineUser } from "react-icons/ai";
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

const TextFieldPrueba = () => {
    return (
      <Fragment>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AiOutlineUser sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="With sx" variant="standard" />
        </Box>
      </Fragment>
    );
}
 
export default TextFieldPrueba;