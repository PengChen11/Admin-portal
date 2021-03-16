import React from "react";
import axios from 'axios';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
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
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

async function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    const loginReqConfig = {
      method: 'post',
      url: 'http://localhost:4444/api/v1/auth/signin',
      auth: {
        username: login,
        password
      }
    }

    let token;
    
    try {
      const {data} = await axios(loginReqConfig);
      token = data.token;
    } catch (error) {
      console.log(error);
      // dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      setIsLoading(false);
    }
    
    const adminVerifyReqConfig = {
      method: 'post',
      url: 'http://localhost:4444/api/v1/auth/adminverify',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    if (token) {
      try {
        console.log('I am called but the verification failed')
        const {data} = await axios(adminVerifyReqConfig);
        if (!!data) {
          sessionStorage.setItem('id_token', token)
          setError(null)
          setIsLoading(false)
          dispatch({ type: 'LOGIN_SUCCESS' })
          history.push('/app/dashboard')
        }
      } catch (error) {
        console.log(error);
        // dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
      }
    }

  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
