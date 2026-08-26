import type { AppointmentPayload, AppointmentResponse } from '@/types';
import { api } from './client';

export async function createAppointment(payload: AppointmentPayload): Promise<AppointmentResponse> {
  const { data } = await api.post<AppointmentResponse>('/api/appointments', payload);
  return data;
}
