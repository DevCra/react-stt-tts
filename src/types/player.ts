export interface Player {
  play(buffer: Int16Array): void;
  stop(): void;
}
