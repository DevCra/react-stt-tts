export type STTModel =
  | "web-speech"
  | "web-audio"
  | "google-gemini"
  | "google-cloud-v2"
  | "azure-speech-sdk"
  | "azure-realtime-api"
  | "return-zero";

export interface STTConfig {
  model: STTModel;
  apiKey?: string;
  token?: string;
  region?: string;
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
  constraints?: MediaStreamConstraints;
}

export interface STTEngine {
  getMediaStream(): MediaStream | null;
  start(options?: STTStartOptions): Promise<void>;
  stop(): void;
  mute(): void;
  unmute(): void;
}

export interface STTStartOptions {
  onMediaStream?: (stream: MediaStream | null) => void; // Media Stream transfer
  onAfterMicPermission?: () => void;
  onRecognizing?: (text: string) => void;
  onRecognized?: (text: string) => void;
  onCancelled?: (reason: string) => void;
  onEnded?: () => void;
  onSessionStopped?: () => void;
}

export interface STTHookResult {
  start: (options?: STTStartOptions) => Promise<void>;
  stop: () => void;
  mediaStream: MediaStream | null;
  isListening: boolean;
}
