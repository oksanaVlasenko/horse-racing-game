import {
  IHorse,
  Distance,
  BASE_HORSE_SPEED,
  CONDITION_NORMALIZATION_FACTOR,
  SPEED_RANDOMNESS_BASE,
  SPEED_RANDOMNESS_RANGE,
  BOUNCE_TIME_MULTIPLIER,
  BOUNCE_AMPLITUDE,
  RuntimeHorse
} from '@/types'

export function createRuntimeHorses(horses: IHorse[]): RuntimeHorse[] {
  return horses.map(h => ({
    ...h,
    position: 0,
    finished: false,
    finishTime: 0,
    progress: 0,
    displayPosition: 0,
    bounce: 0,
    speed:
      BASE_HORSE_SPEED *
      (h.condition / CONDITION_NORMALIZATION_FACTOR) *
      (SPEED_RANDOMNESS_BASE + Math.random() * SPEED_RANDOMNESS_RANGE),
    phase: Math.random() * Math.PI * 2,
    place: 0
  }))
}

export function applyTick(
  horses: RuntimeHorse[],
  deltaTimeMs: number,
  currentTime: number,
  distance: Distance
): number {
  let finishedCount = 0

  horses.forEach(h => {
    if (!h.finished) {
      h.position += h.speed * (deltaTimeMs / 1000)

      if (h.position >= distance) {
        h.position = distance
        h.finished = true
        h.finishTime = currentTime
        finishedCount++
      }

      h.progress = Math.min(h.position / distance, 1)
      h.bounce =
        Math.sin(currentTime * BOUNCE_TIME_MULTIPLIER + h.phase) *
        BOUNCE_AMPLITUDE
    }
  })

  return finishedCount
}
