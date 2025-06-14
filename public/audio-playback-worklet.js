class AudioPlaybackWorklet extends AudioWorkletProcessor {
  constructor() {
    super();
    this.port.onmessage = this.handleMessage.bind(this);
    this.buffer = [];
    this.isPlaying = false;
  }

  handleMessage(event) {
    if (event.data === null) {
      this.buffer = [];
      this.isPlaying = false;
      return;
    }

    this.buffer.push(...event.data);
    this.isPlaying = true;
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    const channel = output[0];

    if (this.buffer.length > channel.length) {
      const toProcess = this.buffer.slice(0, channel.length);
      this.buffer = this.buffer.slice(channel.length);
      channel.set(toProcess.map((v) => v / 32_768));
    } else {
      channel.set(this.buffer.map((v) => v / 32_768));
      this.buffer = [];

      if (this.isPlaying) {
        this.port.postMessage("playback_complete");
        this.isPlaying = false;
      }
    }

    return true;
  }
}

registerProcessor("audio-playback-worklet", AudioPlaybackWorklet);
