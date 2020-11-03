import { isRef } from 'vue-demi'
import { $ } from '../src'

describe('$', () => {
  it('ref', () => {
    const a = $(1)

    expect(isRef(a)).toBeTruthy()
    expect(a.value).toBe(1)
  })

  it('ref + object', () => {
    const a = $({ foo: 'bar' })

    expect(isRef(a)).toBeTruthy()
    expect(JSON.stringify(a.value)).toBe(JSON.stringify({ foo: 'bar' }))
  })

  it('unref', () => {
    const a = $(42)

    expect(isRef(a)).toBeTruthy()
    expect($(a)).toBe(42)
  })

  it('computed & set', () => {
    const a = $(42)
    const doubled = $(() => $(a) * 2)

    expect($(doubled)).toBe(84)

    $(a, 10)

    expect($(doubled)).toBe(20)
  })

  it('set ref to ref', () => {
    const a = $(42)
    const b = $(10)

    expect($(a)).toBe(42)
    expect($(b)).toBe(10)

    $(a, b)

    expect($(a)).toBe(10)
    expect($(b)).toBe(10)
  })

  it('watch', () => {
    const a = $(42)
    let count = 0

    const stop = $(a, () => count += 1, { immediate: true, flush: 'sync' })

    expect(count).toBe(1)

    $(a, 10)

    expect(count).toBe(2)

    stop()
  })
})
