import { useState } from "react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

type Url = {
    name: string;
    url: string;
}
const urlList: Url[] = [
    {
        name: "Minecraft 1",
        url: "https://i.pinimg.com/originals/ec/d6/72/ecd67255b08380eb534d3f8ee397bc85.gif"
    },
    {
        name: "Minecraft 2",
        url: "https://i.pinimg.com/originals/e4/88/3a/e4883a5aeb51b2119bd17fe00889c866.gif"
    },
    {
        name: "Hanoi",
        url: "https://i.pinimg.com/1200x/2c/3e/bc/2c3ebc61e4e8eab791465588d057b879.jpg"
    },
    {
        name: "Anime street",
        url: "https://wallpapers.com/images/hd/blue-anime-tokyo-street-aesthetic-9djij4r5o6idwma0.jpg"
    },
    {
        name: "Lofi",
        url: "https://i.pinimg.com/1200x/a2/ef/a5/a2efa5f5ade0d65c0154a87b8ee463eb.jpg"
    },
    {
        name: "Butterfly",
        url: "https://i.pinimg.com/1200x/10/62/b6/1062b66221c2153e3791142b05246309.jpg"
    },
    {
        name: "Cherry",
        url: "https://i.pinimg.com/736x/a8/4b/38/a84b38bfc520a3b549a6817904ee10d4.jpg"
    },
    {
        name: "Iridescent liquid",
        url: "https://i.pinimg.com/1200x/4d/6f/87/4d6f87d27a79bfdfe7252db974a35c64.jpg"
    }
]

type Prop = {
    setUrl: React.Dispatch<React.SetStateAction<string>>;
}
export const BackgroundDisplay = ({ setUrl }: Prop) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="absolute right-0 z-100 top-0 h-[calc(100dvh-5rem)] overflow-y-auto">
            <div className="flex flex-row items-start gap-0 align-left">


                <button
                    onClick={() => setOpen(!open)}
                    className="relative mt-10 bg-primary text-primary-foreground px-3 py-6 rounded-l-lg h-fixed border-2 border-r-0 border-foreground/15"
                >
                    {open ? <RxDoubleArrowRight /> : <RxDoubleArrowLeft />}
                </button>

                {open && (
                    <div className="flex flex-col mt-3 bg-card/40 border-2 border-secondary backdrop-blur-xs p-4">
                        <div className="relative inline-flex justify-between gap-3 mb-3">
                            <p className="font-semibold text-xl">SPACES</p>
                            <button
                                onClick={() => setUrl("")}
                                className="bg-background px-3 rounded-full flex justify-end border-2 border-secondary">
                                Remove background
                            </button>
                        </div>
                        {urlList.map(img => (

                            <button key={img.name} onClick={() => setUrl(`${img.url}`)}>
                                <img src={img.url}
                                    className="object-cover object-center w-[15rem] lg:w-[19rem] h-[7rem] lg:h-[9rem]" />
                                <div className="mb-2">
                                    {img.name}
                                </div>
                            </button>

                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}