import type { Meta, StoryObj } from '@storybook/angular'

import { AppointmentStatus, AppointmentType } from '@/app/shared/types/appointment.type'
import { LoadStatus } from '@/app/shared/types/load-status.type'

import { ReviewAppointmentsComponent } from './review-appointments.component'

const meta: Meta<ReviewAppointmentsComponent> = {
  title: 'Appointments/ReviewAppointments',
  component: ReviewAppointmentsComponent,
  tags: ['autodocs'],
  argTypes: {
    status: {
      description: 'Load status: `idle | loading | loaded | error`. Controls which UI branch renders.',
      control: 'select',
      options: ['idle', 'loading', 'loaded', 'error'],
    },
    appointments: {
      description: 'Full list of appointments. The component splits them into Scheduled / Completed / Cancelled tabs internally.',
    },
  },
}

export default meta
type Story = StoryObj<ReviewAppointmentsComponent>

let _id = 1
const makeAppointment = (overrides: Partial<AppointmentType> = {}): AppointmentType => ({
  id: _id++,
  patientName: 'Jane Doe',
  patientEmail: 'jane.doe@example.com',
  patientPhone: '+1 (555) 000-0001',
  reason: 'General check-up',
  status: AppointmentStatus.Scheduled,
  scheduledAt: new Date('2025-08-15T10:30:00').toISOString(),
  ...overrides,
})

const scheduledAppointments: AppointmentType[] = [
  makeAppointment({ patientName: 'Alice Martin', scheduledAt: new Date('2025-08-15T09:00:00').toISOString() }),
  makeAppointment({ patientName: 'Bob Chen', reason: 'Follow-up consultation', scheduledAt: new Date('2025-08-16T14:30:00').toISOString() }),
  makeAppointment({ patientName: 'Carol White', reason: 'Blood pressure monitoring', scheduledAt: new Date('2025-08-17T11:00:00').toISOString() }),
]

const completedAppointments: AppointmentType[] = [
  makeAppointment({ patientName: 'David Brown', status: AppointmentStatus.Completed, reason: 'Annual physical', scheduledAt: new Date('2025-07-10T10:00:00').toISOString() }),
  makeAppointment({ patientName: 'Eva Green', status: AppointmentStatus.Completed, reason: 'Vaccination', scheduledAt: new Date('2025-07-12T08:30:00').toISOString() }),
]

const cancelledAppointments: AppointmentType[] = [
  makeAppointment({ patientName: 'Frank Lee', status: AppointmentStatus.Cancelled, reason: 'Dental referral', scheduledAt: new Date('2025-07-20T15:00:00').toISOString() }),
]

const allAppointments: AppointmentType[] = [
  ...scheduledAppointments,
  ...completedAppointments,
  ...cancelledAppointments,
]


export const Default: Story = {
  args: {
    status: 'loaded' as LoadStatus,
    appointments: allAppointments,
  },
}

export const Loading: Story = {
  args: {
    status: 'loading' as LoadStatus,
    appointments: [],
  },
}

export const Error: Story = {
  args: {
    status: 'error' as LoadStatus,
    appointments: [],
  },
}

export const ScheduledOnly: Story = {
  args: {
    status: 'loaded' as LoadStatus,
    appointments: scheduledAppointments,
  },
  parameters: {
    docs: {
      description: {
        story: 'Only the Scheduled tab has cards; Completed and Cancelled tabs render empty.',
      },
    },
  },
}

export const CompletedOnly: Story = {
  args: {
    status: 'loaded' as LoadStatus,
    appointments: completedAppointments,
  },
  parameters: {
    docs: {
      description: {
        story: 'Only the Completed tab has cards; useful for checking the tab renders correctly when it is not the first tab.',
      },
    },
  },
}

export const CancelledOnly: Story = {
  args: {
    status: 'loaded' as LoadStatus,
    appointments: cancelledAppointments,
  },
  parameters: {
    docs: {
      description: {
        story: 'Only the Cancelled tab has cards.',
      },
    },
  },
}

export const Empty: Story = {
  args: {
    status: 'loaded' as LoadStatus,
    appointments: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'All three tabs are empty — verifies the empty-state layout does not break.',
      },
    },
  },
}

export const LongReasonText: Story = {
  args: {
    status: 'loaded' as LoadStatus,
    appointments: [
      makeAppointment({
        reason:
          'Patient reports persistent lower back pain radiating to the left leg over the past three weeks, aggravated by prolonged sitting and relieved partially by walking. Requesting physiotherapy referral and possible MRI.',
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Verifies that a very long reason string wraps correctly inside the card without overflowing.',
      },
    },
  },
}

export const ManyAppointments: Story = {
  args: {
    status: 'loaded' as LoadStatus,
    appointments: Array.from({ length: 20 }, (_, i) =>
      makeAppointment({
        patientName: `Patient ${i + 1}`,
        status:
          i % 3 === 0
            ? AppointmentStatus.Completed
            : i % 3 === 1
            ? AppointmentStatus.Cancelled
            : AppointmentStatus.Scheduled,
        scheduledAt: new Date(2025, 7, i + 1, 9 + (i % 8)).toISOString(),
      })
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Stress-tests the layout with 20 appointments evenly spread across all three statuses.',
      },
    },
  },
}