export interface SOAPNote {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSOAPNoteRequest {
  patientId: string;
  patientName: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface UpdateSOAPNoteRequest {
  patientId?: string;
  patientName?: string;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
}