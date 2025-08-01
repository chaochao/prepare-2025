import React from 'react';
import SoapNoteCreate from '@/components/soap-note-form';
import { getSoapNotes } from '@/services/soapNote';


 


 const Home = () => {
  
  React.useEffect(() => {
    try {
      // Initialize SOAP notes when the component mounts
      getSoapNotes();
    }
    catch (error) {
      console.error('Error during setup:', error);
    }
  }, []);
    return (
        <SoapNoteCreate />
    );
}

export default Home