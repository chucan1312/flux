import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export const CompleteProfile = () => {
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [dob, setDob] = useState("");
    const [dobType, setDobType] = useState<"text" | "date">("text");
    const navigate = useNavigate();

    // 1) If we arrived from the email link, create a temporary session
    useEffect(() => {
        (async () => {
            const { data: s } = await supabase.auth.getSession();
            if (!s.session) {
                await supabase.auth.exchangeCodeForSession(window.location.href);
            }
        })();
    }, []);

    function isValidUsername(u: string) {
        return /^[a-z0-9]+$/.test(u);
    }

    // 2) Save profile, then sign out and go to /login
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidUsername(username)) {
            alert("Username must be lowercase letters and digits only.");
            return;
        }

        // must have a (temporary) session to satisfy RLS
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("Please open this page from the confirmation email or sign in first.");
            return;
        }

        const { error } = await supabase
            .from("profiles")
            .upsert(
                { id: user.id, username, full_name: fullname, date_of_birth: dob },
                { onConflict: "id" }
            );

        if (error?.code === "23505") {
            alert("That username is taken. Try another.");
            return;
        }
        if (error) {
            alert(error.message);
            return;
        }

        // 3) End the temporary session and redirect to login
        await supabase.auth.signOut();
        navigate("/login");
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-5 mb-30">
                <h1 className="text-4xl md:text-5xl text-center font-medium">
                    Complete your Profile
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-5">
                    <input
                        type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}
                        className="border-secondary border-b-2 w-[20rem] focus:outline-none focus:placeholder-transparent"
                        required />
                    <input
                        type="text" placeholder="Full Name" value={fullname} onChange={e => setFullname(e.target.value)}
                        className="border-secondary border-b-2 w-[20rem] focus:outline-none focus:placeholder-transparent"
                        required />
                    <input
                        type={dobType} placeholder="Date of Birth" value={dob} onChange={e => setDob(e.target.value)}
                        onFocus={() => setDobType("date")}     // switch to date picker
                        onBlur={() => { if (!dob) setDobType("text"); }}
                        className="border-secondary border-b-2 w-[20rem] focus:outline-none focus:placeholder-transparent"
                        required />
                    <button
                        type="submit"
                        className="bg-primary text-primary-foreground rounded-3xl px-2 mx-auto px-4 py-1">
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}