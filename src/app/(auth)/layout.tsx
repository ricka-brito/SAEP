"use client"
import { getUserInfo } from "@/service/apicalls";
import UserInterceptorProvider from "@/service/network/UserInterceptorProvider";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactElement }) {
  const router = useRouter();

  const [valid, setValid] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getUserInfo()
      if (data){
        router.push('/home')
    }
    } catch {
        setValid(true)
    }
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
        fetchData()
    }
    setValid(true)

  }, []);
    
  if (valid){
      return( <>{children}</>);
  }
}
