import backgroundImage from "../assets/backgroundImage.jpg";
import HeartImg from "../assets/heart_img.png";
import EasyModeIcon from "../assets/EasyModeIcon.png";
import MediumModelIcon from "../assets/MediumModelIcon.png";
import HardModeIcon from "../assets/HardModeIcon.png";
import GenaricButton from "../components/GenaricButton";
import logout from "../assets/log-out.png";
import { useState } from "react";

export default function LoginPage() {
  const [gameMode, setGameMode] = useState("");

  const handleEasyMode = () => {
    setGameMode("easy");
  };

  const handleMediumMode = () => {
    setGameMode("medium");
  };

  const handleHardMode = () => {
    setGameMode("hard");
  };

  const handleClose = () => {
    window.location.href = "/home";
  };

  const handleStartBtnClick = () => {
    switch (gameMode) {
      case "easy":
        window.location.href = "/easy-mode";
        break;
      case "medium":
        window.location.href = "/medium-mode";
        break;
      case "hard":
        window.location.href = "/hard-mode";
        break;
    }
  };
  return (
    <div
      className="h-full w-full bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className=" w-[500px] h-[500px]  bg-white/20 flex flex-col justify-around items-center rounded-lg">
        <div className="w-[80%] h-[15%] flex flex-col justify-between items-center">
          <div className="w-full">
            <img
              src={logout}
              onClick={handleClose}
              className="w-[30px] h-[30px] cursor-pointer"
            />
          </div>
          <div className="w-[60%] h-full flex flex-row justify-between">
            <img src={HeartImg} className="w-[30px] h-[30px]" />
            <label className="text-[20px] font-bold text-white">
              Heart <span className="text-red-500">Memory</span> Game
            </label>
          </div>
          <label className="text-[20px] font-bold text-white">
            Choose Game Mode
          </label>
        </div>

        <div className="w-[80%] h-[30%] flex flex-row justify-between items-center">
          <div
            onClick={handleEasyMode}
            className={`w-[120px] h-[120px] ${
              gameMode.includes("easy")
                ? "bg-green-400/60"
                : " bg-white/30 hover:bg-white/40 "
            }rounded-[10px] flex flex-col justify-center items-center`}
          >
            <img src={EasyModeIcon} className="w-[50px] h-[50px]" />
            <label className="text-[20px] font-medium text-white">Easy</label>
          </div>

          <div
            onClick={handleMediumMode}
            className={`w-[120px] h-[120px] ${
              gameMode.includes("medium")
                ? "bg-green-400/60"
                : " bg-white/30 hover:bg-white/40 "
            }rounded-[10px] flex flex-col justify-center items-center`}
          >
            <img src={MediumModelIcon} className="w-[50px] h-[50px]" />
            <label className="text-[20px] font-medium text-white">Medium</label>
          </div>

          <div
            onClick={handleHardMode}
            className={`w-[120px] h-[120px] ${
              gameMode.includes("hard")
                ? "bg-green-400/60"
                : " bg-white/30 hover:bg-white/40 "
            }rounded-[10px] flex flex-col justify-center items-center`}
          >
            <img src={HardModeIcon} className="w-[50px] h-[50px]" />
            <label className="text-[20px] font-medium text-white">Hard</label>
          </div>
        </div>

        <div className="w-[80%] h-[20%]">
          <div className="w-full h-[45px] ">
            <GenaricButton
              onClick={handleStartBtnClick}
              textSize={15}
              discription={"Start"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
