import React from 'react';
// import Link from 'next/link';
import Button from './button';


export default async function Homepage(){
    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center pt-20">            
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-3/4 mx-auto mt-16 px-8 lg:px-0">
            <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white">Manage Your
                <span className="font-bold bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent"> Finances</span> With us <span className="font-bold bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">Today!</span>
            </h1>
            <p className='text-gray-400 text-lg'>Finances for your life</p>
            <div className="space-x-4">
                <Button message='Get Started' />
                <Button message='How it works' />
            </div>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0">
            <iframe className='w-full h-64 lg:h-80' src="https://www.youtube.com/embed/fTTGALaRZoc?si=BHPiQev0_hJXdyup" title="Demo Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
            </div>
        </div>
    )
}