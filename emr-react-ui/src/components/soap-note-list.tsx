import React from "react";
import { SOAPNoteObject } from "@/components/soap-note-form";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
} from '@mui/material';
import { format } from "date-fns";
import { stringifyObjective } from "@/utils";
import { useRouter } from "next/router";
import { useSoapNotes } from "@/hooks/useSoapNotes";

const CREATE_PATH = '/soap-notes/create';
// TODO: ADD edit feature, generate pdf preview according to the data
export const SoapNoteList = () => {
  
  const { data} = useSoapNotes()
  const soapNotes = data?.data as SOAPNoteObject[] || [];
  const router = useRouter()
  const handleToCreate = () => {
    router.push(CREATE_PATH)
  }
  return (
    <Card elevation={3} sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Grid container margin={'8px 0'}>
          <Typography variant="h5" gutterBottom component="h1">
            SOAP Notes List
          </Typography>
          <Button sx={{ml: 'auto'}} variant="contained" size="small" onClick={handleToCreate}>
              Create new soap
          </Button>
        </Grid>
        
        
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
              {/* Add more details here if available in SOAPNoteObject */}
              <span style={{whiteSpace: "pre-line"}}>
                {note.objective ? `${stringifyObjective(note.objective)}` : "No objective data available"}
              </span>
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