import { useState } from "react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

type Url = {
    name: string;
    url: string;
}
const urlList: Url[] = [
    {
        name: "minecraft",
        url: "https://64.media.tumblr.com/1a0ed153039de2e909af8ff2fce6175d/88acb0a5670fb629-2f/s1280x1920/941efd0cb232f3f12711600100eb9e90b9fba419.gifv"
    }
]

type Prop = {
    setUrl: React.Dispatch<React.SetStateAction<string>>;
}
export const BackgroundDisplay = ({ setUrl }: Prop) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="absolute right-0 z-100 top-0">
            <div className="flex flex-row items-start gap-0 align-left">


                <button
                    onClick={() => setOpen(!open)}
                    className="relative mt-10 bg-primary text-primary-foreground px-3 py-2 rounded-l-lg h-fixed"
                >
                    {open ? <RxDoubleArrowRight /> : <RxDoubleArrowLeft />}
                </button>

                {open && (
                    <div className="mt-3 bg-card/40 backdrop-blur-xs border-2 border-secondary h-screen p-4">
                        <p className="text-foreground">Background change</p>
                        {urlList.map(img => (
                            <button key={img.name}
                            onClick={()=> setUrl(`${img.url}`)}>
                                {img.name}</button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}