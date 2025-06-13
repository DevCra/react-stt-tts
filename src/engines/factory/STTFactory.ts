import {
  STTWebSpeechEngine,
  STTGoogleGeminiEngine,
  STTGoogleCloudV2Engine,
  STTAzureSpeechSDKEngine,
  STTAzureRealtimeAPIEngine,
  STTReturnZeroEngine,
} from "@/engines/stt";
import type { STTConfig, STTEngine } from "@/types/stt";

export default class STTFactory {
  static create(config: STTConfig): STTEngine {
    switch (config.model) {
      case "web-speech":
        return new STTWebSpeechEngine(config);
      case "google-gemini":
        return new STTGoogleGeminiEngine(config);
      case "google-cloud-v2":
        return new STTGoogleCloudV2Engine(config);
      case "azure-speech-sdk":
        return new STTAzureSpeechSDKEngine(config);
      case "azure-realtime-api":
        return new STTAzureRealtimeAPIEngine(config);
      case "return-zero":
        return new STTReturnZeroEngine(config);
      default:
        throw new Error(`Unsupported STT model: ${config.model}`);
    }
  }
}
