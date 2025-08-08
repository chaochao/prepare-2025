import { SOAPFormData } from "@/components/soap-note-form";
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const createSoapNote = async (soapNote: SOAPFormData) => {
  const res = await fetch(`${baseUrl}/api/soap`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(soapNote),
  });
  if (!res.ok) throw new Error('Failed to create soap note');
  return res.json();
};

export const updateSoapNote = async (id: string, soapNote: SOAPFormData) => {
  
    const res = await fetch(`${baseUrl}/api/soap/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify(soapNote),
    });
    if (!res.ok) throw new Error('Failed to update soap note');
    return res.json();
};

export const deleteSoapNote = async (id: string) => {
  
      const res = await fetch(`${baseUrl}/api/soap/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete soap note');
      return res.json();
};


export async function fetchSoapNotes() {
  const res = await fetch(`${baseUrl}/api/soap`);
  if (!res.ok) throw new Error('Failed to get soap note');
  return res.json();
}

