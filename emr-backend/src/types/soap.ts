interface objective {
   vitalSigns: {
      temperature: string;
      bloodPressure: string;
      heartRate: string;
      respiratoryRate: string;
      oxygenSaturation: string;
    };
    physicalExam: string;
    labResults: string;
}
export interface SOAPNote {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  subjective: string;
  objective: objective;
  assessment: string;
  plan: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSOAPNoteRequest {
  patientId: string;
  patientName: string;
  subjective: string;
  objective: objective; // Assuming objective is an object with various fields
  assessment: string;
  plan: string;
}


export interface UpdateSOAPNoteRequest {
  patientId?: string;
  patientName?: string;
  subjective?: string;
  objective?: objective;
  assessment?: string;
  plan?: string;
}