import * as yup from 'yup';
import { GenerateSetPasswordFormSchema, StateRef } from '../types';

export const generateSetPasswordFormSchema: GenerateSetPasswordFormSchema = (stateRef: StateRef) =>
  yup.object({
    password: yup.string().min(7).max(12).required(),
    confirmPassword: yup.string().required().oneOf([stateRef.password, null], 'Passwords must match.'),
  });
