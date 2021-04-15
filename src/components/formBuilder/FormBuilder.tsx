import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container} from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import { IFormProps } from './types';

export const FormBuilder: FC<any> = ({ onSubmit, schema, config }: IFormProps) => {
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(schema) })

  const onFormSubmit = handleSubmit((formData) => onSubmit(formData));

  return (
    <Container>
      <Form onSubmit={onFormSubmit}>
        { config.map((field) => (
            <Form.Group controlId="formBasicEmail" key={ uuidv4() }>
              { 
                field.label 
                  && <Form.Label>{ field.label }</Form.Label> 
              }
              <Form.Control
                type={ field.fieldConfig.inputType }
                autoComplete={ field.fieldConfig.autocomplete } 
                placeholder={ field.placeholder } 
                name={ field.name } 
                ref={register}
              />
              {  
                field.text 
                  && <Form.Text className="text-muted">{ field.text }</Form.Text> 
              }
              { 
                errors[field.name] 
                  && <span role="alert" className="danger">{errors[field.name].message}</span>
              }
            </Form.Group>
        ))}

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  )
}