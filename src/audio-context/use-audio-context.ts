var audioContext: AudioContext | undefined = undefined

export function useAudioContext() {
  if (typeof window !== "undefined") {
    audioContext = audioContext || new window.AudioContext()
    return audioContext
  }
  return undefined
}
