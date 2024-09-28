import React from 'react';
import Link from 'next/link';
import { getServerAuthSession } from "note/server/auth";

export default async function Navbar(){
  const session = await getServerAuthSession();
  return (
    <>
    <nav className="bg-black w-full flex justify-between items-center px-8 py-4 fixed top-0 left-0 right-0 shadow-lg z-50">
      <Link href={session ? '/dashboard' : '/'}>
      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700" >
        Nebula Finance
      </div>

      </Link>
      <div className="flex items-center space-x-2">
        <Link href="/dashboard">
          <h1 className="hover:bg-gray-800 hover:font-bold text-white font-bold px-4 py-2 rounded transition duration-300">Dashboard</h1>
        </Link>
        <Link href="/gemini">
          <h1 className="hover:bg-gray-800 text-white font-bold px-4 py-2 rounded transition duration-300">AIFinance</h1>
        </Link>
        <Link
          href={session ? '/api/auth/signout' : '/api/auth/signin'}
        >
          <h1 className="bg-green-700 hover:bg-green-800 text-white font-bold px-4 py-2 rounded transition duration-300">
            {session ? 'Sign out' : 'Sign in'}
          </h1>
        </Link>
      </div>
    </nav>
    </>
  )
}