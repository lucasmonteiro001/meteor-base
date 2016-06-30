import { CollectionBase } from '../reuse/collectionBase';

export const CollectionClientes = new CollectionBase('Clientes');

//Definição dos Schemas
CollectionClientes.setSchema({
  nome: {
    type: String,
    defaultValue: '',
    label: 'Nome',
    formOptions: {
      FIELD_TAG: 'input',
      FIELD_TYPE: 'text',
    },
    formValidation: {
      required: { value: true, message: 'O nome é obrigatório' },
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
      required: { value: true, message: 'A idade é obrigatória' },
      minlength: { value: 2, message: 'Este campo deve ter no mínimo 2 caracteres' },
    },
    tableView: {
      label: 'Idade',
    },
  },
  rua: {
    type: String,
    defaultValue: '',
    label: 'Rua',
    formOptions: {
      FIELD_TAG: 'textarea',
      FIELD_TYPE: 'text',
    },
    formValidation: {
      required: { value: true, message: 'Pô, preenchei ai né!!' },
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
      required: { value: true, message: 'O telefone é obrigatório' },
    },
    tableView: {
      label: 'Telefone',
    },
  },
  email: {
    type: String,
    defaultValue: '',
    label: 'Email',
    formOptions: {
      FIELD_TAG: 'input',
      FIELD_TYPE: 'text',
    },
    formValidation: {
      required: { value: true, message: 'O email é obrigatório' },
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

CollectionClientes.addSubSchema('insert', ['nome', 'idade', 'email', 'userId']);

CollectionClientes.addSubSchema('update',
    ['nome', 'idade', 'rua', 'telefone', 'email']);

CollectionClientes.addSubSchema('view',
    ['nome', 'idade', 'rua', 'telefone', 'email', 'userId']);

