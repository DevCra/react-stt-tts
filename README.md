# react-stt-tts

React based Speech-to-Text and Text-to-Speech library with multiple engine support.

## Features

- Multiple STT (Speech-to-Text) engines support:
  - Web Speech API - Speech Recognition (Browser built-in) ✅
  - Web Audio API
  - Google Gemini Live API (Coming soon)
  - Google Cloud V2 (Coming soon)
  - Azure Speech SDK (Coming soon)
  - Azure Realtime API (Coming soon)
  - Return Zero (Coming soon)
- Multiple TTS (Text-to-Speech) engines support:
  - Web Speech API - Speech Synthesis (Browser built-in) ✅
  - Web Audio API
  - Google Gemini Live API (Coming soon)
  - Google Cloud (Coming soon)
  - Azure Speech SDK (Coming soon)
  - Azure Realtime API (Coming soon)
  - Naver Clova (Coming soon)
- React hooks for easy integration
- TypeScript support
- Tree-shakeable

## Installation

```bash
npm install react-stt-tts
# or
yarn add react-stt-tts
# or
pnpm add react-stt-tts
```

## Samples - [StackBlitz](https://stackblitz.com/edit/vitejs-vite-luuiqllo?file=src%2FApp.tsx)

## Usage

### Basic Usage with Web Speech API

```tsx
import { VoiceProvider, useSTT, useTTS } from "react-stt-tts";

// STT Configuration
const sttConfig = {
  model: "web-speech",
  language: "en-US", // English
  continuous: true, // Continuous recognition
  interimResults: true, // Show interim results
};

// TTS Configuration
const ttsConfig = {
  model: "web-speech",
  language: "en-US", // English
  rate: 1, // Speaking rate
  pitch: 1, // Pitch
  volume: 1, // Volume
};

function App() {
  return (
    <VoiceProvider sttConfig={sttConfig} ttsConfig={ttsConfig}>
      <YourComponent />
    </VoiceProvider>
  );
}

function YourComponent() {
  // Using STT hook
  const { start: startSTT, stop: stopSTT, isListening } = useSTT();
  // Using TTS hook
  const { start: startTTS, stop: stopTTS, isSpeaking } = useTTS();

  return (
    <div>
      {/* STT Controls */}
      <button onClick={startSTT} disabled={isListening}>
        Start Speech Recognition
      </button>
      <button onClick={stopSTT} disabled={!isListening}>
        Stop Speech Recognition
      </button>

      {/* TTS Controls */}
      <button onClick={() => startTTS("Hello!")} disabled={isSpeaking}>
        Speak
      </button>
      <button onClick={stopTTS} disabled={!isSpeaking}>
        Stop
      </button>
    </div>
  );
}
```

## API Reference

### VoiceProvider Props

| Prop      | Type      | Description                      |
| --------- | --------- | -------------------------------- |
| sttConfig | STTConfig | STT initial engine configuration |
| ttsConfig | TTSConfig | TTS initial engine configuration |
| children  | ReactNode | React child components           |

### STTConfig Type

```typescript
interface STTConfig {
  model:
    | "web-speech"
    | "web-audio"
    | "google-gemini"
    | "google-cloud-v2"
    | "azure-speech-sdk"
    | "azure-realtime-api"
    | "return-zero";
  apiKey?: string;
  token?: string;
  region?: string;
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}
```

### TTSConfig Type

```typescript
interface TTSConfig {
  model:
    | "web-speech"
    | "web-audio"
    | "google-gemini"
    | "google-cloud-v2"
    | "azure-speech-sdk"
    | "azure-realtime-api"
    | "return-zero";
  apiKey?: string;
  voice?: string;
  language?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
}
```

### useVoiceConfig Hook

```typescript
const {
  sttConfig, // Current STT configuration
  ttsConfig, // Current TTS configuration
  setSTTConfig, // Function to update STT configuration
  setTTSConfig, // Function to update TTS configuration
} = useVoiceConfig();
```

### useSTTConfig Hook

```typescript
const {
  sttConfig, // Current STT configuration
  setSTTConfig, // Function to update STT configuration
} = useSTTConfig();
```

### useTTSConfig Hook

```typescript
const {
  ttsConfig, // Current TTS configuration
  setTTSConfig, // Function to update TTS configuration
} = useTTSConfig();
```

### useSTT Hook

```typescript
const {
  start, // Start speech recognition with options
  stop, // Stop speech recognition
  isListening, // Whether listening
} = useSTT();

// STTStartOptions interface
interface STTStartOptions {
  onMediaStream?: (stream: MediaStream | null) => void;
  onAfterMicPermission?: () => void;
  onRecognizing?: (text: string) => void;
  onRecognized?: (text: string) => void;
  onCancelled?: (reason: string) => void;
  onSessionStopped?: () => void;
}
```

### useTTS Hook

```typescript
const {
  start, // Speak text with options
  stop, // Stop speaking
  isSpeaking, // Whether speaking
} = useTTS();

// TTSStartOptions interface
interface TTSStartOptions {
  text: string;
  onAudioStarted?: () => void;
  onAudioEnded?: () => void;
  onError?: (error: unknown) => void;
}

// TTSResult interface
interface TTSResult {
  audio: Blob;
  duration: number;
}
```

## License

MIT
