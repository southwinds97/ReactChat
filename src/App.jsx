import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// 컴포넌트 모듈화 후 임포트
import ChatStart from "./components/ChatStart";
import ChatMessage from "./components/ChatMessage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<ChatStart />} />
        <Route path="/chat/talk" element={<ChatMessage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
