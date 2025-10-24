import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook"

interface TimerProps {
    expiryTimestamp: Date;
}

const PomodoroTimer: React.FC<TimerProps> = ({ expiryTimestamp }) => {
    const [state, setState] = useState<"Pomodoro" | "Short Break" | "Long Break">("Pomodoro");
    const [started, setStarted] = useState(false);

    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn('Timer expired'),
        interval: 20, // update every 20ms
        autoStart: false,
    });

    return (
        <div style={{ textAlign: 'center' }} className="bg-card/40 backdrop-blur-sm w-fit mx-auto p-[1rem] rounded-xl">
            <input className="flex inline-flex text-center text-2xl lg:text-3xl mb-3 font-semibold focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="Add focus title">
            </input>
            <div className="flex justify-center gap-4">

                <h2 className={`rounded-full px-2 py-1 border-secondary border-2 font-semibold
                ${(state == "Pomodoro") ? "bg-background" : "bg-transparent"}`}
                    onClick={((e) => {
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + 1500); // restart to 25 minutes
                        restart(time, false);
                        setState("Pomodoro");
                    })}>Pomodoro</h2>
                <h2 className={`rounded-full px-2 py-1 border-secondary border-2 font-semibold
                ${(state == "Short Break") ? "bg-background" : "bg-transparent"}`}
                    onClick={((e) => {
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + 300); // restart to 5 minutes
                        restart(time, false);
                        setState("Short Break");
                    })}>Short Break</h2>
                <h2 className={`rounded-full px-2 py-1 border-secondary border-2 font-semibold
                ${(state == "Long Break") ? "bg-background" : "bg-transparent"}`}
                    onClick={((e) => {
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + 900); // restart to 5 minutes
                        restart(time, false);
                        setState("Long Break");
                    })}>
                    Long Break</h2>
            </div>
            <div style={{ fontSize: '60px' }} className="font-semibold">
                <span>{minutes.toString().padStart(2, '0')}</span>:
                <span>{seconds.toString().padStart(2, '0')}</span>
            </div>
            <div className="flex justify-center mt-4 gap-2">
                <button
                className="bg-primary text-xl text-primary-foreground rounded-full px-4 py-1 w-[6rem] font-semibold border-foreground/15 border-2" 
                onClick={(() => {
                    if (started) {
                        pause();
                    } else {
                        start();
                    }
                    setStarted(!started);
                })}>
                    {started ? "Pause" : "Start"}
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;