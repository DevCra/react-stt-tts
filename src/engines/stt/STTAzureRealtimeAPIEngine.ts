import type { STTEngine, STTConfig, STTStartOptions } from "@/types/stt";

// TODO: Not implemented yet (Coming soon)
export default class STTAzureRealtimeAPIEngine implements STTEngine {
  private config: STTConfig = {
    model: "azure-realtime-api",
    constraints: {
      audio: true,
    },
  };
  private mediaStream: MediaStream | null = null;
  private onMediaStream?: (stream: MediaStream | null) => void;
  private onAfterMicPermission?: () => void;
  private onRecognizing?: (text: string) => void;
  private onRecognized?: (text: string) => void;
  private onError?: (reason: string) => void;
  private onSessionStopped?: () => void;

  constructor(config: STTConfig) {
    this.config = config;
  }

  async getUserMedia(constraints: MediaStreamConstraints) {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Invalid media devices.");
      }

      await navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
        this.mediaStream = mediaStream;
        this.onMediaStream?.(this.mediaStream);
        this.onAfterMicPermission?.();
      });
    } catch (error) {
      throw new Error("Error accessing media devices: " + error);
    }
  }

  async start(options?: STTStartOptions) {
    this.onMediaStream = options?.onMediaStream;
    this.onAfterMicPermission = options?.onAfterMicPermission;
    this.onRecognizing = options?.onRecognizing;
    this.onRecognized = options?.onRecognized;
    this.onError = options?.onError;
    this.onSessionStopped = options?.onSessionStopped;

    if (!this.mediaStream && this.config.constraints) {
      await this.getUserMedia(this.config.constraints);
    }

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
