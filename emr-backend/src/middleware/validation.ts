// src/middleware/validation.ts
import { Request, Response, NextFunction } from 'express';
import { CreateSOAPNoteRequest } from '../types/soap';

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

  if (!objective || objective.labResults.length === 0) {
    errors.push('objective is required');
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

  // Validate each provided field
  for (const field of providedFields) {
    if (typeof body[field] !== 'string' || body[field].trim().length === 0) {
      res.status(400).json({
        success: false,
        message: `${field} must be a non-empty string`
      });
      return;
    }
  }

  next();
};
