import { inject } from '@angular/core'
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { catchError, EMPTY, forkJoin, map, Observable, of, tap } from 'rxjs'

import { DataApi } from '@/app/core/api/data.api'
import { withCallState } from '@/app/shared/store/with-call-state'
import { ClinicType } from '@/app/shared/types/clinic.type'
import { DashboardStats } from '@/app/shared/types/dashboard.type'

interface HomeState {
  clinic: ClinicType | null
  stats: DashboardStats | null
}

const initialState: HomeState = {
  clinic: null,
  stats: null,
}

export const HomeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withCallState(),
  withMethods((store) => {
    const api = inject(DataApi)
    return {
      loadDashboard(): Observable<void> {
        if (store.isLoaded() || store.isLoading()) return of(undefined)

        store.setLoading()

        return forkJoin({
          clinic: api.getClinic(),
          stats: api.getStats(),
        }).pipe(
          tap(({ clinic, stats }) => {
            patchState(store, { clinic, stats })
            store.setLoaded()
          }),
          catchError(() => {
            store.setError()
            return EMPTY
          }),
          map(() => undefined),
        )
      },
    }
  }),
)
