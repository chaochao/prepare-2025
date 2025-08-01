// a get function to retrieve SOAP note data

export const useSoapNote = (id: string) => {
  // return useQuery<SoapNote>({
  //   queryKey: ['soapNote', id],
  //   queryFn: () => getSoapNote(id),
  //   enabled: !!id,
  // });
};

// a get function to retrive all soap notes
// import { getSoapNotes } from '@/services/soapNote';
// import { useQuery } from '@tanstack/react-query';       
// import { SoapNote } from '@/types/soapNote';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'NO SUCH THING';
export const getSoapNotes = async () => {
  console.log(`${baseUrl}/api/data`)
  try {
        const response = await fetch(`${baseUrl}/api/data`); // Your API endpoint
        if (!response.ok) {
          console.error('API call failed with status:', response.status);
          return null; // Or return a default value
        }
        const data = await response.json();
        return data;
      } catch (_error) {
        // Log the error for debugging, but don't display it to the user
        // return null; // Or return a default value
      }
  
  
};

export const useSoapNotes = () => {
    // return useQuery<SoapNote[]>({
    //     queryKey: ['soapNotes'],
    //     queryFn: () => getSoapNotes(),
    // });
    };
