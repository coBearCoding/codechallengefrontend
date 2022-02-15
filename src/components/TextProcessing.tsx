import * as React from 'react';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
    AppBar,
    Button,
    Container,
    Divider,
    IconButton,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar
} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import TextAnalyzeForm from "../interface/TextAnalyzeForm";
import {RefreshOutlined} from "@mui/icons-material";

const steps = ['Input', 'Output'];

export default function TextProcessing() {

    const [activeStep, setActiveStep] = React.useState(0);

    const {register, handleSubmit} = useForm<TextAnalyzeForm>();
    const [textSent, setTextSent] = useState(false);
    const [dataIsNull, setDataIsNull] = useState(false);

    const [text, setText] = useState("");


    const ResetTextSending = () => {
        setTextSent(false)
        setText("")
        setActiveStep(0)
    }


    const TextSendingData: SubmitHandler<TextAnalyzeForm> = async (data) => {
        try {

            let textData = {"text": [data.text]};
            const searchParams = JSON.stringify(textData);
            const response = await fetch("http://localhost:3030/api", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: searchParams,
            });
            const jsonResponse = await response.json();
            if (jsonResponse.data === null) {
                setDataIsNull(true);
                return  setActiveStep(activeStep + 1)
            }
            jsonResponse.data.map((elementText: any) => {
                setText(elementText);
            });
            setActiveStep(activeStep + 1)
        } catch (e) {
            setTextSent(false);
        }
    }


    const OnSubmit: SubmitHandler<TextAnalyzeForm> = (data) => {
        setTextSent(true);
        TextSendingData(data);
    }

    return (
        <div>
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Code & Care
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Text Analyzer <IconButton onClick={ResetTextSending}>
                        <RefreshOutlined/>
                    </IconButton>
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <React.Fragment>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" gutterBottom>
                                    Input Text
                                </Typography>
                            </Grid>
                        </Grid>
                        <form onSubmit={handleSubmit(OnSubmit)}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="text"
                                        label="Analyzable Text"
                                        fullWidth
                                        variant="standard"
                                        {...register("text")}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="outlined" type="submit" disabled={textSent}>Send</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </React.Fragment>
                    {textSent ? (
                        <div>
                            <Divider style={{paddingTop: 12, paddingBottom: 12}}/>
                            <React.Fragment>
                                <Typography variant="h6" gutterBottom>
                                    Output Text
                                </Typography>
                                {dataIsNull ? (<Typography>
                                    No repeated character in this word
                                </Typography>) : (<TableContainer component={Paper}>
                                    <Table sx={{minWidth: 650}} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Repeated Text</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {text}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>)}
                            </React.Fragment>
                        </div>
                    ) : ("")}
                </Paper>
            </Container>
        </div>
    );
}