import React from "react";
import { Button, Card, CardContent, Container, Typography } from "@mui/material";
import {
  
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
interface SoapNoteSubmittedProps {
  formData: {
      patientName: string;
  };
  handleReset: () => void;
} 

export const SoapNoteSubmitted = ({handleReset, formData}: SoapNoteSubmittedProps) => {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
        <Card elevation={3}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom fontWeight="bold">
              SOAP Note Submitted Successfully
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              The note for {formData.patientName} has been saved to the medical record.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleReset}
              startIcon={<RefreshIcon />}
            >
              Create New Note
            </Button>
          </CardContent>
        </Card>
      </Container>
    )
  }