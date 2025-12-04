import { IoIosArrowForward } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import logo from "../assets/logo.png";

import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div className="flex flex-col h-screen">
            <header className="flex justify-between p-2 shadow-md shadow-secondary px-[5rem] md:px-[8rem] lg:px-[12rem] items-center">
                <div className="flex items-center gap-2">
                    <img src={logo} className="size-10"></img>
                    <p className="font-bold text-lg">Flux</p>
                </div>
                <div className="flex gap-12 lg:gap-14 items-center">
                    <p>Home</p>
                    <p>What's new?</p>
                    <p>About</p>
                </div>
                <div className="flex gap-9 items-center">
                    <Link to="/login">Login</Link>
                    <Link to="/signup" className="bg-primary rounded-full p-1 px-3 text-primary-foreground">Sign up</Link>
                </div>
            </header>
            <div className="flex flex-col overflow-x-hidden justify-center items-center h-screen gap-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold">
                    The All-in-One <span className="text-primary">Study Together</span> App
                </h1>
                <div className="flex flex-col justify-left text-md gap-1">
                    <p className="flex items-center gap-2">
                        <IoCheckmarkCircleOutline className="text-primary" /> Solo and group focus rooms
                    </p>
                    <p className="flex items-center gap-2">
                        <IoCheckmarkCircleOutline className="text-primary" /> Multiplayer flashcards
                    </p>
                    <p className="flex items-center gap-2">
                        <IoCheckmarkCircleOutline className="text-primary" /> Collaborative documents sharing
                    </p>
                    <p className="flex items-center gap-2">
                        <IoCheckmarkCircleOutline className="text-primary" /> Study sessions insights
                    </p>
                    <p className="flex items-center gap-2">
                        <IoCheckmarkCircleOutline className="text-primary" /> Free to use
                    </p>
                </div>
                <div className="bg-primary text-primary-foreground rounded-3xl px-2">
                    <Link to="/signup" className="relative inline-flex items-center m-2">
                        Get started <IoIosArrowForward className="relative ml-2" />
                    </Link>
                </div>
            </ div>
        </div>
    )
}