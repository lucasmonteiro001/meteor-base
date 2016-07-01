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
  QuantidadeDeDependentes: {
    type: Number,
    defaultValue: 0,
    optional: true,
    label: 'Quantidade de Dependentes',
    formOptions: {
      FIELD_TAG: 'input',
      FIELD_TYPE: 'number',
    },
    tableView: {
      label: 'Qtd. Dependentes',
    },
  },
  DataNascimento: {
    type: Date,
    defaultValue: '',
    optional: true,
    label: 'Data de Nascimento',
    formOptions: {
      FIELD_TAG: 'inputdate',
      FIELD_TYPE: 'date',
    },
    formValidation: {
      required: { value: true, message: 'A Data de Nascimento é obrigatória' },
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
    optional: true,
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

CollectionClientes.addSubSchema('insert', ['nome', 'DataNascimento', 'email', 'userId']);

CollectionClientes.addSubSchema('update',
    ['nome', 'DataNascimento', 'telefone', 'email', 'QuantidadeDeDependentes']);

CollectionClientes.addSubSchema('view',
    ['nome', 'DataNascimento', 'telefone', 'email', 'QuantidadeDeDependentes', 'userId']);

