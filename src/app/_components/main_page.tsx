import React from 'react';
import Button from './button';
import Link from 'next/link';
import { getServerAuthSession } from "note/server/auth";

export default async function Homepage() {
    const session = await getServerAuthSession();
    return (
        <>
        
        <div className="bg-black text-white min-h-screen flex flex-col items-center pt-40 relative">
            {/* Nebula Background Image */}
            <div
                className="absolute flex justify-center items-center pointer-events-none"
            >
                <img
                    src="/nebula-image.png"  
                    alt="Nebula"
                    className="w-auto h-auto max-w-none max-h-full opacity-40"
                    style={{ objectFit: 'contain' }}
                />
            </div>

            {/* Text Content Overlaid */}
            <div className="relative flex flex-col justify-center items-center text-center mt-40 h-full">
                <div className="text-4xl md:text-5xl font-bold">Welcome to</div>
                <div className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700">
                    Nebula Finance
                </div>
                <div className="text-xl md:text-2xl text-white mt-4 mb-32">
                    Your financial universe, simplified.
                </div>
            </div>
            <div className="mb-20">
                <Link
                    href={session ? '/api/auth/signout' : '/api/auth/signin'}
                    >
                    <h1 className="bg-green-600 hover:bg-green-800 text-white font-bold px-4 py-2 rounded transition duration-300">
                        {session ? 'Sign out' : 'Sign in'}
                    </h1>
                </Link>
            </div>
            

            <div className="lg:w-1/4">
                <iframe className='w-full h-64 lg:h-80' src="https://www.youtube.com/embed/fTTGALaRZoc?si=BHPiQev0_hJXdyup" title="Demo Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>

        </div>

        
        </>
    );
}