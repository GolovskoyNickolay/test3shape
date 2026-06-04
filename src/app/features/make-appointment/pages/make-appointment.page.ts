import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ReviewAppointmentsComponent } from '../components/review-appointments/review-appointments.component'
import { AppointmentsStore } from '../make-appointment.store'
import { NewAppointment } from '@/app/shared/types/appointment.type'
import { MakeAppointmentComponent } from '../components/make-appointment/make-appointment.component'
import { MatDialog } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { FabAddAppointmentComponent } from '@/app/shared/components/fab-add-appointment/fab-add-appointment.component'


@Component({
  selector: 'app-make-appointment-page',
  imports: [ReviewAppointmentsComponent, MatIconModule, FabAddAppointmentComponent],
  templateUrl: './make-appointment.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeAppointmentPage implements OnInit {
  private readonly destroyRef = inject(DestroyRef)
  private readonly store = inject(AppointmentsStore)
  protected readonly status = this.store.callState
  private readonly dialog = inject(MatDialog)

  protected readonly appointments = this.store.appointments

  ngOnInit(): void {
    this.store.loadAppointments().pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  openDialog(): void {
    this.dialog.open(MakeAppointmentComponent, {
      width: '600px',
      data: {
        status: this.store.callState,
        save: (payload: NewAppointment) =>
          this.store.createAppointment(payload),
      },
    });
  }
}
