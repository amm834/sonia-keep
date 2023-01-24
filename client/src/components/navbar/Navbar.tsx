import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type TabTypes = "login" | "register";

export default function Navbar() {
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState<TabTypes>("login");

    const handleClickOpen = (type: TabTypes) => {
        setType(type);
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Sonia Keep
                    </Typography>
                    <Button color="inherit" onClick={() => handleClickOpen('login')}>Login</Button>
                    <Button color="inherit" onClick={() => handleClickOpen('register')}
                            style={{marginLeft: 10}}>Register</Button>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{type === "login" ? "Login" : "Register"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText style={{marginBottom: 20}}>
                                Login to your account to save your note to the cloud.
                            </DialogContentText>
                            {type === "register" && <TextField
                                style={{marginBottom: 10}}
                                autoFocus
                                margin="dense"
                                label="Username"
                                type="text"
                                fullWidth
                            />}
                            <TextField
                                style={{marginBottom: 10}}
                                autoFocus
                                margin="dense"
                                label="Email"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                style={{marginBottom: 10}}
                                autoFocus
                                margin="dense"
                                label="Password"
                                type="password"
                                fullWidth
                                autoComplete="current-password"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} variant="outlined" color="error">Close</Button>
                            {type === "register" && <Button onClick={handleClose} variant="contained">Register</Button>}
                            {type === "login" && <Button onClick={handleClose} variant="contained">Login</Button>}
                        </DialogActions>
                    </Dialog>

                </Toolbar>
            </AppBar>
        </Box>
    );
}