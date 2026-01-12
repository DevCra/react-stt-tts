export interface Recorder {
  start(mediaStream: MediaStream): Promise<void>;
  stop(): Promise<void>;
}
