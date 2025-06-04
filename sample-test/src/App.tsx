import STTWebSpeech from "./components/web-speech/STTWebSpeech";
import TTSWebSpeech from "./components/web-speech/TTSWebSpeech";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <STTWebSpeech />
      <TTSWebSpeech />
    </div>
  );
}

export default App;
