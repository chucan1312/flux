import { useState } from "react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

export const BackgroundDisplay = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="absolute right-0 z-100 top-0">
            <div className="flex flex-row items-start gap-0 align-left">


                <button
                    onClick={() => setOpen(!open)}
                    className="relative mt-10 bg-primary text-primary-foreground px-3 py-2 rounded-md h-fixed"
                >
                    {open ? <RxDoubleArrowRight /> : <RxDoubleArrowLeft />}
                </button>

                {open && (
                    <div className="mt-3 bg-gray-50/50 backdrop-blur-xs h-screen rounded-lg p-4">
                        <p className="text-white">Menu content goes here!</p>
                    </div>
                )}
            </div>
        </div>
    );
}