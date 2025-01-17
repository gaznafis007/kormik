import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://kormik-server.vercel.app',
    withCredentials: true,
})

const useAxios = () => {
    return axiosSecure;
};

export default useAxios;