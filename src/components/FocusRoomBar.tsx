import { useEffect, useRef, useState } from "react"
import { IoFlameOutline, IoToggle } from "react-icons/io5"
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom";

type FocusRoom = {
    id: string
    name: string
    room_id: string
}

type Props = {
    room_id: string
}
export const FocusRoomBar = ({ room_id }: Props) => {
    const [focusRoom, setFocusRoom] = useState<FocusRoom[]>([]);
    const [focusPopUp, setFocusPopUp] = useState<{ x: number; y: number } | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null)
    const [newName, setNewName] = useState("");
    const [newPrivate, setNewPrivate] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const { data: focusData, error: focusError } = await supabase
                .from("focus_rooms")
                .select("id, name, room_id")
                .eq("room_id", room_id)
                .order("created_at", { ascending: true })

            if (!focusError && focusData) setFocusRoom(focusData || []);

        })();
    }, [room_id]);

    const handlePopUp = (e: React.MouseEvent) => {
        setFocusPopUp({ x: e.clientX, y: e.clientY });
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // If popup exists AND click target is NOT inside the popup
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setFocusPopUp(null) // close it
                setNewName("");
            }
        }

        if (focusPopUp) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        // Cleanup when popup closes
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            setNewPrivate(false);
        }
    }, [focusPopUp])

    const handleAddFocus = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            console.error("User not authenticated:", userError)
            return
        }

        if (newName.length === 0) {
            alert("This field cannot be empty")
            return;
        }
        const { data: addData, error: addError } = await supabase
            .from("focus_rooms")
            .insert({ room_id: room_id, name: newName, is_private: newPrivate, created_by: user.id })
            .select()

        if (addError) {
            console.error(addError.message)
            alert("Error creating focus room: " + addError.message)
        } else {
            console.log("Created:", addData)
            setFocusRoom((prev) => [...prev, ...addData])
            setFocusPopUp(null)
            setNewName("")
            setNewPrivate(false)
            navigate("../pages/Dashboard/FocusRooms")
        }
    }

    return (
        <div className="relative items-center bg-transparent text-foreground rounded-xl hover:bg-secondary focus:bg-secondary focus:font-bold">
            <div onContextMenu={(e) => {
                e.preventDefault()
                handlePopUp(e)
            }} className="relative inline-flex items-center gap-3 mx-2 p-2">
                <IoFlameOutline /> Focus Rooms
            </div>
            {focusRoom.map((fr) => (
                <div key={fr.id}>{fr.name}</div>
            ))}
            {focusPopUp && (
                <div ref={popupRef} className="z-10 text-md fixed bg-card rounded-xl border-secondary border-2 py-[1rem] px-2"
                    style={{
                        top: focusPopUp.y,
                        left: focusPopUp.x,
                    }}>
                    Create a new focus room
                    <div className="pb-[1rem]"> ___________________________</div>
                    <form onSubmit={handleAddFocus} className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <div>Name</div>
                            <input type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-[7rem] border-secondary border-2 rounded-md focus:border-foreground focus:border-2"></input>
                        </div>
                        <div className="flex justify-left gap-2 items-end">
                            <div>Private</div>
                            <div className="mr-[1rem] text-2xl" onClick={((e) => {
                                setNewPrivate(!newPrivate)
                            })} >
                                {newPrivate ? <BsToggle2On /> : <BsToggle2Off />}
                            </div>
                        </div>
                        <button type="submit"
                            className="flex justify-center">
                            <div className=" bg-primary text-primary-foreground rounded-full px-2 w-fit"> Create</div>
                        </button>
                    </form>
                </div>
            )}
        </div >
    )
}