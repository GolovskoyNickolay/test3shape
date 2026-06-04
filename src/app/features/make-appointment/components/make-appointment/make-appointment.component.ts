import { AppointmentStatus, NewAppointment } from '@/app/shared/types/appointment.type';
import { ChangeDetectionStrategy, Component, Signal, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadStatus } from '@/app/shared/types/load-status.type';
type DialogData = {
  save: (payload: NewAppointment) => Observable<void>;
  status: Signal<LoadStatus>;
}

@Component({
  selector: 'app-make-appointment',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTimepickerModule,
    MatProgressBarModule,
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './make-appointment.component.html',
  styleUrl: './make-appointment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeAppointmentComponent {
  private readonly data = inject<DialogData>(MAT_DIALOG_DATA);


  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<MakeAppointmentComponent>);
  private readonly snackBar = inject(MatSnackBar);
  readonly saving = signal(false);


  readonly statuses = [
    AppointmentStatus.Scheduled,
    AppointmentStatus.Completed,
    AppointmentStatus.Cancelled,
  ];

  form = this.fb.nonNullable.group({
    patientName: ['', Validators.required],
    patientPhone: ['', Validators.required],
    patientEmail: ['', [Validators.required, Validators.email]],

    date: this.fb.control<Date | null>(null, Validators.required),
    time: this.fb.control<Date | null>(null, Validators.required),

    reason: ['', Validators.required],
    status: [AppointmentStatus.Scheduled, Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload = {
      patientName: value.patientName.trim(),
      patientPhone: value.patientPhone.trim(),
      patientEmail: value.patientEmail.trim(),
      reason: value.reason.trim(),
      status: value.status,
      scheduledAt: this.buildScheduledAt(),
    };

    this.data.save(payload).subscribe({
      next: () => {
        this.snackBar.open('Appointment saved', 'Close', {
          duration: 2000,
        });

        this.form.reset({
          patientName: '',
          patientPhone: '',
          patientEmail: '',
          date: null,
          time: null,
          reason: '',
          status: AppointmentStatus.Scheduled,
        });
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  readonly isLoading = computed(
    () => this.data.status() !== 'loaded'
  );

  private buildScheduledAt(): string {
    const { date, time } = this.form.getRawValue();

    if (!date || !time) {
      throw new Error('Invalid date/time');
    }

    const result = new Date(date);

    result.setHours(
      time.getHours(),
      time.getMinutes(),
      0,
      0
    );

    return result.toISOString();
  }
}