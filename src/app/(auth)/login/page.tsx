"use client"

import { getToken } from "@/service/apicalls";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import SweetAlert2 from "react-sweetalert2";

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>, user: string, password: string) => {
    e.preventDefault()
    try {
      const token = await getToken(user, password);
      if (token){ 
        localStorage.setItem("token", token);
        setTimeout(() => router.push('home'), 1000)
        
      }
    }
    catch {
      setPassword('')
      setShow(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Login
        </h1>
        <form onSubmit={(e) => onSubmit(e, email, password)} className="text-black">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              required
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
            Login
          </button>
          <div className="text-center mt-4">
            <Link href="/register">
              <p className="text-blue-500">Don't have an account? Register</p>
            </Link>
          </div>
        </form>
      </div>
      <SweetAlert2 show={show} title={"Wrong credetials"} text="Incorrect password or email, please try again" icon="error"/>
    </div>
  );
}
