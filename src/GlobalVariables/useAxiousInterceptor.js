import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { GlobalContext } from "../App";


const useAxiosInterceptor = () => {
  const {baseUrl} = useContext(GlobalContext)
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["auth_token"]);

  useEffect(() => {
    axios.defaults.baseURL = baseUrl;
    const requestInterceptor = axios.interceptors.request.use((config) => {
      const token = cookies.auth_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add a response interceptor to handle 401 errors
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          console.log("401 Unauthorized: Removing token and redirecting to login...");
          await removeCookie("auth_token", { path: "/" }); // Remove the cookie
          navigate("/login"); // Redirect to login page
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, removeCookie, cookies.auth_token,baseUrl]);

  return axios;
};

export default useAxiosInterceptor;