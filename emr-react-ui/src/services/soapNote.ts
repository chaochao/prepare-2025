// a get function to retrieve SOAP note data

import { SOAPFormData } from "@/components/soap-note-form";


const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export const getSoapNotes = async () => {
  try {
        const response = await fetch(`${baseUrl}/api/soap`); // Your API endpoint
        if (!response.ok) {
          console.error('API call failed with status:', response.status);
          return null; // Or return a default value
        }
        const data = await response.json();
        console.log('Data:', data);
        return data;
      } catch (_error) {
        // do nothing for now
      }
};

export const createSoapNotes = async (soapNote: SOAPFormData) => {
  try {
        const response = await fetch(`${baseUrl}/api/soap`, {
          method: 'POST',
            headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(soapNote),
        });

        if (!response.ok) {
          console.error('API call failed with status:', response.status);
          const error = await response.json();
          return error; // Or return a default value
        }

        const data = await response.json();
        console.log('Data:', data);
        return data;
      } catch (error: unknown) {
        return {success: false, message: `${error}`}
      }
};

export const updateSoapNotes = async (id: string, soapNote: Record<string,string>) => {
  try {
        const response = await fetch(`${baseUrl}/api/soap/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },  
          body: JSON.stringify(soapNote),
        });
        if (!response.ok) {
          console.error('API call failed with status:', response.status);
          return null; // Or return a default value
        }
        const data = await response.json();
        console.log('Data:', data);
        return data;
      } catch (_error) {
        console.error('Error updating SOAP note:', _error);
      }
};

export const deleteSoapNotes = async (id: string) => {
  try {
        const response = await fetch(`${baseUrl}/api/soap/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          console.error('API call failed with status:', response.status);
          return null; // Or return a default value
        }
        const data = await response.json();
        console.log('Data:', data);
        return data;
      } catch (_error) {
        console.error('Error deleting SOAP note:', _error);
      }
};
// TODO: use react-query to fetch SOAP notes
export const useSoapNotes = () => {
    // return useQuery<SoapNote[]>({
    //     queryKey: ['soapNotes'],
    //     queryFn: () => getSoapNotes(),
    // });
    };
