import type { STTEngine, STTConfig, STTStartOptions } from "@/types/stt";

// TODO: Not implemented yet (Coming soon)
export default class STTGoogleCloudV2Engine implements STTEngine {
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

    // Actual Google Cloud STT integration will be implemented later
  }

  stop() {
    // Actual Google Cloud STT stop logic
    console.log("Google Cloud STT stop");
  }

  mute() {
    // Actual Google Cloud STT mute logic
    console.log("Google Cloud STT mute");
  }

  unmute() {
    // Actual Google Cloud STT unmute logic
    console.log("Google Cloud STT unmute");
  }
}
