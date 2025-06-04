import {
  STTWebSpeechEngine,
  STTAzureSpeechSDKEngine,
  STTGoogleCloudV2Engine,
  STTReturnZeroEngine,
} from "@/engines/stt";
import type { STTConfig, STTEngine, STTModel } from "@/types/stt";

export default class STTFactory {
  static create(model: STTModel, config: STTConfig): STTEngine {
    switch (model) {
      case "web-speech":
        return new STTWebSpeechEngine(config);
      case "azure-speech-sdk":
        return new STTAzureSpeechSDKEngine(config);
      case "google-cloud-v2":
        return new STTGoogleCloudV2Engine(config);
      case "return-zero":
        return new STTReturnZeroEngine(config);
      default:
        throw new Error(`Unsupported STT model: ${model}`);
    }
  }
}
