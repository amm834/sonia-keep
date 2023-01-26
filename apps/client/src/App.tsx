import React from "react";
import Navbar from "./components/navbar/Navbar";
import CreateForm from "./components/form/create.form";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import {useSelector} from "react-redux";
import {RootState} from "./store";


function App() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    return (
        <>
            <Navbar/>
            {isLoggedIn && <CreateForm/>}

            <Container style={{marginTop: 20}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={4}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Title
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container spacing={1} justifyContent="flex-end">
                                    <Grid item>
                                        <Button size="small" variant="contained" color="error">Delete</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" variant="contained" color="secondary">Edit</Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default App
