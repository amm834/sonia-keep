import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App'
import CssBaseline from '@mui/material/CssBaseline';
import {Provider} from "react-redux";
import {store} from "./store";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <CssBaseline/>
                <App/>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>,
)
