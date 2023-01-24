import React from "react";
import Navbar from "./components/navbar/Navbar";
import AddIcon from '@mui/icons-material/Add';
import {styled} from "@mui/material";
import Fab from '@mui/material/Fab';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    right: 20,
    bottom: 30,
});

function App() {
    return (
        <>
            <Navbar/>
            <StyledFab color="secondary" aria-label="add">
                <AddIcon/>
            </StyledFab>
        </>
    )
}

export default App
