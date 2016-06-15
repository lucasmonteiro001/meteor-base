import { CollectionBase } from '../reuse/collectionBase';
export const collectionCliente = new CollectionBase('cliente');

//Definição dos Schemas
collectionCliente.setSchema('default', {
  nome: {
    type: String,
    defaultValue: '',
    label: 'Informe um nome',
    formOptions: {
      FIELD_TAG: 'input',
      FIELD_TYPE: 'text',
    },
  },
  homepage: {
    type: String,
    defaultValue: '',
    label: 'Informe um Site',
    formOptions: {
      FIELD_TAG: 'input',
      FIELD_TYPE: 'text',
    },
  },
  endereco: {
    type: String,
    defaultValue: '',
    label: 'Informe o Endereço',
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
    label: 'Meu Email',
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

