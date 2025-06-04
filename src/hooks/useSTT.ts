import { useState, useCallback, useRef, useEffect } from "react";
import { useSTTConfig } from "@/providers/VoiceProvider";
import STTFactory from "@/services/STTFactory";
import type { STTEngine, STTHookResult, STTStartOptions } from "@/types/stt";

export const useSTT = (): STTHookResult => {
  const { sttConfig } = useSTTConfig();

  const engineRef = useRef<STTEngine | null>(null);
  const [isListening, setIsListening] = useState(false);

  const start = useCallback(async (options?: STTStartOptions) => {
    setIsListening(true);
    await engineRef.current?.start(options);
  }, []);

  const stop = useCallback(() => {
    setIsListening(false);
    engineRef.current?.stop();
  }, []);

  useEffect(() => {
    engineRef.current = STTFactory.create(sttConfig.model, sttConfig);
  }, [sttConfig.model, sttConfig]);

  return {
    start,
    stop,
    isListening,
  };
};
