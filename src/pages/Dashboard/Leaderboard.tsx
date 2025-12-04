import { useLocation } from "react-router-dom";
import { CaffeineLog } from "../../components/CaffeineLog";

type Room = {
    id: string;
    name: string;
    join_code: string;
};

export const Leaderboard = () => {
    const location = useLocation();
    const { room } = location.state as { room: Room };
    return (
        <div>
            <CaffeineLog room={room} />
        </div>
    )
}