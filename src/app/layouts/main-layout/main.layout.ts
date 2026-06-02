import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { NavigationEnd, Router, TitleStrategy } from '@angular/router'
import { filter, map } from 'rxjs'

import { MainLayoutComponent } from './components/main-layout/main-layout.component'
import { MenuItem } from './main-layout.type'

@Component({
  selector: 'app-main-layout-page',
  imports: [MainLayoutComponent],
  templateUrl: './main.layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  private readonly router = inject(Router)
  private readonly titleStrategy = inject(TitleStrategy)

  protected readonly menuItems: MenuItem[] = [
    { title: 'Home', icon: 'home', route: '/home' },
    { title: 'Make appointment', icon: 'event_available', route: '/make-appointment' },
  ]

  protected readonly title = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.resolveTitle()),
    ),
    { initialValue: this.resolveTitle() },
  )

  private resolveTitle(): string {
    return this.titleStrategy.buildTitle(this.router.routerState.snapshot) ?? ''
  }
}
