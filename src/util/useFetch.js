'use strict';
import {useState, useEffect} from 'react';
import axiosFetch from './axiosFetch.js';



export default function useFetch ({api, url, method, data, token, authType, authData}) {
  const [hookResponse, setResponse] = useState();
  const [hookError, setError] = useState(null);
  const [hookIsLoading, setIsLoading] = useState(true);


  useEffect (async() => {

    const { response, error } = await axiosFetch({api, url, method, data, token, authType, authData});

    if (response) {
      setResponse ( response );
      setIsLoading (false);
    }

    if ( error ) {
      setError(error);
    }

  }, [api, url, method, data, token, authType, authData]);

  return {hookResponse, hookError, hookIsLoading};
}