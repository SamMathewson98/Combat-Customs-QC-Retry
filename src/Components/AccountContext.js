// AccountContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Define initial state
const initialState = {
  user: null,
  isAuthenticated: false,
};

// Define actions
const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';

// Reducer function
const accountReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Create context
const AccountContext = createContext();

// Create provider component
export const AccountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  // Define the updateUserData function
  const updateUserData = (newUserData) => {
    dispatch({
      type: SET_USER,
      payload: newUserData,
    });
  };

  return (
    <AccountContext.Provider value={{ state, dispatch, updateUserData }}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook to use the context
export const useAccountContext = () => {
  return useContext(AccountContext);
};
