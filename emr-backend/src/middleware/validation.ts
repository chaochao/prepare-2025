// src/middleware/validation.ts
import { Request, Response, NextFunction } from 'express';
import { CreateSOAPNoteRequest, Objective } from '../types/soap';

export const validateCreateSOAPNote = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { patientId, patientName, subjective, objective, assessment, plan }: CreateSOAPNoteRequest = req.body;

  const errors: string[] = [];

  if (!patientId || typeof patientId !== 'string' || patientId.trim().length === 0) {
    errors.push('patientId is required and must be a non-empty string');
  }

  if (!patientName || typeof patientName !== 'string' || patientName.trim().length === 0) {
    errors.push('patientName is required and must be a non-empty string');
  }

  if (!subjective || typeof subjective !== 'string' || subjective.trim().length === 0) {
    errors.push('subjective is required and must be a non-empty string');
  }

  // Fixed objective validation - properly check object structure
  if (!objective || typeof objective !== 'object') {
    errors.push('objective is required and must be an object');
  } else {
    // Validate objective structure
    if (!objective.vitalSigns || typeof objective.vitalSigns !== 'object') {
      errors.push('objective.vitalSigns is required and must be an object');
    }
    
    if (!objective.physicalExam || typeof objective.physicalExam !== 'string' || objective.physicalExam.trim().length === 0) {
      errors.push('objective.physicalExam is required and must be a non-empty string');
    }
    
    if (typeof objective.labResults !== 'string') {
      errors.push('objective.labResults must be a string');
    }
  }

  if (!assessment || typeof assessment !== 'string' || assessment.trim().length === 0) {
    errors.push('assessment is required and must be a non-empty string');
  }

  if (!plan || typeof plan !== 'string' || plan.trim().length === 0) {
    errors.push('plan is required and must be a non-empty string');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
    return;
  }

  next();
};

export const validateUpdateSOAPNote = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body = req.body;
  const allowedFields = ['patientId', 'patientName', 'subjective', 'objective', 'assessment', 'plan'];
  const providedFields = Object.keys(body);

  if (providedFields.length === 0) {
    res.status(400).json({
      success: false,
      message: 'At least one field must be provided for update'
    });
    return;
  }

  const invalidFields = providedFields.filter(field => !allowedFields.includes(field));
  if (invalidFields.length > 0) {
    res.status(400).json({
      success: false,
      message: `Invalid fields: ${invalidFields.join(', ')}`
    });
    return;
  }

  // Validate each provided field with proper type checking
  for (const field of providedFields) {
    const value = body[field];
    
    if (field === 'objective') {
      // Special handling for objective field
      if (typeof value !== 'object' || value === null) {
        res.status(400).json({
          success: false,
          message: 'objective must be an object'
        });
        return;
      }
    } else {
      // String fields validation
      if (typeof value !== 'string' || value.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: `${field} must be a non-empty string`
        });
        return;
      }
    }
  }

  next();
};
