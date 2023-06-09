import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {SignInSide, DatUsuarios} from '../pages/SignInSide';
import Home from '../pages/Home';
import ProtectedRouter from '../router/ProtectedRouter';

const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/Arai.sys" element={<SignInSide />} />

          <Route element={<ProtectedRouter />}>
            
            <Route exact path="/home"element={<Home  />}/>

          </Route>

        </Routes>
      </BrowserRouter>
    );
}
export default AppRouter;