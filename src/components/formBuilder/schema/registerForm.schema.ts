import * as yup from 'yup';
import { GenerateRegisterFormSchema, StateRef } from '../types';

export const generateRegisterFormSchema: GenerateRegisterFormSchema = (stateRef: StateRef) =>
  yup.object({
    email: yup.string().email().required(),
    confirmEmail: yup.string().email().required().oneOf([stateRef.email, null], 'Email addresses must match.'),
    firstName: yup.string().min(2).max(10).required(),
    lastName: yup.string().min(2).max(10).required(),
  });
