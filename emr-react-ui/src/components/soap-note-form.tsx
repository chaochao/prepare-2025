import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Divider,
  Container,
  Chip,
  Stack
} from '@mui/material';
import {
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  LocalHospital as LocalHospitalIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  LaptopChromebook as PlanningIcon,

} from '@mui/icons-material';
import GeneratingTokensIcon from '@mui/icons-material/GeneratingTokens';
import { createSoapNotes, getSoapNotes } from '@/services/soapNote';
import { SoapNoteSubmitted } from './soap-note-submitted';

interface SOAPFormData {
  patientName: string;
  patientId: string;
  dateOfService: string;
  provider: string;
  subjective: string;
  objective: {
    vitalSigns: {
      temperature: string;
      bloodPressure: string;
      heartRate: string;
      respiratoryRate: string;
      oxygenSaturation: string;
    };
    physicalExam: string;
    labResults: string;
  };
  assessment: string;
  plan: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const SOAPNoteForm: React.FC = () => {


 useEffect(() => {
    // This effect can be used for any initialization logic if needed
    getSoapNotes()
    // createSoapNotes({})
  }, []);


  const [formData, setFormData] = useState<SOAPFormData>({
    patientName: '',
    patientId: '',
    dateOfService: '',
    provider: '',
    subjective: '',
    objective: {
      vitalSigns: {
        temperature: '',
        bloodPressure: '',
        heartRate: '',
        respiratoryRate: '',
        oxygenSaturation: ''
      },
      physicalExam: '',
      labResults: ''
    },
    assessment: '',
    plan: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.patientId.trim()) {
      newErrors.patientId = 'Patient ID is required';
    }

    if (!formData.dateOfService) {
      newErrors.dateOfService = 'Date of service is required';
    }

    if (!formData.provider.trim()) {
      newErrors.provider = 'Provider name is required';
    }

    if (!formData.subjective.trim()) {
      newErrors.subjective = 'Subjective section is required';
    }

    if (!formData.objective.physicalExam.trim()) {
      newErrors.physicalExam = 'Physical examination is required';
    }

    if (!formData.assessment.trim()) {
      newErrors.assessment = 'Assessment is required';
    }

    if (!formData.plan.trim()) {
      newErrors.plan = 'Plan is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child, grandchild] = field.split('.');
      setFormData(prev => {
        if (grandchild) {
          // For fields like 'objective.vitalSigns.temperature'
          if (
            parent === 'objective' &&
            child === 'vitalSigns' &&
            typeof prev.objective.vitalSigns === 'object'
          ) {
            return {
              ...prev,
              objective: {
                ...prev.objective,
                vitalSigns: {
                  ...prev.objective.vitalSigns,
                  [grandchild]: value
                }
              }
            };
          }
        } else {
          // For fields like 'objective.physicalExam' or 'objective.labResults'
          if (parent === 'objective') {
            return {
              ...prev,
              objective: {
                ...prev.objective,
                [child]: value
              }
            };
          }
        }
        return prev;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('SOAP Note submitted:', formData);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsGenerating(false);
    }
  }
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('SOAP Note submitted:', formData.objective);
      // To save time prove comcept
      const submittedData = {
        ...formData,
        objective: JSON.stringify(formData.objective)
      }
      setIsSubmitted(true);
      createSoapNotes(submittedData)
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      patientName: '',
      patientId: '',
      dateOfService: '',
      provider: '',
      subjective: '',
      objective: {
        vitalSigns: {
          temperature: '',
          bloodPressure: '',
          heartRate: '',
          respiratoryRate: '',
          oxygenSaturation: ''
        },
        physicalExam: '',
        labResults: ''
      },
      assessment: '',
      plan: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return <SoapNoteSubmitted handleReset={handleReset} formData={formData} />
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardHeader
          avatar={<AssignmentIcon sx={{ fontSize: 40 }} />}
          title={
            <Typography variant="h4" fontWeight="bold">
              SOAP Note Documentation
            </Typography>
          }
          subheader="Subjective, Objective, Assessment, Plan"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '& .MuiCardHeader-subheader': {
              color: 'primary.contrastText',
              opacity: 0.8
            }
          }}
        />
        
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={4}>
            {/* Patient Information */}
            <Paper elevation={1} sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <PersonIcon color="primary" />
                Patient Information
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{xs:12, md:6}}>
                  <TextField
                    fullWidth
                    required
                    label="Patient Name"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                    error={!!errors.patientName}
                    helperText={errors.patientName}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                  <TextField
                    fullWidth
                    required
                    label="Patient ID"
                    value={formData.patientId}
                    onChange={(e) => handleInputChange('patientId', e.target.value)}
                    error={!!errors.patientId}
                    helperText={errors.patientId}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                  <TextField
                    fullWidth
                    required
                    type="date"
                    label="Date of Service"
                    value={formData.dateOfService}
                    onChange={(e) => handleInputChange('dateOfService', e.target.value)}
                    error={!!errors.dateOfService}
                    helperText={errors.dateOfService}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Grid>
                <Grid>
                  <TextField
                    fullWidth
                    required
                    label="Provider"
                    value={formData.provider}
                    onChange={(e) => handleInputChange('provider', e.target.value)}
                    error={!!errors.provider}
                    helperText={errors.provider}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Subjective */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PersonIcon sx={{ color: 'info.main' }} />
                <Chip label="S" color="info" size="small" />
                Subjective
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={6}
                label="Chief Complaint & History of Present Illness"
                value={formData.subjective}
                onChange={(e) => handleInputChange('subjective', e.target.value)}
                error={!!errors.subjective}
                helperText={errors.subjective || "Patient's reported symptoms, complaints, and relevant history"}
                variant="outlined"
                placeholder="Patient reports..."
              />
            </Box>

            {/* Objective */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <LocalHospitalIcon sx={{ color: 'success.main' }} />
                <Chip label="O" color="success" size="small" />
                Objective
              </Typography>
              
              {/* Vital Signs */}
              <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Vital Signs
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{xs:12, sm:6, md: 2}}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Temperature"
                      value={formData.objective.vitalSigns.temperature}
                      onChange={(e) => handleInputChange('objective.vitalSigns.temperature', e.target.value)}
                      placeholder="98.6°F"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6, md:2}}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Blood Pressure"
                      value={formData.objective.vitalSigns.bloodPressure}
                      onChange={(e) => handleInputChange('objective.vitalSigns.bloodPressure', e.target.value)}
                      placeholder="120/80"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6, md:2}}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Heart Rate"
                      value={formData.objective.vitalSigns.heartRate}
                      onChange={(e) => handleInputChange('objective.vitalSigns.heartRate', e.target.value)}
                      placeholder="72 bpm"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6, md:2}}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Respiratory Rate"
                      value={formData.objective.vitalSigns.respiratoryRate}
                      onChange={(e) => handleInputChange('objective.vitalSigns.respiratoryRate', e.target.value)}
                      placeholder="16/min"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6, md:3}}>
                    <TextField
                      fullWidth
                      size="small"
                      label="O2 Saturation"
                      value={formData.objective.vitalSigns.oxygenSaturation}
                      onChange={(e) => handleInputChange('objective.vitalSigns.oxygenSaturation', e.target.value)}
                      placeholder="98%"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Physical Examination */}
              <TextField
                fullWidth
                required
                multiline
                rows={5}
                label="Physical Examination"
                value={formData.objective.physicalExam}
                onChange={(e) => handleInputChange('objective.physicalExam', e.target.value)}
                error={!!errors.physicalExam}
                helperText={errors.physicalExam || "Physical examination findings, observations, and clinical measurements"}
                variant="outlined"
                sx={{ mb: 3 }}
                placeholder="General appearance, HEENT, cardiovascular, pulmonary, abdominal, neurological, skin..."
              />

              {/* Lab Results */}
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Laboratory Results & Diagnostics"
                value={formData.objective.labResults}
                onChange={(e) => handleInputChange('objective.labResults', e.target.value)}
                helperText="Lab values, imaging results, diagnostic test outcomes"
                variant="outlined"
                placeholder="CBC, CMP, urinalysis, imaging studies..."
              />
            </Box>

            {/* Assessment */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AssessmentIcon sx={{ color: 'warning.main' }} />
                <Chip label="A" color="warning" size="small" />
                Assessment
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={5}
                label="Clinical Assessment & Diagnosis"
                value={formData.assessment}
                onChange={(e) => handleInputChange('assessment', e.target.value)}
                error={!!errors.assessment}
                helperText={errors.assessment || "Primary and differential diagnoses, clinical impression, analysis of findings"}
                variant="outlined"
                placeholder="1. Primary diagnosis (ICD-10)&#10;2. Secondary diagnosis&#10;3. Differential considerations..."
              />
            </Box>

            {/* Plan */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PlanningIcon sx={{ color: 'secondary.main' }} />
                <Chip label="P" color="secondary" size="small" />
                Plan
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={handleGenerate}
                disabled={isGenerating}
                startIcon={isGenerating ? <CircularProgress size={20} /> : <GeneratingTokensIcon />}
                sx={{ flex: 1, mb: 2, textTransform: 'none' }}
              >
                {isGenerating ? 'Generating...' : 'generate plan with AI'}
              </Button>
              <TextField
                fullWidth
                required
                multiline
                rows={6}
                label="Treatment Plan & Follow-up"
                value={formData.plan}
                onChange={(e) => handleInputChange('plan', e.target.value)}
                error={!!errors.plan}
                helperText={errors.plan || "Treatment recommendations, medications, follow-up appointments, patient education"}
                variant="outlined"
                placeholder="1. Medications:&#10;2. Procedures:&#10;3. Follow-up:&#10;4. Patient education:&#10;5. Monitoring:"
              />
            </Box>

            <Divider />

            {/* Form Actions */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                sx={{ flex: 1 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit SOAP Note'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleReset}
                startIcon={<RefreshIcon />}
                sx={{ flex: 1 }}
              >
                Reset Form
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SOAPNoteForm;