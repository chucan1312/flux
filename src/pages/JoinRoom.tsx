import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const JoinRoom = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const submittedCode = code.trim().toUpperCase;

        const { data: room, error } = await supabase
            .from("rooms")
            .select("id, name, join_code")
            .eq("join_code", submittedCode)
            .single();

        if (error || !room) {
            alert("No room found! Please try again.");
            return
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("Please sign in first.");
            return;
        }

        const { error: joinError } = await supabase
            .from("room_members")
            .insert({ room_id: room.id, user_id: user.id });

        if (joinError!.code === "23505") {
            alert("You have already joined this room")
        } else {
            navigate(`/dashboard/${room.id}`);
        }
    }

    return (
        <div className="flex flex-col justify-center text-center h-screen gap-y-2">
            <h1 className="text-xl md:text-2xl font-medium">
                Enter Room Code:
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-5">
                <input
                    type="text"
                    placeholder="Example: AUCHNC"
                    value={code} onChange={e => setCode(e.target.value)}
                    className="text-center border-secondary border-b-2 w-[20rem] focus:outline-none focus:placeholder-transparent">
                </input>
                <div className="relative">
                    <button
                        type="submit"
                        className="bg-primary text-primary-foreground rounded-3xl mr-1 px-4 py-1 hover:bg-primary-darker">
                        Join
                    </button>
                    <Link to="/createroom" className="bg-transparent text-primary border-secondary border-2 rounded-3xl ml-1 px-4 py-1 hover:bg-secondary">
                        Create a new Room
                    </Link>
                </div>
            </form>
        </div>
    )
}