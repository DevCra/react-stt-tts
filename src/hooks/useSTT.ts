import { useState, useCallback, useRef, useEffect } from "react";
import { useSTTConfig } from "@/providers/VoiceProvider";
import STTFactory from "@/services/STTFactory";
import type { STTEngine, STTHookResult, STTStartOptions } from "@/types/stt";

export const useSTT = (): STTHookResult => {
  const { sttConfig } = useSTTConfig();

  const engineRef = useRef<STTEngine | null>(null);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const start = useCallback(async (options?: STTStartOptions) => {
    setIsInitialized(false);
    setIsListening(true);

    const startOptions: STTStartOptions = {
      ...options,
      onMediaStream: (stream) => {
        setMediaStream(stream);

        options?.onMediaStream?.(stream);
      },
    };

    await engineRef.current
      ?.start(startOptions)
      .then(() => {
        setIsInitialized(true);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const stop = useCallback(() => {
    setIsInitialized(false);
    setIsListening(false);
    setMediaStream(null);

    engineRef.current?.stop();
    engineRef.current = null;
  }, []);

  const mute = useCallback(() => {
    setIsMuted(true);
    engineRef.current?.mute();
  }, []);

  const unmute = useCallback(() => {
    setIsMuted(false);
    engineRef.current?.unmute();
  }, []);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = STTFactory.create(sttConfig);
    }
  }, [sttConfig]);

  return {
    start,
    stop,
    mute,
    unmute,
    mediaStream,
    isInitialized,
    isListening,
    isMuted,
  };
};
