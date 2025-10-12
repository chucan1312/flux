import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export type PresenceUser = { id: string; username: string };

export function useRoomPresence(roomId: string) {
    const [onlineUsers, setOnlineUsers] = useState<PresenceUser[]>([]);

    useEffect(() => {
        if (!roomId) return;
        const channel = supabase.channel(`room-${roomId}`, {
            config: { presence: { key: roomId } },
        });

        channel
            .on("presence", { event: "sync" }, () => {
                const state = channel.presenceState();
                const users = Object.values(state).flat() as unknown as PresenceUser[];
                setOnlineUsers(users);
            })
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    const { data: { user } } = await supabase.auth.getUser();
                    if (user) {
                        channel.track({
                            id: user.id,
                            username: user.email || "Anonymous",
                        });
                    }
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [roomId]);

    return onlineUsers;
}