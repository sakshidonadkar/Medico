import { createContext, useContext, useEffect, useReducer } from "react";

// Initialize state with localStorage values
const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  role: localStorage.getItem('role') || null,
  token: localStorage.getItem('token') || null,
};

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,  // Correct assignment
        role: action.payload.role,  // Correct assignment
        token: action.payload.token, // Correct assignment
      };

    case "LOGOUT":
      // Clear localStorage when logging out
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      return {
        user: null,
        role: null,
        token: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Update localStorage whenever the state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }

    if (state.token) {
      localStorage.setItem('token', state.token);
    } else {
      localStorage.removeItem('token');
    }

    if (state.role) {
      localStorage.setItem('role', state.role);
    } else {
      localStorage.removeItem('role');
    }
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

// Example usage in a login function
export const useAuth = () => useContext(authContext);

// Example dispatch for login success
const login = (userData, roleData, tokenData) => {
  const { dispatch } = useAuth();

  dispatch({
    type: "LOGIN_SUCCESS",
    payload: {
      user: userData,
      role: roleData,
      token: tokenData,
    },
  });
};

// Example dispatch for logout
const logout = () => {
  const { dispatch } = useAuth();

  dispatch({
    type: "LOGOUT",
  });
};
