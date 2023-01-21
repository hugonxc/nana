import { useAudioContext } from "../audio-context/use-audio-context";
import { useClock } from "../clock/use-clock";

const audioContext = useAudioContext()
const clock = useClock()
const scheduleAheadTime = 0.1

var BPM = 60
var secondsPerBeat = 60.0 / BPM
var nextNoteTime = 0.0
var beatCounter = 0
var noteCallbackQueue: Record<string, NoteCallback> = {}

function nextNote () {
  nextNoteTime += 0.25 * secondsPerBeat
  beatCounter++
}

export function scheduleNote (time: number) {
  if (audioContext) {
    for (var key in noteCallbackQueue) {
      if (noteCallbackQueue.hasOwnProperty(key)){
        const fn = noteCallbackQueue[key]
        if (noteCallbackQueue[key]) {
          fn(time, beatCounter)
        }
      }
    }
  }
}

export function start () {
  audioContext?.resume()

  clock.start(() => {
    if (audioContext) {
      while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
        scheduleNote(nextNoteTime)
        nextNote()
      }
    }
  })
}

export function pause () {
  audioContext?.suspend()
  clock.stop()
}

export function stop () {
  audioContext?.suspend()
  clock.stop()
  beatCounter = 0
}

export function getBeat() {
  return beatCounter
}

export function insertNoteCallback(name:string, noteCallback: NoteCallback) {
  noteCallbackQueue[name] = noteCallback
}

export function removeNoteCallback(name: string) {
  delete noteCallbackQueue[name]
}

export function setBPM(value: number) {
  secondsPerBeat = 60.0 / value
}

export function useCore () {
  return { start, pause, stop, setBPM, getBeat }
}