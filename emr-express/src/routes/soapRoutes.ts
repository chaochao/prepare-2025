import { Router, Request, Response } from 'express';
import { soapService } from '../services/soapService';
import { validateCreateSOAPNote, validateUpdateSOAPNote } from '../middleware/validation';
require('dotenv').config()
import OpenAI from 'openai';
const router = Router();

// GET /api/soap - Get all SOAP notes
router.get('/', (req: Request, res: Response): void => {
  try {
    const { patientId } = req.query;
    
    let notes;
    if (patientId && typeof patientId === 'string') {
      notes = soapService.getSOAPNotesByPatientId(patientId);
    } else {
      notes = soapService.getAllSOAPNotes();
    }

    res.json({
      success: true,
      data: notes,
      count: notes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});


// GET /api/soap/:id - Get a specific SOAP note
router.get('/:id', (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const note = soapService.getSOAPNoteById(id);

    if (!note) {
      res.status(404).json({
        success: false,
        message: 'SOAP note not found'
      });
      return;
    }

    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// POST /api/soap - Create a new SOAP note
router.post('/', validateCreateSOAPNote, (req: Request, res: Response): void => {
  try {
    const newNote = soapService.createSOAPNote(req.body);

    res.status(201).json({
      success: true,
      message: 'SOAP note created successfully',
      data: newNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// PUT /api/soap/:id - Update a SOAP note
router.put('/:id', validateUpdateSOAPNote, (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updatedNote = soapService.updateSOAPNote(id, req.body);

    if (!updatedNote) {
      res.status(404).json({
        success: false,
        message: 'SOAP note not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'SOAP note updated successfully',
      data: updatedNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// DELETE /api/soap/:id - Delete a SOAP note
router.delete('/:id', (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const deleted = soapService.deleteSOAPNote(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'SOAP note not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'SOAP note deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;