import { Outlet, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoDocumentOutline, IoChatboxEllipsesOutline, IoStatsChartOutline, IoReturnUpBackOutline } from "react-icons/io5";
import { TbCards } from "react-icons/tb";
import { supabase } from "../../lib/supabaseClient";
import logo from "./logo.png";
import { FocusRoomBar } from "../../components/FocusRoomBar";

type Room = {
    id: string;
    name: string;
    join_code: string;
};


export const Dashboard = () => {
    const { join_code } = useParams<{ join_code: string }>();
    const [room, setRoom] = useState<Room | null>(null);
    const name = room?.name;
    
    useEffect(() => {
        (async () => {
            const { data: roomData, error: roomError } = await supabase
                .from("rooms")
                .select("id, name, join_code")
                .eq("join_code", join_code)
                .single();

            if (!roomError && roomData) setRoom(roomData as any as Room);
            else console.error(roomError);
        })();
    }, [join_code]);


    return (
        <div className="flex min-h-screen overflow-hidden">
            {/* Side Bar */}
            <aside className="border-secondary border-r-2">
                <div className="flex justify-left items-center ml-2 lg:ml-4">
                    <img src={logo} className="size-14 m-2" />
                    <h1 className="text-2xl font-bold italic">Flux</h1>
                </div>
                <nav className="flex flex-col h-screen w-[14rem] lg:w-[16rem] pt-4 px-2 space-y-1">
                    <Link to="documents" className="relative inline-flex items-center mx-2 bg-transparent text-foreground rounded-xl p-2 gap-3 hover:bg-secondary focus:bg-secondary focus:font-bold">
                        <IoDocumentOutline /> Documents
                    </Link>
                    <FocusRoomBar room_id={room?.id ?? ""}/>
                    <Link to="flashcards" className="relative inline-flex items-center mx-2 bg-transparent text-foreground rounded-xl p-2 gap-3 hover:bg-secondary focus:bg-secondary focus:font-bold">
                        <TbCards />  Flashcards
                    </Link>
                    <Link to="leaderboard" className="relative inline-flex items-center mx-2 bg-transparent text-foreground rounded-xl p-2 gap-3 hover:bg-secondary focus:bg-secondary focus:font-bold">
                        <IoStatsChartOutline /> Leaderboard
                    </Link>
                    <Link to="discussion" className="relative inline-flex items-center mx-2 bg-transparent text-foreground rounded-xl p-2 gap-3 hover:bg-secondary focus:bg-secondary focus:font-bold">
                        <IoChatboxEllipsesOutline /> Discussion
                    </Link>
                    <Link to="/rooms" className="relative inline-flex items-center mx-2 bg-transparent text-foreground rounded-xl p-2 gap-3 hover:bg-secondary">
                        <IoReturnUpBackOutline /> All Rooms
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 bg-gray-50">
                <header className="bg-background flex justify-between items-end px-4 lg:px-7 py-3 border-b-2 border-secondary">
                    <h1 className="font-bold text-3xl lg:text-4xl">{name}</h1>
                    <p className="text-xl lg:text-2xl">Join code: {join_code}</p>
                </header>
                <Outlet /> {/* This is where each nested route renders */}
            </main>
        </div>
    )
}