export default [
    {
        name: 'username',
        fieldType: 'input',
        label: 'Username',
        text: '',
        placeholder: '',
        fieldConfig: {
          inputType: 'email',
          autocomplete: 'email',
        }
    },
    {
        name: 'password',
        fieldType: 'input',
        label: 'Password',
        text: '',
        placeholder: '',
        fieldConfig: {
          inputType: 'password',
          autocomplete: 'current-password',
        }
    }
]