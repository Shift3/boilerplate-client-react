import * as yup from 'yup'
import { loginPasswordSchema, usernameSchema } from '../../utils/validation/schemas'
import { ILoginFormData } from './interfaces'

export const loginFormSchema: yup.SchemaOf<ILoginFormData> = yup
  .object()
  .shape(usernameSchema)
  .shape(loginPasswordSchema)
