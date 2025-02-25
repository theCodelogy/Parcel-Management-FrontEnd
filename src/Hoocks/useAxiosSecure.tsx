import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL:'https://parcel-management-back-end.vercel.app/api/v1',
    withCredentials:true
})

const useAxiosSecure = () => {
    useEffect(()=>{
        axiosSecure.interceptors.response.use(res=>{
            return res
        },error=>{
            console.log("axios error",error.response)
        })
    },[])

    return axiosSecure
};

export default useAxiosSecure;