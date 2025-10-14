import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export const CreateRoom = () => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (name: string) => {
        if (!name.trim()) {
            alert("Room name cannot be empty.");
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("Please sign in first.");
            return;
        }

        const { data: createdRoom, error: createError } = await supabase
            .from("rooms")
            .insert({ name, description: desc })
            .select()
            .single();

        if (createError) {
            alert(createError);
            return;
        }

        const { error: memberError } = await supabase
            .from("room_members")
            .insert({ room_id: createdRoom.id, user_id: user.id });

        if (memberError) {
            alert(memberError.message);
            return;
        }

        navigate(`/dashboard/${createdRoom.id}`);

    }
    return (
        <div className="flex flex-col justify-center h-screen">
            <h1 className="text-xl md:text-2xl ml-[2rem] font-medium">
                Create your room
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(name);
                }}>
                <input type="text" placeholder="Room Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="text" placeholder="Description (optional)" value={desc} onChange={e => setDesc(e.target.value)} />
                <button
                    type="submit"
                    className="bg-primary text-primary-foreground rounded-3xl mr-1 px-4 py-1 hover:bg-primary-darker">
                    Create Room
                </button>
                <Link to="/joinroom" className="bg-transparent text-primary border-secondary border-2 rounded-3xl ml-1 px-4 py-1 hover:bg-secondary">
                    Join an existing Room
                </Link>
            </form>
        </div>
    )
}