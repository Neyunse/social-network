import React,{createContext,useReducer,setContext, jwtDecode} from "react"

const initialstate = {
    user: null,
    login: null,
    logout: null
};

const authLink = setContext(async () => {
    const token = sessionStorage.getItem('jwt')
    const { exp } = jwtDecode(token)
    const expirationTime = (exp * 1000) - 60000
    if (Date.now() >= expirationTime) {
      localStorage.clear();
      history.push('/login');
    }
})

