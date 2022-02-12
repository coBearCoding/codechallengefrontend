import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {useState} from "react";

export default function AddressForm() {

    let [inputs, setInputs] = useState([""]);



    function appendNewInput(){
        setInputs(inputs.concat(""))
    }



    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Get Repeating Characters
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button variant="outlined" onClick={appendNewInput}>Add Text</Button>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="textToAnalize1"
                        name="textToAnalize1"
                        label="Analyzable Text"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="textToAnalize2"
                        name="textToAnalize2"
                        label="Analyzable Text"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined">Send</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}