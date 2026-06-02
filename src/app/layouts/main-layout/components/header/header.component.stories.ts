import type { Meta, StoryObj } from '@storybook/angular'

import { HeaderComponent } from './header.component'

const meta: Meta<HeaderComponent> = {
  title: 'Layouts/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Text shown in the toolbar — usually the active page name.',
    },
  },
}

export default meta
type Story = StoryObj<HeaderComponent>

export const Home: Story = {
  args: { title: 'Home' },
}

export const MakeAppointment: Story = {
  args: { title: 'Make appointment' },
}
