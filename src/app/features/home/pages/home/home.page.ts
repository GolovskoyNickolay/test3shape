import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { HomeComponent } from '../../components/home/home.component'
import { HomeStore } from '../../home.store'

@Component({
  selector: 'app-home-page',
  imports: [HomeComponent],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  private readonly destroyRef = inject(DestroyRef)
  private readonly store = inject(HomeStore)

  protected readonly clinic = this.store.clinic
  protected readonly stats = this.store.stats
  protected readonly status = this.store.callState

  ngOnInit(): void {
    this.store.loadDashboard().pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }
}
