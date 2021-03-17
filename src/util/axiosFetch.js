import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:4444/api/v1/auth',
});

const blogApi = axios.create({
  baseURL: 'http://localhost:4444/api/v1/blog',
});

const monitorApi = axios.create({
  baseURL: 'http://localhost:4444/api/v1/monitor',
});

export default async function axiosFetch ({api, url, method, data, token, authType, authData}) {


  let API, response, errorObj;
  switch (api) {

    case 'auth':
      API = authApi;
      break;
    case 'blog':
      API = blogApi;
      break;
    case 'monitor':
      API = monitorApi;
      break;
    default:
      API = authApi;
  }


  const reqConfig = {
    method,
    url,
    data,
    auth: authType==='basic' ? authData : undefined,
    headers: authType === 'bearer'? {
      Authorization: `Bearer ${token}`,
    } : undefined,
  };


  try {
    const {data} = await API(reqConfig);
    response =  data;
  } catch (error){
    errorObj = error;
  }

  return {response, errorObj};

}