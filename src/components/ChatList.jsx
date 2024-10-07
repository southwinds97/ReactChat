import React from 'react';
import '../css/ChatList.css';
import chaticon2 from "../images/chaticon2.jpg";

const ChatList = ({ rooms, onSelectRoom, onDeleteRoom }) => {
    return (
        <div className="chatList">
            <h2>채팅방 입장</h2>
            <div className="room_grid">
                {rooms.map((room) => (
                    <div className="room_area" key={room}>
                        <img src={chaticon2} alt="채팅방 이미지" />
                        <input type="text" placeholder="방명" value={room} readOnly />
                        <button className="join_btn" onClick={() => onSelectRoom(room)}>입장</button>
                        <button className="delete_btn" onClick={() => onDeleteRoom(room)}>삭제</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;