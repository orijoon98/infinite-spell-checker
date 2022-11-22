import React from "react";
import History from "../components/History";
import { useNavigate } from "react-router-dom";

const HistoryContainer = () => {
    const navigate = useNavigate();
    const onBack = async (e) => {
        e.preventDefault();
        navigate("/list");
    };
    const onCopy = async (e) => {
        e.preventDefault();
        let resultArea = e.target.parentElement.parentElement.childNodes[2];
        let text = resultArea.firstChild.innerText;
        navigator.clipboard.writeText(text);
    };

    return <History onBack={onBack} onCopy={onCopy} />;
};

export default HistoryContainer;
