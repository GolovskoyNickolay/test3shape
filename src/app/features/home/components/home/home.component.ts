import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { ClinicType } from '@/app/shared/types/clinic.type'
import { DashboardStats } from '@/app/shared/types/dashboard.type'
import { LoadStatus } from '@/app/shared/types/load-status.type'

interface StatTile {
  label: string
  value: number
  icon: string
}

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatDividerModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly clinic = input<ClinicType | null>(null)
  readonly stats = input<DashboardStats | null>(null)
  readonly status = input.required<LoadStatus>()

  protected readonly tiles = computed<StatTile[]>(() => {
    const stats = this.stats()
    if (!stats) return []
    return [
      { label: 'Total', value: stats.total, icon: 'event_note' },
      { label: 'Today', value: stats.today, icon: 'today' },
      { label: 'Upcoming', value: stats.upcoming, icon: 'schedule' },
      { label: 'Completed', value: stats.completed, icon: 'task_alt' },
    ]
  })
}
