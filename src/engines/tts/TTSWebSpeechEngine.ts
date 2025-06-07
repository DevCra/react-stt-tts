import type { TTSEngine, TTSResult, TTSConfig, TTSStartOptions } from "@/types/tts";

export default class TTSWebSpeechEngine implements TTSEngine {
  private config: TTSConfig;
  private mediaStream: MediaStream | null = null;
  private analyserNode: AnalyserNode | null = null;
  private onMediaStream?: (stream: MediaStream | null) => void;
  private onAudioStarted?: () => void;
  private onAudioEnded?: () => void;
  private onError?: (error: unknown) => void;

  constructor(config: TTSConfig) {
    this.config = config;
  }

  getMediaStream(): MediaStream | null {
    return this.mediaStream;
  }

  // Analyze Waveform Data
  getAnalyserNode(): AnalyserNode | null {
    return this.analyserNode;
  }

  async start(options?: TTSStartOptions): Promise<TTSResult | void> {
    this.onMediaStream = options?.onMediaStream;
    this.onAudioStarted = options?.onAudioStarted;
    this.onAudioEnded = options?.onAudioEnded;
    this.onError = options?.onError;

    if (!("speechSynthesis" in window)) {
      throw new Error("Speech synthesis is not supported in this browser.");
    }

    const utterance = new SpeechSynthesisUtterance(options?.text || "");

    utterance.lang = this.config.language || "en-US";
    utterance.voice = this.config.voice
      ? window.speechSynthesis.getVoices().find((voice) => voice.name === this.config.voice) || null
      : null;
    utterance.pitch = this.config.pitch || 1;
    utterance.rate = this.config.rate || 1;
    utterance.volume = this.config.volume || 1;

    const startTime = Date.now();

    utterance.onend = () => {
      return {
        audio: new Blob([], { type: "audio/wav" }),
        duration: Date.now() - startTime,
      };
    };

    utterance.onerror = (event) => {
      this.onError?.(new Error("Speech synthesis error: " + event.error));
    };

    window.speechSynthesis.speak(utterance);
  }

  stop() {
    window.speechSynthesis.cancel();
  }
}
