'use client'

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {router} from "next/client";
import {handleLogin, handleSignUp} from "@/app/auth_handler";

const GlowingCard: React.FC<{ children: React.ReactNode, className: string }> = ({children, className = ''}) => (
    <div className={`relative p-8 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg ${className}`}>
        <div className="absolute inset-0 z-0 opacity-50">
            <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-500 to-indigo-900 rounded-3xl animate-pulse "/>
        </div>
        <div className="relative z-10">
            {children}
        </div>
    </div>
);

const Index = () => {
    const [view, setView] = useState('main'); // 'main', 'login', 'signup'

    const handleBack = () => {
        setView('main');
    };

    // SVG for the back arrow
    const BackArrowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
    );

    const LoginView = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const router = useRouter();

        return <GlowingCard
            className="w-full max-w-md bg-white/10 text-white animate-slide-in-from-right transition-transform duration-500 ease-in-out">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold tracking-wide">Log In</h2>
                <button
                    onClick={handleBack}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                    <BackArrowIcon/>
                </button>
            </div>
            <form onSubmit={(e => {
                e.preventDefault()
            })}>
                <div className="mb-4">
                    <label className="block text-white/80 text-sm font-medium mb-1" htmlFor="username">
                        Username
                    </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        id="username"
                        className="w-full px-4 py-2 bg-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/50"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white/80 text-sm font-medium mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 bg-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/50"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
                    onClick={() => {
                        handleLogin(username, password).then(() => {
                            router.push("/home")
                        }).catch((e) => {
                            console.log(e);
                            console.log("UNAUTHORIZED");
                        });
                    }}
                >
                    Log In
                </button>
            </form>
        </GlowingCard>
    }

    const SignupView = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const router = useRouter();

        return <GlowingCard
            className="w-full max-w-md bg-white/10 text-white animate-slide-in-from-right transition-transform duration-500 ease-in-out">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold tracking-wide">Sign Up</h2>
                <button
                    onClick={handleBack}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                    <BackArrowIcon/>
                </button>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <div className="mb-4">
                    <label className="block text-white/80 text-sm font-medium mb-1" htmlFor="new-username">
                        Username
                    </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        id="new-username"
                        className="w-full px-4 py-2 bg-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/50"
                        placeholder="Create a username"
                    />
                </div>
                {/*<div className="mb-4">*/}
                {/*    <label className="block text-white/80 text-sm font-medium mb-1" htmlFor="new-email">*/}
                {/*        Email*/}
                {/*    </label>*/}
                {/*    <input*/}
                {/*        type="email"*/}
                {/*        id="new-email"*/}
                {/*        className="w-full px-4 py-2 bg-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/50"*/}
                {/*        placeholder="Enter your email"*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="mb-6">
                    <label className="block text-white/80 text-sm font-medium mb-1" htmlFor="new-password">
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="new-password"
                        className="w-full px-4 py-2 bg-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/50"
                        placeholder="Create a password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
                    onClick={() => {
                        handleSignUp(username, password).then(() => {
                            router.push("/home")
                        }).catch((e) => {
                            console.log(e)
                        })
                    }}
                >
                    Sign Up
                </button>
            </form>
        </GlowingCard>
    }

    const MainView = () => (
        <GlowingCard
            className="h-full w-full max-w-md bg-white/10 text-white animate-slide-in-from-right transition-transform duration-500 ease-in-out">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 tracking-tighter text-center">
                    DormDoc.ai
                </h1>
                <p className="text-lg text-center font-light text-white/80 mb-10">
                    Your Personal Health Assistant for College Life
                </p>
                <div className="w-full space-y-4">
                    <button
                        onClick={() => setView('login')}
                        className="w-full py-3 bg-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => setView('signup')}
                        className="w-full py-3 bg-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </GlowingCard>
    );

    return (
        <div className="min-h-screen bg-white text-white font-sans flex items-center justify-center p-4 relative">
            <div
                className="absolute inset-0 z-0 bg-gradient-to-br"></div>

            {view === 'main' && (
                <div className="transition-transform duration-500 ease-in-out">
                    <MainView/>
                </div>
            )}

            {view !== 'main' && (
                <div className="transition-transform duration-500 ease-in-out">
                    {view === 'login' ? <LoginView/> : <SignupView/>}
                </div>
            )}
        </div>
    );
};

export default Index;
