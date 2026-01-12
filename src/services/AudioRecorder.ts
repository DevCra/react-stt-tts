import type { Recorder } from "@/types/recorder";

export class AudioRecorder implements Recorder {
  private audioContext: AudioContext | null = null;
  private mediaStreamSource: MediaStreamAudioSourceNode | null = null;
  private workletNode: AudioWorkletNode | null = null;
  private onDataAvailable: (buffer: Iterable<number>) => void;

  public constructor(onDataAvailable: (buffer: Iterable<number>) => void) {
    this.onDataAvailable = onDataAvailable;
  }

  async start(mediaStream: MediaStream) {
    try {
      await this.audioContext?.close();

      this.audioContext = new AudioContext({ sampleRate: 24_000 });
      await this.audioContext.audioWorklet.addModule("./audio-processor-worklet.js");

      this.mediaStreamSource = this.audioContext.createMediaStreamSource(mediaStream);
      this.workletNode = new AudioWorkletNode(this.audioContext, "audio-processor-worklet");

      this.workletNode.port.onmessage = (event) => {
        this.onDataAvailable(event.data.buffer);
      };

      this.mediaStreamSource.connect(this.workletNode);
      this.workletNode.connect(this.audioContext.destination);
    } catch (error) {
      console.error("Failed to start recorder: " + error);
      this.stop();
    }
  }

  async stop() {
    await this.audioContext?.close();
    this.audioContext = null;
    this.mediaStreamSource = null;
    this.workletNode = null;
  }
}
