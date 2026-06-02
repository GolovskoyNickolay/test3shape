import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly title = input.required<string>()
}
