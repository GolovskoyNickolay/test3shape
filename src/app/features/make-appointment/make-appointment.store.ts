import { inject } from '@angular/core'
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs'

import { DataApi } from '@/app/core/api/data.api'
import { withCallState } from '@/app/shared/store/with-call-state'
import { AppointmentType, NewAppointment } from '@/app/shared/types/appointment.type'

interface AppointmentsState {
  appointments: AppointmentType[] | [],
}

const initialState: AppointmentsState = {
  appointments: [],
}

export const AppointmentsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withCallState(),
  withMethods((store) => {
    const api = inject(DataApi)
    return {
      loadAppointments(): Observable<void> {
        if (store.isLoaded() || store.isLoading()) return of(undefined)

        store.setLoading()

        return api.getAppointments().pipe(
          tap((appointments) => {
            patchState(store, { appointments })
            store.setLoaded()
          }),
          catchError(() => {
            store.setError()
            return EMPTY
          }),
          map(() => undefined),
        )
      },
      createAppointment(appointment: NewAppointment): Observable<void> {
        store.setLoading()
        return api.createAppointment(appointment).pipe(
          tap((created) => {
            patchState(store, {
              appointments: [...store.appointments(), created],
            });
            store.setLoaded();
          }),
          map(() => undefined)
        );
      }
    }
  }),
)
