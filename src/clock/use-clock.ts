export const CLOCK_INTERVAL = 25

var clockId: number | undefined = undefined
var tick = false
var isTicking = false

export function useClock (callback?: ClockCallback) {
  tick = false

  if (clockId && callback) {
    callback()
    tick = true
    clearInterval(clockId)
    clockId = setInterval(() => useClock(callback), CLOCK_INTERVAL)
  }

  const start = (callback: ClockCallback) => {
    if (!isTicking) {
      callback()
      tick = true
      isTicking = true
      clockId = setInterval(() => useClock(callback), CLOCK_INTERVAL)
    }
  }

  const stop = () => {
    if (isTicking) {
      tick =  false
      isTicking = false
      clearInterval(clockId)
    }
   }

  return({
    start,
    stop
  })
}