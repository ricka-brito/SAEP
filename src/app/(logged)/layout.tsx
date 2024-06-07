"use client";
import { getUserInfo } from "@/service/apicalls";
import UserInterceptorProvider from "@/service/network/UserInterceptorProvider";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactElement }) {
  const router = useRouter();
  const [valid, setValid] = useState(false);

  const fetchData = async () => {
      try {
        const data = await getUserInfo();
        if (data) {
          setValid(true)
        }
      }
      catch {
        router.push('login')
      }
       
    
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    if (token) {
      fetchData();
      
    }
  }, []);

  if (valid) {
    return (
      <>
        {children}
      </>
    );
  }
}
