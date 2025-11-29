import { useEffect, useState } from "react";
import GenaricButton from "../components/GenaricButton";
import backgroundImage from "../assets/backgroundImage.jpg";
import TextField from "@mui/material/TextField";
import api from '../config/axiosConfig';

interface ExtraTimeProps {
  onClose: () => void;
  onSubmit: (isCorrect: boolean) => void;
}

export default function ExtraTimePopUp({ onClose, onSubmit }: ExtraTimeProps) {
  const [games, setGames] = useState("");
  const [solution, setSolution] = useState(0);
  const [giveAnswer, setGiveAnswer] = useState(0);

  const token = sessionStorage.getItem("token");

  const fetchData = async () => {
    try {
      await api
        .get("/game", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if(res.status === 200){
            setGames(res.data.imageBase64);
            setSolution(res.data.solution);
          }
        });
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className=" w-[500px] h-[500px] bg-cover bg-center flex flex-col justify-between  items-center rounded-lg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <label className="text-[20px] font-bold text-white mb-2">
        Choose Hart Count
      </label>
      <div className="w-[90%] h-[70%]  flex flex-col justify-between items-center">
        <label className="text-[13px] font-bold text-white mb-2">
          Choose the number of hearts and get more time to memorize!
        </label>
        <img
          src={`data:image/png;base64,${games}`}
          className="w-[98%] h-[70%] object-contain "
          alt="puzzle"
        />

        <TextField
          required
          id="outlined-required"
          label="Choose Hart Count"
          type="number"
          placeholder="Text Here"
          sx={{
            width: "80%",
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
          onChange={(e) => setGiveAnswer(Number(e.target.value))} 
        />
      </div>

      <div className="w-[80%] h-[20%] flex flex-row justify-between items-center">
        <div className="w-[150px] h-[35px] ">
          <GenaricButton
            onClick={onClose}
            textSize={15}
            discription={"Close"}
          />
        </div>

        <div className="w-[150px] h-[35px] ">
          <GenaricButton
            onClick={() =>
              solution === giveAnswer ? onSubmit(true) : onSubmit(false)
            }
            textSize={15}
            discription={"Submit"}
          />
        </div>
      </div>
    </div>
  );
}
