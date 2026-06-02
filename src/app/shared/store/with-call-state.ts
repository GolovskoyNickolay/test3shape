import { computed } from '@angular/core'
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals'

import { LoadStatus } from '@/app/shared/types/load-status.type'

export interface CallState {
  callState: LoadStatus
}

export function withCallState() {
  return signalStoreFeature(
    withState<CallState>({ callState: 'idle' }),
    withComputed(({ callState }) => ({
      isIdle: computed(() => callState() === 'idle'),
      isLoading: computed(() => callState() === 'loading'),
      isLoaded: computed(() => callState() === 'loaded'),
      hasError: computed(() => callState() === 'error'),
    })),
    withMethods((store) => ({
      setIdle: (): void => patchState(store, { callState: 'idle' }),
      setLoading: (): void => patchState(store, { callState: 'loading' }),
      setLoaded: (): void => patchState(store, { callState: 'loaded' }),
      setError: (): void => patchState(store, { callState: 'error' }),
    })),
  )
}
