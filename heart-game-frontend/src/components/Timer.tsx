import { useEffect, useState } from "react";

interface Props {
  time: number;
  onTimeOut?: () => void;
  activeTimer: boolean;
}

export default function Timer({ time, onTimeOut, activeTimer }: Props) {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    if (activeTimer) {
      setTimeLeft(time);
    }
  }, [time, activeTimer]);

  useEffect(() => {
    if (!activeTimer) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeOut?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimer, onTimeOut]);

  const progress = time > 0 ? Math.max((timeLeft / time) * 100, 0) : 0;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-[20px] font-bold text-white">Memorize the Hearts</h1>

      <div className="w-full">
        <div className="w-full bg-gray-300/30 rounded-full h-4 md:h-4 shadow-inner overflow-hidden">
          <div
            className="h-full bg-green-500 transition-[width] duration-[1000] ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="text-[13.6px] text-white font-semibold mt-2">
        {timeLeft} {timeLeft > 1 ? "seconds" : "second"} left
      </p>
    </div>
  );
}
