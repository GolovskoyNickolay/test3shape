import type { Meta, StoryObj } from '@storybook/angular'
import { FabAddAppointmentComponent } from './fab-add-appointment.component'

const meta: Meta<FabAddAppointmentComponent> = {
  title: 'Shared/FabAddAppointment',
  component: FabAddAppointmentComponent,
  tags: ['autodocs'],
  argTypes: {
    clicked: {
      description: 'Emits `void` whenever the FAB button is clicked.',
    },
  },
}

export default meta
type Story = StoryObj<FabAddAppointmentComponent>

export const Default: Story = {}