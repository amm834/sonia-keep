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

type TabTypes = "login" | "register";

export default function Navbar() {
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState<TabTypes>("login");
    const [alertOpen, setAlertOpen] = React.useState(false);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("")

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);


    const handleClickOpen = (type: TabTypes) => {
        setType(type);
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };


    const onRegister = async () => {
        try {
            await axiosInstance.post('/api/auth/register', {
                name,
                email,
                password,
            });
            setOpen(false);
            dispatch(changeIsLoggedIn(true));
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(error.response?.data.msg);
                setAlertOpen(true);
            }
        }
    }


    const onLogin = () => {
        console.log('login')
    }


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Sonia Keep
                    </Typography>

                    {!isLoggedIn && (
                        <>
                            <Button color="inherit" onClick={() => handleClickOpen('login')}>Login</Button>
                            <Button color="inherit" onClick={() => handleClickOpen('register')}
                                    style={{marginLeft: 10}}>Register</Button>
                        </>
                    )}

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{type === "login" ? "Login" : "Register"}</DialogTitle>
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

                            {type === "register" && <TextField
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
                            {type === "register" && <Button variant="contained"
                                                            onClick={onRegister}>Register</Button>}
                            {type === "login" && <Button onClick={handleClose} variant="contained"
                                                         onClickCapture={onLogin}>Login</Button>}
                        </DialogActions>
                    </Dialog>

                </Toolbar>
            </AppBar>
        </Box>
    )
        ;
}