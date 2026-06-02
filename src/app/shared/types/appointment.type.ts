export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled'

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
