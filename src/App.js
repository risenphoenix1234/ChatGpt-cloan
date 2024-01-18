import "./App.css";
import gptLogo from "./assets/chatgptLogo.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToOpenAI } from "./openai";
import { useEffect, useRef, useState } from "react";

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am ChatGpt",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handlesend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);

    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      { text: input, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") handlesend();
  };

  const handleQuery = async (e) => {
    const text = e.target.value;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);

    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      { text: input, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">ChatATK</span>
          </div>
          <button
            className="midBtn"
            onClick={() => {
              window.location.reload();
            }}
          >
            {" "}
            <img src={addBtn} alt="newChat" className="addBtn" />
            New Chat
          </button>
          <div className="upperSideBottom">
            <button
              className="query"
              onClick={handleQuery}
              value={"what is react?"}
            >
              <img src={msgIcon} alt="Query" />
              What is REACT
            </button>
            <button className="query">
              <img
                src={msgIcon}
                alt="Query"
                onClick={handleQuery}
                value={"how to use chatGPT"}
              />
              How to use CHATATK
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="" className="listItemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="" className="listItemsImg" />
            Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="" className="listItemsImg" />
            Upgrade to pro
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          <div className="chat">
            <img className="chatImg" src={userIcon} alt="" />
            <p className="txt">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni cum
              itaque ut eveniet sint facilis nihil cumque
            </p>
          </div>
          <div className="chat bot">
            <img className="chatImg" src={gptImgLogo} alt="" />
            <p className="txt">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              odit molestiae explicabo? Obcaecati, cmodi r.
            </p>
          </div>
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                className="chatImg"
                src={message.isBot ? gptImgLogo : userIcon}
                alt=""
              />
              <p className="txt">{message.text}</p>
            </div>
          ))}

          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="send a message"
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />{" "}
            <button className="send" onClick={handlesend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>

          <p>
            ChatGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
