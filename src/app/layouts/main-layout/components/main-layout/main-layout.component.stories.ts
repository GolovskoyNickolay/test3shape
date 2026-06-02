import { Component } from '@angular/core'
import { provideRouter } from '@angular/router'
import type { Meta, StoryObj } from '@storybook/angular'
import { applicationConfig, componentWrapperDecorator } from '@storybook/angular'

import { MenuItem } from '../../main-layout.type'
import { MainLayoutComponent } from './main-layout.component'

@Component({
  standalone: true,
  template: `
    <p>Page content goes here.</p>
  `,
})
class PlaceholderPage {}

const meta: Meta<MainLayoutComponent> = {
  title: 'Layouts/MainLayout',
  component: MainLayoutComponent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: {
      description: 'Title shown in the header — typically the active page name.',
    },
    menuItems: {
      description: 'Navigation entries shown in the sidebar. Each item: `{ title, icon, route }`.',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideRouter([{ path: '**', component: PlaceholderPage }])],
    }),
    componentWrapperDecorator((story) => `<div style="height: 100vh">${story}</div>`),
  ],
}

export default meta
type Story = StoryObj<MainLayoutComponent>

const menuItems: MenuItem[] = [
  { title: 'Home', icon: 'home', route: '/home' },
  { title: 'Make appointment', icon: 'event_available', route: '/make-appointment' },
]

export const Default: Story = {
  args: { title: 'Home', menuItems },
}
