import { CollectionBase } from '../reuse/collectionBase';
export const collectionCliente = new CollectionBase('cliente');

collectionCliente.setSchema({
  endereco: {
    type: String,
    defaultValue: '',
    label: 'Informe o Endereço',
  },
  telefone: {
    type: String,
    defaultValue: '',
    label: 'Telefone/Cel:',
  },
  nome: {
    type: String,
    defaultValue: '',
    label: 'Informe um nome',
  },
  Email: {
    type: String,
    defaultValue: '',
    label: 'Meu Email',
  },
  userId: {
    type: String,
    label: 'Associated User ID',
  },
});
