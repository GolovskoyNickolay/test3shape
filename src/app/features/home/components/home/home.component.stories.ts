import type { Meta, StoryObj } from '@storybook/angular'

import { ClinicType } from '@/app/shared/types/clinic.type'
import { DashboardStats } from '@/app/shared/types/dashboard.type'

import { HomeComponent } from './home.component'

const meta: Meta<HomeComponent> = {
  title: 'Home/Home',
  component: HomeComponent,
  tags: ['autodocs'],
  argTypes: {
    clinic: {
      description: 'Clinic info card data. `null` while data is loading.',
    },
    stats: {
      description: 'Dashboard counters derived from appointments (total / today / upcoming / completed).',
    },
    status: {
      description: 'Load status: `idle | loading | loaded | error`. Drives which UI branch renders.',
      control: 'select',
      options: ['idle', 'loading', 'loaded', 'error'],
    },
  },
}

export default meta
type Story = StoryObj<HomeComponent>

const clinic: ClinicType = {
  name: 'Sunrise Medical Clinic',
  description: 'Family-friendly clinic offering general practice, pediatric care, and preventive medicine since 2008.',
  address: '123 Health Street, Wellness City',
  phone: '+1 (555) 010-0100',
  email: 'hello@sunrise.clinic',
  workingHours: 'Mon–Fri 08:00–18:00, Sat 09:00–14:00',
}

const stats: DashboardStats = {
  total: 6,
  today: 2,
  upcoming: 3,
  completed: 1,
}

const emptyStats: DashboardStats = { total: 0, today: 0, upcoming: 0, completed: 0 }

export const Default: Story = {
  args: { clinic, stats, status: 'loaded' },
}

export const Loading: Story = {
  args: { clinic: null, stats: emptyStats, status: 'loading' },
}

export const Error: Story = {
  args: { clinic: null, stats: emptyStats, status: 'error' },
}
