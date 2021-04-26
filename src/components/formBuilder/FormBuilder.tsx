import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import * as _ from 'lodash';
import * as yup from 'yup';
import { IFormProps, IInputConfig, IInputData } from './types';

export const FormBuilder: (props: IFormProps) => JSX.Element = ({ config, onSubmit, schemaGenerator, title }: IFormProps) => {
  const [formData, setFormData] = useState({});

  const initialInputValue: IInputData = { touched: false, value: undefined, error: "", required: false };

  useEffect(() => {
    setFormData(config.reduce((initialFormData, { name, required }: IInputConfig) => (
      { ...initialFormData, [name]: { ...initialInputValue, required } }
    ), {}))
  }, [])

  const canSubmit = Object.keys(formData).filter((key) => {
    const { touched, value, error, required } = _.get(formData, `[${key}]`, initialInputValue);
    return !!error || ((!value || !touched) && required)
  }).length === 0;

  const formatFormData: () => Record<string, unknown> = () => (
    Object.keys(formData).reduce((data: Record<string, unknown>, key: string) => (
      { ...data, [key]: _.get(formData, `[${key}.value]`, undefined) }
    ), {})
  );

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: {
        value,
        touched: true,
        error: await yup.reach(schemaGenerator(formatFormData()), name)
        .validate(value)
          .then(() => "")
            .catch((err: yup.ValidationError) => err.message)  
      }
    });
  }

  const renderInputError = (name: string) => {
    const error = _.get(formData, `[${name}].error`, undefined);

    return error ? (<span role="alert">{ error }</span>) : null;
  }

  const renderInputs = () => (
    config.map(({ name, label, type, inputType, text, autocomplete }: IInputConfig) => (
      <Form.Group key={name} >
        { label && <Form.Label>{ label }</Form.Label> } 
        {
          inputType === "input" &&
            <Form.Control
            name={ name }
            type={ type }
            autoComplete={ autocomplete }
            onChange={ onInputChange }
            />
        }
        { renderInputError(name) }
        { text && <Form.Text>{ text }</Form.Text> }
      </Form.Group>
    ))
  )

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(formatFormData());
  }

  return (
    <Container>
      { title && <h2>{ title }</h2> }
       <Form onSubmit={ onFormSubmit }>
         { renderInputs() }
         <Button type="submit" disabled={ !canSubmit }>Submit</Button>
       </Form>
    </Container>
  );
}