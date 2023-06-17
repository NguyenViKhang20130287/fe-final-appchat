// import WebSocket from "ws";

const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

// Export kết nối WebSocket để sử dụng trong các file khác
export default socket;
