import React, { useEffect, useState } from "react";
import AllChats from "../components/Home/AllChats";
import ChatBox from "../components/Home/ChatBox";
import { io } from "socket.io-client";
import * as types from "../redux/appReducer/actionType";
import { useDispatch } from "react-redux";

// const ENDPOINT="http://localhost:8080"
const ENDPOINT="ws://localhost:8080"

function connectWebSocket() {
  const ws = new WebSocket(ENDPOINT);

  ws.onclose = () => {
    console.log("❌ WebSocket closed, retrying...");
    setTimeout(connectWebSocket, 2000); // retry after 2s
  };

  ws.onerror = (err) => {
    console.error("⚠️ WebSocket error:", err);
    ws.close();
  };

  return ws;
}

const Home = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [webSocket, setWebSocket] = useState(null);
  // const socket = io(ENDPOINT);
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem("chat-app-login-user-data")
    );
    
    const wss = connectWebSocket();
    setWebSocket(wss);
    
    wss.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsLoading(false);
      setSocketConnected(true);

      // send setup event manually as JSON
      wss.send(
        JSON.stringify({
          type: "setup",
          userId: userData._id, // adjust if your server expects full object
        })
      );
      dispatch({ type: types.WEB_SOCKET_CONNECTED, payload: wss });
    };

    wss.onmessage = (event) => {
      try {
        const msg = (typeof event.data !== "undefined" && event.data !== "") ? JSON.parse(event.data) : {};
        if (typeof msg.type !== "undefined" && msg.type === "connected") {
          console.log("🔗 Server acknowledged setup");
        }
        console.log("my new msg", msg);
        if (typeof msg.type !== "undefined" && msg.type === "message_received" && typeof msg.data !== "undefined") {
          console.log("📩 New message:", msg.data);
          dispatch({ type: types.WEB_SOCKET_CONNECTED, payload: wss });
        }
      } catch (err) {
        console.error("❌ Error parsing message:", err);
      }
    };

    dispatch({ type: types.WEB_SOCKET_CONNECTED, payload: wss });
    //return () => wss.close();

    /*socket.on("connect", () => {
      setIsLoading(false);
    });

    socket.emit("setup", userData);
    socket.on("connection", () => setSocketConnected(true));

    dispatch({ type: types.WEB_SOCKET_CONNECTED, payload: socket });*/

  }, [dispatch]);

  return (
    <div className="flex flex-wrap justify-between h-screen max-h-full">
      <div className="w-full h-full lg:w-1/4 bg-primary-400 hidden lg:block">
        {/* Conditional rendering based on the socket connection status */}
        {isLoading ? (
          <p></p>
        ) : (
          <AllChats />
        )}
      </div>
      <div className="w-full h-full lg:w-3/4 bg-primary-400 p-4">
        {/* Conditional rendering based on the socket connection status */}
        {isLoading ? (
          <p></p>
        ) : (
          <ChatBox />
        )}
      </div>
    </div>
  );
};

export default Home;
