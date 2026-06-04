import { AppointmentStatus, AppointmentType } from '@/app/shared/types/appointment.type'
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatTabsModule } from '@angular/material/tabs'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDivider } from '@angular/material/divider'
import { LoadStatus } from '@/app/shared/types/load-status.type'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-review-appointments',
  imports: [MatTabsModule, MatButtonModule, MatIconModule, CommonModule, MatCardModule, MatChipsModule, MatDivider, MatProgressSpinnerModule],
  templateUrl: './review-appointments.component.html',
  styleUrl: './review-appointments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewAppointmentsComponent {
  readonly status = input.required<LoadStatus>()
  readonly AppointmentStatus = AppointmentStatus;
  readonly appointments = input<AppointmentType[] | []>([])
  readonly scheduled = computed(() =>
    this.appointments().filter(appointment => appointment.status === AppointmentStatus.Scheduled)
  );
  readonly completed = computed(() =>
    this.appointments().filter(appointment => appointment.status === AppointmentStatus.Completed)
  );
  readonly cancelled = computed(() =>
    this.appointments().filter(appointment => appointment.status === AppointmentStatus.Cancelled)
  );


}
