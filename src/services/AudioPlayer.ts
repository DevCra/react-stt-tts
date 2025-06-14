import type { Player } from "@/types/player";

export class AudioPlayer implements Player {
  private playbackNode: AudioWorkletNode | null = null;
  private onPlayEnd?: () => void;

  async init(sampleRate: number) {
    const audioContext = new AudioContext({ sampleRate });
    await audioContext.audioWorklet.addModule("audio-playback-worklet.js");

    this.playbackNode = new AudioWorkletNode(audioContext, "audio-playback-worklet");

    this.playbackNode.connect(audioContext.destination);

    this.playbackNode.port.onmessage = (event) => {
      if (event.data === "playback_complete") {
        this.onPlayEnd?.();
      }
    };
  }

  play(buffer: Int16Array) {
    if (this.playbackNode) {
      this.playbackNode.port.postMessage(buffer);
    }
  }

  stop() {
    if (this.playbackNode) {
      this.playbackNode.port.postMessage(null);
    }
  }
}
