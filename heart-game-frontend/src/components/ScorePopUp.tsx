import HeartImg from "../assets/heart_img.png";
import GenaricButton from "../components/GenaricButton";
import backgroundImage from "../assets/backgroundImage.jpg";

interface ScoreProps {
  gameMode: string;
  gameScore: number;
}

export default function ScorePopUp({ gameMode, gameScore }: ScoreProps) {
  const handleQuitBtnOnClick = () => {
    window.location.href = "/home";
  };

  const handleRestartBtnOnClick = () => {
    switch(gameMode){
      case 'EASY':
        window.location.href = "/easy-mode";
        break;
      case 'MEDIUM':
        window.location.href = "/medium-mode";
        break;
      case 'HARD':
        window.location.href = "/hard-mode";
        break;
    }
  };

  return (
    <div
      className=" w-[500px] h-[500px] bg-cover bg-center rounded-lg  flex flex-col justify-around items-center "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[80%] h-[15%] flex flex-col justify-between items-center">
        <div className="w-[60%] h-full flex flex-row justify-between">
          <img src={HeartImg} className="w-[30px] h-[30px]" />
          <label className="text-[20px] font-bold text-white">
            Heart <span className="text-red-500">Memory</span> Game
          </label>
        </div>
        <label className="text-[40px] font-bold text-white">Game Results</label>
      </div>

      <label className="text-[70px] font-bold text-white ">
        { Number(gameScore.toFixed(2))}%
      </label>

      <div className="w-[80%] h-[20%] flex flex-row justify-between">
        <div className="w-[150px] h-[45px] ">
          <GenaricButton
            onClick={handleRestartBtnOnClick}
            textSize={15}
            discription={"Restart Game"}
          />
        </div>

        <div className="w-[150px] h-[45px] ">
          <GenaricButton
            onClick={handleQuitBtnOnClick}
            textSize={15}
            discription={"Quit Game"}
          />
        </div>
      </div>
    </div>
  );
}
