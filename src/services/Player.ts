// import type { TTSEngine, TTSResult, TTSConfig, TTSStartOptions } from "@/types/tts";

// // TODO: Not implemented yet (Coming soon)
// export default class TTSWebAudioEngine implements TTSEngine {
//   private config: TTSConfig;
//   private mediaStream: MediaStream | null = null;
//   private analyserNode: AnalyserNode | null = null;
//   private onAudioStarted?: () => void;
//   private onAudioEnded?: () => void;
//   private onError?: (error: unknown) => void;

//   constructor(config: TTSConfig) {
//     this.config = config;
//   }

//   // Analyze Waveform Data
//   getAnalyserNode(): AnalyserNode | null {
//     return this.analyserNode;
//   }

//   start(options?: TTSStartOptions): Promise<TTSResult> {
//     this.onAudioStarted = options?.onAudioStarted;
//     this.onAudioEnded = options?.onAudioEnded;
//     this.onError = options?.onError;

//     // Actual Web Audio API integration will be implemented later

//     return Promise.resolve({
//       audio: new Blob(),
//       text: options?.text || "",
//       duration: 0,
//     });
//   }

//   stop() {
//     // Actual Web Audio API stop logic will be implemented later
//   }
// }
