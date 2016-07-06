import { CollectionBase } from '../reuse/collectionBase';

export const Collection
{
  COLLECTION_NAME
}
= new CollectionBase('{COLLECTION_NAME}');

//Definição dos Schemas
Collection
{
  COLLECTION_NAME
}
.
setSchema({
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
  valor: {
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
  dataInicio: {
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

Collection
{
  COLLECTION_NAME
}
.
addSubSchema('insert', ['nome', 'DataNascimento', 'userId']);

Collection
{
  COLLECTION_NAME
}
.
addSubSchema('update',
    ['nome', 'DataNascimento']);

Collection
{
  COLLECTION_NAME
}
.
addSubSchema('view',
    ['nome', 'DataNascimento']);