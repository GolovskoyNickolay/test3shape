import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { MatSidenavModule } from '@angular/material/sidenav'
import { RouterOutlet } from '@angular/router'

import { MenuItem } from '../../main-layout.type'
import { HeaderComponent } from '../header/header.component'
import { SidebarComponent } from '../sidebar/sidebar.component'

@Component({
  selector: 'app-main-layout',
  imports: [MatSidenavModule, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  readonly title = input.required<string>()
  readonly menuItems = input.required<MenuItem[]>()
}
