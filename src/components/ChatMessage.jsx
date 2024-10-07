import "../css/Chat.css";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { realtime } from "../realtimeConfig";
import { child, onValue, push, ref, set } from "firebase/database";
import chaticon1 from "../images/chaticon1.png";
import chaticon2 from "../images/chaticon2.jpg";
import close_icon from "../images/close_icon.svg";

const scrollTop = (chatWindow) => {
  // console.log("scrollTop 호출됨");
  if (chatWindow) {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
};

function ChatMessage() {
  // 쿼리스트링으로 전달된 파라미터를 조작할 때 사용하는 라우터 훅
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  // 2개의 파라미터를 읽어온다.
  const userId = searchParams.get("userId");
  // 채팅내역이 보여지는 부분의 DOM 참조
  const chatWindow = useRef();
  // 채팅 데이터 저장용 State
  const [chatData, setChatData] = useState("");

  // 작성시간을 표시하는 함수
  const getTime = () => {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    return `${hours}:${minutes}`;
  };

  // Realtime에 대화내역 저장
  function messageWrite(chatRoom, chatId, chatMessage) {
    // 고유키 생성
    const newPostKey = push(child(ref(realtime), "tempValue")).key;
    // '방명' 하위에 '고유키'로 구분하여 대화내역을 입력
    set(ref(realtime, chatRoom + "/" + newPostKey), {
      id: chatId,
      message: chatMessage,
      time: getTime(),
    });
    // console.log("입력성공");
  }

  // Realtime 리스너 정의
  const dbRef = ref(realtime, roomId);
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      let showDiv = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.id === userId) {
          // 내가 보낸 메세지는 우측으로 정렬
          showDiv.push(
            <>
              <p
                className="my_name"
                style={{ margin: "0", padding: "5px" }}
              >
                {childData.id}
              </p>
              <div className="my_message_wrap">
                <div>
                  <p className="my_message" >
                    {childData.message}
                  </p>
                  <p class="my_message_time">
                    {childData.time}
                  </p>
                </div>
                <img
                  src={chaticon2}
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
              </div >
            </>
          );
        } else {
          // 상대방이 보낸 메세지는 좌측으로 정렬
          showDiv.push(
            <>
              <p
                className="other_name"
                style={{ margin: "0", padding: "5px" }}
              >
                {childData.id}
              </p>
              <div className="other_message_wrap">
                <img
                  src={chaticon1}
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div>
                  <p className="other_message">
                    {childData.message}
                  </p>
                  <p className="other_message_time">
                    {childData.time}
                  </p>
                </div>
              </div>
            </>
          );
        }
      });
      // State를 변경해서 대화내역을 새롭게 렌더링한다.
      setChatData(showDiv);
      // 스크롤바를 제일 아래로 내려줌
      scrollTop(chatWindow.current);
    });
  }, [chatData]);

  const handleClose = () => {
    window.parent.postMessage("closeModal", "*");
  };

  return (
    <>
      <div className="App">
        <div
          className="chat_header"
        >
          <div className="chat_title_wrap" >
            <span style={{ color: "white" }}>구직타이거 문의</span>
            <button
              onClick={handleClose}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <img src={close_icon} alt="Close Icon" />
            </button>
          </div>
        </div>
        <div id="collapseExample">
          <div
            className="chat_body"
            id="chatWindow"
            style={{ minHeight: "500px", overflow: "auto", }}
            ref={chatWindow}
          >
            {chatData}
          </div>
        </div>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let chatRoom = e.target.chatRoom.value;
            let chatId = e.target.chatId.value;
            if (chatId === "") {
              alert("대화명을 입력하세요.");
              return;
            }
            let message = e.target.message.value;
            if (message === "") {
              alert("메시지를 입력하세요.");
              return;
            }
            // console.log("submit", chatRoom, chatId, message);
            // 입력한 폼값을 정리해서 Realtime에 입력
            messageWrite(chatRoom, chatId, message);
            // 입력이 완료되면 <input>을 비워준다.
            e.target.message.value = "";
          }}
        >
          <div
            className="chat_input_wrap"
            style={{ width: "100%" }}
          >
            <input type="hidden" name="chatRoom" value={roomId} />
            <input type="hidden" name="chatId" value={userId} />
            <input
              type="text"
              name="message"
              class="chat_input"
              id="exampleFormControlInput3"
              style={{ width: "100%" }}
            />
            <button
              type="submit"
              className="chat_btn"
            >
              전송
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChatMessage;
