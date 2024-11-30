export function randi() {
  return Math.floor(Math.random() * 2 ** 32);
}

export function dictWithoutSpecial<T>(obj: Record<string, T>): Record<string, T> {
  const result: Record<string, T> = {};
  for (const key in obj) {
    if (!key.startsWith("_")) {
      result[key] = obj[key] as T;
    }
  }
  return result;
}

export const isNotFish = (id: string) =>
  !((id.startsWith("fish_") && !id.startsWith("fish_trap")) || id.startsWith("wtrash_") || id === "luck_moneybag");
