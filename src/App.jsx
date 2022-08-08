// tools
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


// libs
import "@libs";

// pages
import MainBlock from './pages/MainBlock';
import Status from './pages/Status'
//import MainBlock from './pages/MainBlock'

// global styles
import "@styles/root.css";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/status' element={<Status />}>
                    <Route path=':id/:hash/:cashinId' element={<Status />} />
                </Route>
                <Route path='/' element={<MainBlock />}>
                    <Route path=':id/:hash/:error' element={<MainBlock />} />
                </Route>
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;