import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CreateUser, LoginUser, verify_sub_admin } from '../AdminApi/AxiosAPIService';


export const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null || '');
  const [token, setToken] = useState(localStorage.getItem('authSubAdminToken') || '');
  const [loading, setLoading] = useState(true);

  // On token change, verify the user
 
  const verifyUser= async (token) => {
    setLoading(true);
    if (!token) return;
    console.log(token)
    const data = await verify_sub_admin(token);
    console.log(data)
    if (data.message === 'User authenticated') {
      setLoading(false);
      setIsAuthenticated(true);
      setEmail(data.data.userDetails.email);
      console.log(data)
    } else {
      setIsAuthenticated(false);
    }
}

  // Register user function
  const register = async (userData) => {
    try {
      const response = await CreateUser( userData);
      localStorage.setItem('authSubAdminToken', response.data.token);
      setToken(response.data.token);
      console.log(response.data);
      setIsAuthenticated(true);
      setUser(response.data.userDetails); // This seems like the right place to set the user
      console.log(response.data.userDetails);
      setEmail(response.data.userDetails.email);
      return response;
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message);
      return null;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await LoginUser(email, password);
      localStorage.setItem('authSubAdminToken', response.data.token);
      setToken(response.data.token);
      console.log(response.data.user);
      setIsAuthenticated(true);
      setUser(response.data.userDetails); // This seems like the right place to set the user
      console.log(response.data.userDetails);
      setEmail(response.data.userDetails.email);
      setLoading(false);
      return response;
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message);
      return null;
    }
  };

  // Verify the user with the current token
 


  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
  
    setLoading(true);
    axios.get('https://api.kingbaji.live/api/v1/verify_sub_admin', {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
      .then((response) => {
        setIsAuthenticated(true);
        setUser(response.data.userDetails); // This seems like the right place to set the user
        console.log(response.data.userDetails);
        setEmail(response.data.userDetails.email);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);
  
  // Logout the user
  const logout = () => {
    localStorage.removeItem('authSubAdminToken');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUser(null);
    setToken('');
  };
  

  // Check if the user has a specific role
  const hasRole = (role) => {


    
    console.log(user?.user_role === role);
    return user?.user_role === role;
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      token, 
      loading, 
      register, 
      email,
      login, 
      logout, 
      verifyUser,
      hasRole ,
      setLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
