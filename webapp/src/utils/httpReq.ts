import Axios from 'axios';
let hostURL = "";

function getHostURL() {
  return hostURL;
}
function setHostURL(url: string) {
    hostURL = url;
}

function errorHandler(err: any) {
  let error;
  let status = 500;
  if (err.response) {
    error = err.response.data.error;
    status = err.response.status;
  } else if(err.request) {
    error = err.request;
  } else {
    error = err.message;
  }
  return Promise.reject({
    error: error.message,
    status: status
  });
}


function axiosGet(endpoint:string, headers?: any) {
  return Axios.get(getHostURL() + endpoint, headers).catch(errorHandler);
}

function axiosPost(endpoint:string, data: any, headers?: any) {
  return Axios.post(getHostURL() + endpoint, data, headers).catch(errorHandler);
}

function axiosPut(endpoint:string, data: any, headers?: any) {
  return Axios.put(getHostURL() + endpoint, data, headers).catch(errorHandler);
}

function axiosDelete(endpoint:string, config?: any) {
  return Axios.delete(getHostURL() + endpoint, config).catch(errorHandler);
}

function axiosPatch(endpoint:string, data: any, headers?: any) {
  return Axios.patch(getHostURL() + endpoint, data, headers).catch(errorHandler);
}

export {
  axiosDelete,
  axiosGet,
  axiosPatch,
  axiosPost,
  axiosPut,
  setHostURL,
};