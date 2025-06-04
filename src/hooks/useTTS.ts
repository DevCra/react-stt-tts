import { useState, useCallback, useRef, useEffect } from "react";
import { useTTSConfig } from "@/providers/VoiceProvider";
import TTSFactory from "@/services/TTSFactory";
import type { TTSEngine, TTSHookResult, TTSResult, TTSStartOptions } from "@/types/tts";

export const useTTS = (): TTSHookResult => {
  const { ttsConfig } = useTTSConfig();

  const engineRef = useRef<TTSEngine | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const start = useCallback(async (options?: TTSStartOptions): Promise<TTSResult> => {
    setIsSpeaking(true);
    const result = await engineRef.current?.start(options);
    setIsSpeaking(false);

    if (!result) {
      throw new Error("Not existed TTS result.");
    }

    return result;
  }, []);

  const stop = useCallback(() => {
    setIsSpeaking(false);
    engineRef.current?.stop();
  }, []);

  useEffect(() => {
    engineRef.current = TTSFactory.create(ttsConfig.model, ttsConfig);
  }, [ttsConfig.model, ttsConfig]);

  return {
    start,
    stop,
    isSpeaking,
  };
};
