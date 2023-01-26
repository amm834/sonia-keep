import React, {useState} from 'react';
import AddIcon from "@mui/icons-material/Add";
import {styled} from "@mui/material";
import Fab from "@mui/material/Fab";
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";


const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 2,
    right: 16,
    bottom: 16,
});


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateForm = () => {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <StyledFab color="secondary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon/>
            </StyledFab>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Create Note
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        style={{marginBottom: 20}}
                    />
                    <TextField
                        id="standard-multiline-static"
                        label="Body"
                        multiline
                        rows={10}
                        variant="standard"
                        fullWidth
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateForm;