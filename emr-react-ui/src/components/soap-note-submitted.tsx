import React from "react";
import { Button, Card, CardContent, Container, Typography } from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
  List as ListIcon,
} from '@mui/icons-material';

import { useRouter } from "next/router";
interface SoapNoteSubmittedProps {
  formData: {
      patientName: string;
  };
  handleReset: () => void;
} 

const SoapNoteSubmitted = ({handleReset, formData}: SoapNoteSubmittedProps) => {
    const router = useRouter()
    const handleToList = () => {
      router.push('/soap-notes/list')
    }
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
              size="small"
              onClick={handleReset}
              startIcon={<RefreshIcon />}
              sx={{mr: 1}}
            >
              Create New Note
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleToList}
              startIcon={<ListIcon />}
            >
              View All Notes
            </Button>
          </CardContent>
        </Card>
      </Container>
    )
  }
export default SoapNoteSubmitted