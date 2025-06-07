import type { STTEngine, STTConfig, STTStartOptions } from "@/types/stt";

// TODO: Not implemented yet (Coming soon)
export default class STTGoogleGeminiEngine implements STTEngine {
  private config: STTConfig;
  private mediaStream: MediaStream | null = null;
  private onMediaStream?: (stream: MediaStream | null) => void;
  private onAfterMicPermission?: () => void;
  private onRecognizing?: (text: string) => void;
  private onRecognized?: (text: string) => void;
  private onCancelled?: (reason: string) => void;
  private onSessionStopped?: () => void;

  constructor(config: STTConfig) {
    this.config = config;
  }

  async start(options?: STTStartOptions) {
    this.onMediaStream = options?.onMediaStream;
    this.onAfterMicPermission = options?.onAfterMicPermission;
    this.onRecognizing = options?.onRecognizing;
    this.onRecognized = options?.onRecognized;
    this.onCancelled = options?.onCancelled;
    this.onSessionStopped = options?.onSessionStopped;

    // Actual Google Gemini integration will be implemented later
  }

  stop() {
    // Actual Google Gemini stop logic will be implemented later
    console.log("Google Gemini stop");
  }

  mute() {
    // Actual Google Gemini mute logic will be implemented later
    console.log("Google Gemini mute");
  }

  unmute() {
    // Actual Google Gemini unmute logic will be implemented later
    console.log("Google Gemini unmute");
  }
}
