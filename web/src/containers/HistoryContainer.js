import React, { useState, useEffect } from "react";
import History from "../components/History";
import { useNavigate, useParams } from "react-router-dom";
import { findHistoryById } from "../api/history";

const HistoryContainer = () => {
    const navigate = useNavigate();
    const { historyId } = useParams();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

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

    useEffect(() => {
        async function fetchHistory() {
            try {
                const response = await findHistoryById(historyId);
                const data = response.data.data;
                if (response.status === 401) {
                    navigate("/login");
                }
                setTitle(data.title);
                setText(data.text);
            } catch (err) {
                alert("정보 조회 실패");
            }
        }
        fetchHistory();
    });

    return <History onBack={onBack} onCopy={onCopy} title={title} text={text} />;
};

export default HistoryContainer;
