import { getUserInfo } from "@/service/apicalls";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";


const Header: React.FC = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<{
    email: string;
    first_name: string;
    last_name: string;
    created_at: Date;
  }>();

  const onLogout = () => {
    localStorage.clear();
    router.push("login");
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await getUserInfo();
      if (data) {
        setUserInfo(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">SAEP</h1>
        <p className="ml-4">Welcome, {userInfo?.first_name}</p>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-400"
        onClick={onLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
