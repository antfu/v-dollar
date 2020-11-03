import { ref, isRef, unref, computed, WatchOptions, watch, WatchSource, WatchCallback, Ref, ComputedRef, WatchStopHandle } from 'vue-demi'

declare type MapSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V> ? Immediate extends true ? (V | undefined) : V : T[K] extends object ? Immediate extends true ? (T[K] | undefined) : T[K] : never;
}

// Overload 1: unref
export function $<T>(ref: Ref<T>): T

// Overload 2: set value to ref
export function $<T>(ref: Ref<T>, value: T): void

// Overload 3: set ref to ref
export function $<T>(ref: Ref<T>, source: Ref<T>): void

// Overload 4: computed
export function $<T>(r: ((...args: any) => T)): ComputedRef<T>

// Overload 5: watch array source
export function $<T extends Readonly<Array<WatchSource<unknown> | object>>, Immediate extends Readonly<boolean> = false>(sources: T, cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>, options?: WatchOptions<Immediate>): WatchStopHandle

// Overload 6: watch ref
export function $<T, Immediate extends Readonly<boolean> = false>(source: WatchSource<T>, cb: WatchCallback<T, Immediate extends true ? (T | undefined) : T>, options?: WatchOptions<Immediate>): WatchStopHandle

// Overload 7: ref
export function $<T>(r: T): Ref<T>

// Implementation
export function $(r: any, v?: any, options?: any): any {
  // watch
  if (arguments.length >= 2 && typeof v === 'function') {
    return watch(r, v, options)
  }
  // set / copy
  else if (arguments.length === 2 && isRef(r)) {
    r.value = unref(v)
    return
  }
  else if (arguments.length === 1) {
    // computed
    if (typeof r === 'function')
      return computed(r)

    // unref
    else if (isRef(r))
      return r.value

    // ref
    else
      return ref(r)
  }
  throw new Error('unexpected')
}
