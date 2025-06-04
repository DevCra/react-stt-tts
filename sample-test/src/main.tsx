import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { VoiceProvider } from "react-stt-tts";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VoiceProvider
      sttConfig={{ model: "web-speech", continuous: true, interimResults: true }}
      ttsConfig={{ model: "web-speech" }}
    >
      <App />
    </VoiceProvider>
  </StrictMode>,
);
