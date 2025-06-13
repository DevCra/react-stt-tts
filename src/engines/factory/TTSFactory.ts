import {
  TTSWebSpeechEngine,
  TTSGoogleGeminiEngine,
  TTSGoogleCloudEngine,
  TTSAzureSpeechSDKEngine,
  TTSAzureRealtimeAPIEngine,
  TTSNaverClovaEngine,
} from "@/engines/tts";
import type { TTSConfig, TTSEngine } from "@/types/tts";

export default class TTSFactory {
  static create(config: TTSConfig): TTSEngine {
    switch (config.model) {
      case "web-speech":
        return new TTSWebSpeechEngine(config);
      case "google-gemini":
        return new TTSGoogleGeminiEngine(config);
      case "google-cloud":
        return new TTSGoogleCloudEngine(config);
      case "azure-speech-sdk":
        return new TTSAzureSpeechSDKEngine(config);
      case "azure-realtime-api":
        return new TTSAzureRealtimeAPIEngine(config);
      case "naver-clova":
        return new TTSNaverClovaEngine(config);
      default:
        throw new Error(`Unsupported TTS model: ${config.model}`);
    }
  }
}
