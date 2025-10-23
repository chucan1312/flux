import { supabase } from "../../lib/supabaseClient"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PomodoroTimer from "../../components/PomodoroTimer"
import { BackgroundDisplay } from "../../components/BackgroundDisplay";

const minecraft = 'https://64.media.tumblr.com/1a0ed153039de2e909af8ff2fce6175d/88acb0a5670fb629-2f/s1280x1920/941efd0cb232f3f12711600100eb9e90b9fba419.gifv';

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

    const time = new Date();
    time.setSeconds(time.getSeconds() + 1500);

    return (
        <div className="flex flex-col justify-center h-[calc(100dvh-4rem)] bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage:
                    `url(${minecraft})`,
            }}>
            <div className="relative z-10 pt-8">
                <PomodoroTimer expiryTimestamp={time} />
                <div className="flex justify-center mt-[calc(100dvh-25rem)]">
                    <button
                        onClick={((e) => {
                            e.preventDefault();
                            handleLeave(focusRoomId);
                        })}
                        className="bg-primary rounded-full px-3 py-1 text-xl text-primary-foreground font-semibold ring-foreground/35 ring-2"
                    >
                        Leave
                    </button>

                </div>
            </div>
            <BackgroundDisplay />
        </div>

    )
}