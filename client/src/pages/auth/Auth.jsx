import React from "react";
import { auth } from "../../config/firebase";
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const Auth = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();
            console.log("Google login successful, got ID token");
            await authLogin(idToken);
        } catch (err) {
            console.error("Google auth error:", err);
            if (err.code === 'auth/popup-closed-by-user') {
                toast.error("Sign-in was cancelled");
            } else if (err.code === 'auth/popup-blocked') {
                toast.error("Popup was blocked. Please allow popups and try again.");
            } else {
                toast.error("Google authentication failed. Please try again.");
            }
        }
    };

    const loginWithGithub = async () => {
        try {
            const provider = new GithubAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();
            console.log("GitHub login successful, got ID token");
            await authLogin(idToken);
        } catch (err) {
            console.error("GitHub auth error:", err);
            if (err.code === 'auth/popup-closed-by-user') {
                toast.error("Sign-in was cancelled");
            } else if (err.code === 'auth/popup-blocked') {
                toast.error("Popup was blocked. Please allow popups and try again.");
            } else {
                toast.error("GitHub authentication failed. Please try again.");
            }
        }
    };

    async function authLogin(idToken) {
        try {
            console.log("Sending Firebase token to backend...");
            const res = await api.post(
                '/auth/firebase',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                }
            );

            console.log("Backend response:", res.data);

            if (res.status === 200 && res.data) {
                login(res.data);
                toast.success("Authentication successful!");
                navigate("/");
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.error("Auth error:", error);
            console.error("Error response:", error.response?.data);
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Authentication failed";
            toast.error(errorMessage);
        }
    }


    return (
        <div className="flex gap-3 text-[11px]">
            <button
                onClick={loginWithGoogle}
                className="w-1/2 flex items-center justify-center gap-2.5 cursor-pointer bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 text-white font-bold py-2.5 px-4 rounded-xl border border-white/10"
            >
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 533.5 544.3"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M533.5 278.4c0-17.4-1.5-34.1-4.4-50.3H272v95.1h146.9c-6.4 34.4-25.6 63.6-54.6 83.1v68h88c51.4-47.3 81.2-117.1 81.2-195.9z"
                        fill="#4285F4"
                    />
                    <path
                        d="M272 544.3c73.7 0 135.6-24.5 180.8-66.5l-88-68c-24.5 16.4-55.8 26-92.8 26-71 0-131.1-47.9-152.7-112.1H29v70.4c45.3 89.3 137.6 150.2 243 150.2z"
                        fill="#34A853"
                    />
                    <path
                        d="M119.3 323.7c-10.8-32.3-10.8-67.1 0-99.4V154h-90.4C4.1 191.6-8.7 233.2 0 274.3c8.7 41.1 29.8 78.3 58.9 105.5l90.4-56.1z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M272 107.7c39.9 0 75.8 13.7 104.2 40.7l78-78C415.6 26.3 353.7 0 272 0 166.6 0 74.3 60.9 29 150.2l90.4 69.4c21.6-64.2 81.7-111.9 152.6-111.9z"
                        fill="#EA4335"
                    />
                </svg>
                Google
            </button>

            <button
                onClick={loginWithGithub}
                className="w-1/2 flex items-center justify-center cursor-pointer gap-2.5 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 text-white font-bold py-2.5 px-4 rounded-xl border border-white/10"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.3c-3.2.7-3.9-1.5-3.9-1.5-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 1.7-.9 2.3-1.3.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.9.1 3.2.8.9 1.2 2 1.2 3.2 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2v3c0 .3.2.7.8.6a10.6 10.6 0 0 0 7.9-10.8C23.5 5.65 18.35.5 12 .5z" />
                </svg>
                GitHub
            </button>
        </div>
    );
};

export default Auth;
