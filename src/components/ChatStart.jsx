import { useRef, useState, useEffect } from "react";
import { ref, onValue, remove } from "firebase/database";
import { realtime } from "../realtimeConfig";
import ChatList from "./ChatList";

const ChatStart = () => {
  const refRoom = useRef();
  const refId = useRef();
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 10;
  const maxPageButtons = 5;

  // open함수를 통해 채팅창을 팝업으로 열어준다.
  const openChatWin = (roomId) => {
    const room =
      roomId || (refRoom.current ? refRoom.current.value : "defaultRoom");
    const userId = refId.current ? refId.current.value : "구직타이거";
    window.open(
      `/chat/talk?roomId=${room}&userId=${userId}`,
      "",
      "width=500, height=700"
    );
  };

  // Firebase Realtime Database에서 방 목록 가져오기
  useEffect(() => {
    const dbRef = ref(realtime);
    onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        const roomList = data ? Object.keys(data) : [];
        setRooms(roomList);
      },
      (error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    );
  }, []);

  // 방 삭제 함수
  const handleDeleteRoom = (room) => {
    const roomRef = ref(realtime, room);
    remove(roomRef)
      .then(() => {
        setRooms((prevRooms) => prevRooms.filter((r) => r !== room));
      })
      .catch((error) => {
        console.error("방 삭제 중 오류 발생:", error);
      });
  };

  // 검색어에 따라 필터링된 방 목록
  const filteredRooms = rooms.filter((room) =>
    room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지네이션을 위한 현재 페이지의 방 목록
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 총 페이지 수
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  // 페이지네이션 버튼 생성
  const renderPageButtons = () => {
    const pageButtons = [];
    const startPage =
      Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1;
    const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    if (startPage > 1) {
      pageButtons.push(
        <button key="prev" onClick={() => paginate(startPage - 1)}>
          &lt;
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pageButtons.push(
        <button key="next" onClick={() => paginate(endPage + 1)}>
          &gt;
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="App">
      <div className="container">
        <div className="chatManager">
          <br />
          방명 :
          <select name="roomId" ref={refRoom}>
            {currentRooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <br />
          대화명 :{" "}
          <input type="text" name="userId" value="구직타이거" readOnly /> <br />
          <button type="button" onClick={() => openChatWin()}>
            채팅시작
          </button>
          <br />
          검색 :{/* 검색 입력 필드 */}
          <input
            type="text"
            placeholder="방명 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <ChatList
          rooms={currentRooms}
          onSelectRoom={openChatWin}
          onDeleteRoom={handleDeleteRoom}
        />
      </div>
      {/* 페이지네이션 버튼 */}
      <div className="pagination">{renderPageButtons()}</div>
    </div>
  );
};

export default ChatStart;
