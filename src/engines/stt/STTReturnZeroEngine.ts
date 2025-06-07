import type { STTEngine, STTConfig, STTStartOptions } from "@/types/stt";

// TODO: Not implemented yet (Coming soon)
export default class STTReturnZeroEngine implements STTEngine {
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

    // Actual Return Zero integration will be implemented later
  }

  stop() {
    // Actual Return Zero stop logic will be implemented later
    console.log("Return Zero stop");
  }

  mute() {
    // Actual Return Zero mute logic will be implemented later
    console.log("Return Zero mute");
  }

  unmute() {
    // Actual Return Zero unmute logic will be implemented later
    console.log("Return Zero unmute");
  }
}
