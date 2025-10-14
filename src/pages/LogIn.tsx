import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert(error.message);
        } else {
            navigate("/rooms");
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-5 mb-30">
                <h1 className="text-4xl md:text-5xl text-center font-medium">
                    User Login
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-5">
                    <input
                        type="text" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}
                        className="border-secondary border-b-2 w-[20rem] focus:outline-none focus:placeholder-transparent"
                        required />
                    <input
                        type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                        className="border-secondary border-b-2 w-[20rem] focus:outline-none focus:placeholder-transparent"
                        required minLength={8}/>
                    <button
                        type="submit"
                        className="bg-primary text-primary-foreground rounded-3xl px-2 mx-auto px-4 py-1">
                        Login
                    </button>
                </form>
                <p className="text-center">
                    Don't have an account? Sign up <Link to="/signup" className="border-b-2 hover:text-primary">here</Link>
                </p>
            </div>
        </div>
    )
}