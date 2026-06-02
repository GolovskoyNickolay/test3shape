import { provideZonelessChangeDetection, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'

import { ClinicType } from '@/app/shared/types/clinic.type'
import { DashboardStats } from '@/app/shared/types/dashboard.type'
import { LoadStatus } from '@/app/shared/types/load-status.type'

import { HomeStore } from '../../home.store'
import { HomePage } from './home.page'

interface ProtectedHomePage {
  clinic: () => ClinicType | null
  stats: () => DashboardStats | null
  status: () => LoadStatus
}

const clinic: ClinicType = {
  name: 'Sunrise 3D Dental Clinic',
  description: 'Test clinic',
  address: '123 Health Street',
  phone: '+1 (555) 010-0100',
  email: 'hello@sunrise.clinic',
  workingHours: 'Mon–Fri 09:00–18:00',
}

const stats: DashboardStats = { total: 6, today: 2, upcoming: 3, completed: 1 }

describe('HomePage', () => {
  const createStoreMock = () => ({
    clinic: signal<ClinicType | null>(null),
    stats: signal<DashboardStats | null>(null),
    callState: signal<LoadStatus>('idle'),
    isIdle: signal(true),
    isLoading: signal(false),
    isLoaded: signal(false),
    hasError: signal(false),
    loadDashboard: vi.fn(() => of(undefined)),
  })

  let storeMock: ReturnType<typeof createStoreMock>

  beforeEach(() => {
    storeMock = createStoreMock()
    TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideZonelessChangeDetection(), { provide: HomeStore, useValue: storeMock }],
    })
  })

  const create = () => {
    const fixture = TestBed.createComponent(HomePage)
    fixture.detectChanges()
    return fixture.componentInstance as unknown as ProtectedHomePage
  }

  it('triggers data loading exactly once on init', () => {
    create()
    expect(storeMock.loadDashboard).toHaveBeenCalledTimes(1)
  })

  it('exposes clinic signal from store', () => {
    storeMock.clinic.set(clinic)
    const page = create()
    expect(page.clinic()).toBe(clinic)
  })

  it('exposes stats signal from store', () => {
    storeMock.stats.set(stats)
    const page = create()
    expect(page.stats()).toBe(stats)
  })

  it('exposes callState as status', () => {
    storeMock.callState.set('loaded')
    const page = create()
    expect(page.status()).toBe('loaded')
  })

  it('reflects store changes reactively', () => {
    const page = create()
    expect(page.status()).toBe('idle')
    expect(page.clinic()).toBeNull()

    storeMock.callState.set('loaded')
    storeMock.clinic.set(clinic)

    expect(page.status()).toBe('loaded')
    expect(page.clinic()).toBe(clinic)
  })
})
