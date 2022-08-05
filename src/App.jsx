// tools
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// libs
import "@libs";

// pages
import Payment from './pages/Payment';
import Status from './pages/Status'
//import MainBlock from './pages/MainBlock'

// global styles
import "@styles/root.css";

function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/status' element={<Status />}>
                    <Route path=':id/:hash/:cashinId' element={<Status />} />
                </Route>
                <Route path='/' element={<Payment />}>
                    <Route path=':id/:hash/:error' element={<Payment />} />
                </Route>
                <Route path='*' element={<Navigate to="/"/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;