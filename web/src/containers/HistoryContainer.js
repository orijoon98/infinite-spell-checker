import React from "react";
import History from "../components/History";

const HistoryContainer = () => {
    const onCopy = async (e) => {
        e.preventDefault();
        let resultArea = e.target.parentElement.parentElement.childNodes[2];
        let text = resultArea.firstChild.innerText;
        navigator.clipboard.writeText(text);
    };

    return <History onCopy={onCopy} />;
};

export default HistoryContainer;
