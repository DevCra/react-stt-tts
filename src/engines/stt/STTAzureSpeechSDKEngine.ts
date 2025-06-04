import type { STTEngine, STTConfig, STTStartOptions } from "@/types/stt";

// TODO: Not implemented yet (Coming soon)
export default class STTAzureSpeechSDKEngine implements STTEngine {
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

  getMediaStream(): MediaStream | null {
    return null;
  }

  async start(options?: STTStartOptions) {
    this.onMediaStream = options?.onMediaStream;
    this.onAfterMicPermission = options?.onAfterMicPermission;
    this.onRecognizing = options?.onRecognizing;
    this.onRecognized = options?.onRecognized;
    this.onCancelled = options?.onCancelled;
    this.onSessionStopped = options?.onSessionStopped;

    // Actual Azure Speech SDK integration will be implemented later
  }

  stop() {
    // Actual Azure Speech SDK stop logic
    console.log("Azure Speech SDK stop");
  }

  mute() {
    // Actual Azure Speech SDK mute logic
    console.log("Azure Speech SDK mute");
  }

  unmute() {
    // Actual Azure Speech SDK unmute logic
    console.log("Azure Speech SDK unmute");
  }
}
