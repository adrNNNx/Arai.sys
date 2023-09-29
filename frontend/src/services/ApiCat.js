import axios from 'axios';
import { apiUrlCreaCat, apiUrlGetCat, apiUrlUpdateCat } from './Apirest';


export const getCategorias = () => {
    return axios.get(apiUrlGetCat);
  };
  
  export const addCategoria = (values) => {
    return axios.post(apiUrlCreaCat, {
      nom_cat: values.nom_cat,
      desc_cat: values.desc_cat,
    });
  };
  
  export const updateCategoria = (id_cat, values) => {
    return axios.put(apiUrlUpdateCat, {
      id_cat: id_cat,
      nom_cat: values.nom_cat,
      desc_cat: values.desc_cat,
    });
  };
  
  export const deleteCategoria = (id_cat) => {
    return axios.delete(`http://localhost:3001/delete/${id_cat}`);
  };
