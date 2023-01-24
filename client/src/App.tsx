import WebSocket from "./components/WebSocket";
import { WebSocketContextProvider } from "./contexts/WebSocketContext";
import { socket } from "./contexts/WebSocketContext";

function App() {
  return (
    <WebSocketContextProvider value={socket}>
      <WebSocket />
    </WebSocketContextProvider>
  );
}

export default App;
