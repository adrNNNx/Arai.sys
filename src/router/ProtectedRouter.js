import { Navigate, Outlet } from "react-router-dom";  

const ProtectedRouter = () => {

/*     Aca se valida si el usuario esta logeado o no, si no esta lo vuelve a enviar al InputDeviceInfo, si esta logeado continua con el return de abajo */
    let isLogged= localStorage.getItem("token")
    if (!isLogged){
        return <Navigate to = "/"/>
    }
/* outlet lo que hace es darle acceso a las rutas que esten envueltas por este componente  */
    return (  
        <Outlet/>
    );
}
export default ProtectedRouter;