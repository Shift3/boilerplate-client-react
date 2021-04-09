import * as yup from 'yup'
import { ILoginFormData } from '../../interfaces'
import { loginPasswordSchema, usernameSchema } from '../../utils/validation/schemas'

export const loginFormSchema: yup.SchemaOf<ILoginFormData> = yup
  .object()
  .shape(usernameSchema)
  .shape(loginPasswordSchema)
