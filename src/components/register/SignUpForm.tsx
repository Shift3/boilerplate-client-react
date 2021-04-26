import { FC } from 'react'
import { FormBuilder } from '../formBuilder/FormBuilder'
import { generateRegisterFormSchema } from '../formBuilder/schema/formSchemas'
import registerFormConfig from '../formBuilder/configs/register.formConfig'

const registerUser = (formData: Record<string, unknown>) => console.log("formData: ", formData);

export const RegisterForm: FC = () => (
  <div>
    <FormBuilder onSubmit={registerUser} config={registerFormConfig} schema={generateRegisterFormSchema} title="Register" />
  </div>
)
