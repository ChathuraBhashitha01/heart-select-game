import GameModePage from "./page/GameModePage";
import LoginPage from "./page/LoginPage";
import SignInPage from "./page/SignInPage";
import HomePage from "./page/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="relative flex flex-col h-screen w-[1920px]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignInPage />} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/easy-mode" element={<GameModePage card_name={'EASY_MODE'}/>} />
          <Route path="/medium-mode" element={<GameModePage card_name={'MEDIUM_MODE'}/>} />
          <Route path="/hard-mode" element={<GameModePage card_name={'HARD_MODE'}/>} />
          
        </Routes>
      </BrowserRouter>
       <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
