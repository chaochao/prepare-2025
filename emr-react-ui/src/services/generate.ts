import { SOAPFormData } from "@/components/soap-note-form";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// TODO: use tanstack build custom hook
export const generatePlan = async (soapNote: SOAPFormData) => {
  try {
        const response = await fetch(`${baseUrl}/api/deepseek/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            soapData: soapNote,
            model: 'deepseek-chat',
            max_tokens: 2000,
          }),
        });

        if (!response.ok) {
          console.error('API call failed with status:', response.status);
          return null; // Or return a default value
        }

        const data = await response.json();
        return data;
      } catch (_error) {
        // TODO: return some error message
      }
};