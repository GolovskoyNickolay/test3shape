import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fab-add-appointment',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './fab-add-appointment.component.html',
  styleUrl: './fab-add-appointment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabAddAppointmentComponent {
  readonly clicked = output<void>();
}