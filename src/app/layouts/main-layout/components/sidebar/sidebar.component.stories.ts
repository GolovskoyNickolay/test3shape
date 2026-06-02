import { provideRouter } from '@angular/router'
import type { Meta, StoryObj } from '@storybook/angular'
import { applicationConfig } from '@storybook/angular'

import { MenuItem } from '../../main-layout.type'
import { SidebarComponent } from './sidebar.component'

const meta: Meta<SidebarComponent> = {
  title: 'Layouts/Sidebar',
  component: SidebarComponent,
  tags: ['autodocs'],
  argTypes: {
    menuItems: {
      description: 'Navigation entries rendered as `mat-nav-list` items. Each item: `{ title, icon, route }`.',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
}

export default meta
type Story = StoryObj<SidebarComponent>

const menuItems: MenuItem[] = [
  { title: 'Home', icon: 'home', route: '/home' },
  { title: 'Make appointment', icon: 'event_available', route: '/make-appointment' },
]

export const Default: Story = {
  args: { menuItems },
}
