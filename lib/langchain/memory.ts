// memoryStore.ts
const memoryStore: Record<string, string[]> = {};

export function getMemory(sessionId: string): string[] {
  return memoryStore[sessionId] || [];
}

export function saveMemory(sessionId: string, message: string) {
  if (!memoryStore[sessionId]) {
    memoryStore[sessionId] = [];
  }
  memoryStore[sessionId].push(message);
}
