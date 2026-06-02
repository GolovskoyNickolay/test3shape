import { provideZonelessChangeDetection } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { of, Subject, throwError } from 'rxjs'

import { DataApi } from '@/app/core/api/data.api'
import { ClinicType } from '@/app/shared/types/clinic.type'
import { DashboardStats } from '@/app/shared/types/dashboard.type'

import { HomeStore } from './home.store'

const clinic: ClinicType = {
  name: 'Sunrise',
  description: '',
  address: '',
  phone: '',
  email: '',
  workingHours: '',
}
const stats: DashboardStats = { total: 6, today: 2, upcoming: 3, completed: 1 }

describe('HomeStore', () => {
  let api: {
    getClinic: ReturnType<typeof vi.fn>
    getStats: ReturnType<typeof vi.fn>
    getAppointments: ReturnType<typeof vi.fn>
  }

  beforeEach(() => {
    api = {
      getClinic: vi.fn(),
      getStats: vi.fn(),
      getAppointments: vi.fn(),
    }
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), { provide: DataApi, useValue: api }],
    })
  })

  it('starts in idle state with empty data', () => {
    const store = TestBed.inject(HomeStore)
    expect(store.callState()).toBe('idle')
    expect(store.clinic()).toBeNull()
    expect(store.stats()).toBeNull()
  })

  it('populates data and switches to loaded on success', () => {
    api.getClinic.mockReturnValue(of(clinic))
    api.getStats.mockReturnValue(of(stats))

    const store = TestBed.inject(HomeStore)
    store.loadDashboard().subscribe()

    expect(store.clinic()).toBe(clinic)
    expect(store.stats()).toBe(stats)
    expect(store.callState()).toBe('loaded')
  })

  it('switches to error and keeps data empty on failure', () => {
    api.getClinic.mockReturnValue(throwError(() => new Error('boom')))
    api.getStats.mockReturnValue(of(stats))

    const store = TestBed.inject(HomeStore)
    store.loadDashboard().subscribe()

    expect(store.callState()).toBe('error')
    expect(store.clinic()).toBeNull()
    expect(store.stats()).toBeNull()
  })

  it('does not refetch when already loaded (cache)', () => {
    api.getClinic.mockReturnValue(of(clinic))
    api.getStats.mockReturnValue(of(stats))

    const store = TestBed.inject(HomeStore)
    store.loadDashboard().subscribe()
    api.getClinic.mockClear()
    api.getStats.mockClear()

    store.loadDashboard().subscribe()

    expect(api.getClinic).not.toHaveBeenCalled()
    expect(api.getStats).not.toHaveBeenCalled()
  })

  it('does not start a parallel request when one is in flight (race-safe)', () => {
    api.getClinic.mockReturnValue(new Subject())
    api.getStats.mockReturnValue(new Subject())

    const store = TestBed.inject(HomeStore)
    store.loadDashboard().subscribe()
    expect(store.callState()).toBe('loading')
    api.getClinic.mockClear()
    api.getStats.mockClear()

    store.loadDashboard().subscribe()

    expect(api.getClinic).not.toHaveBeenCalled()
    expect(api.getStats).not.toHaveBeenCalled()
  })

  it('retries after an error', () => {
    api.getClinic.mockReturnValueOnce(throwError(() => new Error()))
    api.getStats.mockReturnValueOnce(of(stats))

    const store = TestBed.inject(HomeStore)
    store.loadDashboard().subscribe()
    expect(store.callState()).toBe('error')

    api.getClinic.mockReturnValueOnce(of(clinic))
    api.getStats.mockReturnValueOnce(of(stats))
    store.loadDashboard().subscribe()

    expect(store.callState()).toBe('loaded')
    expect(store.clinic()).toBe(clinic)
  })
})
