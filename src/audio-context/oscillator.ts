import { useAudioContext } from "./use-audio-context";

const audioContext = useAudioContext()

type PlayOscillatorOnTimeInput = {
  time: number
  beat: number
  frequency: number
  volume: number
}

export function playOscillatorOnTime (input: PlayOscillatorOnTimeInput) {
  if (audioContext) {
    var osc = audioContext.createOscillator();
    osc.frequency.value = input.frequency
  
    var gain = audioContext.createGain()
    gain.gain.value = input.volume
  
  
    osc.connect(gain)
    gain.connect(audioContext.destination)
  
    osc.start(input.time)
    osc.stop(input.time + 0.05)
  }
}