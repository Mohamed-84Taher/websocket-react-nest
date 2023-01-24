import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { WebSocketContext } from "../contexts/WebSocketContext";

const WebSocket = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useContext(WebSocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected!");
    });

    socket.on("onMessage", data => {
      console.log(data);
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  const onSubmit = () => {
    socket.emit("newMessage", value);
    setValue("");
  };

  return (
    <div>
      <div>
        <h1>Websocket Component</h1>
        <div>
          {messages.length === 0 ? (
            <p>No mssages</p>
          ) : (
            <div>
              {messages.map((message, i) => (
                <h5 key={i}>{message.content}</h5>
              ))}
            </div>
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default WebSocket;
