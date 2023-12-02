
const urlapi = 'http://localhost:4000';

//Apis para el login y autentificadores
export const apiUrlAuth = urlapi + '/api/login';
export const apiUrlReg = urlapi + '/api/register';
export const apiCookieAuth = urlapi + '/api/auth-cookie';

//Api para la cotizacion
export const apiDolarPy = 'https://dolar.melizeche.com/api/1.0/';

//Apis de Venta
export const apiUrlAggItemVent = urlapi + '/api/agregar-item-venta';
export const apiUrlIniciarVent = urlapi + '/api/iniciar-venta';

//Apis para CRUD
export const apiUrlGetCat = urlapi + '/api/categorias';
export const apiUrlCreaCat = urlapi + '/api/create_cat';
export const apiUrlUpdateCat = urlapi + '/api/update_cat';
export const apiUrlDeleteCat = urlapi + '/api/delete_cat';

export const apiUrlGetProdu = urlapi + '/api/productos';
export const apiUrlCreaProdu = urlapi + '/api/create_produ';
export const apiUrlUpdateProdu = urlapi + '/api/update_produ';
export const apiUrlDeleteProdu = urlapi + '/api/delete_produ';
export const apiUrlExistenciaProd = urlapi + '/api/exist_prod';

export const apiUrlCreaProv = urlapi + '/api/create_prov';
export const apiUrlGetProv = urlapi + '/api/get_prov';
export const apiUrlUpdateProv = urlapi + '/api/update_prov';
export const apiUrlDeleteProv = urlapi + '/api/delete_prov';

export const apiUrlCreaClient = urlapi + '/api/create_client';
export const apiUrlGetClient = urlapi + '/api/get_client';
export const apiUrlUpdateClient = urlapi + '/api/update_client';
export const apiUrlDeleteClient = urlapi + '/api/delete_client';