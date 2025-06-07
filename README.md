# react-stt-tts

React based Speech-to-Text and Text-to-Speech library with multiple engine support.

## Features

- Multiple STT (Speech-to-Text) engines support:
  - Web Speech API - Speech Recognition (Browser built-in) ✅
  - Web Audio API (Coming soon)
  - Google Gemini Live API (Coming soon)
  - Google Cloud V2 (Coming soon)
  - Azure Speech SDK (Coming soon)
  - Azure Realtime API (Coming soon)
  - Return Zero (Coming soon)
- Multiple TTS (Text-to-Speech) engines support:
  - Web Speech API - Speech Synthesis (Browser built-in) ✅
  - Web Audio API (Coming soon)
  - Google Gemini Live API (Coming soon)
  - Google Cloud (Coming soon)
  - Azure Speech SDK (Coming soon)
  - Azure Realtime API (Coming soon)
  - Naver Clova (Coming soon)
- React hooks for easy integration
- TypeScript support
- Tree-shakeable

## Requirements

- Node >= 18
- Npm >= 10

## Installation

```bash
npm install react-stt-tts
# or
yarn add react-stt-tts
# or
pnpm add react-stt-tts
```

## Samples - [StackBlitz](https://stackblitz.com/edit/vitejs-vite-luuiqllo?file=src%2FApp.tsx)

## Local Library Test

```bash
cd sample-test && pnpm local-test
```

## Usage

### Basic Usage with Web Speech API

```tsx
import { VoiceProvider, useSTT, useTTS } from "react-stt-tts";

const sttConfig = {
  model: "web-speech",
  language: "en-US", // English
  continuous: true, // Continuous recognition
  interimResults: true, // Show interim results
};

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
  const { start: startSTT, stop: stopSTT } = useSTT();
  const { start: startTTS, stop: stopTTS } = useTTS();

  return (
    <div>
      {/* STT Controls */}
      <button onClick={startSTT}>Start Speech Recognition</button>
      <button onClick={stopSTT}>Stop Speech Recognition</button>

      {/* TTS Controls */}
      <button onClick={() => startTTS({text: "Hello!")}}>Start Speech Synthesis</button>
      <button onClick={stopTTS}>Stop Speech Synthesis</button>
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
  constraints?: MediaStreamConstraints;
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
  speaker?: string;
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
const { sttConfig, ttsConfig, setSTTConfig, setTTSConfig } = useVoiceConfig();
```

### useSTTConfig Hook

```typescript
const { sttConfig, setSTTConfig } = useSTTConfig();
```

### useTTSConfig Hook

```typescript
const { ttsConfig, setTTSConfig } = useTTSConfig();
```

### useSTT Hook

```typescript
const {
  start, // Start speech recognition with options
  stop, // Stop speech recognition
  mute,
  unmute,
  mediaStream,
  isInitialized,
  isStarted,
  isMuted,
} = useSTT();

interface STTStartOptions {
  onMediaStream?: (stream: MediaStream | null) => void; // Media Stream transfer
  onAfterMicPermission?: () => void;
  onRecognizing?: (text: string) => void;
  onRecognized?: (text: string) => void;
  onCancelled?: (reason: string) => void;
  onEnded?: () => void;
  onSessionStopped?: () => void;
}
```

### useTTS Hook

```typescript
const {
  start, // Speak text with options
  stop, // Stop speaking
  analyserNode, // Waveform data
} = useTTS();

interface TTSStartOptions {
  text: string;
  onMediaStream?: (stream: MediaStream | null) => void; // Media Stream transfer
  onAudioStarted?: () => void;
  onAudioEnded?: () => void;
  onError?: (error: unknown) => void;
}

interface TTSResult {
  text: string;
  audio: Blob;
  duration: number;
}
```

## License

MIT
