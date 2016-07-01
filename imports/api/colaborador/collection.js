import { CollectionBase } from '../reuse/collectionBase';

export const CollectionColaboradores = new CollectionBase('Colaboradores');

//Definição dos Schemas
CollectionColaboradores.setSchema({
  nome: {
    type: String,
    defaultValue: '',
    label: 'Nome',
    formOptions: {
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Nome'
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
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'number',
      PLACEHOLDER: 'Quantidade de dependentes'
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
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Telefone'
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
      FIELD_TAG: 'inputH',
      FIELD_TYPE: 'text',
      PLACEHOLDER: 'Email'

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

CollectionColaboradores.addSubSchema('insert', ['nome', 'DataNascimento', 'telefone', 'email', 'QuantidadeDeDependentes', 'userId']);

CollectionColaboradores.addSubSchema('update',
    ['nome', 'DataNascimento', 'telefone', 'email', 'QuantidadeDeDependentes']);

CollectionColaboradores.addSubSchema('view',
    ['nome', 'DataNascimento', 'telefone', 'email', 'QuantidadeDeDependentes', 'userId']);

