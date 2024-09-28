import React from 'react';
import Link from 'next/link';
import { getServerAuthSession } from "note/server/auth";





export default async function Navbar(){
  const session = await getServerAuthSession();
  return (
    <>
    <nav className="w-full bg-gray-900 flex justify-between items-center px-8 py-4 fixed top-0 left-0 right-0 shadow-lg z-50">
      <div className="text-2xl font-bold text-green-300">Nebula Finance</div>
      <div className="flex items-center space-x-6">
        <Link href="/gemini">
          <h1 className="bg-gray-700 hover:bg-gray-800 text-white font-bold px-4 py-2 rounded transition duration-300">AI Finance</h1>
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