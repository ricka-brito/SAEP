import { instance as axI } from "./instance";
import { useEffect } from "react";

const UserInterceptorProvider = () => {

    useEffect(() => {
        console.log("AAAAAAAAAAAAAAAA")
        const token = localStorage.getItem("token");
        if (!token) return;
        const interceptor = axI.interceptors.request.use(async (config) => {
        config.headers["Authorization"] = "Bearer " + token;
        return config;
        });
        return () => axI.interceptors.request.eject(interceptor);
    });

    return null;
};

export default UserInterceptorProvider;