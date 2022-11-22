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
    onSave,
    onSaveList,
    typos,
    tokens,
    result,
    modal,
    modalDetail,
    fixed,
    blankO,
    blankX,
    saveModal,
    saveText,
    saveTitle,
    onSaveChange,
    onSaveSubmit,
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
                <div key={i} css={Left}>
                    <span key={i} id={i} name={suggestions[i]} css={BlueText}>
                        {suggestions[i]}
                    </span>
                    <ApplyModalButton onClick={onSuggestionClick}>
                        적용
                    </ApplyModalButton>
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
                            <SaveButton onClick={onSave}>저장하기</SaveButton>
                            <FinishButton onClick={onFinish}>
                                검사 종료하기
                            </FinishButton>
                        </ButtonContainer>
                        {saveModal ? (
                            <SaveModal>
                                <CancelModalButton onClick={onXButton}>
                                    X
                                </CancelModalButton>
                                <SaveModalArea>
                                    제목을 입력하세요.
                                </SaveModalArea>
                                <SaveInput
                                    type="text"
                                    onChange={onSaveChange}
                                />
                                <div></div>
                                <SaveModalButton onClick={onSaveSubmit}>
                                    저장
                                </SaveModalButton>
                            </SaveModal>
                        ) : (
                            <></>
                        )}
                        {modal ? (
                            <Modal>
                                <CancelModalButton onClick={onXButton}>
                                    X
                                </CancelModalButton>
                                <ModalArea>
                                    틀린 단어{" "}
                                    <WrongContainer>
                                        <span css={RedText}>
                                            {modalDetail[0]}
                                        </span>
                                    </WrongContainer>
                                </ModalArea>
                                <ModalArea>
                                    <div>대체어</div>
                                    <SubstituteContainer>
                                        {substitutes()}
                                    </SubstituteContainer>
                                </ModalArea>
                                <ModalArea>
                                    직접 입력{" "}
                                    <EnterContainer>
                                        <EnterInput
                                            type="text"
                                            onChange={onDirectChange}
                                        />
                                        <ApplyModalButton
                                            onClick={onDirectClick}
                                        >
                                            적용
                                        </ApplyModalButton>
                                    </EnterContainer>
                                </ModalArea>
                                <ModalArea>
                                    도움말 보기{" "}
                                    <HelpContainer>
                                        <span>{modalDetail[2]}</span>
                                    </HelpContainer>
                                </ModalArea>
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
                            <HistoryButton onClick={onSaveList}>
                                저장 목록
                            </HistoryButton>
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
    border: 1px solid #dfe6e9;
    margin: auto;
`;

const CountAreaContainer = styled.div`
    width: 720px;
    height: 50px;
    border-top: 1px solid #dfe6e9;
    border-left: 1px solid #dfe6e9;
    border-right: 1px solid #dfe6e9;
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
    border-left: 1px solid #dfe6e9;
    border-right: 1px solid #dfe6e9;
    border-bottom: 1px solid #dfe6e9;
    margin: auto;
`;

const CheckResultArea = styled.div`
    padding-top: 12px;
    font-size: 18px;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
`;

const HistoryButton = styled.button`
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

const CheckButton = styled.button`
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

const CopyButton = styled.button`
    width: 200px;
    height: 50px;
    font-family: "line";
    font-size: 16px;
    background-color: #b2bec3;
    border: 1px solid #dfe6e9;
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
    border: 1px solid #dfe6e9;
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
    border: 1px solid #dfe6e9;
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

const Left = css`
    float: left;
`;

const Modal = styled.div`
    position: absolute;
    background-color: white;
    border: 1px solid black;
    z-index: 100;
    width: 500px;
    height: 250px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ModalArea = styled.div`
    text-align: left;
    margin-top: 5px;
    padding-left: 10px;
    padding-bottom: 20px;
`;

const WrongContainer = styled.div`
    position: absolute;
    top: 5px;
    left: 100px;
`;

const SubstituteContainer = styled.div`
    position: absolute;
    top: 51px;
    left: 100px;
`;

const EnterContainer = styled.div`
    position: absolute;
    top: 97px;
    left: 100px;
`;

const EnterInput = styled.input`
    width: 340px;
    height: 20px;
    font-size: 13px;
    border: 1px solid #dfe6e9;
    padding-left: 5px;
    font-family: "line";
`;

const HelpContainer = styled.div`
    position: absolute;
    top: 143px;
    left: 100px;
    border: 1px solid #dfe6e9;
    width: 380px;
    height: 85px;
    font-size: 13px;
    padding: 5px;
    overflow: auto;
`;

const CancelModalButton = styled.button`
    position: absolute;
    top: 2%;
    right: 2%;
    font-size: 20px;
    background-color: white;
    border: none;
    &:hover {
        cursor: pointer;
    }
`;

const ApplyModalButton = styled.button`
    margin-left: 5px;
    background-color: white;
    border: 1px solid #dfe6e9;
    width: 40px;
    height: 20px;
    &:hover {
        cursor: pointer;
    }
`;

const SaveModal = styled.div`
    position: absolute;
    background-color: white;
    border: 1px solid black;
    z-index: 100;
    width: 500px;
    height: 250px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const SaveModalArea = styled.div`
    text-align: center;
    margin-top: 60px;
    padding-left: 10px;
    padding-bottom: 20px;
    font-size: 20px;
`;

const SaveInput = styled.input`
    width: 340px;
    height: 30px;
    font-size: 16px;
    border: 1px solid #dfe6e9;
    padding-left: 5px;
    font-family: "line";
`;

const SaveModalButton = styled.button`
    margin-top: 20px;
    background-color: white;
    border: 1px solid #dfe6e9;
    width: 100px;
    height: 40px;
    &:hover {
        cursor: pointer;
    }
`;

export default Main;
