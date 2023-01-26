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
import DialogTitle from '@mui/material/DialogTitle';
import {axiosInstance} from "../../services/axios.service";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import {AxiosError} from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {changeIsLoggedIn, UserState} from "../../features/user.slice";
import {RootState} from "../../store";
import {useState} from "react";
import {useLocalStorage} from "../../services/storage.service";

type TabTypes = "login" | "register";

export default function Navbar() {

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTabType, setDialogTabType] = useState<TabTypes>("login");

    const [alertOpen, setAlertOpen] = useState(false);

    const [errorMessage, setErrorMessage] = useState("")

    //  user state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //  jwt token state
    const [_, setJwtToken] = useLocalStorage('token', null);


    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);


    const handleClickOpen = (type: TabTypes) => {
        setDialogTabType(type);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };


    const onRegister = async () => {
        try {
            await axiosInstance.post('/api/auth/register', {
                name,
                email,
                password,
            });
            setDialogTabType("login");
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(error.response?.data.msg);
                setAlertOpen(true);
            }
        }
    }

    const onLogin = async () => {
        try {
            const response = await axiosInstance.post('/api/auth/login', {
                email,
                password,
            });
            const token = response?.data?.access_token
            setOpenDialog(false);

            setJwtToken(token);
            dispatch(changeIsLoggedIn(true));
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(error.response?.data.msg);
                setAlertOpen(true);
            }
        }
    }


    const onLogout = () => {
        setJwtToken(null);
        dispatch(changeIsLoggedIn(false));
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Sonia Keep
                    </Typography>

                    {isLoggedIn ? (
                        <Button
                            color="error"
                            variant="contained"
                            onClick={onLogout}>Logout</Button>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => handleClickOpen('login')}>Login</Button>
                            <Button color="inherit" onClick={() => handleClickOpen('register')}
                                    style={{marginLeft: 10}}>Register</Button>
                        </>
                    )}


                    <Dialog open={openDialog} onClose={handleClose}>
                        <DialogTitle>{dialogTabType === "login" ? "Login" : "Register"}</DialogTitle>
                        <DialogContent>
                            {/*alert box */}
                            {alertOpen && <Box sx={{width: '100%'}}>
                                <Collapse in={alertOpen}>
                                    <Alert
                                        color="error"
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setAlertOpen(false);
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit"/>
                                            </IconButton>
                                        }
                                        sx={{mb: 2}}
                                    >
                                        {errorMessage}
                                    </Alert>
                                </Collapse>
                            </Box>}

                            {dialogTabType === "register" && <TextField
                                style={{marginBottom: 10}}
                                autoFocus
                                margin="dense"
                                label="Username"
                                type="text"
                                fullWidth
                                onChange={(e) => setName(e.target.value)}
                            />}
                            <TextField
                                style={{marginBottom: 10}}
                                autoFocus
                                margin="dense"
                                label="Email"
                                type="email"
                                fullWidth
                                onChange={e => setEmail(e.target.value)}
                            />
                            <TextField
                                style={{marginBottom: 10}}
                                autoFocus
                                margin="dense"
                                label="Password"
                                type="password"
                                fullWidth
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} variant="outlined" color="error">Close</Button>
                            {dialogTabType === "register" && <Button variant="contained"
                                                                     onClick={onRegister}>Register</Button>}
                            {dialogTabType === "login" && <Button onClick={handleClose} variant="contained"
                                                                  onClickCapture={onLogin}>Login</Button>}
                        </DialogActions>
                    </Dialog>

                </Toolbar>
            </AppBar>
        </Box>
    );
}