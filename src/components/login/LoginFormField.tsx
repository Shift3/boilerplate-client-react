import { ErrorMessage, Field } from 'formik'
import React from 'react'

interface FormikFieldProps {
  username: string
  label: string
  type?: string
  required?: boolean
}

const FormikField: React.FC<FormikFieldProps> = ({ username, label, type = 'text', required = true }) => (
  <div className="FormikField">
    <Field
      required={required}
      autoComplete="off"
      label={label}
      name={username}
      fullWidth
      type={type}
      helperText={<ErrorMessage name={username} />}
    />
  </div>
)

export default FormikField
