export interface AppointmentType {
  id: number
  patientName: string
  patientPhone: string
  patientEmail: string
  scheduledAt: string
  reason: string
  status: AppointmentStatus
}

export type NewAppointment = Omit<AppointmentType, 'id'>


export enum AppointmentStatus {
  Completed = 'completed',
  Scheduled = 'scheduled',
  Cancelled = 'cancelled',
}