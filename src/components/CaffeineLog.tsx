import { supabase } from "../lib/supabaseClient";

type Room = {
    id: string;
    name: string;
    join_code: string;
};

export const CaffeineLog = ({ room }: { room: Room }) => {
    
    return (
        <div>
            
        </div>
    )
}