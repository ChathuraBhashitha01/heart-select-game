import { useEffect, useState } from "react";
import GameArea from "../components/GameArea";
import Timer from "../components/Timer";
import backgroundImage from "../assets/backgroundImage.jpg";
import HeartImg from "../assets/heart_img.png";
import tropy from "../assets/tropy.png";
import detail from "../assets/detail.png";
import logout from "../assets/log-out.png";
import GenaricButton from "../components/GenaricButton";
import ScorePopUp from "../components/ScorePopUp";
import ExtraTimePopUp from "../components/ExtraTimePopUp";
import GameDetails from "../components/GameDetails";
import TopScore from "../components/TopScore";
import { Dialog } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const MODE_THEME = {
  EASY_MODE: {
    mode: "EASY",
    mode_label: "Easy Mode",
    heart_number: 5,
  },
  MEDIUM_MODE: {
    mode: "MEDIUM",
    mode_label: "Medium Mode",
    heart_number: 6,
  },
  HARD_MODE: {
    mode: "HARD",
    mode_label: "Hard Mode",
    heart_number: 7,
  },
};

interface GameMode {
  card_name: keyof typeof MODE_THEME;
}

export default function HomePage({ card_name }: GameMode) {
  const [timeOut, setTimeOut] = useState(false);
  const [buttonOnClick, setButtonOnClick] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [time, setTime] = useState(2);
  const [activeTimer, setActiveTimer] = useState(true);
  const [extraTimePopUpCount, setExtraTimePopUpCount] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [topScore, setTopScore] = useState(0);

  const mode_theme = MODE_THEME[card_name] || {};
  const { mode, mode_label, heart_number } = mode_theme;

  const handleTimeOut = () => {
    setActiveTimer(false);
    setTime(0);
    setTimeOut(true);
    setExtraTimePopUpCount(extraTimePopUpCount + 1);
  };

  const token = sessionStorage.getItem("token");

  const getUsername = () => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.sub;
      } catch (error) {
        return null;
      }
    }
  };

  const handleUserScoreOnSave = async () => {
    const username = getUsername();
    await axios
      .post(
        `http://localhost:8080/app/api/profile`,
        {
          user_name: String(username),
          game_type: mode,
          top_score: gameScore,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
       
      });
  };

  const handleGetUserScore = async () => {
    const username = getUsername();
    await axios
      .get(`http://localhost:8080/app/api/profile/${username}/${mode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
         setTopScore(res.data.top_score);
      });
  };

  const handleExtraTimeCloseBtnOnClick = () => {
    setActiveTab(0);
    setActiveTimer(false);
  };

  const handleExtraTimeComfirmBtnOnClick = (isCorrect: boolean) => {
    if (extraTimePopUpCount < 2 && isCorrect) {
      setActiveTab(0);
      setTime(2);
      setActiveTimer(true);
      setTimeOut(false);
    } else if (!isCorrect) {
      setActiveTab(0);
    }

    if (isCorrect) {
      toast.success("Your Answer is Correct!");
    } else {
      toast.info("Your Answer is not Correct!");
    }
  };

  const handleGameMode = () => {
    const nums = new Set<number>();

    while (nums.size < heart_number) {
      nums.add(Math.floor(Math.random() * 25));
    }

    setCorrectAnswers(Array.from(nums));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleGameScore = (value: number[]) => {
    const answerCount = correctAnswers.length;
    const correctAnswersCount = value.filter((a) =>
      correctAnswers.includes(a)
    ).length;

    const score = (correctAnswersCount / answerCount) * 100;
    setGameScore(score);
  };

  const handleSubmitBtnOnClick = () => {
    setButtonOnClick(true);
    handleUserScoreOnSave();
  };

  const renderPopUp = () => {
    const username = getUsername();
    switch (activeTab) {
      case 1:
        return (
          <ExtraTimePopUp
            onClose={handleExtraTimeCloseBtnOnClick}
            onSubmit={handleExtraTimeComfirmBtnOnClick}
          />
        );
      case 2:
        return <ScorePopUp gameMode={mode} gameScore={gameScore} />;
      case 3:
        return (
          <GameDetails
            onClose={() => {
              setActiveTab(0);
            }}
          />
        );
      case 4:
        return (
          <TopScore
            onClose={() => {
              setActiveTab(0);
            }}
            user={String(username)}
            score={topScore}
            mode={mode}
          />
        );
    }
  };

  useEffect(() => {
    if (buttonOnClick) {
      setCheckAnswer(true);
      setTimeout(() => {
        setActiveTab(2);
      }, 500);
    } else if (timeOut && extraTimePopUpCount < 2) {
      setTimeout(() => {
        setActiveTab(1);
      }, 500);
    }
  }, [buttonOnClick, timeOut]);

  useEffect(() => {
    handleGameMode();
  }, []);

  useEffect(() => {
    handleGetUserScore();
  }, [gameScore]);

  return (
    <div
      className="h-full w-fullbg-cover bg-center flex flex-row justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[864px] h-[770px] flex flex-col justify-center items-center ">
        <div className="w-full h-[10%] flex flex-row justify-between">
          <div className="w-[40%] h-full flex flex-col justify-center">
            <div className="w-full h-full flex flex-row items-center">
              <img src={HeartImg} className="w-[30px] h-[30px]" />
              <label className="text-[30px] font-bold text-white ml-2">
                Heart <span className="text-red-500">Memory</span> Game
              </label>
            </div>

            <div>
              <label className="text-[15px] font-bold text-white">
                Playing as : {sessionStorage.getItem("user")}
              </label>
            </div>
          </div>

          <div className="w-[14%] h-full flex flex-row justify-between items-center">
            <img
              src={tropy}
              onClick={() => {
                setActiveTab(4);
              }}
              className="w-[30px] h-[30px] cursor-pointer"
            />
            <img
              src={detail}
              onClick={() => {
                setActiveTab(3);
              }}
              className="w-[30px] h-[30px] cursor-pointer"
            />
            <img
              src={logout}
              onClick={handleLogout}
              className="w-[30px] h-[30px] cursor-pointer"
            />
          </div>
        </div>

        <div className="w-full h-20 ">
          <Timer
            time={time}
            onTimeOut={handleTimeOut}
            activeTimer={activeTimer}
          />
        </div>

        <div className=" w-[500px] h-[500px] flex flex-col justify-center items-center mt-2 ">
          <label className="text-[20px] font-bold text-white">
            {mode_label}
          </label>
          <GameArea
            heartLocations={correctAnswers}
            timeOut={timeOut}
            answerCheck={checkAnswer}
            onSubmit={handleGameScore}
          />
        </div>

        <div className="w-[215px] h-[45px] mt-10">
          {timeOut && (
            <GenaricButton
              onClick={handleSubmitBtnOnClick}
              textSize={15}
              discription={"Submit"}
            />
          )}
        </div>
      </div>

      <Dialog
        className="flex justify-center items-center bg-transparent"
        open={activeTab == 0 ? false : true}
        maxWidth="lg"
        fullWidth
      >
        {renderPopUp()}
      </Dialog>
    </div>
  );
}
