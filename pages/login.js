"use client";
import  '@../app/globals.css'
import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSignUp, setIsSignUp] = useState(false); 
    const router = useRouter();

    useEffect(() => {
        if (auth.currentUser) {
            router.push("/");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-black">
            <section className="w-full max-w-md bg-white p-8 flex flex-col items-center justify-center rounded-lg shadow-lg">
                <h2 className="text-black text-2xl font-bold text-center">
                    {isSignUp ? "Create an Account" : "Welcome Back"}
                </h2>
                <p className="text-black text-sm text-center mt-1">
                    {isSignUp ? "Sign up to get started" : "Sign in to your account"}
                </p>

                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4 w-full mt-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-black"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none text-black"
                        required
                    />
                    <button
                        type="submit"
                        className="block w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-600">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-blue-500 hover:underline ml-1"
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </p>

                <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none w-full"
                >
                    <FcGoogle className="mr-2 text-xl" /> Sign in with Google
                </button>
            </section>
        </main>
    );
}
