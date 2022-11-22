/** @jsxImportSource @emotion/react */
import styled from "styled-components";
import { css } from "@emotion/react";

const List = ({ onBack }) => {
    return (
        <ListContainer>
            <ListWrapper>
                <ListTitle>
                    <h2>저장 목록</h2>
                </ListTitle>
                <TitleContainer>
                    <TitleArea>저장 목록 리스트 개수</TitleArea>
                </TitleContainer>
                <TextAreaContainer>
                    <ResultArea>제목별 리스트가 들어감</ResultArea>
                </TextAreaContainer>
                <ButtonContainer>
                    <BackButton onClick={onBack}>뒤로가기</BackButton>
                </ButtonContainer>
            </ListWrapper>
        </ListContainer>
    );
};

const ListContainer = styled.div`
    text-align: center;
    width: 100vw;
    height: 100vh;
    font-family: "line";
`;

const ListWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
`;

const ListTitle = styled.div`
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
    &:hover {
        cursor: pointer;
        background-color: #636e72;
        transition: 0.7s;
    }
`;

export default List;
