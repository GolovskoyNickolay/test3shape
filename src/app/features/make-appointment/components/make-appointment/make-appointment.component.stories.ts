import type { Meta, StoryObj } from '@storybook/angular'
import { signal } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { of } from 'rxjs'

import { AppointmentStatus } from '@/app/shared/types/appointment.type'
import { LoadStatus } from '@/app/shared/types/load-status.type'

import { MakeAppointmentComponent } from './make-appointment.component'

const meta: Meta<MakeAppointmentComponent> = {
  title: 'Appointments/MakeAppointment',
  component: MakeAppointmentComponent,
  tags: ['autodocs'],
  argTypes: {
    saving: {
      description: 'Whether the form submission is in progress. Disables the Save button.',
    },
  },
  decorators: [
    (story, context) => {
      const status: LoadStatus = context.parameters['loadStatus'] ?? 'loaded'

      return {
        ...story(),
        moduleMetadata: {
          providers: [
            {
              provide: MAT_DIALOG_DATA,
              useValue: {
                save: () => of(void 0),
                status: signal(status),
              },
            },
            {
              provide: MatDialogRef,
              useValue: { close: () => {} },
            },
          ],
        },
      }
    },
  ],
}

export default meta
type Story = StoryObj<MakeAppointmentComponent>

export const Default: Story = {
  parameters: {
    loadStatus: 'loaded',
    docs: {
      description: {
        story: 'Empty form in its default state, ready for user input.',
      },
    },
  },
}

export const Loading: Story = {
  parameters: {
    loadStatus: 'loading',
    docs: {
      description: {
        story: 'Shows the indeterminate progress bar while data is being saved or the dialog context is still loading.',
      },
    },
  },
}

export const WithPrefilledValues: Story = {
  parameters: {
    loadStatus: 'loaded',
    docs: {
      description: {
        story: 'Form with all fields populated — useful for reviewing layout and overflow behaviour with realistic content.',
      },
    },
  },
  decorators: [
    (story) => ({
      ...story(),
      moduleMetadata: {
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              save: () => of(void 0),
              status: signal<LoadStatus>('loaded'),
            },
          },
          {
            provide: MatDialogRef,
            useValue: { close: () => {} },
          },
        ],
      },
      props: {
        form: (() => {
          return undefined
        })(),
      },
    }),
  ],
}

export const StatusScheduled: Story = {
  parameters: {
    loadStatus: 'loaded',
    docs: {
      description: {
        story: `Default status pre-selected is **${AppointmentStatus.Scheduled}**.`,
      },
    },
  },
}

export const StatusCompleted: Story = {
  parameters: {
    loadStatus: 'loaded',
    docs: {
      description: {
        story: `Status dropdown pre-set to **${AppointmentStatus.Completed}** — useful for verifying all three status options render correctly in the select.`,
      },
    },
  },
}

export const StatusCancelled: Story = {
  parameters: {
    loadStatus: 'loaded',
    docs: {
      description: {
        story: `Status dropdown pre-set to **${AppointmentStatus.Cancelled}**.`,
      },
    },
  },
}

export const SaveInProgress: Story = {
  parameters: {
    loadStatus: 'loading',
    docs: {
      description: {
        story: 'Simulates the moment after "Save" is clicked: progress bar visible, Save button disabled.',
      },
    },
  },
  decorators: [
    (story) => ({
      ...story(),
      moduleMetadata: {
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              save: () => new (require('rxjs').Subject)(),
              status: signal<LoadStatus>('loading'),
            },
          },
          {
            provide: MatDialogRef,
            useValue: { close: () => {} },
          },
        ],
      },
    }),
  ],
}