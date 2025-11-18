import backgroundImage from "../assets/backgroundImage.jpg";
import TextField from "@mui/material/TextField";
import HeartImg from "../assets/heart_img.png";
import GenaricButton from "../components/GenaricButton";
import { useState } from "react";
import axios from "axios";

interface UserData {
  userName: string;
  password: string;
  name: string;
}
export default function LoginPage() {
  const [userData, setUserData] = useState<UserData>({
    userName: "",
    password: "",
    name: "",
  });

  const handleChange = (name: keyof UserData, value: string) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = () => {
    axios
      .post("http://localhost:8080/app/api/auth/sign-up", userData)
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("token", res.data.token);
          window.location.href = "/home";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSignIn = () => {
    window.location.href = "/";
  };

  return (
    <div
      className="h-full w-full bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className=" w-[500px] h-[500px]  bg-white/20 flex flex-col justify-around items-center rounded-lg">
        <div className="w-[80%] h-[15%] flex flex-col justify-between items-center">
          <div className="w-[60%] h-full flex flex-row justify-between">
            <img src={HeartImg} className="w-[30px] h-[30px]" />
            <label className="text-[20px] font-bold text-white">
              Heart <span className="text-red-500">Memory</span> Game
            </label>
          </div>
          <label className="text-[20px] font-bold text-white">Sign In</label>
        </div>

        <div className="w-[80%] h-[40%] flex flex-col justify-between">
          <TextField
            required
            id="outlined-required"
            label="User Name"
            placeholder="Text Here"
            sx={{
              width: "100%",
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
            value={userData.userName}
            onChange={(e) => handleChange("userName", e.target.value)}
          />

          <TextField
            required
            id="outlined-required"
            label="Password"
            placeholder="Text Here"
            sx={{
              width: "100%",
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
            value={userData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <TextField
            required
            id="outlined-required"
            label="Name"
            placeholder="Text Here"
            sx={{
              width: "100%",
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
            value={userData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="w-[80%] h-[20%] flex flex-row justify-between items-center">
          <div className="w-[150px] h-[35px]">
            <GenaricButton
              onClick={handleSignIn}
              textSize={15}
              discription={"Log In"}
            />
          </div>

          <div className="w-[150px] h-[35px]">
            <GenaricButton
              onClick={handleSignUp}
              textSize={15}
              discription={"Sign In"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
