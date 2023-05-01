import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInSide from '../pages/SignInSide';
import PruebaHome from '../pages/pruebarouterdom';

const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<SignInSide/>}/>
          <Route exact path='/home' element={<PruebaHome/>}/>
        </Routes>
      </BrowserRouter>
    );
}
export default AppRouter;