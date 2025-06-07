import { useState, useCallback, useRef } from "react";
import { useTTSConfig } from "@/providers/VoiceProvider";
import TTSFactory from "@/services/TTSFactory";
import type { TTSEngine, TTSHookResult, TTSResult, TTSStartOptions } from "@/types/tts";

export const useTTS = (): TTSHookResult => {
  const { ttsConfig } = useTTSConfig();

  const engineRef = useRef<TTSEngine | null>(null);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const start = useCallback(
    async (options?: TTSStartOptions): Promise<TTSResult | void> => {
      if (!engineRef.current) {
        engineRef.current = TTSFactory.create(ttsConfig);
      }

      const startOptions: TTSStartOptions = {
        ...options,
        onMediaStream: (stream) => {
          setMediaStream(stream);

          options?.onMediaStream?.(stream);
        },
      };

      const result = await engineRef.current?.start(startOptions);

      if (!result) {
        throw new Error("Not existed TTS result.");
      }

      return result;
    },
    [ttsConfig],
  );

  const stop = useCallback(() => {
    setMediaStream(null);

    engineRef.current?.stop();
    engineRef.current = null;
  }, []);

  const getAnalyserNode = useCallback(() => {
    return engineRef.current?.getAnalyserNode() ?? null;
  }, []);

  return {
    start,
    stop,
    getAnalyserNode,
    mediaStream,
  };
};
