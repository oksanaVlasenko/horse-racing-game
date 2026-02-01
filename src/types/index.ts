export const BASE_HORSE_SPEED = 230
export const CONDITION_NORMALIZATION_FACTOR = 100
export const SPEED_RANDOMNESS_BASE = 0.95
export const SPEED_RANDOMNESS_RANGE = 0.1

export const BOUNCE_TIME_MULTIPLIER = 0.02
export const BOUNCE_AMPLITUDE = 2

export const ROUND_DISTANCES = {
  1: 1200,
  2: 1400,
  3: 1600,
  4: 1800,
  5: 2000,
  6: 2200
} as const

export type MobilePanel = 'horses' | 'schedule' | 'results' | null

export interface IHorse {
  id: number;
  name: string;
  color: string;
  condition: number;
}

export type HorseCatalog = Record<number, IHorse>

export type HorseViewBase = Pick<IHorse, 'id' | 'name' | 'color'>

export type IHorseRuntime = HorseViewBase & {
  condition: number;
  time: number | null;
  position: number | null;
  displayPosition: number | null;
  bounce: number | null;
  progress: number | null;
}

export type RuntimeRound = IHorseRuntime[]

export interface IRoundResult {
  horseId: number;
  time: number;
  position: number;
}

export type RoundHistory = Record<number, IRoundResult>

export type RoundId = keyof typeof ROUND_DISTANCES
export type Distance = typeof ROUND_DISTANCES[keyof typeof ROUND_DISTANCES]
export interface IScheduleRound {
  roundId: RoundId;
  distance: Distance;
  participants: number[];
}

export type ScheduleRound = Record<RoundId, IScheduleRound>

export interface IHistoryRound extends IScheduleRound {
  time: number | null;
  position: number;
}

export type HistoryRound = Record<RoundId, IHistoryRound>

export type RoundViewBase = Pick<IScheduleRound, 'roundId' | 'distance'> 
export type HorseView = HorseViewBase & {
  time?: number | null | undefined;
  position?: number;
}
export type IRoundHorseView = RoundViewBase & {
  horses: HorseView[]
}
  
export type RoundHorseView = Record<RoundId, IRoundHorseView>

export interface RuntimeHorse extends IHorse {
  position: number
  finished: boolean
  finishTime: number
  progress: number
  displayPosition: number
  bounce: number
  speed: number
  phase: number
  place: number
}