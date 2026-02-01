import {
  createRuntimeHorses,
  applyTick
} from '@/engine/runtimeEngine'

jest.spyOn(Math, 'random').mockReturnValue(0)

describe('runtimeEngine', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('creates runtime horses with initial state', () => {
    const horses = [
      { id: 1, name: 'A', condition: 1 },
      { id: 2, name: 'B', condition: 2 }
    ] as any

    const result = createRuntimeHorses(horses)

    expect(result).toHaveLength(2)
    expect(result[0].position).toBe(0)
    expect(result[0].finished).toBe(false)
    expect(result[0].progress).toBe(0)
    expect(result[0].speed).toBeGreaterThan(0)
  })

  it('moves horses forward based on deltaTime', () => {
    const horses = createRuntimeHorses([
      { id: 1, name: 'A', condition: 1 }
    ] as any)

    applyTick(horses, 1000, 1000, 100)

    expect(horses[0].position).toBeGreaterThan(0)
    expect(horses[0].progress).toBeGreaterThan(0)
  })

  it('finishes horse when distance reached', () => {
    const horses = createRuntimeHorses([
      { id: 1, name: 'A', condition: 100 }
    ] as any)

    applyTick(horses, 10_000, 5000, 1)

    expect(horses[0].finished).toBe(true)
    expect(horses[0].position).toBe(1)
    expect(horses[0].progress).toBe(1)
  })

  it('calculates bounce value', () => {
    const horses = createRuntimeHorses([
      { id: 1, name: 'A', condition: 1 }
    ] as any)

    applyTick(horses, 100, 1000, 100)

    expect(typeof horses[0].bounce).toBe('number')
  })
})
