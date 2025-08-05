// a get function to retrieve SOAP note data


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
        
      }
};

const testData = {
        patientId: 'P003',
        patientName: 'J!!!!ohn Doe',
        subjective: 'TEST Patient reports chest pain that started 2 hours ago. Pain is described as sharp, 7/10 intensity.',
        objective: 'TestBP: 140/90, HR: 88, RR: 16, Temp: 98.6°F. Chest clear to auscultation bilaterally.',
        assessment: 'Chest pain, possible angina. Rule out myocardial infarction.',
        plan: 'EKG, cardiac enzymes, chest X-ray. Start on aspirin 81mg daily. Follow up in 24 hours.'
      }

export const createSoapNotes = async (soapNote: Record<string,string>) => {
  try {
        const response = await fetch(`${baseUrl}/api/soap`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testData),
        });

        if (!response.ok) {
          console.error('API call failed with status:', response.status);
          return null; // Or return a default value
        }

        const data = await response.json();
        console.log('Data:', data);
        return data;
      } catch (_error) {
        
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
