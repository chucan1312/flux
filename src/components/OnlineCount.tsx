import { useRoomPresence } from "../hooks/useRoomPresence";
import { HiOutlineStatusOnline } from "react-icons/hi";

export const OnlineCount = ({ roomId }: { roomId: string }) => {
    const onlineUsers = useRoomPresence(roomId);

    return (
        <div>
            <p className="flex flex-row justify-end h-autotext-md text-primary gap-1 mr-2 mb-1">
                <HiOutlineStatusOnline className="mt-1 size-4.5"/> {onlineUsers.length} online
            </p>
        </div>
    );
};
