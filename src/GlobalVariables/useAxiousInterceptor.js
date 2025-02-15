import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const [removeCookie] = useCookies(["auth_token"]);

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3000", 
    });

    axiosInstance.interceptors.response.use(
      (response) => response, 
      (error) => {
        if (error.response && error.response.status === 401) {
          removeCookie("auth_token");
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject();
    };
  }, [navigate, removeCookie]);

  return axios;
};

export default useAxiosInterceptor;
