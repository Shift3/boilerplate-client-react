import { Field } from 'formik'
import React from 'react'

export interface FormikSelectItem {
  label: string
  value: string
}

interface FormikSelectProps {
  username: string
  items: FormikSelectItem[]
  label: string
  required?: boolean
}

const FormikSelect: React.FC<FormikSelectProps> = ({ username, items, label, required = true }) => (
  <>
    <Field name={username} label={label} />
  </>
)

export default FormikSelect
