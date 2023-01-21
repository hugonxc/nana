import { playOscillatorOnTime } from "../audio-context/oscillator";
import { useAudioContext } from "../audio-context/use-audio-context";
import { insertNoteCallback, pause, removeNoteCallback, start, stop } from "../core/core";

const audioContext = useAudioContext()
var volume = 0.1
var frequency = 220
var beat = 0
var isEnabled = false
var noteResolution = 4

function playMetronome (time: number, currentBeat: number) {
  if (audioContext) {
    if (beat%noteResolution === 0) {
      playOscillatorOnTime({ 
        time, 
        beat, 
        frequency: beat === 0 ? 150 + frequency : frequency, 
        volume
      })
    }

    beat++
    if (beat === 16) {
      beat = 0
    }
  }
}


export function useMetronome () {
  const startMetronome = () => {
    isEnabled = true
    insertNoteCallback('metronome', playMetronome)
    start()
  }

  const pauseMetronome = () => {
    pause()
  }

  const stopMetronome = () => {
    isEnabled = false
    stop()
    removeNoteCallback('metronome')
  }

  const setVolume = (value: number) => {
    volume = value
  }

  const setFrequency = (value: number) => {
    frequency = value
  }

  const setNoteResolution= (value: number) => {
    noteResolution = value
  }

  const getBeat = () => {
    return beat
  }

  const toogle = () => {
    if (isEnabled) {
      removeNoteCallback('metronome')
    } else {
      insertNoteCallback('metronome', playMetronome)
    }

    isEnabled = !isEnabled
  }



  return ({
    start: startMetronome,
    pause: pauseMetronome,
    stop: stopMetronome,
    setVolume, 
    setFrequency,
    setNoteResolution,
    getBeat,
    toogle,
    isEnabled,
  })
}