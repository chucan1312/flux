import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { data, error } = await
            supabase.auth.signUp({
                email, 
                password, 
                options: {
                    emailRedirectTo: `${window.location.origin}/completeprofile`,
                },
            });
        if (error) {
            alert(error.message);
            return;
        } else if (!data.session || !data.user) {
            alert("Check your email to confirm your account.");
            return;
        } else {
            navigate("/completeprofile");
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-5 mb-30">
                <h1 className="text-4xl md:text-5xl font-medium">
                    Create An Account
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-5">
                    <input
                        type="text" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}
                        className="border-secondary border-b-2 w-[20rem] focus:outline-none focus:placeholder-transparent"
                        required />
                    <input
                        type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                        className="border-secondary border-b-2 w-[20rem] focus:outline-none focus:placeholder-transparent"
                        required minLength={8} />
                    <button
                        type="submit"
                        className="bg-primary text-primary-foreground rounded-3xl px-2 mx-auto px-4 py-1">
                        Sign Up
                    </button>
                </form>
                <p className="text-center">
                    Already have an account? Sign in <Link to="/login" className="border-b-2 hover:text-primary">here</Link>
                </p>
            </div>
        </div>
    )
}