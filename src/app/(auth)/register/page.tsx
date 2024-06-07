'use client'

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>, name: string, password: string, email: string) => {
    e.preventDefault()
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Register
        </h1>
        <form onSubmit={(e) => onSubmit(e, name, password, email)} className="text-black">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              placeholder="Confirm your password"
            />
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200">
            Register
          </button>
          <div className="text-center mt-4">
            <Link href="/login">
              <p className="text-blue-500">Already have an account? Login</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
