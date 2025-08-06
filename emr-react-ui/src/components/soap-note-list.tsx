import React from "react";
import { useEffect, useState } from "react";
import { getSoapNotes } from "@/services/soapNote";
import { SOAPNoteObject } from "@/components/soap-note-form";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { format } from "date-fns";

export const SoapNoteList = () => {
  const [soapNotes, setSoapNotes] = useState<SOAPNoteObject[]>([]);
  
  const fetchSoapNotes = async () => {
    try {
      const notes = await getSoapNotes();
      setSoapNotes(notes.data || []);
    } catch (error) {
      console.error("Failed to fetch SOAP notes:", error);
    }
  };
  
  useEffect(() => {
    fetchSoapNotes();
  }, []);

  return (
    <Card elevation={3} sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom component="h1">
          SOAP Notes List
        </Typography>
        
        {(soapNotes || []).map((note) => (
          <Accordion 
            key={note.id as string}
            sx={{
              mb: 1,
              '&:before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<span>▼</span>}
              aria-controls={`panel-${note.id}-content`}
              id={`panel-${note.id}-header`}
              sx={{ '.MuiAccordionSummary-content': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              } }}
            >
              <Typography variant="subtitle1" fontWeight="medium">
                {note.patientName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {format(new Date(note.createdAt), "MM-dd-yyyy")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>details</div>
              {/* Add more details here if available in SOAPNoteObject */}
            </AccordionDetails>
          </Accordion>
        ))}
        
        {soapNotes.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary">
              No SOAP notes found
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};