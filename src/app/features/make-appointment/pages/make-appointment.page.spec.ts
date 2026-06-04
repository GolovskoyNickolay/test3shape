import { provideZonelessChangeDetection, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { MatDialog } from '@angular/material/dialog'
import { of } from 'rxjs'

import { AppointmentStatus, AppointmentType, NewAppointment } from '@/app/shared/types/appointment.type'
import { LoadStatus } from '@/app/shared/types/load-status.type'

import { AppointmentsStore } from '../make-appointment.store'
import { MakeAppointmentPage } from './make-appointment.page'

interface ProtectedMakeAppointmentPage {
  status: () => LoadStatus
  appointments: () => AppointmentType[]
  openDialog: () => void
}

const appointment: AppointmentType = {
  id: 1,
  patientName: 'Alice Martin',
  patientEmail: 'alice@example.com',
  patientPhone: '+1 (555) 000-0001',
  reason: 'General check-up',
  status: AppointmentStatus.Scheduled,
  scheduledAt: new Date('2025-08-15T10:30:00').toISOString(),
}

describe('MakeAppointmentPage', () => {
  const createStoreMock = () => ({
    callState: signal<LoadStatus>('idle'),
    appointments: signal<AppointmentType[]>([]),
    loadAppointments: vi.fn(() => of(undefined)),
    createAppointment: vi.fn((_: NewAppointment) => of(undefined)),
  })

  const createDialogMock = () => ({
    open: vi.fn(),
  })

  let storeMock: ReturnType<typeof createStoreMock>
  let dialogMock: ReturnType<typeof createDialogMock>

  beforeEach(() => {
    storeMock = createStoreMock()
    dialogMock = createDialogMock()

    TestBed.configureTestingModule({
      imports: [MakeAppointmentPage],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AppointmentsStore, useValue: storeMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    })
  })

  const create = () => {
    const fixture = TestBed.createComponent(MakeAppointmentPage)
    fixture.detectChanges()
    return fixture.componentInstance as unknown as ProtectedMakeAppointmentPage
  }

  it('loads appointments exactly once on init', () => {
    create()
    expect(storeMock.loadAppointments).toHaveBeenCalledTimes(1)
  })

  it('exposes callState as status', () => {
    storeMock.callState.set('loaded')
    const page = create()
    expect(page.status()).toBe('loaded')
  })

  it('exposes appointments signal from store', () => {
    storeMock.appointments.set([appointment])
    const page = create()
    expect(page.appointments()).toEqual([appointment])
  })

  it('reflects store changes reactively', () => {
    const page = create()
    expect(page.status()).toBe('idle')
    expect(page.appointments()).toEqual([])

    storeMock.callState.set('loaded')
    storeMock.appointments.set([appointment])

    expect(page.status()).toBe('loaded')
    expect(page.appointments()).toEqual([appointment])
  })

  describe('openDialog', () => {
    it('opens the dialog once per call', () => {
      const page = create()
      page.openDialog()
      expect(dialogMock.open).toHaveBeenCalledTimes(1)
    })

    it('opens the dialog with a 600px width', () => {
      const page = create()
      page.openDialog()
      const [, config] = dialogMock.open.mock.calls[0]
      expect(config.width).toBe('600px')
    })

    it('passes the store callState signal as dialog data status', () => {
      const page = create()
      page.openDialog()
      const [, config] = dialogMock.open.mock.calls[0]
      expect(config.data.status).toBe(storeMock.callState)
    })

    it('passes a save function that delegates to store.createAppointment', () => {
      const page = create()
      page.openDialog()
      const [, config] = dialogMock.open.mock.calls[0]

      const payload: NewAppointment = {
        patientName: 'Bob',
        patientEmail: 'bob@example.com',
        patientPhone: '+1 (555) 000-0002',
        reason: 'Follow-up',
        status: AppointmentStatus.Scheduled,
        scheduledAt: new Date().toISOString(),
      }

      config.data.save(payload)
      expect(storeMock.createAppointment).toHaveBeenCalledWith(payload)
    })
  })
})