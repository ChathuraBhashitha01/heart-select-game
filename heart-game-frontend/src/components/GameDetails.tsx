import backgroundImage from "../assets/backgroundImage.jpg";
import GenaricButton from "../components/GenaricButton";

interface GameDetailsProps{
  onClose: () => void;
}

export default function GameDetails({onClose}:GameDetailsProps) {
  return (
    <div className="w-[450px] h-[450px] rounded-lg flex flex-col justify-center items-center"  style={{ backgroundImage: `url(${backgroundImage})` }}>
         <div className="w-[95%] h-[95%] bg-white/20 rounded-lg border-4 border-purple-800/50 flex flex-col items-center justify-center">
            <div  className="w-[80%] h-[60%] flex flex-col justify-between">
              <div className="w-full">
                 <label className="text-[20px] text-white font-semibold">How to Play</label>
              </div>

              <div className="w-full  flex flex-col">
                <label className="text-[15px] text-white font-semibold"><span className="text-yellow-300">Step 1 :</span>  Memorize</label>
                <label className="text-[13px] text-white">Memorize the positions and number of hearts displayed on the screen before the timer runs out.</label>
              </div>

              <div className="w-full  flex flex-col">
                <label className="text-[15px] text-white font-semibold"><span className="text-yellow-300">Step 2 :</span> Remember</label>
                <label className="text-[13px] text-white">The hearts will disappear. Try to remember both how many there were and where they were positioned.</label>
              </div>

              <div className="w-full  flex flex-col">
                <label className="text-[15px] text-white font-semibold"><span className="text-yellow-300">Step 3 :</span> Place Your Guesses</label>
                <label className="text-[13px] text-white">Click on the grid to place your guesses where you think the hearts were. Click again to remove.</label>
              </div>
            </div>

            <div className="w-[80%] h-[20%] flex flex-col justify-center items-end">
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
  )
}
