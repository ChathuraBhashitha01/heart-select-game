import backgroundImage from "../assets/backgroundImage.jpg";
import GenaricButton from "../components/GenaricButton";
import tropy from "../assets/tropy.png";
import axios from "axios";
import { useEffect, useState } from "react";

interface TopScoreProps {
  onClose: () => void;
  user: string;
  score: number;
  mode: string;
}

export default function TopScore({
  onClose,
  score,
  mode,
  user,
}: TopScoreProps) {
    const [avatarImg, setAvatarImg] = useState("");

    const fetchAvatar = async () => {
        try {
            const res = await axios.get("https://randomuser.me/api/");
            const avatar = res.data.results[0].picture.medium; 
            setAvatarImg(avatar); 
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(()=>{
        fetchAvatar()
    },[])

  return (
    <div
      className="w-[450px] h-[250px] rounded-lg flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[95%] h-[95%] bg-white/20 rounded-lg border-4 border-purple-800/50 flex flex-col items-center justify-center">
        <label className="text-[20px] text-white font-bold">
          Your Highest Score
        </label>

        <div className="w-[90%] h-[40%] border-purple-700 border-3  flex flex-row justify-between items-center">
          <div className="w-[28%] h-full flex flex-row justify-between items-center ml-3">
            <img src={avatarImg} className="w-[50px] h-[50px] rounded-full" />
            <div className="flex flex-col ml-2">
              <label className="text-[14px] text-white font-bold">{user}</label>
              <label className="text-[11px] w-fit text-white bg-red-600  rounded">
                {mode}
              </label>
            </div>
          </div>

          <label className="text-white text-[20px] w-fit bg-red-600  rounded mr-3">
            {score}%
          </label>
        </div>

        <div className="w-[90%] h-[20%] flex flex-col justify-center items-end">
          <div className="w-[85px] h-[35px]">
            <GenaricButton
              onClick={onClose}
              textSize={13}
              discription={"Close"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
