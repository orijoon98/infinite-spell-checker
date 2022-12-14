/** @jsxImportSource @emotion/react */
import styled from "styled-components";
import { css } from "@emotion/react";

const History = ({ onBack, onCopy, title, text }) => {
    return (
        <HistoryContainer>
            <HistoryWrapper>
                <HistoryTitle>
                    <h2>저장 목록</h2>
                </HistoryTitle>
                <TitleContainer>
                    <TitleArea>{title}</TitleArea>
                </TitleContainer>
                <TextAreaContainer>
                    <ResultArea>{text}</ResultArea>
                </TextAreaContainer>
                <ButtonContainer>
                    <BackButton onClick={onBack}>뒤로가기</BackButton>
                    <CopyButton onClick={onCopy}>복사하기</CopyButton>
                </ButtonContainer>
            </HistoryWrapper>
        </HistoryContainer>
    );
};

const HistoryContainer = styled.div`
    text-align: center;
    width: 100vw;
    height: 100vh;
    font-family: "line";
`;

const HistoryWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
`;

const HistoryTitle = styled.div`
    margin-top: 100px;
    margin-bottom: 50px;
`;

const TextAreaContainer = styled.div`
    width: 720px;
    height: 420px;
    border: 1px solid #dfe6e9;
    margin: auto;
`;

const TitleContainer = styled.div`
    width: 720px;
    height: 50px;
    border-top: 1px solid #dfe6e9;
    border-left: 1px solid #dfe6e9;
    border-right: 1px solid #dfe6e9;
    margin: auto;
`;

const TitleArea = styled.div`
    margin: auto;
    margin-top: 12px;
`;

const ResultArea = styled.div`
    width: 700px;
    height: 400px;
    text-align: left;
    margin: auto;
    margin-top: 10px;
    overflow: auto;
    white-space: pre-line;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
`;

const BackButton = styled.button`
    width: 200px;
    height: 50px;
    font-family: "line";
    font-size: 16px;
    background-color: #b2bec3;
    border: 1px solid #dfe6e9;
    margin-right: 10px;
    &:hover {
        cursor: pointer;
        background-color: #636e72;
        transition: 0.7s;
    }
`;

const CopyButton = styled.button`
    width: 200px;
    height: 50px;
    font-family: "line";
    font-size: 16px;
    background-color: #74b9ff;
    border: 1px solid #dfe6e9;
    margin-left: 10px;
    &:hover {
        cursor: pointer;
        background-color: #0984e3;
        transition: 0.7s;
    }
`;

export default History;
