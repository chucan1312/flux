import { supabase } from "../../lib/supabaseClient"
import { useState } from "react"

export const FocusRoom = () => {
    const [focusRoomId, setFocusRoomId] = useState("")
    const [loading, setLoading] = useState(false)

    const handleJoin = async (focusRoomId:string) => {
        setLoading(true)
        const {error} = await supabase.rpc("join_focus_room_exclusive", {
            p_focus_room_id: focusRoomId,
        })
        setLoading(false)
        if (error) {
            alert (error)
        }
    } 

    const handleLeave = async (focusRoomId:string) => {
        setLoading(true)
        const {error} = await supabase.rpc("leave_focus_room", {
            p_focus_room_id: focusRoomId,
        })
        setLoading(false)
        if (error) {
            alert (error)
        }
    }
    return (
        <div>
            <h1>FocusRoom</h1>
        </div>
    )
}