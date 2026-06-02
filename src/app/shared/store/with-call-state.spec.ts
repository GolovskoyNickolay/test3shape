import { provideZonelessChangeDetection } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { signalStore } from '@ngrx/signals'

import { withCallState } from './with-call-state'

const TestStore = signalStore(withCallState())

describe('withCallState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), TestStore],
    })
  })

  it('starts as idle with all flags computed correctly', () => {
    const store = TestBed.inject(TestStore)
    expect(store.callState()).toBe('idle')
    expect(store.isIdle()).toBe(true)
    expect(store.isLoading()).toBe(false)
    expect(store.isLoaded()).toBe(false)
    expect(store.hasError()).toBe(false)
  })

  it('setLoading flips loading flag', () => {
    const store = TestBed.inject(TestStore)
    store.setLoading()
    expect(store.callState()).toBe('loading')
    expect(store.isLoading()).toBe(true)
    expect(store.isIdle()).toBe(false)
  })

  it('setLoaded flips loaded flag', () => {
    const store = TestBed.inject(TestStore)
    store.setLoaded()
    expect(store.callState()).toBe('loaded')
    expect(store.isLoaded()).toBe(true)
  })

  it('setError flips error flag', () => {
    const store = TestBed.inject(TestStore)
    store.setError()
    expect(store.callState()).toBe('error')
    expect(store.hasError()).toBe(true)
  })

  it('setIdle resets back to idle', () => {
    const store = TestBed.inject(TestStore)
    store.setLoaded()
    store.setIdle()
    expect(store.callState()).toBe('idle')
    expect(store.isIdle()).toBe(true)
    expect(store.isLoaded()).toBe(false)
  })
})
