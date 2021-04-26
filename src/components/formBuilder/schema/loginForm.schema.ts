import * as yup from 'yup';
import { GenerateLoginFormSchema } from '../types';

export const generateLoginFormSchema: GenerateLoginFormSchema = () =>
  yup.object({
    username: yup.string().email().required(),
    password: yup.string().min(7).max(12).required(),
  });
