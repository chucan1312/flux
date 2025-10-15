import { supabase } from "../../lib/supabaseClient"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const FocusRoom = () => {
    const [focusRoomId, setFocusRoomId] = useState("")
    const navigate = useNavigate();
    const [userId, setUserId] = useState("") // optional for now



    const handleLeave = async (focusRoomId: string) => {

        (async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) {
                console.error("User not authenticated:", userError)
                return
            } else {
                setUserId(user?.id)
            }

            const { data, error } = await supabase
                .from("focus_members")
                .select("focus_room_id, user_id, joined_at, left_at")
                .eq("user_id", user?.id)
                .is("left_at", null)
                .single()

            if (!error && data) setFocusRoomId(data?.focus_room_id);
            else {
                console.error(error)
                return;
            }
            const { error: leaveError } = await supabase.rpc("leave_focus_room", {
                p_focus_room_id: data?.focus_room_id,
            })
            if (leaveError) {
                alert(leaveError)
            } else {
                navigate("..");
            }

        })();

    }
    return (
        <div>
            <h1>FocusRoom</h1>
            <button
                onClick={((e) => {
                    e.preventDefault();
                    handleLeave(focusRoomId);
                })}
                className="bg-primary rounded-full px-2 py-1 text-md text-primary-foreground"
            >
                Leave
            </button>
        </div>
    )
}