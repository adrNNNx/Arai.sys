import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { PublicRoutes } from "../rutas/routes";


export const AuthGuard = () =>{
    const userState = useSelector((state)=> state.user);
    console.log('AuthGuard - userState:', userState);
    return userState.nom_usu ? <Outlet/> : <Navigate replace to ={PublicRoutes.LOGIN}/>;
    
}

export default AuthGuard;