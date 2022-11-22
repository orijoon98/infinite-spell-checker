import React from "react";
import { Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import LoginPage from "./pages/LoginPage";
import KakaoRedirectHandler from "./handlers/KakaoRedirectHandler";
import MainPage from "./pages/MainPage";
import HistoryPage from "./pages/HistoryPage";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }
  body {
    word-break: keep-all;
  }
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/oauth/kakao" element={<KakaoRedirectHandler />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </>
    );
}

export default App;
