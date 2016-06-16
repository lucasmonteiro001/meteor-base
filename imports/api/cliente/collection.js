import { CollectionBase } from '../reuse/collectionBase';
export const collectionCliente = new CollectionBase('cliente');

//Definição dos Schemas
collectionCliente.setSchema('default', {
  nome: {
    type: String,
    defaultValue: '',
    label: 'Mome',
    formOptions: {
      FIELD_TAG: 'input',
      FIELD_TYPE: 'text',
    },
    formValidation: {
      required: true,
      message: 'O nome do usúario é obrigatório',
    },    
  },
  Sala: {
    type: String,
    defaultValue: '',
    label: 'Sala',
    formOptions: {
      FIELD_TAG: 'input',
      FIELD_TYPE: 'text',
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
  },
  telefone: {
    type: String,
    defaultValue: '',
    label: 'Telefone/Cel:',
    formOptions: {
      FIELD_TAG: 'input',
      FIELD_TYPE: 'text',
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
  },
  userId: {
    type: String,
    label: 'Associated User ID',
  },
});

