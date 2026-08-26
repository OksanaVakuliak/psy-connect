export interface AppointmentPayload {
  name: string;
  email: string;
  phone: string;
  date: string;
  psychologistId: string;
}

export interface Appointment {
  name: string;
  email: string;
  phone: string;
  date: string;
  psychologist: {
    id: string;
    name: string;
  };
}

export interface AppointmentResponse {
  message: string;
  appointment: Appointment;
}
