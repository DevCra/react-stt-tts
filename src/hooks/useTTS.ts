import { useState, useCallback, useRef, useEffect } from "react";
import { useTTSConfig } from "@/providers/VoiceProvider";
import TTSFactory from "@/services/TTSFactory";
import type { TTSEngine, TTSHookResult, TTSResult, TTSStartOptions } from "@/types/tts";

export const useTTS = (): TTSHookResult => {
  const { ttsConfig } = useTTSConfig();

  const engineRef = useRef<TTSEngine | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const start = useCallback(async (options?: TTSStartOptions): Promise<TTSResult | void> => {
    setIsSpeaking(true);

    const startOptions: TTSStartOptions = {
      ...options,
      ...(options?.onMediaStream
        ? options.onMediaStream
        : {
            onMediaStream: (stream) => {
              setMediaStream(stream);
            },
          }),
    };

    const result = await engineRef.current?.start(startOptions);

    setIsSpeaking(false);

    if (!result) {
      throw new Error("Not existed TTS result.");
    }

    return result;
  }, []);

  const stop = useCallback(() => {
    setIsSpeaking(false);
    setMediaStream(null);
    engineRef.current?.stop();
    engineRef.current = null;
  }, []);

  const getAnalyserNode = useCallback(() => {
    return engineRef.current?.getAnalyserNode() ?? null;
  }, []);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = TTSFactory.create(ttsConfig.model, ttsConfig);
    }
  }, [ttsConfig.model, ttsConfig]);

  return {
    start,
    stop,
    getAnalyserNode,
    mediaStream,
    isSpeaking,
  };
};
