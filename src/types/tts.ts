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
  start(options?: TTSStartOptions): Promise<TTSResult>;
  stop(): void;
}

export interface TTSStartOptions {
  text: string;
  onAudioStarted?: () => void;
  onAudioEnded?: () => void;
  onError?: (error: unknown) => void;
}

export interface TTSResult {
  audio: Blob;
  duration: number;
}

export interface TTSHookResult {
  start: (options?: TTSStartOptions) => Promise<TTSResult>;
  stop: () => void;
  isSpeaking: boolean;
}
