export function stopwatch(setTimeLeft: (value:number) => void) {

  let startTime: number
  let currentTime: number
  let duration: number = 5

  const delay = (seconds: number) => new Promise(res => setTimeout(res, 1000 * seconds));

  const timePassed = () => {
    currentTime = Date.now()
    return currentTime - startTime
  }

  const returnTimeLeft = async () => {
    let timeLeft:number = duration
    while (timeLeft > 0) {
      await delay(0.5);
      timeLeft = duration * 1000 - timePassed()
      if (timeLeft > 0) {
        return timeLeft
      }
    }
  }
  returnTimeLeft().then()
}

