import type { STTEngine, STTConfig, STTStartOptions } from "@/types/stt";

// TODO: Not implemented yet (Coming soon)
export default class STTAzureRealtimeAPIEngine implements STTEngine {
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

    // Actual Azure Realtime API integration will be implemented later
  }

  stop() {
    // Actual Azure Realtime API stop logic will be implemented later
    console.log("Azure Realtime API stop");
  }

  mute() {
    // Actual Azure Realtime API mute logic will be implemented later
    console.log("Azure Realtime API mute");
  }

  unmute() {
    // Actual Azure Realtime API unmute logic will be implemented later
    console.log("Azure Realtime API unmute");
  }
}
