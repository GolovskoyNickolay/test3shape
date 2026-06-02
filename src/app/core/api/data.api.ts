import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { delay, Observable } from 'rxjs'

import { AppointmentType, NewAppointment } from '@/app/shared/types/appointment.type'
import { ClinicType } from '@/app/shared/types/clinic.type'
import { DashboardStats } from '@/app/shared/types/dashboard.type'

import { API_BASE_URL } from './api.config'

const FAKE_LATENCY_MS = 800

@Injectable({ providedIn: 'root' })
export class DataApi {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = inject(API_BASE_URL)

  getClinic(): Observable<ClinicType> {
    return this.http.get<ClinicType>(`${this.baseUrl}/clinic`).pipe(delay(FAKE_LATENCY_MS))
  }

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/stats`).pipe(delay(FAKE_LATENCY_MS))
  }

  getAppointments(): Observable<AppointmentType[]> {
    return this.http.get<AppointmentType[]>(`${this.baseUrl}/appointments`).pipe(delay(FAKE_LATENCY_MS))
  }

  createAppointment(input: NewAppointment): Observable<AppointmentType> {
    return this.http
      .post<AppointmentType>(`${this.baseUrl}/appointments`, input)
      .pipe(delay(FAKE_LATENCY_MS))
  }
}
