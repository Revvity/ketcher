export function base64Encode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  return bytesToBase64(bytes);
}

export function base64Decode(base64: string): string {
  const bytes = base64ToBytes(base64);
  return new TextDecoder().decode(bytes);
}

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

export function base64ToBytes(base64: string): Uint8Array {
  return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
}
