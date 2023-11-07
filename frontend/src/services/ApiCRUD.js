import Axios from 'axios';
import Swal from "sweetalert2";
import 'animate.css';


export const getRequest = (url) => {
  return Axios.get(url);
};

//Funcion para agregar datos 
export const sendPostRequest = (url, data, successMessage, successCallback) => {
  Axios.post(url, data)
    .then(() => {
      successCallback();
      Swal.fire({
        position: 'bottom',
        toast: true,
        title: '<strong>Registro exitoso</strong>',
        html: successMessage,
        icon: 'success',
        showConfirmButton: false,
        showClass: {
          popup: 'animate__animated animate__fadeInLeft animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp animate__faster'
        },
        timer: 2500
      });
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        // Si el servidor devuelve un mensaje de error personalizado
        Swal.fire({
          position: 'bottom',
          toast: true,
          title: '<strong>Error</strong>',
          text: error.response.data.error,
          icon: 'error',
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeInLeft animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster'
          },
          timer: 2500
        });
      } else {
        // Si no se recibe un mensaje personalizado, muestra un mensaje genérico
        Swal.fire({
          icon: 'error',
          title: 'Oops... ocurrió un error inesperado',
          text: 'Intente más tarde',
        });
      }
    });
};
  
  // Función para enviar una solicitud de actualización
  export const sendPutRequest = (url, data, successMessage, successCallback) => {
    Axios.put(url, data)
      .then(() => {
        successCallback();
        Swal.fire({
          position: 'bottom',
          toast: true,
          title: '<strong>Actualización exitosa</strong>',
          html: successMessage,
          icon: 'success',
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeInLeft animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster'
          },
          timer: 2500
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...ocurrió un error inesperado',
          text:
            JSON.parse(JSON.stringify(error)).message === 'Network Error'
              ? 'Intente más tarde'
              : JSON.parse(JSON.stringify(error)).message,
        });
      });
  };
  // Función para eliminar 
  export const sendDeleteRequest = (url, data, successMessage, successCallback) => {
    Axios.put(url, data)
      .then(() => {
        successCallback();
        Swal.fire({
          position: 'bottom',
          toast: true,
          icon: 'success',
          title: successMessage,
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeInLeft animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster'
          },
          timer: 2500
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se logró eliminar al proveedor.',
          footer:
            JSON.parse(JSON.stringify(error)).message === 'Network Error'
              ? 'Intente más tarde'
              : JSON.parse(JSON.stringify(error)).message
        });
      });
  };