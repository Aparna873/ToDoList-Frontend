import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { GlobalContext } from "./GlobalContext";

const useAxiosInterceptor = () => {
  const { baseUrl } = useContext(GlobalContext);
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

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log(
            "401 Unauthorized: Removing token and redirecting to login..."
          );
          removeCookie("auth_token", { path: "/" });
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, removeCookie, baseUrl]);

  return axios;
};

export default useAxiosInterceptor;
