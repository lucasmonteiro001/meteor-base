import { CollectionBase } from '../reuse/collectionBase';
export const collectionCliente = new CollectionBase('cliente');

//Definição dos Schemas
collectionCliente.setSchema('default', {
  nome: {
    type: String,
    defaultValue: '',
    label: 'Nome',
    formOptions: {
      FIELD_TAG: 'input',
      FIELD_TYPE: 'text',
    },
    formValidation: {
      required: { value: true, message: 'O nome do usuário é obrigatório' },
    },
    tableView: {
      label: 'Nome',
      template: 'tmpl',
    },
  },
  idade: {
    type: String,
    defaultValue: '',
    label: 'Idade',
    formOptions: {
      FIELD_TAG: 'input',
      FIELD_TYPE: 'number',
    },
    formValidation: {
      required: { value: true, message: 'O nome do usuário é obrigatório' },
      minlength: { value: 2, message: 'Este campo deve ter no mínimo 2 caracteres' },
    },
    tableView: {
      label: 'Idade'
    },
  },
  endereco: {
    type: String,
    defaultValue: '',
    label: 'Endereço',
    formOptions: {
      FIELD_TAG: 'textarea',
      FIELD_TYPE: 'text',
    },
    formValidation: {
      required: { value: true, message: 'O nome do usuário é obrigatório' },
    },
  },
  telefone: {
    type: String,
    defaultValue: '',
    label: 'Telefone/Cel:',
    formOptions: {
      FIELD_TAG: 'input',
      FIELD_TYPE: 'text',
    },
    formValidation: {
      required: { value: true, message: 'O nome do usuário é obrigatório' },
    },
    tableView: {
      label: 'Telefone',
    },
  },
  Email: {
    type: String,
    defaultValue: '',
    label: 'Email',
    formOptions: {
      FIELD_TAG: 'input',
      FIELD_TYPE: 'text',
    },
    formValidation: {
      required: { value: true, message: 'O nome do usuário é obrigatório' },
      email: { value: true, message: 'O email informado não é válido' },
    },
    tableView: {
      label: 'Email',
    },
  },
  userId: {
    type: String,
    label: 'Associated User ID',
  },
});

