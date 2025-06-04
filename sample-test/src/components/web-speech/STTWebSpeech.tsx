import { useRef, useState } from "react";
import { useSTT } from "react-stt-tts";

export default function STTWebSpeech() {
  const { start, stop, isListening } = useSTT();

  const [recognizedText, setRecognizedText] = useState("");
  const recognizedTextRef = useRef("");

  const handleStart = () => {
    start({
      onRecognizing: (text: string) => {
        setRecognizedText(recognizedTextRef.current + text);
        console.log("recognizing", text);
      },
      onRecognized: (text: string) => {
        recognizedTextRef.current += text + " ";
        setRecognizedText(recognizedTextRef.current);
        console.log("recognized", text);
      },
      onCancelled: (reason: string) => {},
    });
  };

  const handleStop = () => {
    stop();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Web Speech API - Speech Recognition (STT)</h1>
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 justify-center">
            <button
              onClick={isListening ? handleStop : handleStart}
              className={`px-4 py-2 rounded-lg font-medium ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isListening ? "Stop Recognition" : "Start Recognition"}
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded-lg min-h-[100px]">
            <p className="text-gray-800 whitespace-pre-wrap">{recognizedText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
