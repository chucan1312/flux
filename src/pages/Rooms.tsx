import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { OnlineCount } from "../components/OnlineCount";
import { IoAddOutline, IoKeyOutline, IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";

export const Rooms = () => {
    const [userInfo, setUserInfo] = useState<{ username?: string; full_name?: string } | null>(null);
    const [empty, setEmpty] = useState(true);
    const [rooms, setRooms] = useState<any[]>([]);

    const itemsPerPage = 6;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(rooms.length / itemsPerPage);
    const currentRooms = rooms.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const { data: userData, error: userError } = await supabase
                .from("profiles")
                .select("username, full_name")
                .eq("id", user?.id)
                .single();

            if (userError) alert(userError);
            else setUserInfo(userData);

            const { data: roomData, error: roomError } = await supabase
                .from("room_members")
                .select(`rooms (
                    id,
                    name,
                    description,
                    join_code
                    )
                `)
                .eq("user_id", user?.id)

            if (roomError) alert(roomError);
            else setRooms(roomData?.map((r) => r.rooms || []));

        })();
    }, []);

    useEffect(() => {
        setEmpty(rooms.length === 0);
    }, [rooms]);

    if (!userInfo) return;

    const handlePrevPage = () => ((page > 1) ? setPage(page - 1) : setPage(1))
    const handleNextPage = () => ((page == totalPages) ? setPage(totalPages) : setPage(page + 1))

    const handleNav = (roomId: string) => {
        navigate(`/dashboard/${roomId}`)
    }

    const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await supabase.auth.signOut();
        navigate("/");
    }

    const first_name = userInfo.full_name?.split(" ")[0] ?? "";
    return (
        <div className="flex flex-col min-h-screen">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 ml-10 lg:mt-10 lg:ml-12">
                Welcome back, {first_name}!
            </h1>
            <h2 className="text-lg lg:text-xl text-center mt-[5rem] lg:mt-[4rem]">
                {empty ? "No rooms joined. Select one of the options below:" : "Continue where you left off:"}
            </h2>
            <div className="flex justify-center gap-[4rem] mt-[1rem]">
                <div className="bg-primary text-primary-foreground rounded-3xl px-2 hover:bg-primary-darker">
                    <Link to="/createroom" className="relative inline-flex items-center m-2">
                        Create new Room <IoAddOutline className="relative ml-2" />
                    </Link>
                </div>
                <span className="text-lg"> or </span>
                <div className="bg-primary text-primary-foreground rounded-3xl px-2 hover:bg-primary-darker">
                    <Link to="/joinroom" className="relative inline-flex items-center m-2">
                        Join Room with Code <IoKeyOutline className="relative ml-2" />
                    </Link>
                </div>
            </div>
            {empty ? <div /> : (
                <div className="flex justify-end m-[3rem] mb-[1.5rem] gap-2">
                    <button onClick={handlePrevPage}>
                        <IoArrowBackOutline
                            className="bg-primary size-9 lg:size-10 rounded-full p-2 text-primary-foreground hover:bg-primary-darker"
                        />
                    </button>
                    <button onClick={handleNextPage}>
                        <IoArrowForwardOutline
                            className="bg-primary size-9 lg:size-10 rounded-full p-2 text-primary-foreground hover:bg-primary-darker"
                        />
                    </button>
                </div>
            )
            }
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-7 mx-[2rem]">
                {currentRooms.map((item) => (
                    <div key={item.id}
                        onClick={() => handleNav(item.join_code)}
                        className="bg-card rounded-lg shadow-lg shadow-secondary hover:shadow-primary">
                        <p className="text-2xl lg:text-3xl font-bold mt-1 ml-2">{item.name}</p>
                        {item.description ? (
                            <p className="lg:text-lg ml-2 italic">{item.description}</p>
                        ) : (
                            <br />
                        )}
                        <div className="flex justify-between">
                            <div className="text-primary ml-2">Join code: {item.join_code}</div>
                            <OnlineCount roomId={item.id} />
                        </div>
                    </div>
                ))}
            </div>
            <form onClick={handleSignOut} className="flex items-end justify-end m-[3rem]">
                <button type="submit" className="relative inline-flex justify-center bg-primary text-primary-foreground rounded-full py-2 px-4 gap-2">
                    <PiSignOut className="size-5 mt-1" /> Sign out
                </button>
            </form>
        </div>
    )
}