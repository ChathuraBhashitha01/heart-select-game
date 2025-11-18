import { useEffect, useState } from "react";
import HeartImg from "../assets/heart_img.png";

interface GameAreaProps {
  heartLocations: number[];
  timeOut: boolean;
  answerCheck: boolean;
  onSubmit: (answer: number[]) => void;
}
export default function GameArea({
  heartLocations,
  timeOut,
  answerCheck,
  onSubmit,
}: GameAreaProps) {
  const [givenAnswer, setGivenAnswer] = useState<number[]>([]);

  const handleOnClick = (value: number) => {
    setGivenAnswer((prev) => {
      if (prev.includes(value)) {
        return prev.filter((n) => n !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  useEffect(() => {
    if (givenAnswer.length > 0) {
      console.log("heartLocations = ", heartLocations)
      onSubmit(givenAnswer);
    }
  }, [givenAnswer, onSubmit]);

  const handleGamePage = () => {
    if (!timeOut) {
      return (
        <div className=" w-[98%] h-[98%] grid grid-cols-5 aspect-square gap-5.5 ">
          {Array.from({ length: 25 }).map((_, index) => (
            <div
              key={index}
              className="w-[78px] h-[78px] bg-white/40 hover:bg-white/50  flex flex-row justify-center items-center"
            >
              {heartLocations.map(
                (number) =>
                  number === index && (
                    <img className=" w-[42px] h-[42px] " src={HeartImg} />
                  )
              )}
            </div>
          ))}
        </div>
      );
    } else if (timeOut) {
      if (answerCheck) {
        return (
          <div className="w-[98%] h-[98%] grid grid-cols-5 aspect-square gap-5.5 ">
            {Array.from({ length: 25 }).map((_, index) => (
              <div
                key={index}
                className={`w-[78px] h-[78px] flex flex-row justify-center items-center ${
                  heartLocations.includes(index)
                    ? givenAnswer.includes(index)
                      ? "bg-green-400/60 rounded-lg shadow-2xl shadow-green-400/20"
                      : "bg-red-400/60 rounded-lg shadow-2xl shadow-red-400/20"
                    : "bg-white/20 rounded-lg"
                }`}
              ></div>
            ))}
          </div>
        );
      } else {
        return (
          <div className=" w-[98%] h-[98%] grid grid-cols-5 aspect-square gap-5.5 ">
            {Array.from({ length: 25 }).map((_, index) => (
              <div
                key={index}
                onClick={() => handleOnClick(index)}
                className={`w-[78px] h-[78px] 
                ${
                  givenAnswer.includes(index)
                    ? "bg-green-400/60 rounded-lg shadow-2xl shadow-green-400/20 "
                    : "bg-white/20 hover:bg-white/30 rounded-lg"
                } flex flex-row justify-center items-center`}
              ></div>
            ))}
          </div>
        );
      }
    }
  };

  return (
    <div className=" max-w-[500px] max-h-[500px] w-full h-full bg-white/20  flex flex-col justify-center items-center rounded-lg">
      {handleGamePage()}
    </div>
  );
}
