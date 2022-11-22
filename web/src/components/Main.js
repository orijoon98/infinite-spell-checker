/** @jsxImportSource @emotion/react */
import styled from "styled-components";
import { css } from "@emotion/react";

const Main = ({
    form,
    loading,
    checked,
    onCheck,
    onChange,
    onFinish,
    onText,
    onXButton,
    onDirectChange,
    onDirectClick,
    onSuggestionClick,
    onCopy,
    typos,
    tokens,
    result,
    modal,
    modalDetail,
    fixed,
    blankO,
    blankX,
}) => {
    const spellCheck = () => {
        const res = [];
        for (let i = 0; i < result.length; i++) {
            if (fixed.has(i)) {
                res.push(
                    <span key={i} id={i} name={result[i]} css={BlueText}>
                        {result[i]}
                    </span>
                );
            } else if (tokens.has(result[i])) {
                res.push(
                    <span
                        key={i}
                        id={i}
                        name={result[i]}
                        css={TextButton}
                        onClick={onText}
                    >
                        {result[i]}
                    </span>
                );
            } else {
                res.push(
                    <span
                        key={i}
                        id={i}
                        name={result[i] === "<LineChange>" ? "\n" : result[i]}
                    >
                        {result[i] === "<LineChange>" ? <br /> : result[i]}
                    </span>
                );
            }
        }
        return res;
    };

    const substitutes = () => {
        const res = [];
        let suggestions = modalDetail[1];
        for (let i = 0; i < suggestions.length; i++) {
            res.push(
                <div key={i}>
                    <span key={i} id={i} name={suggestions[i]} css={BlueText}>
                        {suggestions[i]}
                    </span>
                    <button onClick={onSuggestionClick}>적용</button>
                </div>
            );
        }
        return res;
    };

    return (
        <MainContainer>
            <MainWrapper>
                <MainTitle>
                    <h2>맞춤법 검사</h2>
                </MainTitle>
                {checked ? (
                    <>
                        <CountAreaContainer>
                            <CountArea>
                                공백포함: 총{" "}
                                <span css={BlueText}>{blankO}</span>자 |
                                공백제외: 총{" "}
                                <span css={BlueText}>{blankX}</span>자
                            </CountArea>
                        </CountAreaContainer>
                        <TextAreaContainer name="textArea">
                            <ResultArea>{spellCheck()}</ResultArea>
                        </TextAreaContainer>
                        <CheckResultContainer>
                            <CheckResultArea>
                                오타 의심 단어{" "}
                                <span css={RedText}>{typos}</span>개
                            </CheckResultArea>
                        </CheckResultContainer>
                        <ButtonContainer>
                            <CopyButton onClick={onCopy}>복사하기</CopyButton>
                            <SaveButton>저장하기</SaveButton>
                            <FinishButton onClick={onFinish}>
                                검사 종료하기
                            </FinishButton>
                        </ButtonContainer>
                        {modal ? (
                            <Modal>
                                <button onClick={onXButton}>x</button>
                                <div>
                                    틀린 단어{" "}
                                    <span css={RedText}>{modalDetail[0]}</span>
                                </div>
                                <div>대체어 {substitutes()}</div>
                                <div>
                                    직접 입력{" "}
                                    <input
                                        type="text"
                                        onChange={onDirectChange}
                                    />
                                    <button onClick={onDirectClick}>
                                        적용
                                    </button>
                                </div>
                                <div>
                                    도움말 보기 <span>{modalDetail[2]}</span>
                                </div>
                            </Modal>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <>
                        <CountAreaContainer>
                            <CountArea>
                                공백포함: 총{" "}
                                <span css={BlueText}>{blankO}</span>자 |
                                공백제외: 총{" "}
                                <span css={BlueText}>{blankX}</span>자
                            </CountArea>
                        </CountAreaContainer>
                        <TextAreaContainer>
                            {loading ? (
                                <ResultArea>맞춤법 검사중입니다.</ResultArea>
                            ) : (
                                <TextArea
                                    name="sentence"
                                    value={form.sentence}
                                    onChange={onChange}
                                />
                            )}
                        </TextAreaContainer>
                        <ButtonContainer>
                            <CheckButton onClick={onCheck} disabled={loading}>
                                검사하기
                            </CheckButton>
                        </ButtonContainer>
                    </>
                )}
            </MainWrapper>
        </MainContainer>
    );
};

const MainContainer = styled.div`
    text-align: center;
    width: 100vw;
    height: 100vh;
    font-family: "line";
`;

const MainWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
`;

const MainTitle = styled.div`
    margin-top: 100px;
    margin-bottom: 50px;
`;

const TextAreaContainer = styled.div`
    width: 720px;
    height: 420px;
    border: 1px solid;
    margin: auto;
`;

const CountAreaContainer = styled.div`
    width: 720px;
    height: 50px;
    border-top: 1px solid;
    border-left: 1px solid;
    border-right: 1px solid;
    margin: auto;
`;

const CountArea = styled.div`
    margin: auto;
    margin-top: 12px;
`;

const TextArea = styled.textarea`
    width: 700px;
    height: 400px;
    resize: none;
    border: none;
    margin-top: 10px;
    font-family: "line";
    font-size: 16px;
`;

const ResultArea = styled.div`
    width: 700px;
    height: 400px;
    text-align: left;
    margin: auto;
    margin-top: 10px;
    overflow: auto;
`;

const CheckResultContainer = styled.div`
    width: 720px;
    height: 50px;
    border-left: 1px solid;
    border-right: 1px solid;
    border-bottom: 1px solid;
    margin: auto;
`;

const CheckResultArea = styled.div`
    padding-top: 12px;
    font-size: 18px;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
`;

const CheckButton = styled.button`
    width: 200px;
    height: 50px;
    font-family: "line";
    font-size: 16px;
    background-color: #74b9ff;
    border: 1px solid black;
    &:hover {
        cursor: pointer;
        background-color: #0984e3;
        transition: 0.7s;
    }
`;

const CopyButton = styled.button`
    width: 200px;
    height: 50px;
    font-family: "line";
    font-size: 16px;
    background-color: #b2bec3;
    border: 1px solid black;
    margin-right: 20px;
    &:hover {
        cursor: pointer;
        background-color: #636e72;
        transition: 0.7s;
    }
`;

const SaveButton = styled.button`
    width: 200px;
    height: 50px;
    font-family: "line";
    font-size: 16px;
    background-color: #b2bec3;
    border: 1px solid black;
    &:hover {
        cursor: pointer;
        background-color: #636e72;
        transition: 0.7s;
    }
`;

const FinishButton = styled.button`
    width: 200px;
    height: 50px;
    font-family: "line";
    font-size: 16px;
    background-color: #74b9ff;
    border: 1px solid black;
    margin-left: 20px;
    &:hover {
        cursor: pointer;
        background-color: #0984e3;
        transition: 0.7s;
    }
`;

const TextButton = css`
    color: red;
    text-decoration: underline;
    &:hover {
        cursor: pointer;
    }
`;

const RedText = css`
    color: red;
    text-decoration: underline;
`;

const BlueText = css`
    color: blue;
`;

const Modal = styled.div`
    position: absolute;
    background-color: white;
    border: 1px solid black;
    z-index: 100;
    width: 50%;
    height: 30%;
    left: 25%;
    top: 30%;
`;

export default Main;
