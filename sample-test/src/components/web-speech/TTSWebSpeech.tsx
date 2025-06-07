import { useState } from "react";
import { useTTS } from "react-stt-tts";

export default function TTSWebSpeech() {
  const [text, setText] = useState("");
  const { start, stop } = useTTS();

  const handleSpeak = async () => {
    if (text.trim()) {
      const res = await start({
        text,
        onAudioStarted: () => {
          console.log("Audio started");
        },
        onAudioEnded: () => {
          console.log("Audio ended");
        },
      });

      console.log(res);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Web Speech API - Speech Synthesis (TTS)</h1>
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
            Text Input
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md h-32"
            placeholder="Enter text to convert to speech"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSpeak}
            disabled={!text.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Play
          </button>
          <button
            onClick={stop}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
