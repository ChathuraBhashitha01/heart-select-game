interface ButtonProps{
    onClick: () => void;
    textSize? : number;
    discription? : string;
}
export default function GenaricButton({onClick,textSize,discription}: ButtonProps) {
  return (
    <button onClick={onClick} className={`w-full h-full bg-white/20 hover:bg-white/70  rounded-md text-white font-bold text-[${textSize}px] flex flex-col justify-center items-center cursor-pointer`}>
      {discription}
    </button>
  )
}
