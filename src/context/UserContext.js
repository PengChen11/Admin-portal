import React from 'react';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true };
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !! sessionStorage.getItem('user_token'),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

import axiosFetch from '../util/axiosFetch.js';

async function loginUser(dispatch, username, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (username==='demo' && password === 'demo'){
    sessionStorage.setItem('user_token', 'demo');
    setError(null);
    setIsLoading(false);
    dispatch({ type: 'LOGIN_SUCCESS' });
    history.push('/app/dashboard');
    return;
  }

  if (!username.trim() || !password.trim) {
    setError(true);
    setIsLoading(false);
    return;
  }

  const { response, errorObj } = await axiosFetch({
    api: 'auth',
    url: '/signin',
    method: 'post',
    authType:'basic',
    authData: {
      username,
      password,
    },
  });

  if (response && response.user.role === 'admin') {
    sessionStorage.setItem('user_token', response.token);
    sessionStorage.setItem('user_info', JSON.stringify(response.user));
    setError(null);
    setIsLoading(false);
    dispatch({ type: 'LOGIN_SUCCESS' });
    history.push('/app/dashboard');
  } else {
    // dispatch({ type: 'LOGIN_FAILURE' });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  sessionStorage.removeItem('user_token');
  sessionStorage.removeItem('user_info');
  dispatch({ type: 'SIGN_OUT_SUCCESS' });
  history.push('/login');
}


import PropTypes from 'prop-types';
UserProvider.propTypes = {
  children: PropTypes.object,
};