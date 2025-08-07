
// src/services/soapService.ts
import { v4 as uuidv4 } from 'uuid';
import { SOAPNote, CreateSOAPNoteRequest, UpdateSOAPNoteRequest } from '../types/soap';

class SOAPService {
  private soapNotes: Map<string, SOAPNote> = new Map();

  getAllSOAPNotes(): SOAPNote[] {
    return Array.from(this.soapNotes.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getSOAPNoteById(id: string): SOAPNote | undefined {
    return this.soapNotes.get(id);
  }

  getSOAPNotesByPatientId(patientId: string): SOAPNote[] {
    return Array.from(this.soapNotes.values())
      .filter(note => note.patientId === patientId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createSOAPNote(noteData: CreateSOAPNoteRequest): SOAPNote {
    const now = new Date().toISOString();
    const newNote: SOAPNote = {
      id: uuidv4(),
      patientId: noteData.patientId.trim(),
      patientName: noteData.patientName.trim(),
      date: now.split('T')[0], // YYYY-MM-DD format
      subjective: noteData.subjective.trim(),
      objective: noteData.objective,
      assessment: noteData.assessment.trim(),
      plan: noteData.plan.trim(),
      createdAt: now,
      updatedAt: now
    };

    this.soapNotes.set(newNote.id, newNote);
    return newNote;
  }

  updateSOAPNote(id: string, updateData: UpdateSOAPNoteRequest): SOAPNote | null {
    const existingNote = this.soapNotes.get(id);
    if (!existingNote) {
      return null;
    }

    const updatedNote: SOAPNote = {
      ...existingNote,
      ...Object.fromEntries(
        Object.entries(updateData).map(([key, value]) => [key, value.trim()])
      ),
      updatedAt: new Date().toISOString()
    };

    this.soapNotes.set(id, updatedNote);
    return updatedNote;
  }

  deleteSOAPNote(id: string): boolean {
    return this.soapNotes.delete(id);
  }

  // Helper method to seed some sample data
  seedSampleData(): void {
    const sampleNotes: CreateSOAPNoteRequest[] = [
      {
        patientId: 'P001',
        patientName: 'John Doe',
        subjective: 'Patient reports chest pain that started 2 hours ago. Pain is described as sharp, 7/10 intensity.',
        objective: {
          vitalSigns: {
            temperature: '98.6°F',
            bloodPressure: '140/90',
            heartRate: '88 bpm',
            respiratoryRate: '16/min',
            oxygenSaturation: '98%'
           },
          physicalExam: 'Normal heart sounds, no murmurs. Lungs clear to auscultation bilaterally.',
          labResults: 'not yet',
        },
        assessment: 'Chest pain, possible angina. Rule out myocardial infarction.',
        plan: 'EKG, cardiac enzymes, chest X-ray. Start on aspirin 81mg daily. Follow up in 24 hours.'
      },
      {
        patientId: 'P002',
        patientName: 'Jane Smith',
        subjective: 'Patient complains of persistent cough for 1 week, productive with yellow sputum.',
        objective: {
          vitalSigns: {
            temperature: '101.6°F',
            bloodPressure: '140/80',
            heartRate: '72 bpm',
            respiratoryRate: '16/min',
            oxygenSaturation: '98%'
           },
          physicalExam: 'Rhonchi heard in right lower lobe.',
          labResults: 'not yet',
        },
        assessment: 'Pneumonia, right lower lobe.',
        plan: 'Chest X-ray, CBC, sputum culture. Start amoxicillin 500mg TID x 7 days. Return if worsening.'
      }
    ];

    sampleNotes.forEach(note => this.createSOAPNote(note));
  }
}

export const soapService = new SOAPService();