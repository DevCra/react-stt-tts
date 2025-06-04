import { useState, useCallback, useRef, useEffect } from "react";
import { useSTTConfig } from "@/providers/VoiceProvider";
import STTFactory from "@/services/STTFactory";
import type { STTEngine, STTHookResult, STTStartOptions } from "@/types/stt";

export const useSTT = (): STTHookResult => {
  const { sttConfig } = useSTTConfig();

  const engineRef = useRef<STTEngine | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isListening, setIsListening] = useState(false);

  const start = useCallback(async (options?: STTStartOptions) => {
    setIsListening(true);

    const startOptions: STTStartOptions = {
      ...options,
      ...(options?.onMediaStream
        ? options.onMediaStream
        : {
            onMediaStream: (stream) => {
              setMediaStream(stream);
            },
          }),
    };

    await engineRef.current?.start(startOptions);
  }, []);

  const stop = useCallback(() => {
    setIsListening(false);
    setMediaStream(null);
    engineRef.current?.stop();
    engineRef.current = null;
  }, []);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = STTFactory.create(sttConfig.model, sttConfig);
    }
  }, [sttConfig.model, sttConfig]);

  return {
    start,
    stop,
    mediaStream,
    isListening,
  };
};
