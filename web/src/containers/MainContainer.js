import React, { useEffect, useState } from "react";
import { spellCheck } from "../api/check";
import Main from "../components/Main";
import { useNavigate } from "react-router-dom";

const MainContainer = () => {
    const navigate = useNavigate();
    const initForm = {
        sentence: "",
    };

    const [form, setForm] = useState(initForm);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [typos, setTypos] = useState(0);
    const [result, setResult] = useState([]);
    const [tokens, setTokens] = useState(new Set());
    const [corrections, setCorrections] = useState([]);
    const [index, setIndex] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalDetail, setModalDetail] = useState(["", [], ""]);
    const [fixed, setFixed] = useState(new Set());
    const [direct, setDirect] = useState("");
    const [blankO, setBlankO] = useState(0);
    const [blankX, setBlankX] = useState(0);

    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;
        setForm((state) => ({ ...state, [name]: value }));
    };

    const onCheck = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const sentence = { ...form };
            const response = await spellCheck(sentence);
            const data = response.data.data;
            console.log(data);
            setTypos(data.length);

            const tokens = new Set();
            const corrections = [];

            for (let i = 0; i < data.length; i++) {
                tokens.add(data[i]["token"]);
                const correction = [
                    data[i]["token"],
                    data[i]["suggestions"],
                    data[i]["info"],
                ];
                corrections[i] = correction;
            }

            setTokens(tokens);
            setCorrections(corrections);

            let tmp = form.sentence;

            let line = tmp.indexOf("\n");
            while (line !== -1) {
                tmp = replaceAt(tmp, line, "*****<LineChange>*****", 21);
                line = tmp.indexOf("\n");
            }

            for (let item of tokens) {
                let index = tmp.indexOf(item);
                while (index !== -1) {
                    tmp = replaceAt(tmp, index, "*****" + item + "*****", 10);
                    index = tmp.indexOf(item, index + 10);
                }
            }

            setResult(tmp.split("*****"));

            setChecked(true);
            setLoading(false);
        } catch (e) {
            alert("맞춤법 검사 오류입니다.");
            setChecked(false);
            setLoading(false);
        }
    };

    const onFinish = async (e) => {
        e.preventDefault();

        setFixed(new Set());
        setChecked(false);
    };

    const onText = async (e) => {
        e.preventDefault();
        let list = e.target.parentElement.childNodes;
        const name = e.target.getAttribute("name");
        let id = 0;
        for (let i = 0; i < corrections.length; i++) {
            if (name === corrections[i][0]) {
                id = i;
                break;
            }
        }
        let indexList = [];
        for (let i = 0; i < list.length; i++) {
            if (name === list[i].getAttribute("name")) {
                indexList.push(Number(list[i].getAttribute("id")));
            }
        }
        setIndex(indexList);
        setModalDetail(corrections[id]);
        setModal(true);
    };

    const onXButton = async (e) => {
        e.preventDefault();
        setModal(false);
    };

    const onDirectChange = (e) => {
        setDirect(e.target.value);
    };

    const onDirectClick = async (e) => {
        e.preventDefault();
        let tmp = result;
        let tmpSet = fixed;
        for (let i = 0; i < index.length; i++) {
            tmp[index[i]] = direct;
            tmpSet.add(index[i]);
        }
        setFixed(tmpSet);
        setModal(false);
        setResult([...tmp]);
    };

    const onSuggestionClick = async (e) => {
        e.preventDefault();
        let tmp = result;
        let tmpSet = fixed;
        for (let i = 0; i < index.length; i++) {
            tmp[index[i]] =
                e.target.parentElement.firstChild.getAttribute("name");
            tmpSet.add(index[i]);
        }
        setFixed(tmpSet);
        setModal(false);
        setResult([...tmp]);
    };

    const onCopy = async (e) => {
        e.preventDefault();
        let text = "";
        let resultArea = e.target.parentElement.parentElement.childNodes[2];
        let list = resultArea.firstChild.childNodes;
        for (let i = 0; i < list.length; i++) {
            if (list[i].getAttribute("name") == null) continue;
            text += list[i].getAttribute("name");
        }
        navigator.clipboard.writeText(text);
    };

    const onSaveList = async (e) => {
        e.preventDefault();
        navigate("/list");
    };

    const replaceAt = (string, index, replacement, len) => {
        return (
            string.substr(0, index) +
            replacement +
            string.substr(index + replacement.length - len)
        );
    };

    useEffect(() => {
        let tmp = form["sentence"];
        tmp = tmp.replace(/(\s*)/g, "");
        setBlankO(form["sentence"].length);
        setBlankX(tmp.length);
    }, [form, checked]);

    useEffect(() => {
        let text = "";
        let textArea = document.getElementsByName("textArea");
        let list;
        if (textArea[0]) {
            list = textArea[0].childNodes;
            for (let i = 0; i < list.length; i++) {
                if (list[i].getAttribute("name") == null) continue;
                text += list[i].getAttribute("name");
            }
            let tmp = text;
            tmp = tmp.replace(/(\s*)/g, "");
            setBlankO(text.length);
            setBlankX(tmp.length);
        }
    }, [result]);

    return (
        <Main
            form={form}
            loading={loading}
            checked={checked}
            onCheck={onCheck}
            onChange={onChange}
            onFinish={onFinish}
            onText={onText}
            onXButton={onXButton}
            onDirectChange={onDirectChange}
            onDirectClick={onDirectClick}
            onSuggestionClick={onSuggestionClick}
            onCopy={onCopy}
            onSaveList={onSaveList}
            typos={typos}
            tokens={tokens}
            result={result}
            modal={modal}
            modalDetail={modalDetail}
            fixed={fixed}
            blankO={blankO}
            blankX={blankX}
        />
    );
};

export default MainContainer;
