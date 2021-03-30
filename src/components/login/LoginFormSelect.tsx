import { Field } from 'formik'
import React from 'react'

export interface FormikSelectItem {
  label: string
  value: string
}

interface FormikSelectProps {
  username: string
  password: string
  items: FormikSelectItem[]
  label: string
  required?: boolean
}

const FormikSelect: React.FC<FormikSelectProps> = ({ username, label, password, required = true }) => (
  <>
    <Field name={username} label={label} required={required} />
    <Field name={password} label={label} required={required} />
  </>
)

export default FormikSelect
