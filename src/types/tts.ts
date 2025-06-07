export type TTSModel =
  | "web-speech"
  | "web-audio"
  | "google-gemini"
  | "google-cloud"
  | "azure-speech-sdk"
  | "azure-realtime-api"
  | "naver-clova";

export interface TTSConfig {
  model: TTSModel;
  speaker?: string;
  apiKey?: string;
  voice?: string;
  language?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
}

export interface TTSEngine {
  getMediaStream(): MediaStream | null;
  getAnalyserNode(): AnalyserNode | null;
  start(options?: TTSStartOptions): Promise<TTSResult | void>;
  stop(): void;
}

export interface TTSStartOptions {
  text?: string;
  onMediaStream?: (stream: MediaStream | null) => void; // Media Stream transfer
  onAudioStarted?: () => void;
  onAudioEnded?: () => void;
  onError?: (error: unknown) => void;
}

export interface TTSResult {
  audio: Blob;
  duration: number;
}

export interface TTSHookResult {
  start: (options?: TTSStartOptions) => Promise<TTSResult | void>;
  stop: () => void;
  getAnalyserNode: () => AnalyserNode | null;
  mediaStream: MediaStream | null;
  isSpeaking: boolean;
}
